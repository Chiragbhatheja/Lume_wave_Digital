'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function MessagesAdmin() {
  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-[#003366] hover:text-[#1ba9e8]">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-[#001f3f]">Contact Messages</h1>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-[#001f3f] mb-3">Email Integration Active</h2>
            <p className="text-gray-600 mb-4">
              Your contact form is configured to send submissions directly to your email: 
              <strong className="text-[#1ba9e8]"> info@lumewavedigital.com</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              All contact form submissions will be delivered to your inbox. Check your email for new inquiries!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Future Enhancement</p>
              <p className="text-sm text-blue-800">
                To store messages in the admin panel, you can integrate a database solution like Supabase or MongoDB to capture form submissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
