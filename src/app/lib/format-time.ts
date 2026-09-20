import {
  format as formatDateFns,
  formatDistanceToNow,
  formatRelative,
  isValid,
  parseISO,
  type Locale,
} from 'date-fns'
import { enUS, id as localeId } from 'date-fns/locale'

type DateInput = Date | string | number

const locales: Record<string, Locale> = {
  en: enUS,
  'en-US': enUS,
  id: localeId,
  'id-ID': localeId,
}

function toDate(value: DateInput): Date | null {
  if (value instanceof Date) return isValid(value) ? value : null
  if (typeof value === 'number') {
    const date = new Date(value)
    return isValid(date) ? date : null
  }
  const parsed = parseISO(value)
  if (isValid(parsed)) return parsed
  const fallback = new Date(value)
  return isValid(fallback) ? fallback : null
}

function resolveLocale(locale?: string): Locale {
  if (!locale) return enUS
  return locales[locale] ?? enUS
}

export function formatDate(
  value: DateInput,
  pattern = 'PPP',
  locale?: string,
): string {
  const date = toDate(value)
  if (!date) return ''
  return formatDateFns(date, pattern, { locale: resolveLocale(locale) })
}

export function formatRelativeTime(
  value: DateInput,
  locale?: string,
  options?: { addSuffix?: boolean },
): string {
  const date = toDate(value)
  if (!date) return ''
  return formatDistanceToNow(date, {
    addSuffix: options?.addSuffix ?? true,
    locale: resolveLocale(locale),
  })
}

export function formatRelativeDate(
  value: DateInput,
  base: DateInput = new Date(),
  locale?: string,
): string {
  const date = toDate(value)
  const baseDate = toDate(base)
  if (!date || !baseDate) return ''
  return formatRelative(date, baseDate, { locale: resolveLocale(locale) })
}

export function formatIntlDate(
  value: DateInput,
  locale = 'en-US',
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = toDate(value)
  if (!date) return ''
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    ...options,
  }).format(date)
}

export function formatIntlRelativeTime(
  value: DateInput,
  locale = 'en-US',
): string {
  const date = toDate(value)
  if (!date) return ''

  const diffMs = date.getTime() - Date.now()
  const abs = Math.abs(diffMs)

  const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 1000, unit: 'second' },
    { amount: 60_000, unit: 'minute' },
    { amount: 3_600_000, unit: 'hour' },
    { amount: 86_400_000, unit: 'day' },
    { amount: 604_800_000, unit: 'week' },
    { amount: 2_592_000_000, unit: 'month' },
    { amount: 31_536_000_000, unit: 'year' },
  ]

  let unit: Intl.RelativeTimeFormatUnit = 'year'
  let amount = Math.round(diffMs / 31_536_000_000)

  for (let i = 0; i < divisions.length; i++) {
    const current = divisions[i]
    const next = divisions[i + 1]
    if (!next || abs < next.amount) {
      unit = current.unit
      amount = Math.round(diffMs / current.amount)
      break
    }
  }

  return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
    amount,
    unit,
  )
}
