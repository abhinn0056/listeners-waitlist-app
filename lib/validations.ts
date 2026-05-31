import { z } from 'zod'

export const waitlistSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.'),
  country: z.string().trim().min(1, 'Please select your country.'),
})

export type WaitlistInput = z.infer<typeof waitlistSchema>

export const listenerSchema = z.object({
  full_name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.'),
  country: z.string().trim().min(1, 'Please select your country.'),
  linkedin: z
    .string()
    .trim()
    .url('Please enter a valid URL.')
    .optional()
    .or(z.literal('')),
  motivation: z
    .string()
    .trim()
    .min(20, 'Please share at least a sentence or two (20+ characters).')
    .max(2000),
  experience: z
    .string()
    .trim()
    .min(20, 'Please share at least a sentence or two (20+ characters).')
    .max(2000),
})

export type ListenerInput = z.infer<typeof listenerSchema>
