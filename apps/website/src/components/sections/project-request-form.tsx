"use client"

import { cn } from "@repo/ui/lib/utils"
import {
	IconArrowLeft,
	IconArrowRight,
	IconCheck,
	IconClock,
	IconMail,
	IconPhone,
	IconSend,
	IconShieldCheck,
} from "@tabler/icons-react"
import { AnimatePresence, motion } from "motion/react"
import { useTranslations } from "next-intl"
import { type FormEvent, useState } from "react"
import { toast } from "sonner"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Link } from "@/i18n/navigation"

type FormData = {
	projectType: string
	businessName: string
	existingUrl: string
	budget: string
	deadline: string
	name: string
	email: string
	message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const STEP_COUNT = 4

const inputBaseClass =
	"w-full rounded-lg border border-border bg-surface-b px-4 py-3.5 text-sm text-foreground placeholder:text-djanni-gray transition-colors focus:border-djanni-orange focus:outline-none focus:ring-1 focus:ring-djanni-orange/50"

const selectClass =
	"w-full appearance-none rounded-lg border border-border bg-surface-b px-4 py-3.5 text-sm text-foreground transition-colors focus:border-djanni-orange focus:outline-none focus:ring-1 focus:ring-djanni-orange/50"

function StepIndicator({ currentStep }: { currentStep: number }) {
	return (
		<div className="mb-10 flex flex-col items-center gap-4">
			<div className="flex items-center gap-2">
				{Array.from({ length: STEP_COUNT }, (_, i) => (
					<div key={i} className="flex items-center gap-2">
						<motion.div
							animate={{
								scale: i === currentStep ? 1.1 : 1,
								borderColor:
									i <= currentStep ? "var(--color-djanni-orange)" : "var(--color-border)",
							}}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className={cn(
								"flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
								i < currentStep
									? "bg-djanni-orange text-white"
									: i === currentStep
										? "bg-djanni-orange/10 text-djanni-orange"
										: "text-djanni-gray",
							)}
						>
							{i < currentStep ? (
								<motion.span
									initial={{ scale: 0, rotate: -90 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ type: "spring", stiffness: 500, damping: 25 }}
								>
									<IconCheck size={14} />
								</motion.span>
							) : (
								i + 1
							)}
						</motion.div>
						{i < STEP_COUNT - 1 && (
							<div className="relative h-px w-8 bg-border">
								<motion.div
									className="absolute inset-y-0 left-0 bg-djanni-orange"
									initial={{ width: "0%" }}
									animate={{ width: i < currentStep ? "100%" : "0%" }}
									transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
								/>
							</div>
						)}
					</div>
				))}
			</div>
			<p className="text-xs text-djanni-gray">
				{currentStep + 1} / {STEP_COUNT}
			</p>
		</div>
	)
}

export function ProjectRequestForm() {
	const t = useTranslations("projectRequest")

	const [formData, setFormData] = useState<FormData>({
		projectType: "",
		businessName: "",
		existingUrl: "",
		budget: "",
		deadline: "",
		name: "",
		email: "",
		message: "",
	})
	const [errors, setErrors] = useState<FormErrors>({})
	const [submitted, setSubmitted] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)
	const [direction, setDirection] = useState(1)

	const PROJECT_TYPES = [
		{ value: "", label: t("projectType") },
		{ value: "site-vitrine", label: t("projectTypes.site-vitrine") },
		{ value: "site-premium", label: t("projectTypes.site-premium") },
		{ value: "refonte", label: t("projectTypes.refonte") },
		{ value: "autre", label: t("projectTypes.autre") },
	]

	const BUDGET_RANGES = [
		{ value: "", label: t("budget") },
		{ value: "moins-1000", label: t("budgets.moins-1000") },
		{ value: "1000-2000", label: t("budgets.1000-2000") },
		{ value: "2000-3000", label: t("budgets.2000-3000") },
		{ value: "plus-3000", label: t("budgets.plus-3000") },
		{ value: "pas-defini", label: t("budgets.pas-defini") },
	]

	const DEADLINES = [
		{ value: "", label: t("deadlinePlaceholder") },
		{ value: "urgent", label: t("deadlines.urgent") },
		{ value: "1-mois", label: t("deadlines.1-mois") },
		{ value: "2-3-mois", label: t("deadlines.2-3-mois") },
		{ value: "pas-presse", label: t("deadlines.pas-presse") },
	]

	function validateStep(step: number, data: FormData): FormErrors {
		const errs: FormErrors = {}
		if (step === 0) {
			if (!data.projectType) errs.projectType = t("errors.projectType")
			if (!data.businessName.trim()) errs.businessName = t("errors.businessName")
		} else if (step === 2) {
			if (!data.name.trim()) errs.name = t("errors.name")
			if (!data.email.trim()) {
				errs.email = t("errors.email")
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
				errs.email = t("errors.emailInvalid")
			}
		} else if (step === 3) {
			if (!data.message.trim()) errs.message = t("errors.message")
		}
		return errs
	}

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
		if (errors[name as keyof FormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }))
		}
	}

	function handleNext() {
		const stepErrors = validateStep(currentStep, formData)
		if (Object.keys(stepErrors).length > 0) {
			setErrors(stepErrors)
			return
		}
		setErrors({})
		setDirection(1)
		setCurrentStep((prev) => prev + 1)
	}

	function handleBack() {
		setErrors({})
		setDirection(-1)
		setCurrentStep((prev) => prev - 1)
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		const stepErrors = validateStep(currentStep, formData)
		if (Object.keys(stepErrors).length > 0) {
			setErrors(stepErrors)
			return
		}
		setSubmitting(true)
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})
			const data = await res.json()
			if (!res.ok) {
				toast.error(data.error || "Erreur lors de l\u2019envoi.")
				setSubmitting(false)
				return
			}
			setSubmitting(false)
			setSubmitted(true)
		} catch {
			toast.error("Erreur réseau. Vérifiez votre connexion et réessayez.")
			setSubmitting(false)
		}
	}

	return (
		<div className="relative mx-auto max-w-[720px]">
			<div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.06)_0%,transparent_70%)]" />

			<AnimatedSection className="relative">
				<div className="mb-10 text-center">
					<span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-djanni-orange">
						<span className="inline-block h-px w-6 bg-djanni-orange" />
						{t("tag")}
						<span className="inline-block h-px w-6 bg-djanni-orange" />
					</span>
					<h1 className="font-heading text-[clamp(28px,5vw,44px)] font-extrabold leading-tight tracking-tight">
						{t("title")}
					</h1>
					<p className="mt-3 text-[15px] text-djanni-gray-light">{t("subtitle")}</p>
				</div>
			</AnimatedSection>

			{submitted ? (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				>
					<div className="relative overflow-hidden rounded-xl border border-djanni-orange/30 bg-djanni-orange/5 p-12 text-center">
						{/* Glow behind check */}
						<div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.1)_0%,transparent_70%)]" />

						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
							className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-djanni-orange/15"
						>
							<motion.div
								initial={{ scale: 0, rotate: -90 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.4 }}
							>
								<IconCheck size={30} className="text-djanni-orange" />
							</motion.div>
						</motion.div>
						<motion.h3
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.4 }}
							className="relative mb-2 font-heading text-xl font-bold"
						>
							{t("successTitle")}
						</motion.h3>
						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.4 }}
							className="relative text-sm text-djanni-gray-light"
						>
							{t("successMessage")}
						</motion.p>
					</div>
				</motion.div>
			) : (
				<AnimatedSection delay={0.15}>
					<form
						onSubmit={handleSubmit}
						noValidate
						className="rounded-xl border border-border bg-surface-a p-8 md:p-10"
					>
						<StepIndicator currentStep={currentStep} />

						<div className="min-h-[260px]">
							<AnimatePresence mode="wait" custom={direction}>
								<motion.div
									key={currentStep}
									custom={direction}
									initial={{ opacity: 0, x: direction * 40 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -direction * 40 }}
									transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
								>
									{/* Step 0: Project type + business name */}
									{currentStep === 0 && (
										<div className="space-y-5">
											<h3 className="mb-6 text-center font-heading text-lg font-bold">
												{t("step0Title")}
											</h3>
											<div>
												<label
													htmlFor="projectType"
													className="mb-1.5 block text-xs font-medium text-djanni-gray"
												>
													{t("projectTypeLabel")}
												</label>
												<select
													id="projectType"
													name="projectType"
													value={formData.projectType}
													onChange={handleChange}
													className={cn(
														selectClass,
														!formData.projectType && "text-djanni-gray",
														errors.projectType && "border-red-500/50",
													)}
												>
													{PROJECT_TYPES.map((opt) => (
														<option key={opt.value} value={opt.value} disabled={!opt.value}>
															{opt.label}
														</option>
													))}
												</select>
												{errors.projectType && (
													<p className="mt-1.5 text-xs text-red-400">{errors.projectType}</p>
												)}
											</div>
											<div>
												<label
													htmlFor="businessName"
													className="mb-1.5 block text-xs font-medium text-djanni-gray"
												>
													{t("businessNameLabel")}
												</label>
												<input
													id="businessName"
													type="text"
													name="businessName"
													placeholder={t("businessNamePlaceholder")}
													value={formData.businessName}
													onChange={handleChange}
													className={cn(inputBaseClass, errors.businessName && "border-red-500/50")}
												/>
												{errors.businessName && (
													<p className="mt-1.5 text-xs text-red-400">{errors.businessName}</p>
												)}
											</div>
											{formData.projectType === "refonte" && (
												<motion.div
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: "auto" }}
													transition={{ duration: 0.2 }}
												>
													<label
														htmlFor="existingUrl"
														className="mb-1.5 block text-xs font-medium text-djanni-gray"
													>
														{t("existingUrlLabel")}
													</label>
													<input
														id="existingUrl"
														type="url"
														name="existingUrl"
														placeholder={t("existingUrlPlaceholder")}
														value={formData.existingUrl}
														onChange={handleChange}
														className={inputBaseClass}
													/>
												</motion.div>
											)}
										</div>
									)}

									{/* Step 1: Budget + deadline */}
									{currentStep === 1 && (
										<div className="space-y-5">
											<h3 className="mb-6 text-center font-heading text-lg font-bold">
												{t("step1Title")}
											</h3>
											<div>
												<label
													htmlFor="budget"
													className="mb-1.5 block text-xs font-medium text-djanni-gray"
												>
													{t("budgetLabel")}
												</label>
												<select
													id="budget"
													name="budget"
													value={formData.budget}
													onChange={handleChange}
													className={cn(selectClass, !formData.budget && "text-djanni-gray")}
												>
													{BUDGET_RANGES.map((opt) => (
														<option key={opt.value} value={opt.value}>
															{opt.label}
														</option>
													))}
												</select>
											</div>
											<div>
												<label
													htmlFor="deadline"
													className="mb-1.5 block text-xs font-medium text-djanni-gray"
												>
													{t("deadlineLabel")}
												</label>
												<select
													id="deadline"
													name="deadline"
													value={formData.deadline}
													onChange={handleChange}
													className={cn(selectClass, !formData.deadline && "text-djanni-gray")}
												>
													{DEADLINES.map((opt) => (
														<option key={opt.value} value={opt.value}>
															{opt.label}
														</option>
													))}
												</select>
											</div>
										</div>
									)}

									{/* Step 2: Contact info */}
									{currentStep === 2 && (
										<div className="space-y-5">
											<h3 className="mb-6 text-center font-heading text-lg font-bold">
												{t("step2Title")}
											</h3>
											<div>
												<label
													htmlFor="name"
													className="mb-1.5 block text-xs font-medium text-djanni-gray"
												>
													{t("nameLabel")}
												</label>
												<input
													id="name"
													type="text"
													name="name"
													placeholder={t("namePlaceholder")}
													value={formData.name}
													onChange={handleChange}
													className={cn(inputBaseClass, errors.name && "border-red-500/50")}
												/>
												{errors.name && (
													<p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
												)}
											</div>
											<div>
												<label
													htmlFor="email"
													className="mb-1.5 block text-xs font-medium text-djanni-gray"
												>
													{t("emailLabel")}
												</label>
												<input
													id="email"
													type="email"
													name="email"
													placeholder={t("emailPlaceholder")}
													value={formData.email}
													onChange={handleChange}
													className={cn(inputBaseClass, errors.email && "border-red-500/50")}
												/>
												{errors.email && (
													<p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
												)}
											</div>
										</div>
									)}

									{/* Step 3: Message */}
									{currentStep === 3 && (
										<div className="space-y-5">
											<h3 className="mb-6 text-center font-heading text-lg font-bold">
												{t("step3Title")}
											</h3>
											<div>
												<label
													htmlFor="message"
													className="mb-1.5 block text-xs font-medium text-djanni-gray"
												>
													{t("messageLabel")}
												</label>
												<textarea
													id="message"
													name="message"
													placeholder={t("messagePlaceholder")}
													rows={6}
													value={formData.message}
													onChange={handleChange}
													className={cn(
														inputBaseClass,
														"resize-none",
														errors.message && "border-red-500/50",
													)}
												/>
												{errors.message && (
													<p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
												)}
											</div>
										</div>
									)}
								</motion.div>
							</AnimatePresence>
						</div>

						<div className="mt-8 flex items-center justify-between gap-4">
							{currentStep > 0 ? (
								<motion.button
									type="button"
									onClick={handleBack}
									whileHover={{ x: -2 }}
									whileTap={{ scale: 0.97 }}
									className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-djanni-orange/30 hover:bg-secondary"
								>
									<IconArrowLeft
										size={16}
										className="transition-transform duration-300 group-hover:-translate-x-0.5"
									/>
									{t("back")}
								</motion.button>
							) : (
								<div />
							)}

							{currentStep < STEP_COUNT - 1 ? (
								<motion.button
									type="button"
									onClick={handleNext}
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.97 }}
									className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-djanni-orange px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_rgba(232,80,10,0)] transition-all duration-300 hover:bg-djanni-orange-light hover:shadow-[0_6px_24px_rgba(232,80,10,0.3)]"
								>
									<span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
									<span className="relative">{t("next")}</span>
									<IconArrowRight
										size={16}
										className="relative transition-transform duration-300 group-hover:translate-x-0.5"
									/>
								</motion.button>
							) : (
								<motion.button
									type="submit"
									disabled={submitting}
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.97 }}
									className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-djanni-orange px-8 py-3 text-sm font-medium text-white shadow-[0_0_0_rgba(232,80,10,0)] transition-all duration-300 hover:bg-djanni-orange-light hover:shadow-[0_8px_30px_rgba(232,80,10,0.35)] disabled:pointer-events-none disabled:opacity-60"
								>
									<span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
									{submitting ? (
										<>
											<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
											<span className="relative">{t("sending")}</span>
										</>
									) : (
										<>
											<IconSend
												size={16}
												className="relative transition-transform duration-300 group-hover:-rotate-12"
											/>
											<span className="relative">{t("send")}</span>
										</>
									)}
								</motion.button>
							)}
						</div>
					</form>

					<div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-djanni-gray">
						<span>{t("or")}</span>
						<Link
							href="mailto:contact@djannistudio.fr"
							className="inline-flex items-center gap-1.5 text-djanni-gray-light transition-colors hover:text-foreground"
						>
							<IconMail size={14} />
							contact@djannistudio.fr
						</Link>
						<Link
							href="tel:+33749547498"
							className="inline-flex items-center gap-1.5 text-djanni-gray-light transition-colors hover:text-foreground"
						>
							<IconPhone size={14} />
							07 49 54 74 98
						</Link>
					</div>

					{/* Trust indicators */}
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mt-10 flex flex-wrap items-center justify-center gap-8"
					>
						<div className="flex items-center gap-2 text-xs text-djanni-gray-light">
							<IconClock size={14} className="text-djanni-orange" />
							{t("trustResponse")}
						</div>
						<div className="flex items-center gap-2 text-xs text-djanni-gray-light">
							<IconShieldCheck size={14} className="text-djanni-orange" />
							{t("trustFree")}
						</div>
						<div className="flex items-center gap-2 text-xs text-djanni-gray-light">
							<IconCheck size={14} className="text-djanni-orange" />
							{t("trustNoCommitment")}
						</div>
					</motion.div>
				</AnimatedSection>
			)}
		</div>
	)
}
