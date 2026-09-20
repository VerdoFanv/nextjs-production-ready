'use client'

import { useCallback, useState } from 'react'

export function useCopyToClipboard(resetMs = 2000) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')

  const copy = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        setState('error')
        return false
      }

      try {
        await navigator.clipboard.writeText(text)
        setState('copied')
        window.setTimeout(() => setState('idle'), resetMs)
        return true
      } catch {
        setState('error')
        window.setTimeout(() => setState('idle'), resetMs)
        return false
      }
    },
    [resetMs],
  )

  return { copy, state, isCopied: state === 'copied' }
}
