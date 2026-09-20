const MIME_BY_EXT: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
  '.zip': 'application/zip',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes < 0) return ''
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  )
  const value = bytes / 1024 ** i
  return `${value.toFixed(i === 0 ? 0 : decimals)} ${units[i]}`
}

export function getExtension(filename: string): string {
  const base = filename.split(/[\\/]/).pop() ?? filename
  const index = base.lastIndexOf('.')
  if (index <= 0) return ''
  return base.slice(index).toLowerCase()
}

export function getFilename(path: string): string {
  return path.split(/[\\/]/).pop() ?? path
}

export function getBasename(path: string): string {
  const name = getFilename(path)
  const ext = getExtension(name)
  return ext ? name.slice(0, -ext.length) : name
}

export function getMimeType(filename: string): string {
  const ext = getExtension(filename)
  return MIME_BY_EXT[ext] ?? 'application/octet-stream'
}

export function sanitizeFilename(name: string): string {
  const base = getFilename(name)
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
    .replace(/^\.+/, '')
    .trim()
  return base || 'file'
}
