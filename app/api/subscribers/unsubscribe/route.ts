import { NextRequest, NextResponse } from 'next/server';
import { setSubscriberUnsubscribed } from '@/lib/db';
import crypto from 'crypto';

function makeToken(email: string) {
  const secret = process.env.UNSUBSCRIBE_SECRET || 'dev-secret';
  return crypto.createHmac('sha256', secret).update(email.toLowerCase()).digest('hex');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = (searchParams.get('email') || '').trim().toLowerCase();
    const token = searchParams.get('token') || '';

    if (!email || !token) {
      return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url));
    }

    const expected = makeToken(email);
    if (token !== expected) {
      return NextResponse.redirect(new URL('/unsubscribe?status=invalid', req.url));
    }

    const res = await setSubscriberUnsubscribed(email, true);
    if (!res.success) {
      return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url));
    }

    return NextResponse.redirect(new URL('/unsubscribe?status=success', req.url));
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url));
  }
}
