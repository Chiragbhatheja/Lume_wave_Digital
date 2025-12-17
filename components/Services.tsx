"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  number: string;
  slug?: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => {
        console.error('Failed to fetch services:', err);
        setServices([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const colors = [
    { gradient: 'from-[#FF4B4B]/12 to-[#f33a3a]/8' },
    { gradient: 'from-[#1ba9e8]/12 to-[#0a66a9]/8' },
    { gradient: 'from-[#e6f7ff] to-white' },
    { gradient: 'from-[#fff0f0] to-white' },
    { gradient: 'from-[#eef0ff] to-white' },
    { gradient: 'from-[#e9f7ef] to-white' },
  ];

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center">
          <p className="text-gray-500">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="mb-8 space-y-2">
        <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60">Our Services</p>
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f]">
          Built for Growth. Powered by Creativity.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
        {services.map((service, idx) => {
          const slugify = (text: string) =>
            text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');
          const serviceSlug = service.slug || slugify(service.title);
          const colorStyle = colors[idx % colors.length].gradient;

          return (
            <Link
              key={service.id}
              href={`/services/${serviceSlug}`}
              className="relative overflow-hidden rounded-2xl border border-[#e8f1f7] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40 service-float group"
              style={{ animationDelay: `${(idx % 3) * 0.25 + Math.floor(idx / 3) * 0.3}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${colorStyle}`} aria-hidden />
              <div className="relative p-5 h-full flex flex-col">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-[#1ba9e8] flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h10v10M7 17L17 7" />
                    </svg>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm mb-3"
                     style={{ background: 'linear-gradient(135deg, #FF4B4B, #1ba9e8)' }}>
                  {service.number}
                </div>
                <h3 className="font-poppins text-lg md:text-xl font-semibold text-[#001f3f] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-[#1ba9e8] font-medium group-hover:gap-3 transition-all duration-300">
                    Explore service
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
