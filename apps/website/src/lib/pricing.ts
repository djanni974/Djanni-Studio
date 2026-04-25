export type MaintenanceTierId = "essentiel" | "confort" | "serenite"

export type MaintenanceTier = {
	id: MaintenanceTierId
	monthlyPriceHT: number
	highlighted?: boolean
}

export type OptionUnit = "unique" | "mensuel" | "par_unite"

export type OptionItem = {
	id: string
	priceHT: number
	unit: OptionUnit
}

export type OptionCategoryId = "contenus" | "visuel" | "seo" | "fonctionnalites" | "accompagnement"

export type OptionCategory = {
	id: OptionCategoryId
	items: OptionItem[]
}

export const MAINTENANCE_TIERS: MaintenanceTier[] = [
	{
		id: "essentiel",
		monthlyPriceHT: 29,
	},
	{
		id: "confort",
		monthlyPriceHT: 49,
		highlighted: true,
	},
	{
		id: "serenite",
		monthlyPriceHT: 99,
	},
]

export const OPTION_CATEGORIES: OptionCategory[] = [
	{
		id: "contenus",
		items: [
			{ id: "redaction-textes", priceHT: 150, unit: "unique" },
			{ id: "article-blog", priceHT: 120, unit: "par_unite" },
			{ id: "pack-3-articles", priceHT: 300, unit: "unique" },
		],
	},
	{
		id: "visuel",
		items: [
			{ id: "galerie-cms", priceHT: 290, unit: "unique" },
			{ id: "photos-stock", priceHT: 80, unit: "unique" },
			{ id: "feed-instagram", priceHT: 120, unit: "unique" },
			{ id: "retouche-photo", priceHT: 40, unit: "par_unite" },
		],
	},
	{
		id: "seo",
		items: [
			{ id: "gbp-config", priceHT: 100, unit: "unique" },
			{ id: "seo-local-etendu", priceHT: 250, unit: "unique" },
			{ id: "page-seo-ville", priceHT: 150, unit: "par_unite" },
		],
	},
	{
		id: "fonctionnalites",
		items: [
			{ id: "page-supplementaire", priceHT: 150, unit: "par_unite" },
			{ id: "formulaire-devis", priceHT: 180, unit: "unique" },
			{ id: "rdv-fresha-planity", priceHT: 90, unit: "unique" },
			{ id: "newsletter", priceHT: 150, unit: "unique" },
			{ id: "multilingue", priceHT: 450, unit: "unique" },
		],
	},
	{
		id: "accompagnement",
		items: [
			{ id: "formation-1h", priceHT: 60, unit: "unique" },
			{ id: "gestion-instagram", priceHT: 180, unit: "mensuel" },
			{ id: "gestion-instagram-facebook", priceHT: 280, unit: "mensuel" },
		],
	},
]
