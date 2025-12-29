'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function getOrCreateSessionId(): string | null {
  try {
    const key = 'analytics_session';
    let sid = localStorage.getItem(key);
    if (!sid) {
      sid = (crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      localStorage.setItem(key, sid);
    }
    return sid;
  } catch {
    return null;
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSentRef = useRef<string>('');

  useEffect(() => {
    // Respect user consent
    const consent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;
    if (consent === 'rejected') return;

    const isAdmin = pathname?.startsWith('/admin');
    if (isAdmin) return;

    const sid = getOrCreateSessionId();
    if (!sid) return;

    const qs = searchParams?.toString();
    const fullPath = qs ? `${pathname}?${qs}` : pathname || '/';

    if (lastSentRef.current === fullPath) return;
    lastSentRef.current = fullPath;

    const payload = {
      path: fullPath,
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      sessionId: sid,
    };

    // Fire and forget
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, [pathname, searchParams]);

  return null;
}
