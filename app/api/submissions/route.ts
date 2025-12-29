import { NextResponse } from 'next/server';
import { getAllContactSubmissions } from '@/lib/db';

export async function GET() {
  try {
    const submissions = await getAllContactSubmissions();
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
