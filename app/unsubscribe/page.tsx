"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnsubscribeContent() {
  const params = useSearchParams();
  const status = params.get('status');

  const getMessage = () => {
    switch (status) {
      case 'success':
        return { title: 'You have been unsubscribed', detail: 'You will no longer receive insights emails.' };
      case 'invalid':
        return { title: 'Invalid link', detail: 'This unsubscribe link is not valid.' };
      case 'error':
      default:
        return { title: 'Something went wrong', detail: 'Please try again later or contact support.' };
    }
  };

  const msg = getMessage();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f9fc] to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white border border-[#e8f1f7] rounded-2xl p-8 text-center">
          <h1 className="font-poppins text-3xl font-bold text-[#001f3f] mb-3">{msg.title}</h1>
          <p className="font-inter text-[#003366] mb-6">{msg.detail}</p>
          <Link href="/" className="px-5 py-2 bg-[#1ba9e8] text-white rounded-lg">Back to website</Link>
        </div>
      </div>
    </main>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-[#f5f9fc] to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white border border-[#e8f1f7] rounded-2xl p-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
