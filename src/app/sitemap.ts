import type { MetadataRoute } from 'next'

import { siteConfig } from '@/app/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-03-20T00:00:00.000Z')

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
