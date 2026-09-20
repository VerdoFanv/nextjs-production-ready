import type { Metadata } from 'next'
import { siteConfig } from '@/app/config/site'
import { Hero } from './_components/hero'
import { JsonLd } from './_components/json-ld'
import { SecuritySection } from './_components/security-section'
import { SeoSection } from './_components/seo-section'
import { SiteFooter } from './_components/site-footer'
import { SiteHeader } from './_components/site-header'
import { WebVitalsReporter } from './_components/web-vitals-reporter'
import { WebVitalsSection } from './_components/web-vitals-section'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'production ready',
    'software engineer',
    'Core Web Vitals',
    'CSP',
    'SEO',
  ],
  authors: [{ name: 'Fernando' }],
  creator: 'Fernando',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <WebVitalsReporter />
      <SiteHeader />
      <Hero />
      <SecuritySection />
      <WebVitalsSection />
      <SeoSection />
      <SiteFooter />
    </>
  )
}
