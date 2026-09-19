import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const enforceCsp = process.env.CSP_ENFORCE === 'true';

const csp = [
  "default-src 'self'",
  ["script-src 'self'"].join(' '),
  "style-src 'self' 'unsafe-inline'",
  ["img-src 'self' data: blob:"].filter(Boolean).join(' '),
  "font-src 'self'",
  ["connect-src 'self'"].filter(Boolean).join(' '),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
]
  .join('; ')
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  {
    key: enforceCsp
      ? 'Content-Security-Policy'
      : 'Content-Security-Policy-Report-Only',
    value: csp,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
