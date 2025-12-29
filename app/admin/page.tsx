'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalSubmissions: number;
  totalSubscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [submissionsRes, subscribersRes] = await Promise.all([
        fetch('/api/submissions'),
        fetch('/api/subscribers-count'),
      ]);

      const submissions = submissionsRes.ok ? await submissionsRes.json() : [];
      const subscribersData = subscribersRes.ok ? await subscribersRes.json() : { count: 0 };

      setStats({
        totalSubmissions: submissions.length,
        totalSubscribers: subscribersData.count || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-poppins text-4xl font-bold text-[#001f3f] mb-2">
          Dashboard
        </h1>
        <p className="font-inter text-[#003366]">
          Welcome to your admin control center
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-6 border border-[#e8f1f7] animate-pulse"
            >
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Total Submissions */}
          <div className="bg-gradient-to-br from-[#e6f7ff] to-[#eef0ff] rounded-xl shadow-sm p-6 border border-[#1ba9e8]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-inter text-sm text-[#00407a] uppercase tracking-[0.1em] font-semibold mb-2">
                  Total Submissions
                </p>
                <p className="font-poppins text-4xl font-bold text-[#001f3f]">
                  {stats?.totalSubmissions || 0}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#1ba9e8]/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#1ba9e8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <Link
              href="/admin/submissions"
              className="mt-4 inline-flex items-center text-[#1ba9e8] hover:text-[#0a66a9] font-semibold text-sm transition-colors"
            >
              View all →
            </Link>
          </div>

          {/* Total Subscribers */}
          <div className="bg-gradient-to-br from-[#f0e6ff] to-[#f5f0ff] rounded-xl shadow-sm p-6 border border-[#9333ea]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-inter text-sm text-[#6b21a8] uppercase tracking-[0.1em] font-semibold mb-2">
                  Total Subscribers
                </p>
                <p className="font-poppins text-4xl font-bold text-[#001f3f]">
                  {stats?.totalSubscribers || 0}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#9333ea]/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#9333ea]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <Link
              href="/admin/subscribers"
              className="mt-4 inline-flex items-center text-[#9333ea] hover:text-[#7e22ce] font-semibold text-sm transition-colors"
            >
              View all →
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Submissions Card */}
        <Link
          href="/admin/submissions"
          className="group bg-white rounded-xl shadow-sm p-6 border border-[#e8f1f7] hover:border-[#1ba9e8] hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#e6f7ff] flex items-center justify-center group-hover:bg-[#1ba9e8]/20 transition-colors">
              <svg
                className="w-6 h-6 text-[#1ba9e8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <svg className="w-5 h-5 text-[#00407a]/30 group-hover:text-[#1ba9e8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="font-poppins font-bold text-[#001f3f] mb-2 group-hover:text-[#1ba9e8] transition-colors">
            Contact Submissions
          </h3>
          <p className="font-inter text-sm text-[#003366]">
            View and manage all form submissions
          </p>
        </Link>

        {/* Subscribers Card */}
        <Link
          href="/admin/subscribers"
          className="group bg-white rounded-xl shadow-sm p-6 border border-[#e8f1f7] hover:border-[#9333ea] hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#f5e6ff] flex items-center justify-center group-hover:bg-[#9333ea]/20 transition-colors">
              <svg
                className="w-6 h-6 text-[#9333ea]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20a9 9 0 0118 0v2h2v-2a11 11 0 00-20 0v2h2v-2z"
                />
              </svg>
            </div>
            <svg className="w-5 h-5 text-[#00407a]/30 group-hover:text-[#9333ea] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="font-poppins font-bold text-[#001f3f] mb-2 group-hover:text-[#9333ea] transition-colors">
            Subscribers
          </h3>
          <p className="font-inter text-sm text-[#003366]">
            View and export all newsletter subscribers
          </p>
        </Link>

        {/* SEO Card */}
        <Link
          href="/admin/seo"
          className="group bg-white rounded-xl shadow-sm p-6 border border-[#e8f1f7] hover:border-[#1ba9e8] hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#e6f7ff] flex items-center justify-center group-hover:bg-[#1ba9e8]/20 transition-colors">
              <svg
                className="w-6 h-6 text-[#1ba9e8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <svg className="w-5 h-5 text-[#00407a]/30 group-hover:text-[#1ba9e8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="font-poppins font-bold text-[#001f3f] mb-2 group-hover:text-[#1ba9e8] transition-colors">
            SEO Management
          </h3>
          <p className="font-inter text-sm text-[#003366]">
            Manage SEO metadata for all pages
          </p>
        </Link>

        {/* Documentation Card */}
        <a
          href="/QUICK_START.md"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-xl shadow-sm p-6 border border-[#e8f1f7] hover:border-[#1ba9e8] hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#fff5e6] flex items-center justify-center group-hover:bg-[#ffa500]/20 transition-colors">
              <svg
                className="w-6 h-6 text-[#ffa500]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"
                />
              </svg>
            </div>
            <svg className="w-5 h-5 text-[#00407a]/30 group-hover:text-[#ffa500] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="font-poppins font-bold text-[#001f3f] mb-2 group-hover:text-[#ffa500] transition-colors">
            Documentation
          </h3>
          <p className="font-inter text-sm text-[#003366]">
            View setup and configuration guides
          </p>
        </a>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-gradient-to-r from-[#e6f7ff] to-[#eef0ff] rounded-xl border border-[#1ba9e8]/20 p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-[#1ba9e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-poppins font-bold text-[#001f3f] mb-1">
              Admin Panel Features
            </h3>
            <p className="font-inter text-sm text-[#003366]">
              This admin panel is completely separate from your main website, ensuring zero impact on performance. All submissions and SEO data is managed securely on the backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
