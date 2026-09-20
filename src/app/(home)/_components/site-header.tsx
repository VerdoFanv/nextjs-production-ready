'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/app/components/ui/theme-toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { useReducedMotion } from '@/app/hooks'
import { cn } from '@/app/lib/utils'

const links = [
  { href: '#security', label: 'Security', hint: 'Headers & CSP' },
  { href: '#vitals', label: 'Performance', hint: 'Core Web Vitals' },
  { href: '#seo', label: 'SEO', hint: 'Metadata & crawlability' },
]

export function SiteHeader() {
  const reduceMotion = useReducedMotion()

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          NextJS Production Ready
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      className={cn(
                        'relative inline-flex px-3 py-2 text-sm text-text-secondary transition-colors hover:text-foreground',
                      )}
                    >
                      {!reduceMotion ? (
                        <motion.span
                          className="absolute inset-x-3 bottom-1 h-px origin-left bg-primary"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      ) : null}
                      {link.label}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{link.hint}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
