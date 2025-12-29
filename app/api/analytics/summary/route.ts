import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsSummary, initDatabase } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await initDatabase();
    const { searchParams } = new URL(req.url);
    const daysParam = searchParams.get('days');
    const days = daysParam ? parseInt(daysParam) : 30;

    const result = await getAnalyticsSummary(Number.isFinite(days) ? days : 30);
    if (!result.success) {
      const message = (result as any).error?.message || 'Failed to get summary';
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Analytics summary error:', error);
    const message = (error as Error)?.message || 'Failed to get summary';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
