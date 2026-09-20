'use client'

import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion'
import { Button } from '@/app/components/ui/button'
import { MotionBox } from '@/app/components/ui/motion'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { useCopyToClipboard } from '@/app/hooks'

const headers = [
  {
    key: 'Content-Security-Policy',
    detail:
      'Locks script, style, and connect sources. Toggle enforce vs report-only with CSP_ENFORCE.',
  },
  {
    key: 'Strict-Transport-Security',
    detail: 'HSTS in production only — max-age one year, includeSubDomains.',
  },
  {
    key: 'X-Frame-Options',
    detail: 'DENY — blocks clickjacking by refusing framing.',
  },
  {
    key: 'X-Content-Type-Options',
    detail: 'nosniff — stops MIME-type sniffing attacks.',
  },
  {
    key: 'Referrer-Policy',
    detail: 'strict-origin-when-cross-origin — limits cross-origin leak risk.',
  },
  {
    key: 'Permissions-Policy',
    detail: 'Camera, microphone, and geolocation stay off unless you opt in.',
  },
]

const snippet = `// next.config.ts
headers: [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // + HSTS, Referrer-Policy, Permissions-Policy
]`

export function SecuritySection() {
  const { copy, isCopied } = useCopyToClipboard()

  async function handleCopy() {
    const ok = await copy(snippet)
    if (ok) {
      toast.success('Snippet copied', {
        description:
          'Paste into next.config.ts and adjust CSP for your origins.',
      })
    } else {
      toast.error('Copy failed', {
        description: 'Clipboard permission may be blocked in this context.',
      })
    }
  }

  return (
    <section
      id="security"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <MotionBox variant="fadeUp" className="max-w-2xl">
          <p className="text-caption font-medium text-primary">01 — Security</p>
          <h2 className="mt-3 text-title text-foreground">
            Hardened responses by default.
          </h2>
          <p className="mt-4 text-body text-text-secondary">
            Every route inherits headers from{' '}
            <Tooltip>
              <TooltipTrigger asChild>
                <code className="cursor-help rounded bg-surface-raised px-1.5 py-0.5 text-[0.9em] text-foreground">
                  next.config.ts
                </code>
              </TooltipTrigger>
              <TooltipContent>
                Applied via Next.js headers() for /(.*)
              </TooltipContent>
            </Tooltip>
            . Expand a header below to see what it protects.
          </p>
        </MotionBox>

        <MotionBox variant="fadeUp" className="mt-10">
          <Accordion
            type="single"
            collapsible
            defaultValue="Content-Security-Policy"
          >
            {headers.map((header) => (
              <AccordionItem key={header.key} value={header.key}>
                <AccordionTrigger className="text-left font-mono text-sm hover:no-underline">
                  {header.key}
                </AccordionTrigger>
                <AccordionContent>{header.detail}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionBox>

        <MotionBox
          variant="fadeUp"
          className="relative mt-10 overflow-hidden rounded-lg border border-border bg-surface"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-caption text-text-muted">Example config</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              aria-label="Copy snippet"
            >
              {isCopied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {isCopied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-text-secondary">
            <code>{snippet}</code>
          </pre>
        </MotionBox>
      </div>
    </section>
  )
}
