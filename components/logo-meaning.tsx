"use client"

import { Link2, ShieldCheck, Target, Heart } from "lucide-react"
import { Section, FadeUp, StaggerGroup, StaggerItem } from "@/components/motion"

const cards = [
  {
    icon: Link2,
    title: "Connection",
    description: "Two sides coming together.",
  },
  {
    icon: ShieldCheck,
    title: "Safety",
    description: "A protective space to be yourself.",
  },
  {
    icon: Target,
    title: "Focus",
    description: "Your story. What matters.",
  },
  {
    icon: Heart,
    title: "Openness",
    description: "Always welcoming.",
  },
]

export function LogoMeaning() {
  return (
    <Section className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32">
      <FadeUp className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          The meaning behind the mark
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Every element of our symbol reflects what we stand for.
        </p>
      </FadeUp>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {cards.map(({ icon: Icon, title, description }) => (
          <StaggerItem key={title}>
            <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-card-foreground">{title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
