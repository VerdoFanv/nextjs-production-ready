import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export * from './format-time'
export * from './format-number'
export * from './json'
export * from './query'
export * from './url'
export * from './file'
export * from './sanitize'
