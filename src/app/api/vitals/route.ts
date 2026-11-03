import { NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit } from '@/app/lib/rate-limit'

const MAX_PAYLOAD_BYTES = 10 * 1024 // 10 KB

const vitalSchema = z.object({
  name: z.enum(['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']),
  value: z.number().nonnegative(),
  id: z.string().min(1).max(100),
  rating: z.enum(['good', 'needs-improvement', 'poor']).optional(),
  navigationType: z.string().max(50).optional(),
})

function isAllowedOrigin(request: Request): boolean {
  const secFetchSite = request.headers.get('sec-fetch-site')
  if (secFetchSite && secFetchSite === 'cross-site') {
    return false
  }

  const origin = request.headers.get('origin')
  if (!origin) {
    return true
  }

  try {
    const originHost = new URL(origin).host
    const host = request.headers.get('host')
    return !host || originHost === host
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  // 1. Origin / CSRF Check
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // 2. Rate Limiting by Client IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIp =
    forwardedFor?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  const rateLimit = checkRateLimit(clientIp, { limit: 60, windowMs: 60_000 })
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.reset),
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.reset),
        },
      },
    )
  }

  // 3. Payload size check
  const contentLength = request.headers.get('content-length')
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  // 4. Safe parsing and schema validation
  try {
    const text = await request.text()
    if (text.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    }

    const json = JSON.parse(text)
    const result = vitalSchema.safeParse(json)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid metric payload', details: result.error.flatten() },
        { status: 400 },
      )
    }

    const payload = result.data

    if (process.env.NODE_ENV === 'development') {
      console.info('[api/vitals]', payload)
    }

    return NextResponse.json(
      { ok: true },
      {
        headers: {
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      },
    )
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}
