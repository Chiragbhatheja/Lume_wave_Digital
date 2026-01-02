import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static core routes (no fragment URLs; Google ignores those).
  const routes = [
    '',
    '/about',
    '/services',
    '/services/business-os',
    '/services/growth-system-foundation',
    '/services/inbound-engine',
    '/projects',
    '/projects/brand-campaign',
    '/projects/ecommerce-platform',
    '/projects/founder-led-business-website',
    '/projects/internal-billing-ops',
    '/projects/mobile-app-launch',
    '/projects/saas-dashboard',
    '/projects/social-media-campaign-system',
    '/contact',
    '/privacy',
    '/terms',
    '/cookie-settings',
  ];

  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.6,
  }));
}
