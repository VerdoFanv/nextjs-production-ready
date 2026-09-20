import { siteConfig } from '@/app/config/site'

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fernando',
    jobTitle: 'Software Engineer',
    url: siteConfig.url,
    description: siteConfig.description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
