"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { type ReactNode, forwardRef } from "react"
import { countries } from "@/lib/countries"
import { cn } from "@/lib/utils"

const baseField =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/40"

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  )
}

type LabelProps = { htmlFor: string; children: ReactNode; optional?: boolean }
export function FieldLabel({ htmlFor, children, optional }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {optional ? <span className="ml-1 font-normal text-muted-foreground">(optional)</span> : null}
    </label>
  )
}

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function TextInput({ className, invalid, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(baseField, invalid && "border-destructive focus:border-destructive focus:ring-destructive/30", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
})

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function TextArea({ className, invalid, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        baseField,
        "min-h-32 resize-y leading-relaxed",
        invalid && "border-destructive focus:border-destructive focus:ring-destructive/30",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
})

export function CountrySelect({
  id,
  name,
  value,
  onChange,
  invalid,
}: {
  id: string
  name: string
  value: string
  onChange: (v: string) => void
  invalid?: boolean
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid || undefined}
      className={cn(
        baseField,
        "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10",
        !value && "text-muted-foreground/70",
        invalid && "border-destructive focus:border-destructive focus:ring-destructive/30",
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
      }}
    >
      <option value="" disabled>
        Select your country
      </option>
      {countries.map((c) => (
        <option key={c} value={c} className="text-foreground">
          {c}
        </option>
      ))}
    </select>
  )
}

export function SuccessState({ title, message }: { title: string; message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-14 text-center"
      role="status"
      aria-live="polite"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent"
      >
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 16 }}
        >
          <Check className="size-8" strokeWidth={3} aria-hidden="true" />
        </motion.span>
      </motion.span>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-card-foreground">{title}</h3>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{message}</p>
    </motion.div>
  )
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {pending ? "Submitting…" : children}
    </button>
  )
}
