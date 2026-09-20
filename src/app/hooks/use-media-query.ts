'use client'

import { useCallback, useSyncExternalStore } from 'react'

function getServerSnapshot() {
  return false
}

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onStoreChange)
      return () => media.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches
  }, [query])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
