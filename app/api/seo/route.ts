import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getSeoEntries, initDatabase, upsertSeoEntries, type SeoEntry } from '@/lib/db';

type ClientSeoEntry = {
  title: string;
  description: string;
  keywords?: string | null;
  ogImage?: string | null;
};

type ClientSeoMap = Record<string, ClientSeoEntry>;

/**
 * Normalize DB rows to the JSON shape the admin UI expects
 */
function toClientShape(dbMap: Record<string, SeoEntry>): ClientSeoMap {
  const out: ClientSeoMap = {};
  for (const [page, entry] of Object.entries(dbMap)) {
    out[page] = {
      title: entry.title,
      description: entry.description,
      keywords: entry.keywords || '',
      ogImage: entry.og_image || '',
    };
  }
  return out;
}

export async function GET() {
  try {
    await initDatabase();

    // Read from database first
    const dbEntries = await getSeoEntries();

    if (Object.keys(dbEntries).length > 0) {
      return NextResponse.json(toClientShape(dbEntries));
    }

    // Fallback: seed from existing JSON file on first run
    const filePath = path.join(process.cwd(), 'data', 'seo.json');
      const fileContents = await fs.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(fileContents) as ClientSeoMap;

    await upsertSeoEntries(
      Object.fromEntries(
          Object.entries(jsonData).map(([page, value]) => [page, {
            title: value.title,
            description: value.description,
            keywords: value.keywords,
            og_image: value.ogImage,
          }])
      )
    );

    const seeded = await getSeoEntries();
    return NextResponse.json(toClientShape(seeded));
  } catch (error) {
    console.error('Error reading SEO data:', error);
    return NextResponse.json({ error: 'Failed to read SEO data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    const data = await request.json() as unknown;

    // Validate data structure
    if (typeof data !== 'object' || data === null) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Persist to Postgres
    const prepared: Record<string, Partial<SeoEntry>> = {};
    for (const [page, value] of Object.entries(data as ClientSeoMap)) {
      if (!value?.title || !value?.description) {
        continue;
      }
      prepared[page] = {
        title: value.title,
        description: value.description,
        keywords: value.keywords ?? null,
        og_image: value.ogImage ?? null,
      };
    }

    await upsertSeoEntries(prepared);

    return NextResponse.json({ success: true, message: 'SEO data updated successfully' });
  } catch (error) {
    console.error('Error updating SEO data:', error);
    return NextResponse.json({ error: 'Failed to update SEO data' }, { status: 500 });
  }
}
