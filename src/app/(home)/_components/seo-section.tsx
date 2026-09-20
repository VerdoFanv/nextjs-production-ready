'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion'
import { MotionBox } from '@/app/components/ui/motion'
import { siteImages } from '@/app/config/images'
import { useReducedMotion } from '@/app/hooks'

const seoTopics = [
  {
    id: 'metadata',
    label: 'Metadata API',
    value:
      'Title template, description, canonical, Open Graph, and Twitter cards live on the route — not in a late client effect.',
  },
  {
    id: 'alt',
    label: 'Descriptive alt text',
    value:
      'Content images describe the scene for assistive tech and image search. Filenames never substitute for alt.',
  },
  {
    id: 'crawl',
    label: 'sitemap.xml & robots.txt',
    value:
      'Generated from siteConfig so crawlers get an explicit allow list and sitemap pointer.',
  },
  {
    id: 'jsonld',
    label: 'JSON-LD',
    value:
      'Person schema is embedded on the home route for richer search understanding.',
  },
]

export function SeoSection() {
  const reduceMotion = useReducedMotion()
  const primary = siteImages.ssrArchitecture

  return (
    <section
      id="seo"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <MotionBox variant="fadeUp" className="max-w-2xl">
          <p className="text-caption font-medium text-primary">03 — SEO</p>
          <h2 className="mt-3 text-title text-foreground">
            Discoverable from the first render.
          </h2>
          <p className="mt-4 text-body text-text-secondary">
            Server HTML, honest social previews, and imagery that supports the
            topic — metadata first, decoration second.
          </p>
        </MotionBox>

        <MotionBox
          variant="fadeUp"
          className="mt-10 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="order-2 min-w-0 lg:order-1">
            <Accordion type="single" collapsible defaultValue="metadata">
              {seoTopics.map((topic) => (
                <AccordionItem key={topic.id} value={topic.id}>
                  <AccordionTrigger className="text-left text-sm hover:no-underline">
                    {topic.label}
                  </AccordionTrigger>
                  <AccordionContent>{topic.value}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <figure className="order-1 min-w-0 lg:order-2">
            <motion.div
              className="relative aspect-square overflow-hidden bg-surface-raised"
              whileHover={reduceMotion ? undefined : { scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={primary.src}
                alt={primary.alt}
                width={primary.width}
                height={primary.height}
                sizes="(max-width: 1024px) 100vw, 520px"
                quality={80}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <figcaption className="mt-3 text-body text-sm text-text-secondary">
              SSR delivers indexable HTML first — imagery supports the story.
            </figcaption>
          </figure>
        </MotionBox>
      </div>
    </section>
  )
}
