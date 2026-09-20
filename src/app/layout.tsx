import type { Metadata } from 'next'
import './_styles/globals.css'
import { manrope } from './fonts'
import { ThemeProvider } from '@/app/components/providers/theme-provider'
import { Toaster } from '@/app/components/ui/toaster'
import { TooltipProvider } from '@/app/components/ui/tooltip'
import { siteConfig } from '@/app/config/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <main>{children}</main>
            <Toaster richColors closeButton position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
