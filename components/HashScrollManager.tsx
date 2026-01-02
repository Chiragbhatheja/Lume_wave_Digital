'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

function smoothScrollTo(id: string) {
  const el = typeof document !== 'undefined' ? document.getElementById(id) : null;
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function HashScrollManager() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== '/') return;

    // Handle clicks on in-page hash links so the URL bar stays clean.
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Find the nearest anchor element.
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      if (!href.includes('#')) return;

      const hash = href.split('#')[1];
      if (!hash) return;

      // If we are already on home, intercept and smooth-scroll without leaving hash.
      event.preventDefault();
      smoothScrollTo(hash);
      history.replaceState(null, '', '/');
    };

    // Handle direct hash visits or back/forward navigating to a hash.
    const onHashChange = () => {
      const hash = window.location.hash?.slice(1);
      if (!hash) return;
      smoothScrollTo(hash);
      history.replaceState(null, '', '/');
    };

    // If the page loaded with a hash, process it once.
    onHashChange();

    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [pathname, router]);

  return null;
}
