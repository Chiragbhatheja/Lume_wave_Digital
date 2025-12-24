import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'seo.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading SEO data:', error);
    return NextResponse.json({ error: 'Failed to read SEO data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'seo.json');
    
    // Validate data structure
    if (typeof data !== 'object' || data === null) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Write to file with pretty formatting
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'SEO data updated successfully' });
  } catch (error) {
    console.error('Error updating SEO data:', error);
    return NextResponse.json({ error: 'Failed to update SEO data' }, { status: 500 });
  }
}
