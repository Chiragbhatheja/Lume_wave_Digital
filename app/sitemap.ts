import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static core routes. If you later expose APIs for projects/services, we can extend this dynamically.
  const routes = [
    '',
    '/about',
    '/#services',
    '/#projects',
    '/#contact',
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
