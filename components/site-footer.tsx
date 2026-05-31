import { Twitter, Instagram, Linkedin } from "lucide-react"
import { Logo } from "@/components/logo"

const socials = [
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-14 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" title="Listeners logo" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-foreground">Listeners</span>
            <span className="text-sm text-muted-foreground">Launching Soon</span>
          </div>
        </div>

        <nav aria-label="Social media" className="flex items-center gap-2">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon className="size-5" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-5xl px-6 py-6 text-center text-sm text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} Listeners. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
