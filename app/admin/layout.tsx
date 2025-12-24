"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (isAuth) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem('admin_authenticated', 'true');
        setAuthenticated(true);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setAuthenticated(false);
    setEmail('');
    setPassword('');
    router.push('/');
  };

  if (loading && !authenticated) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ba9e8] mx-auto mb-4"></div>
          <p className="text-[#00407a]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-[#e8f1f7] p-8">
            <div className="text-center mb-8">
              <h1 className="font-poppins text-3xl font-bold text-[#001f3f] mb-2">
                Admin Login
              </h1>
              <p className="font-inter text-[#00407a]">
                Enter your credentials to access the admin panel
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-inter font-medium text-[#001f3f] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#e8f1f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ba9e8] font-inter"
                  placeholder="admin@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block font-inter font-medium text-[#001f3f] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#e8f1f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ba9e8] font-inter"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1ba9e8] hover:bg-[#1598d4] text-white shadow-md hover:shadow-lg'
                }`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="font-inter text-sm text-[#1ba9e8] hover:text-[#1598d4] transition-colors"
              >
                ← Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border-b border-[#e8f1f7] px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-poppins font-semibold text-[#001f3f]">Admin Panel</span>
            <span className="text-[#00407a]/60">•</span>
            <span className="font-inter text-sm text-[#00407a]/60">{email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-inter text-[#00407a] hover:text-[#FF4B4B] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
