import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, insertAnalyticsEvent } from '@/lib/db';

function isBotUserAgent(ua?: string | null) {
  if (!ua) return false;
  const pattern = /(bot|crawler|spider|crawling|google|bing|yahoo|duckduck|baidu|yandex|sogou|facebook|slurp|linkedin|meta|telegram|whatsapp|discord|preview)/i;
  return pattern.test(ua);
}

export async function POST(req: NextRequest) {
  try {
    await initDatabase();

    const body = await req.json();
    const path = typeof body?.path === 'string' ? body.path : '';
    const sessionId = typeof body?.sessionId === 'string' ? body.sessionId : '';
    const referrerFromBody = typeof body?.referrer === 'string' ? body.referrer : undefined;

    if (!path || !sessionId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') || undefined;
    const country = req.headers.get('x-vercel-ip-country') || req.headers.get('x-country') || undefined;
    const refererHeader = req.headers.get('referer') || undefined;
    const referrer = referrerFromBody || refererHeader;

    const isBot = isBotUserAgent(userAgent);

    await insertAnalyticsEvent({
      path,
      session_id: sessionId,
      referrer: referrer ?? null,
      user_agent: userAgent ?? null,
      country: country ?? null,
      is_bot: isBot,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track analytics error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}
