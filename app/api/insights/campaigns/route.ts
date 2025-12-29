import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, listInsightsCampaigns, saveInsightsCampaign } from '@/lib/db';

export async function GET() {
  try {
    await initDatabase();
    const data = await listInsightsCampaigns();
    return NextResponse.json({ campaigns: data });
  } catch (error) {
    console.error('Insights GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initDatabase();
    const body = await req.json();
    const result = await saveInsightsCampaign(body);
    if (!result.success) {
      const message = (result as any).error?.message || 'Failed to save campaign';
      return NextResponse.json({ error: message }, { status: 400 });
    }
    return NextResponse.json({ success: true, campaign: result.data });
  } catch (error) {
    console.error('Insights POST error:', error);
    return NextResponse.json({ error: 'Failed to save campaign' }, { status: 500 });
  }
}
