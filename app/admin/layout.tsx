'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow access to login page without authentication
    if (pathname === '/admin/login') {
      return;
    }

    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router, pathname]);

  // Allow login page to render without checking session
  if (pathname === '/admin/login') {
    return <div>{children}</div>;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ba9e8] mx-auto mb-4"></div>
          <p className="text-[#003366]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <div>{children}</div>;
}
