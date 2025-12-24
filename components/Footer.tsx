'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'Home', href: '/#home' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/#services' },
      { name: 'Projects', href: '/#projects' },
    ],
    Resources: [
      
      { name: 'Case Studies', href: '/#projects' },
      { name: 'Contact', href: '/#contact' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    Services: [
      { name: 'Growth System Foundation', href: '/#services' },
      { name: 'Inbound Engine', href: '/#services' },
      { name: 'Business OS', href: '/#services' },
      
    ],
    Contact: [
      { label: 'Phone', value: ' +91 9217727015', href: 'tel:+919217727015' },
      { label: 'Email', value: 'info@lumewavedigital.com', href: 'mailto:info@lumewavedigital.com' },
      { label: 'Location', value: 'Remote Studio', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/lumewavedigital/' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/lumewavedigital?igsh=cm9icTFoNHFjZDZw' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#f5f9fc] to-white border-t border-[#e8f1f7]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/logo.png"
                alt="LumeWave"
                width={240}
                height={84}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>
            <p className="font-inter text-sm text-[#00407a] leading-relaxed mb-6">
              Transforming brands through integrated digital innovation and cinematic storytelling.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#e8f3ff] hover:bg-[#1ba9e8] text-[#1ba9e8] hover:text-white flex items-center justify-center transition-all duration-200"
                  title={social.name}
                >
                  {social.name === 'Twitter' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
                    </svg>
                  )}
                  {social.name === 'LinkedIn' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )}
                  {social.name === 'Instagram' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z" />
                    </svg>
                  )}
                  {social.name === 'Facebook' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a6 6 0 00-6 6v9h-2v4h2v2h4v-2h3v-4h-3V8a1 1 0 011-1h3z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-poppins font-semibold text-[#001f3f] mb-4 text-sm uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-[#00407a] hover:text-[#1ba9e8] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-poppins font-semibold text-[#001f3f] mb-4 text-sm uppercase tracking-widest">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-[#00407a] hover:text-[#1ba9e8] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-poppins font-semibold text-[#001f3f] mb-4 text-sm uppercase tracking-widest">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.Services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-[#00407a] hover:text-[#1ba9e8] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-poppins font-semibold text-[#001f3f] mb-4 text-sm uppercase tracking-widest">
              Contact
            </h3>
            <ul className="space-y-3">
              {footerLinks.Contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-inter text-sm text-[#00407a] hover:text-[#1ba9e8] transition-colors duration-200 block"
                  >
                    <p className="text-xs text-[#00407a]/60 mb-1">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e8f1f7] my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-sm text-[#00407a]/60">
            &copy; {currentYear} LumeWave Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-inter text-sm text-[#00407a]/60 hover:text-[#1ba9e8] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-inter text-sm text-[#00407a]/60 hover:text-[#1ba9e8] transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
