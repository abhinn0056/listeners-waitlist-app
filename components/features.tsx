"use client"

import { MessageCircle, EyeOff, CalendarClock, GraduationCap, ShieldCheck, HeartHandshake } from "lucide-react"
import { Section, FadeUp, StaggerGroup, StaggerItem } from "@/components/motion"

const features = [
  { icon: MessageCircle, label: "Human Conversations" },
  { icon: EyeOff, label: "Anonymous Support" },
  { icon: CalendarClock, label: "Scheduled Conversations" },
  { icon: GraduationCap, label: "Trained Listeners" },
  { icon: ShieldCheck, label: "Safe Environment" },
  { icon: HeartHandshake, label: "Meaningful Connection" },
]

export function Features() {
  return (
    <Section className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32" aria-labelledby="features-heading">
      <FadeUp>
        <h2
          id="features-heading"
          className="mx-auto max-w-2xl text-balance text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Built around what matters
        </h2>
      </FadeUp>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, label }) => (
          <StaggerItem key={label}>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-5 transition-colors duration-300 hover:border-accent/40">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-base font-medium text-card-foreground">{label}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
