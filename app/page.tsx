import { Hero } from "@/components/hero"
import { LogoMeaning } from "@/components/logo-meaning"
import { Features } from "@/components/features"
import { WaitlistForm } from "@/components/waitlist-form"
import { ListenerForm } from "@/components/listener-form"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <LogoMeaning />
      <Features />
      <WaitlistForm />
      <ListenerForm />
      <SiteFooter />
    </main>
  )
}
