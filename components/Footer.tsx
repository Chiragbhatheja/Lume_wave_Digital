'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'Home', href: '#home' },
      { name: 'About Us', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Projects', href: '#projects' },
    ],
    Resources: [
      { name: 'Blogs', href: '#blogs' },
      { name: 'Case Studies', href: '#projects' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    Services: [
      { name: 'Web Development', href: '#services' },
      { name: 'SaaS Solutions', href: '#services' },
      { name: 'Digital Marketing', href: '#services' },
      { name: 'Brand Strategy', href: '#services' },
    ],
    Contact: [
      { label: 'Phone', value: '+91-7508590063', href: 'tel:+917508590063' },
      { label: 'Email', value: 'hello@lumewave.com', href: 'mailto:hello@lumewave.com' },
      { label: 'Location', value: 'Remote Studio', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'Facebook', icon: 'facebook', url: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#f5f9fc] to-white border-t border-[#e8f1f7]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2.5 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF4B4B] to-[#f33a3a] rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">LW</span>
              </div>
              <span className="text-[#001f3f] font-bold text-base tracking-tight">LumeWave</span>
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
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
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
        <div className="border-t border-[#e8f1f7] my-8"></div>

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
