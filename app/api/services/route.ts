import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.services);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedService = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    const index = data.services.findIndex((s: { id: string }) => s.id === updatedService.id);
    if (index !== -1) {
      // Preserve slug if provided in storage; if missing, generate from title
      const slugify = (text: string) =>
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

      const existing = data.services[index];
      const nextSlug = updatedService.slug || existing.slug || slugify(updatedService.title || existing.title);

      data.services[index] = {
        ...existing,
        ...updatedService,
        slug: nextSlug,
      };

      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      return NextResponse.json(data.services[index]);
    }
    
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
