const DANGEROUS_PROTOCOLS = /^(javascript|data|vbscript):/i

/**
 * Validate and normalize a URL. Returns null for invalid / dangerous schemes.
 * Relative paths starting with `/` are allowed when `allowRelative` is true.
 */
export function safeUrl(
  input: string | null | undefined,
  options?: {
    allowRelative?: boolean
    allowedProtocols?: string[]
  },
): string | null {
  if (!input) return null
  const trimmed = input.trim()
  if (!trimmed) return null

  if (DANGEROUS_PROTOCOLS.test(trimmed)) return null

  const allowRelative = options?.allowRelative ?? true
  const allowed = options?.allowedProtocols ?? ['http:', 'https:', 'mailto:']

  if (allowRelative && trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed
  }

  try {
    const url = new URL(trimmed)
    if (!allowed.includes(url.protocol)) return null
    return url.toString()
  } catch {
    return null
  }
}

export function isExternalUrl(input: string): boolean {
  try {
    const url = new URL(input)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
