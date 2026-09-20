'use client'

import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowDownRight } from 'lucide-react'
import { MotionBox } from '@/app/components/ui/motion'
import { Button } from '@/app/components/ui/button'
import { useReducedMotion } from '@/app/hooks'

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-[min(100svh,52rem)] flex-col justify-end overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_10%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_10%_80%,color-mix(in_oklab,var(--info)_10%,transparent),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6">
        <MotionBox
          variant="fadeUp"
          reduceMotion={reduceMotion}
          className="max-w-2xl"
        >
          <p className="mb-4 text-caption font-medium text-primary">
            Fernando · Software Engineer
          </p>
          <h1 className="text-display text-foreground">
            Ship production Next.js with confidence.
          </h1>
          <p className="mt-5 max-w-xl text-body text-text-secondary">
            Reference stack for secure headers, measurable Core Web Vitals, and
            crawlable SEO
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#security">
                Explore the stack
                <ArrowDownRight className="size-4" />
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() =>
                toast.message('Stack check', {
                  description:
                    'Security headers, web vitals reporting, and SEO metadata are wired in this project.',
                })
              }
            >
              Quick status
            </Button>
          </div>
        </MotionBox>

        {!reduceMotion ? (
          <motion.div
            className="mt-14 flex items-center gap-3 text-caption text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            <motion.span
              className="inline-block size-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            Scroll for security, performance, and SEO
          </motion.div>
        ) : (
          <p className="mt-14 text-caption text-text-muted">
            Scroll for security, performance, and SEO
          </p>
        )}
      </div>
    </section>
  )
}
