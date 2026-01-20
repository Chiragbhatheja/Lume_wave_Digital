'use client';

import { useEffect, useState, useRef } from 'react';

export default function SubscriptionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollThreshold, setScrollThreshold] = useState(false);
  const [timeThreshold, setTimeThreshold] = useState(false);
  const hasShownToday = useRef(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if popup was shown today
  useEffect(() => {
    try {
      const lastShown = localStorage.getItem('subscriptionModalLastShown');
      const today = new Date().toDateString();
      
      if (lastShown === today) {
        hasShownToday.current = true;
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Timer - 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeThreshold(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll detection - 35%
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercent = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

      if (scrollPercent >= 35) {
        setScrollThreshold(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open modal when both thresholds are met
  useEffect(() => {
    if (scrollThreshold && timeThreshold && !hasShownToday.current) {
      setIsOpen(true);
      hasShownToday.current = true;
      try {
        localStorage.setItem('subscriptionModalLastShown', new Date().toDateString());
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [scrollThreshold, timeThreshold]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!consent) {
      setError('Please agree to the privacy policy.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setError(data?.error || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setEmail('');
        setConsent(false);
      }, 1500);
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative border border-[#f2f4f7]">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition"
          title="Close"
        >
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#1ba9e8]">READY TO GROW?</p>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] leading-tight">
              Subscribe for updates
            </h2>
            <p className="font-inter text-sm text-[#003366]">
              Get insights, tips, and exclusive content delivered to your inbox.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-xl bg-[#f0f7ff] border border-[#d9e9ff] p-4 text-center">
              <p className="font-poppins text-lg font-semibold text-[#0a66a9]">You&apos;re in!</p>
              <p className="font-inter text-sm text-[#00407a]">Check your email for the confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#001f3f]">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#e8f1f7] bg-[#f7f9fc] px-4 py-3 text-[#001f3f] placeholder-[#00407a]/50 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/50 outline-none"
                  placeholder="you@example.com"
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-[#003366]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#cbd5e1] text-[#1ba9e8] focus:ring-[#1ba9e8]"
                  disabled={isLoading}
                />
                <span>I agree to the Privacy Policy.</span>
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-[#1ba9e8] px-4 py-3 font-semibold text-white shadow-sm hover:bg-[#0a66a9] transition disabled:opacity-60"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          <p className="font-inter text-xs text-[#00407a]/60 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
