import { NextRequest, NextResponse } from 'next/server';
import { getSendLogs, initDatabase } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await initDatabase();
    const { searchParams } = new URL(req.url);
    const campaignIdStr = searchParams.get('campaignId');
    const campaignId = campaignIdStr ? parseInt(campaignIdStr) : NaN;
    if (!Number.isFinite(campaignId)) {
      return NextResponse.json({ error: 'Invalid campaignId' }, { status: 400 });
    }
    const result = await getSendLogs(campaignId, 200);
    if (!result.success) {
      return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
    return NextResponse.json({ logs: result.rows });
  } catch (error) {
    console.error('Get logs error:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}
