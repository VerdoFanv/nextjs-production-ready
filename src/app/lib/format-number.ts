type NumberInput = number | string | null | undefined

function toNumber(value: NumberInput): number | null {
  if (value === null || value === undefined || value === '') return null
  const num = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(num) ? num : null
}

export function formatCurrency(
  value: NumberInput,
  currency = 'IDR',
  locale = 'id-ID',
  options?: Intl.NumberFormatOptions,
): string {
  const num = toNumber(value)
  if (num === null) return ''
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
    ...options,
  }).format(num)
}

export function formatPercent(
  value: NumberInput,
  locale = 'en-US',
  options?: Intl.NumberFormatOptions & { fromRatio?: boolean },
): string {
  const num = toNumber(value)
  if (num === null) return ''
  const { fromRatio = true, ...intlOptions } = options ?? {}
  const normalized = fromRatio ? num : num / 100
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 2,
    ...intlOptions,
  }).format(normalized)
}

export function formatNumber(
  value: NumberInput,
  locale = 'en-US',
  options?: Intl.NumberFormatOptions,
): string {
  const num = toNumber(value)
  if (num === null) return ''
  return new Intl.NumberFormat(locale, options).format(num)
}
