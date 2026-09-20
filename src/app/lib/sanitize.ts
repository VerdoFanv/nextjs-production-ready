import { type Config } from 'dompurify'
import DOMPurify from 'isomorphic-dompurify'

type SanitizeOptions = {
  allowRichText?: boolean
}

const RICH_TEXT_CONFIG: Config = {
  ALLOWED_TAGS: [
    'a',
    'b',
    'strong',
    'i',
    'em',
    'u',
    'p',
    'br',
    'ul',
    'ol',
    'li',
    'code',
    'pre',
    'blockquote',
    'span',
  ],
  ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class'],
  ALLOW_DATA_ATTR: false,
}

const STRICT_CONFIG: Config = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
}

export function sanitizeHtml(dirty: string, options?: SanitizeOptions): string {
  return DOMPurify.sanitize(
    dirty,
    options?.allowRichText ? RICH_TEXT_CONFIG : STRICT_CONFIG,
  )
}

export function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
