import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

/**
 * Rate limiting partage entre les routes API.
 *
 * Upstash Redis en priorite (etat externe, fonctionne en serverless multi-instance).
 * Fallback memoire par-instance si Upstash n'est pas configure : suffisant en dev,
 * jamais la source de verite en prod (Upstash doit y etre defini).
 *
 * Les variables d'env sont lues au RUNTIME (premier appel), pas au chargement du
 * module : Turborepo filtre les env au build et les secrets "sensibles" sont vides
 * au module-load (voir gotcha env Vercel/Turbo).
 */

type RateLimitConfig = {
	/** Identifiant logique du limiteur : prefixe les cles Redis et isole les fenetres memoire. */
	prefix: string
	/** Nombre de requetes autorisees par fenetre. */
	limit: number
	/** Duree de la fenetre, en secondes. */
	windowSeconds: number
}

const upstashLimiters = new Map<string, Ratelimit>()
const memoryStores = new Map<string, Map<string, { count: number; resetAt: number }>>()

function getUpstashLimiter({ prefix, limit, windowSeconds }: RateLimitConfig): Ratelimit {
	const cached = upstashLimiters.get(prefix)
	if (cached) return cached

	const limiter = new Ratelimit({
		redis: Redis.fromEnv(),
		limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
		analytics: true,
		prefix: `ratelimit:${prefix}`,
	})
	upstashLimiters.set(prefix, limiter)
	return limiter
}

function checkMemory(key: string, { prefix, limit, windowSeconds }: RateLimitConfig): boolean {
	let store = memoryStores.get(prefix)
	if (!store) {
		store = new Map()
		memoryStores.set(prefix, store)
	}

	const now = Date.now()
	const entry = store.get(key)

	if (!entry || now > entry.resetAt) {
		// Purge des fenetres expirees pour borner la croissance memoire du fallback.
		if (store.size > 5_000) {
			for (const [k, v] of store) {
				if (now > v.resetAt) store.delete(k)
			}
		}
		store.set(key, { count: 1, resetAt: now + windowSeconds * 1_000 })
		return true
	}

	entry.count++
	return entry.count <= limit
}

/**
 * Renvoie true si la requete est autorisee, false si la limite est depassee.
 */
export async function rateLimit(key: string, config: RateLimitConfig): Promise<boolean> {
	const hasUpstash = Boolean(
		process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
	)

	if (hasUpstash) {
		const { success } = await getUpstashLimiter(config).limit(key)
		return success
	}

	return checkMemory(key, config)
}
