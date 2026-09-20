import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    if (process.env.NODE_ENV === 'development') {
      console.info('[api/vitals]', payload)
    }

    // Wire to your analytics provider here (Datadog, GA4, custom warehouse).
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
