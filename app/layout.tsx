import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Listeners — A place where someone truly listens',
  description:
    'Connect with trained human listeners for anonymous, emotionally supportive conversations. You don’t always need advice. Sometimes you just need to be heard.',
  generator: 'v0.app',
  keywords: [
    'listeners',
    'emotional support',
    'anonymous listening',
    'mental wellbeing',
    'human connection',
  ],
  openGraph: {
    title: 'Listeners — A place where someone truly listens',
    description:
      'You don’t always need advice. Sometimes you just need to be heard.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1E1B4B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} dark bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
