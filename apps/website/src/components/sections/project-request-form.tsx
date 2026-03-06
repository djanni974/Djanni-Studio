"use client"

import { cn } from "@repo/ui/lib/utils"
import {
	IconArrowLeft,
	IconArrowRight,
	IconCheck,
	IconMail,
	IconPhone,
	IconSend,
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
		<div className="mb-8 flex items-center justify-center gap-2">
			{Array.from({ length: STEP_COUNT }, (_, i) => (
				<div key={i} className="flex items-center gap-2">
					<div
						className={cn(
							"flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300",
							i < currentStep
								? "border-djanni-orange bg-djanni-orange text-white"
								: i === currentStep
									? "border-djanni-orange bg-djanni-orange/10 text-djanni-orange"
									: "border-border text-djanni-gray",
						)}
					>
						{i < currentStep ? <IconCheck size={14} /> : i + 1}
					</div>
					{i < STEP_COUNT - 1 && (
						<div
							className={cn(
								"h-px w-8 transition-colors duration-300",
								i < currentStep ? "bg-djanni-orange" : "bg-border",
							)}
						/>
					)}
				</div>
			))}
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
				<AnimatedSection>
					<div className="rounded-xl border border-djanni-orange/30 bg-djanni-orange/5 p-10 text-center">
						<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-djanni-orange/10">
							<IconCheck size={28} className="text-djanni-orange" />
						</div>
						<h3 className="mb-2 font-heading text-xl font-bold">{t("successTitle")}</h3>
						<p className="text-sm text-djanni-gray-light">{t("successMessage")}</p>
					</div>
				</AnimatedSection>
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
								<button
									type="button"
									onClick={handleBack}
									className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
								>
									<IconArrowLeft size={16} />
									{t("back")}
								</button>
							) : (
								<div />
							)}

							{currentStep < STEP_COUNT - 1 ? (
								<button
									type="button"
									onClick={handleNext}
									className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
								>
									{t("next")}
									<IconArrowRight size={16} />
								</button>
							) : (
								<motion.button
									type="submit"
									disabled={submitting}
									className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light disabled:opacity-60"
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.98 }}
								>
									{submitting ? (
										<>
											<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
											{t("sending")}
										</>
									) : (
										<>
											<IconSend size={16} />
											{t("send")}
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
				</AnimatedSection>
			)}
		</div>
	)
}
