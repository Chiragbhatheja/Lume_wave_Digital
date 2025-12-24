import { Metadata } from 'next';
import seoData from '@/data/seo.json';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export function getSEOData(page: string): SEOData | null {
  return (seoData as Record<string, SEOData>)[page] || null;
}

export function generateMetadata(page: string): Metadata {
  const seo = getSEOData(page);
  
  if (!seo) {
    return {
      title: 'LumeWave Digital',
      description: 'Digital Innovation Agency',
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        }
      ] : undefined,
      url: `${baseUrl}/${page === 'home' ? '' : page}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/${page === 'home' ? '' : page}`,
    },
  };
}

export function getAllSEOPages(): string[] {
  return Object.keys(seoData);
}
