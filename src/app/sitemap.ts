import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.SITE_URL?.replace(/\/$/, '');
  if (!url) return [];
  return [
    { url, priority: 1 },
    ...services.map(({ slug }) => ({ url: `${url}/dich-vu/${slug}`, priority: 0.8 })),
    { url: `${url}/quyen-rieng-tu`, priority: 0.3 },
  ];
}
