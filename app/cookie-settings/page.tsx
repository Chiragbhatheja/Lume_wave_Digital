'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

export default function CookieSettings() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true, // Enabled by default
  });
  const [cookies, setCookies] = useState<any>({});

  useEffect(() => {
    // Load saved preferences
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setPreferences(prefs);
    }

    // Parse all cookies
    const allCookies: any = {};
    if (typeof document !== 'undefined') {
      document.cookie.split(';').forEach((cookie) => {
        const [name, value] = cookie.split('=');
        if (name.trim()) {
          allCookies[name.trim()] = decodeURIComponent(value || '');
        }
      });
      setCookies(allCookies);
    }
  }, []);

  const handleToggle = (type: 'essential' | 'analytics') => {
    const newPrefs = { ...preferences };
    if (type === 'analytics') {
      newPrefs.analytics = !newPrefs.analytics;
    }
    setPreferences(newPrefs);
    localStorage.setItem('cookiePreferences', JSON.stringify(newPrefs));
    document.cookie = `cookiePreferences=${JSON.stringify(newPrefs)}; path=/; max-age=${365 * 24 * 60 * 60}`;
  };

  const clearAllCookies = () => {
    if (confirm('Are you sure you want to clear all cookies? You may need to log in again.')) {
      // Clear all cookies
      document.cookie.split(';').forEach((cookie) => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      // Reset preferences
      localStorage.removeItem('cookiePreferences');
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f9fc] to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#001f3f] to-[#003366] text-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-[#e8f3ff] hover:text-white text-sm mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-4">Cookie Settings</h1>
          <p className="font-inter text-lg text-[#e8f3ff]">Manage your cookie preferences and view stored data.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-12">
          {/* Preferences Section */}
          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-6">Your Preferences</h2>
            
            <div className="space-y-4">
              {/* Essential */}
              <div className="bg-white border-2 border-[#e8f1f7] rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-poppins text-lg font-semibold text-[#001f3f]">
                    ✅ Essential Cookies
                  </h3>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 cursor-not-allowed opacity-60"
                  />
                </div>
                <p className="font-inter text-sm text-[#003366] mb-3">
                  Always enabled. Required for website functionality, security, and form submissions.
                </p>
                <div className="bg-[#f7f9fc] rounded p-3">
                  <p className="font-inter text-xs text-[#00407a] font-semibold mb-2">Includes:</p>
                  <ul className="font-inter text-xs text-[#003366] space-y-1">
                    <li>• Session management</li>
                    <li>• Security tokens</li>
                    <li>• Form data</li>
                  </ul>
                </div>
              </div>

              {/* Analytics */}
              <div className="bg-white border-2 border-[#e8f1f7] rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-poppins text-lg font-semibold text-[#001f3f]">
                    📊 Analytics Cookies
                  </h3>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleToggle('analytics')}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
                <p className="font-inter text-sm text-[#003366] mb-3">
                  Optional. Helps us understand how you use our website to improve your experience.
                </p>
                <div className="bg-[#f7f9fc] rounded p-3">
                  <p className="font-inter text-xs text-[#00407a] font-semibold mb-2">Includes:</p>
                  <ul className="font-inter text-xs text-[#003366] space-y-1">
                    <li>• Google Analytics - page views and user behavior</li>
                    <li>• Meta Pixel - conversion and user journey tracking</li>
                    <li>• Page tracking - which pages you visit</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Stored Cookies Section */}
          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-6">Stored Cookies</h2>
            
            {Object.keys(cookies).length > 0 ? (
              <div className="bg-white border-2 border-[#e8f1f7] rounded-lg p-6 overflow-x-auto">
                <table className="w-full font-inter text-sm">
                  <thead>
                    <tr className="border-b border-[#e8f1f7]">
                      <th className="text-left py-3 px-2 text-[#001f3f] font-semibold">Cookie Name</th>
                      <th className="text-left py-3 px-2 text-[#001f3f] font-semibold">Value</th>
                      <th className="text-left py-3 px-2 text-[#001f3f] font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(cookies).map(([name, value]: [string, any]) => (
                      <tr key={name} className="border-b border-[#f0f7ff]">
                        <td className="py-3 px-2 text-[#003366] font-mono text-xs">{name}</td>
                        <td className="py-3 px-2 text-[#00407a] font-mono text-xs truncate max-w-xs">
                          {String(value).substring(0, 50)}
                          {String(value).length > 50 ? '...' : ''}
                        </td>
                        <td className="py-3 px-2 text-[#003366] text-xs">
                          {name === 'cookiePreferences' && 'Your consent preferences'}
                          {name.startsWith('_ga') && 'Google Analytics'}
                          {name === 'fr' && 'Meta Pixel'}
                          {!['cookiePreferences', '_ga', 'fr'].some(c => name.includes(c)) && 'Session/functional'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-[#f7f9fc] border border-[#e8f1f7] rounded-lg p-6 text-center">
                <p className="font-inter text-[#003366]">No cookies stored yet.</p>
              </div>
            )}
          </section>

          {/* Actions */}
          <section className="flex gap-4">
            <button
              onClick={clearAllCookies}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Clear All Cookies
            </button>
          </section>

          {/* Info */}
          <section className="bg-[#e8f3ff] border border-[#1ba9e8] rounded-lg p-6">
            <h3 className="font-poppins font-semibold text-[#001f3f] mb-3">📋 How We Use Cookies</h3>
            <ul className="font-inter text-sm text-[#003366] space-y-2 list-disc list-inside">
              <li>Essential cookies are required for website functionality and security</li>
              <li>Analytics cookies are completely optional and can be disabled anytime</li>
              <li>Your preferences are saved in localStorage and synced to a cookie</li>
              <li>We never share your data with third parties</li>
              <li>You can change your preferences at any time by revisiting this page</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
