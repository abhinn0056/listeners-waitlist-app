import { Hero } from "@/components/hero"
import { WaitlistForm } from "@/components/waitlist-form"
import { ListenerForm } from "@/components/listener-form"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <WaitlistForm />
      <ListenerForm />
      <SiteFooter />
    </main>
  )
}
