'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[web-vital] ${metric.name}:`, metric.value, metric)
    }

    if (process.env.NODE_ENV === 'production') {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: 'rating' in metric ? metric.rating : undefined,
        navigationType:
          'navigationType' in metric ? metric.navigationType : undefined,
      })

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/vitals', body)
      }
    }
  })

  return null
}
