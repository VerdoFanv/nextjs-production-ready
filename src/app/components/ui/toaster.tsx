'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

export function Toaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-surface group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-foreground',
          cancelButton:
            'group-[.toast]:bg-surface-raised group-[.toast]:text-muted',
        },
      }}
      {...props}
    />
  )
}
