import Link from 'next/link'
import { siteConfig } from '@/app/config/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Fernando
          </p>
          <p className="mt-2 max-w-sm text-body text-sm text-text-secondary">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
          <a
            href="#security"
            className="transition-colors hover:text-foreground"
          >
            Security
          </a>
          <a href="#vitals" className="transition-colors hover:text-foreground">
            Performance
          </a>
          <a href="#seo" className="transition-colors hover:text-foreground">
            SEO
          </a>
          <span aria-hidden className="text-border-strong">
            ·
          </span>
          <Link href="/" className="transition-colors hover:text-foreground">
            © 2026
          </Link>
        </div>
      </div>
    </footer>
  )
}
