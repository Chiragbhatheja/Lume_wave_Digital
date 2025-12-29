import { sql } from '@vercel/postgres';
import { Metadata } from 'next';
import seoData from '@/data/seo.json';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string | null;
  ogImage?: string | null;
}

async function getSEOFromDb(page: string): Promise<SEOData | null> {
  try {
    const { rows } = await sql`
      SELECT title, description, keywords, og_image
      FROM seo_entries
      WHERE page = ${page}
      LIMIT 1
    `;

    if (!rows[0]) return null;

    const row = rows[0];
    return {
      title: row.title,
      description: row.description,
      keywords: row.keywords ?? null,
      ogImage: row.og_image ?? null,
    };
  } catch (error) {
    console.error('Get SEO from DB failed:', error);
    return null;
  }
}

function getSEOFromFile(page: string): SEOData | null {
  return (seoData as Record<string, SEOData>)[page] || null;
}

export async function getSEOData(page: string): Promise<SEOData | null> {
  const fromDb = await getSEOFromDb(page);
  if (fromDb) return fromDb;
  return getSEOFromFile(page);
}

export async function generateMetadata(page: string): Promise<Metadata> {
  const seo = await getSEOData(page);
  
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
