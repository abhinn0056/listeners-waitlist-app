'use client'

import { motion } from 'framer-motion'
import { Logo } from '@/components/logo'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      aria-labelledby="hero-heading"
    >
      {/* Soft radial violet glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[36rem] w-[36rem] rounded-full bg-accent/15 blur-[120px] dark:bg-accent/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Entrance, then infinite float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <Logo className="h-24 w-24 text-primary sm:h-28 sm:w-28" />
          </motion.div>
        </motion.div>

        <motion.h1
          id="hero-heading"
          className="mt-10 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          A place where someone truly listens.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
        >
          You don&apos;t always need advice. Sometimes you just need to be
          heard.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        >
          <button
            type="button"
            onClick={() => scrollToId('waitlist')}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            Join Waitlist
          </button>
          <button
            type="button"
            onClick={() => scrollToId('listener')}
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-background/60 px-8 text-sm font-medium text-foreground backdrop-blur transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            Become a Listener
          </button>
        </motion.div>
      </div>
    </section>
  )
}
