'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-[88%] lg:max-w-[1140px] mx-auto rounded-full border transition-all duration-300 backdrop-blur-md ${
          isScrolled
            ? 'bg-[#f5f9fc]/95 shadow-2xl border-[#d5e6f3] translate-y-0'
            : 'bg-[#f5f9fc]/80 shadow-xl border-[#e8f1f7]'
        }`}
      >
        <div className="flex items-center justify-between h-16 lg:h-[70px] px-6 lg:px-9">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="LumeWave Digital" 
              className="h-[120px] w-auto lg:h-[140px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#001f3f] hover:text-[#1ba9e8] text-[15px] font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Call Button & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Call Button - Desktop */}
            <a
              href="tel:+919217727015"
              className="hidden md:flex items-center gap-2 bg-[#1ba9e8] hover:bg-[#0a66a9] text-white px-5 py-2.5 rounded-full transition-colors duration-200 font-medium text-[14px]"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span className="hidden xl:block">Talk to us</span>
              <span className="font-semibold">+91 9217727015</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#001f3f] hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
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
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 bg-[#f5f9fc]/95 backdrop-blur-md rounded-3xl shadow-xl border border-[#e8f1f7] overflow-hidden">
          <div className="px-6 py-5 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-[#001f3f] hover:text-[#1ba9e8] hover:bg-gray-50 transition-all duration-200 text-[15px] font-medium py-3 px-4 rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="tel:+919217727015"
              className="flex items-center justify-center gap-2 bg-[#1ba9e8] hover:bg-[#0a66a9] text-white px-5 py-3 rounded-xl transition-colors duration-200 font-medium text-[14px] mt-3"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span>Talk to us: +91 9217727015</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
