export function getQueryParam(
  source: URLSearchParams | string | null | undefined,
  key: string,
): string | null {
  if (!source) return null
  const params =
    typeof source === 'string'
      ? new URLSearchParams(source.startsWith('?') ? source.slice(1) : source)
      : source
  const value = params.get(key)
  return value === null || value === '' ? null : value
}

export function toQueryString(
  params: Record<string, string | number | boolean | null | undefined>,
): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === '') continue
    search.set(key, String(value))
  }
  const result = search.toString()
  return result ? `?${result}` : ''
}

export function mergeQueryParams(
  current: string | URLSearchParams,
  next: Record<string, string | number | boolean | null | undefined>,
): string {
  const params =
    typeof current === 'string'
      ? new URLSearchParams(
          current.startsWith('?') ? current.slice(1) : current,
        )
      : new URLSearchParams(current)

  for (const [key, value] of Object.entries(next)) {
    if (value === null || value === undefined || value === '') {
      params.delete(key)
    } else {
      params.set(key, String(value))
    }
  }

  const result = params.toString()
  return result ? `?${result}` : ''
}
