import { NextResponse } from 'next/server';
import { getSubscriberCount } from '@/lib/db';

export async function GET() {
  try {
    const count = await getSubscriberCount();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch subscriber count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriber count' },
      { status: 500 }
    );
  }
}
