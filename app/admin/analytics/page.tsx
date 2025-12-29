"use client";

import { useEffect, useState } from 'react';

type Summary = {
  pageviews: number;
  visitors: number;
  bots: number;
  topPages: { path: string; views: number }[];
};

// Map paths to friendly page names
function getPageName(path: string): string {
  const mapping: Record<string, string> = {
    '/': 'Homepage',
    '/about': 'About',
    '/contact': 'Contact',
    '/privacy': 'Privacy Policy',
    '/terms': 'Terms of Service',
    '/cookie-settings': 'Cookie Settings',
    '/services': 'Services',
    '/projects': 'Projects',
  };

  // Check exact match
  if (mapping[path]) return mapping[path];

  // Check if it starts with a known path
  for (const [key, value] of Object.entries(mapping)) {
    if (key !== '/' && path.startsWith(key)) {
      const rest = path.slice(key.length);
      return `${value}${rest}`;
    }
  }

  // Default: capitalize and format the path
  return path
    .split('/')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' > ') || 'Homepage';
}

export default function AnalyticsAdminPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const load = async (d: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/analytics/summary?days=${d}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load');
      setSummary(data as Summary);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh polling
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      load(days);
    }, 10000); // 10s
    return () => clearInterval(id);
  }, [autoRefresh, days]);

  const handleDaysChange = (d: number) => {
    setDays(d);
    load(d);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-poppins text-4xl font-bold text-[#001f3f] mb-2">Analytics</h1>
        <p className="font-inter text-[#003366]">SEO observers (bots), visitors, and pageviews overview</p>
      </div>

      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <span className="font-inter text-sm text-[#003366]">Period:</span>
        {[7, 14, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => handleDaysChange(d)}
            className={`px-3 py-1.5 rounded-md text-sm font-inter border ${
              days === d ? 'bg-[#1ba9e8] text-white border-[#1ba9e8]' : 'bg-white text-[#003366] border-[#e8f1f7] hover:bg-[#f5f9fc]'
            }`}
          >
            Last {d}d
          </button>
        ))}

        <div className="mx-3 h-5 w-px bg-[#e8f1f7] hidden md:block" />

        <button
          onClick={() => setAutoRefresh((v) => !v)}
          className={`px-3 py-1.5 rounded-md text-sm font-inter border ${
            autoRefresh ? 'bg-[#e6f7ff] text-[#0a66a9] border-[#bfe7ff]' : 'bg-white text-[#003366] border-[#e8f1f7]'
          }`}
          title="Toggle auto-refresh"
        >
          {autoRefresh ? 'Auto-refresh: On' : 'Auto-refresh: Off'}
        </button>

        <button
          onClick={() => load(days)}
          className="px-3 py-1.5 rounded-md text-sm font-inter border bg-white text-[#003366] border-[#e8f1f7] hover:bg-[#f5f9fc]"
          title="Refresh now"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1ba9e8]"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm font-inter mb-4">
          {error}
        </div>
      )}

      {!loading && summary && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#e8f1f7] p-5">
              <p className="font-inter text-sm text-[#00407a]/70">Visitors</p>
              <p className="font-poppins text-4xl font-bold text-[#001f3f] mt-1">{summary.visitors}</p>
              <p className="font-inter text-xs text-[#00407a]/60 mt-2">Unique sessions</p>
            </div>
            <div className="bg-white rounded-xl border border-[#e8f1f7] p-5">
              <p className="font-inter text-sm text-[#00407a]/70">Pageviews</p>
              <p className="font-poppins text-4xl font-bold text-[#001f3f] mt-1">{summary.pageviews}</p>
              <p className="font-inter text-xs text-[#00407a]/60 mt-2">All hits</p>
            </div>
            <div className="bg-white rounded-xl border border-[#e8f1f7] p-5">
              <p className="font-inter text-sm text-[#00407a]/70">Observers (Bots)</p>
              <p className="font-poppins text-4xl font-bold text-[#001f3f] mt-1">{summary.bots}</p>
              <p className="font-inter text-xs text-[#00407a]/60 mt-2">Detected by user-agent</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#e8f1f7] p-5">
            <h2 className="font-poppins text-xl font-semibold text-[#001f3f] mb-4">Top Pages</h2>
            <div className="divide-y divide-[#e8f1f7]">
              {summary.topPages.length === 0 && (
                <p className="font-inter text-sm text-[#003366]">No data yet</p>
              )}
              {summary.topPages.map((p) => (
                <div key={p.path} className="flex items-center justify-between py-2">
                  <span className="font-inter text-sm text-[#003366]">
                    {getPageName(p.path)}
                    <span className="text-xs text-[#00407a]/50 ml-2">({p.path})</span>
                  </span>
                  <span className="font-poppins text-sm font-semibold text-[#001f3f]">{p.views}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
