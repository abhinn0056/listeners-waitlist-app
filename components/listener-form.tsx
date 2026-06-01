"use client"

import { useState } from "react"
import { Section, FadeUp } from "@/components/motion"
import { listenerSchema } from "@/lib/validations"
import {
  CountrySelect,
  FieldError,
  FieldLabel,
  SubmitButton,
  SuccessState,
  TextArea,
  TextInput,
} from "@/components/form-fields"

type FieldKey = "full_name" | "email" | "country" | "linkedin" | "motivation" | "experience"
type Errors = Partial<Record<FieldKey | "form", string>>

export function ListenerForm() {
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    country: "",
    linkedin: "",
    motivation: "",
    experience: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)

  function set(key: FieldKey, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    const parsed = listenerSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setPending(true)

    try {
      const response = await fetch("/api/listener", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      const result = await response.json()
      if (!response.ok) {
        setErrors({ form: result.error ?? "Something went wrong. Please try again." })
        return
      }

      setDone(true)
    } catch {
      setErrors({ form: "Something went wrong. Please try again." })
    } finally {
      setPending(false)
    }
  }

  return (
    <Section id="listener" className="mx-auto w-full max-w-xl px-6 py-24 sm:py-32" aria-labelledby="listener-heading">
      <FadeUp className="text-center">
        <h2 id="listener-heading" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Become a listener
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Help create a space where people feel truly heard.
        </p>
      </FadeUp>

      <FadeUp className="mt-10">
        {done ? (
          <SuccessState
            title="You're on the list."
            message="Thank you for applying. We'll review your application and reach out soon."
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <FieldLabel htmlFor="ls-name">Full Name</FieldLabel>
              <TextInput
                id="ls-name"
                name="full_name"
                autoComplete="name"
                placeholder="Your full name"
                value={values.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                invalid={!!errors.full_name}
                aria-describedby={errors.full_name ? "ls-name-error" : undefined}
              />
              <FieldError id="ls-name-error" message={errors.full_name} />
            </div>

            <div>
              <FieldLabel htmlFor="ls-email">Email</FieldLabel>
              <TextInput
                id="ls-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                invalid={!!errors.email}
                aria-describedby={errors.email ? "ls-email-error" : undefined}
              />
              <FieldError id="ls-email-error" message={errors.email} />
            </div>

            <div>
              <FieldLabel htmlFor="ls-country">Country</FieldLabel>
              <CountrySelect
                id="ls-country"
                name="country"
                value={values.country}
                onChange={(v) => set("country", v)}
                invalid={!!errors.country}
              />
              <FieldError id="ls-country-error" message={errors.country} />
            </div>

            <div>
              <FieldLabel htmlFor="ls-linkedin" optional>
                LinkedIn URL
              </FieldLabel>
              <TextInput
                id="ls-linkedin"
                name="linkedin"
                type="url"
                inputMode="url"
                placeholder="https://linkedin.com/in/you"
                value={values.linkedin}
                onChange={(e) => set("linkedin", e.target.value)}
                invalid={!!errors.linkedin}
                aria-describedby={errors.linkedin ? "ls-linkedin-error" : undefined}
              />
              <FieldError id="ls-linkedin-error" message={errors.linkedin} />
            </div>

            <div>
              <FieldLabel htmlFor="ls-motivation">Why do you want to become a listener?</FieldLabel>
              <TextArea
                id="ls-motivation"
                name="motivation"
                placeholder="Share what draws you to this work…"
                value={values.motivation}
                onChange={(e) => set("motivation", e.target.value)}
                invalid={!!errors.motivation}
                aria-describedby={errors.motivation ? "ls-motivation-error" : undefined}
              />
              <FieldError id="ls-motivation-error" message={errors.motivation} />
            </div>

            <div>
              <FieldLabel htmlFor="ls-experience">Relevant experience</FieldLabel>
              <TextArea
                id="ls-experience"
                name="experience"
                placeholder="Tell us about any relevant experience…"
                value={values.experience}
                onChange={(e) => set("experience", e.target.value)}
                invalid={!!errors.experience}
                aria-describedby={errors.experience ? "ls-experience-error" : undefined}
              />
              <FieldError id="ls-experience-error" message={errors.experience} />
            </div>

            {errors.form ? (
              <p role="alert" className="text-sm text-destructive">
                {errors.form}
              </p>
            ) : null}

            <div className="mt-2">
              <SubmitButton pending={pending}>Submit Application</SubmitButton>
            </div>
          </form>
        )}
      </FadeUp>
    </Section>
  )
}
