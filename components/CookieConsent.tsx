'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
      // Enable analytics by default
      loadAnalytics();
    } else if (cookieConsent === 'accepted') {
      // User already accepted, load analytics
      loadAnalytics();
    }
  }, []);

  const loadAnalytics = () => {
    // Load Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID) {
      loadGoogleAnalytics();
    }

    // Load Meta Pixel
    if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
      loadMetaPixel();
    }
  };

  const loadGoogleAnalytics = () => {
    if (typeof window === 'undefined') return;

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) {
      console.warn('NEXT_PUBLIC_GA_ID not configured');
      return;
    }

    // Add gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, {
      page_path: window.location.pathname,
    });
  };

  const loadMetaPixel = () => {
    if (typeof window === 'undefined') return;

    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixelId) {
      console.warn('NEXT_PUBLIC_META_PIXEL_ID not configured');
      return;
    }

    // Load Facebook Pixel
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />
    `;
    document.body.appendChild(noscript);
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    document.cookie = 'cookieConsent=accepted; path=/; max-age=31536000'; // 1 year
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    document.cookie = 'cookieConsent=rejected; path=/; max-age=31536000';
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8f1f7] shadow-lg z-50 px-4 py-3 md:px-6 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Message */}
        <p className="font-inter text-sm text-[#003366]">
          We use analytics to improve your experience.{' '}
          <Link href="/cookie-settings" className="text-[#1ba9e8] hover:underline font-semibold">
            Manage cookies
          </Link>
        </p>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm text-[#003366] font-semibold rounded-lg hover:bg-[#f0f7ff] transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-[#1ba9e8] text-white font-semibold rounded-lg hover:bg-[#0a66a9] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
