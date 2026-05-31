"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const EASE = [0.21, 0.47, 0.32, 0.98] as const

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

type SectionProps = {
  children: ReactNode
  className?: string
  id?: string
  "aria-labelledby"?: string
}

/** A <section> that reveals its FadeUp / StaggerGroup children when scrolled into view. */
export function Section({ children, className, id, ...rest }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.section>
  )
}

type MotionDivProps = {
  children: ReactNode
  className?: string
}

/** A single element that fades up. Use inside a <Section>. */
export function FadeUp({ children, className }: MotionDivProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}

/** A group that staggers its <StaggerItem> children. Use inside a <Section>. */
export function StaggerGroup({ children, className }: MotionDivProps) {
  return (
    <motion.div className={className} variants={containerVariants}>
      {children}
    </motion.div>
  )
}

/** A single staggered child. Use inside a <StaggerGroup>. */
export function StaggerItem({ children, className }: MotionDivProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
