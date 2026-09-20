'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MotionBox } from '@/app/components/ui/motion'
import { Progress } from '@/app/components/ui/progress'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { siteImages } from '@/app/config/images'
import { useReducedMotion } from '@/app/hooks'

const vitals = [
  {
    id: 'lcp',
    metric: 'LCP',
    target: '< 2.5s',
    progress: 88,
    practice:
      'Use next/image with priority only for the true above-the-fold candidate, plus an honest sizes hint.',
    image: siteImages.performanceOptimization,
  },
  {
    id: 'inp',
    metric: 'INP',
    target: '< 200ms',
    progress: 92,
    practice:
      'Keep first paint lean — lazy below-fold media, hydrate only interactive islands.',
    image: siteImages.browserDevtools,
  },
  {
    id: 'cls',
    metric: 'CLS',
    target: '< 0.1',
    progress: 96,
    practice:
      'Reserve space with width/height or aspect-ratio before decode. No layout jump on paint.',
    image: siteImages.webAnalytics,
  },
]

export function WebVitalsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="vitals"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <MotionBox variant="fadeUp" className="max-w-2xl">
          <p className="text-caption font-medium text-primary">
            02 — Core Web Vitals
          </p>
          <h2 className="mt-3 text-title text-foreground">
            Performance you can measure.
          </h2>
          <p className="mt-4 text-body text-text-secondary">
            Switch a metric to see the matching practice and asset. Field data
            flows through{' '}
            <Tooltip>
              <TooltipTrigger asChild>
                <code className="cursor-help rounded bg-surface-raised px-1.5 py-0.5 text-[0.9em] text-foreground">
                  useReportWebVitals
                </code>
              </TooltipTrigger>
              <TooltipContent>
                Logs in dev · beacons to /api/vitals in prod
              </TooltipContent>
            </Tooltip>
            .
          </p>
        </MotionBox>

        <MotionBox variant="fadeUp" className="mt-10">
          <Tabs defaultValue="lcp">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              {vitals.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="rounded-md border border-transparent px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-surface data-[state=active]:shadow-none"
                >
                  {item.metric}
                </TabsTrigger>
              ))}
            </TabsList>

            {vitals.map((item) => (
              <TabsContent key={item.id} value={item.id} className="mt-8">
                <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                  <figure className="min-w-0">
                    <motion.div
                      className="relative aspect-square overflow-hidden bg-surface-raised"
                      whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        sizes="(max-width: 1024px) 100vw, 520px"
                        quality={80}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                    <figcaption className="mt-3 text-caption text-text-muted">
                      CLS-safe {item.image.width}×{item.image.height} ·
                      responsive sizes · lazy below the fold
                    </figcaption>
                  </figure>

                  <div className="min-w-0 lg:pt-2">
                    <p className="text-caption text-text-muted">
                      {item.metric} budget
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                      {item.target}
                    </p>
                    <p className="mt-4 text-body text-text-secondary">
                      {item.practice}
                    </p>
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between text-caption text-text-muted">
                        <span>Example health</span>
                        <span className="text-foreground tabular-nums">
                          {item.progress}%
                        </span>
                      </div>
                      <Progress value={item.progress} />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </MotionBox>
      </div>
    </section>
  )
}
