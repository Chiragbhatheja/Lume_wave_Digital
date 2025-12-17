'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Projects', href: '/admin/projects', icon: '💼' },
    { name: 'Blogs', href: '/admin/blogs', icon: '📝' },
    { name: 'Services', href: '/admin/services', icon: '⚙️' },
    { name: 'Messages', href: '/admin/messages', icon: '📧' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#001f3f]">LumeWave Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-[#003366] hover:text-[#1ba9e8] transition-colors"
              >
                View Website
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-[#001f3f]">4</p>
              </div>
              <div className="text-4xl">💼</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Blog Posts</p>
                <p className="text-3xl font-bold text-[#001f3f]">5</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Services</p>
                <p className="text-3xl font-bold text-[#001f3f]">6</p>
              </div>
              <div className="text-4xl">⚙️</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Messages</p>
                <p className="text-3xl font-bold text-[#001f3f]">0</p>
              </div>
              <div className="text-4xl">📧</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#001f3f] mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-[#1ba9e8] hover:bg-[#f0f9ff] transition-all group"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-[#001f3f] group-hover:text-[#1ba9e8]">
                    Manage {item.name}
                  </p>
                  <p className="text-xs text-gray-500">Add, edit, or delete</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#001f3f] mb-4">Getting Started</h2>
          <div className="space-y-3 text-[#003366]">
            <div className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-semibold">Admin Panel Setup Complete</p>
                <p className="text-sm text-gray-600">You can now manage your website content</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <p className="font-semibold">Next Step: Manage Projects</p>
                <p className="text-sm text-gray-600">Add your portfolio projects to showcase your work</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <p className="font-semibold">Create Blog Posts</p>
                <p className="text-sm text-gray-600">Share insights and grow your audience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
