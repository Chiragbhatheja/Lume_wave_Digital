'use client';

import { useState } from 'react';

export default function SubscriptionForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
          setEmail('');
          setSubmitted(false);
        }, 2000);
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Error submitting subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setEmail('');
    setSubmitted(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-2 bg-[#1ba9e8] text-white font-semibold rounded-lg hover:bg-[#0a66a9] transition-colors shadow-sm hover:shadow-md"
      >
        Get Insights
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#00407a]/60 hover:text-[#001f3f] transition-colors"
            >
              <svg
                className="w-6 h-6"
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

            {submitted ? (
              <div className="text-center py-8">
                <div className="mb-4 text-4xl">✓</div>
                <h3 className="font-poppins text-xl font-bold text-[#001f3f] mb-2">
                  You&apos;re in!
                </h3>
                <p className="font-inter text-sm text-[#003366]">
                  Check your email for insights on clarity, inbound systems, and automation.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-poppins text-2xl font-bold text-[#001f3f] mb-2">
                  Get Insights
                </h3>
                <p className="font-inter text-sm text-[#003366] mb-6 leading-relaxed">
                  Occasional insights on building clarity, inbound systems, and automation shared with founders who want growth without chaos.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-[#f7f9fc] border border-[#e8f1f7] text-[#001f3f] placeholder-[#00407a]/50 focus:outline-none focus:ring-2 focus:ring-[#1ba9e8] focus:border-transparent transition-all disabled:opacity-50"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-[#1ba9e8] text-white font-semibold rounded-lg hover:bg-[#0a66a9] transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Get Insights'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
