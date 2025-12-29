'use client';

import { useEffect, useState } from 'react';

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
  email_sent: boolean;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/subscribers', {
        headers: {
          'Authorization': `Bearer ${apiKey || process.env.NEXT_PUBLIC_ADMIN_API_KEY || ''}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      } else if (response.status === 401) {
        setShowApiKeyInput(true);
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportAsCSV = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/subscribers?format=csv', {
        headers: {
          'Authorization': `Bearer ${apiKey || process.env.NEXT_PUBLIC_ADMIN_API_KEY || ''}`,
        },
      });

      if (response.ok) {
        const csv = await response.text();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowApiKeyInput(false);
    fetchSubscribers();
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ba9e8]"></div>
          <p className="mt-4 text-[#003366] font-inter">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  if (showApiKeyInput) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-md mx-auto mt-12">
          <h1 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">
            API Key Required
          </h1>
          <p className="font-inter text-[#003366] mb-6">
            Please enter your ADMIN_API_KEY to view subscribers.
          </p>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter ADMIN_API_KEY"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-[#e8f1f7] rounded-lg font-inter text-sm"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#1ba9e8] text-white rounded-lg font-semibold hover:bg-[#0a66a9] transition-colors"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-poppins text-4xl font-bold text-[#001f3f] mb-2">
            Subscribers
          </h1>
          <p className="font-inter text-[#003366]">
            Manage all newsletter subscribers
          </p>
        </div>
        <button
          onClick={exportAsCSV}
          disabled={exporting}
          className="px-4 py-2 bg-[#1ba9e8] text-white rounded-lg font-semibold hover:bg-[#0a66a9] transition-colors disabled:opacity-50"
        >
          {exporting ? 'Exporting...' : '↓ Export CSV'}
        </button>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-[#e6f7ff] to-[#eef0ff] rounded-xl border border-[#1ba9e8]/20 p-4 mb-8">
        <p className="font-inter text-[#003366]">
          Total subscribers: <span className="font-bold text-[#1ba9e8] text-lg">{subscribers.length}</span>
        </p>
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-[#e8f1f7]">
          <svg
            className="mx-auto h-16 w-16 text-[#d0d8e0] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <p className="text-[#003366] font-inter text-lg">No subscribers yet</p>
          <p className="text-[#00407a]/60 font-inter text-sm mt-2">Newsletter subscribers will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#e8f1f7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f0f7ff] border-b border-[#e8f1f7]">
                <tr>
                  <th className="px-6 py-4 text-left font-inter text-sm font-semibold text-[#003366]">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left font-inter text-sm font-semibold text-[#003366]">
                    Subscribed
                  </th>
                  <th className="px-6 py-4 text-left font-inter text-sm font-semibold text-[#003366]">
                    Email Sent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8f1f7]">
                {subscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="hover:bg-[#f7f9fc] transition-colors"
                  >
                    <td className="px-6 py-4 font-inter text-sm text-[#003366]">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 font-inter text-sm text-[#00407a]">
                      {formatDate(subscriber.subscribed_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          subscriber.email_sent
                            ? 'bg-[#d4edda] text-[#155724]'
                            : 'bg-[#fff3cd] text-[#856404]'
                        }`}
                      >
                        {subscriber.email_sent ? '✓ Sent' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
