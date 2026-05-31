"use client"

import { useState } from "react"
import { Section, FadeUp } from "@/components/motion"
import { createClient } from "@/lib/supabase/client"
import { waitlistSchema } from "@/lib/validations"
import {
  CountrySelect,
  FieldError,
  FieldLabel,
  SubmitButton,
  SuccessState,
  TextInput,
} from "@/components/form-fields"

type Errors = Partial<Record<"name" | "email" | "country" | "form", string>>

export function WaitlistForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    const parsed = waitlistSchema.safeParse({ name, email, country })
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
      const supabase = createClient()
      const { error: dbError } = await supabase.from("waitlist").insert(parsed.data)

      if (dbError) {
        if (dbError.code === "23505") {
          setErrors({ email: "This email is already on the waitlist." })
        } else {
          setErrors({ form: "Something went wrong. Please try again." })
        }
        return
      }

      // Fire confirmation email (non-blocking for success state).
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: parsed.data.name, email: parsed.data.email }),
      }).catch(() => null)

      setDone(true)
    } catch {
      setErrors({ form: "Something went wrong. Please try again." })
    } finally {
      setPending(false)
    }
  }

  return (
    <Section id="waitlist" className="mx-auto w-full max-w-xl px-6 py-24 sm:py-32" aria-labelledby="waitlist-heading">
      <FadeUp className="text-center">
        <h2 id="waitlist-heading" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Join the waitlist
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Be among the first to know when we launch.
        </p>
      </FadeUp>

      <FadeUp className="mt-10">
        {done ? (
          <SuccessState title="You're on the list." message="We'll be in touch soon. Thank you for joining us." />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <FieldLabel htmlFor="wl-name">Name</FieldLabel>
              <TextInput
                id="wl-name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                invalid={!!errors.name}
                aria-describedby={errors.name ? "wl-name-error" : undefined}
              />
              <FieldError id="wl-name-error" message={errors.name} />
            </div>

            <div>
              <FieldLabel htmlFor="wl-email">Email</FieldLabel>
              <TextInput
                id="wl-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                invalid={!!errors.email}
                aria-describedby={errors.email ? "wl-email-error" : undefined}
              />
              <FieldError id="wl-email-error" message={errors.email} />
            </div>

            <div>
              <FieldLabel htmlFor="wl-country">Country</FieldLabel>
              <CountrySelect
                id="wl-country"
                name="country"
                value={country}
                onChange={setCountry}
                invalid={!!errors.country}
              />
              <FieldError id="wl-country-error" message={errors.country} />
            </div>

            {errors.form ? (
              <p role="alert" className="text-sm text-destructive">
                {errors.form}
              </p>
            ) : null}

            <div className="mt-2">
              <SubmitButton pending={pending}>Join Waitlist</SubmitButton>
            </div>
          </form>
        )}
      </FadeUp>
    </Section>
  )
}
