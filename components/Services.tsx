"use client";

import Link from 'next/link';
import content from '@/data/content.json';

interface Service {
  id: string;
  title: string;
  description: string;
  number: string;
  slug?: string;
  subtitle?: string;
  tag?: string;
}

export default function Services() {
  const services = content.services as Service[];

  return (
    <section id="services" className="relative isolate overflow-hidden text-[#0f1024] pt-8 lg:pt-10 pb-8 lg:pb-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(27,169,232,0.045),transparent_40%),radial-gradient(circle_at_80%_18%,rgba(255,107,107,0.045),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.04),transparent_38%)]" />
        {/* Section edge fades for seamless flow */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f7f9fc]/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f7f9fc]/95 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-10 space-y-3">
          <p className="font-inter text-xs uppercase tracking-[0.25em] text-slate-500">Our Growth Systems</p>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#0f1024]">
            Three offers, one growth engine
          </h2>
          <p className="text-slate-600 max-w-2xl text-sm md:text-base">
            Pick the layer you need—foundation, predictable inbound, or an automated business OS. The middle card is your highest ROI path.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const slugify = (text: string) =>
              text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            const serviceSlug = service.slug || slugify(service.title);
            const isFeatured = idx === 1;

            const cardStyles = [
              {
                gradient: 'from-cyan-300/10 via-blue-400/7 to-blue-500/4',
                ring: 'ring-cyan-200/30',
                icon: 'bg-gradient-to-br from-cyan-300 to-blue-500',
              },
              {
                gradient: 'from-fuchsia-300/14 via-purple-400/10 to-indigo-400/6',
                ring: 'ring-fuchsia-200/30',
                icon: 'bg-gradient-to-br from-fuchsia-300 to-purple-500',
              },
              {
                gradient: 'from-emerald-300/10 via-teal-400/7 to-sky-400/4',
                ring: 'ring-emerald-200/30',
                icon: 'bg-gradient-to-br from-emerald-300 to-teal-500',
              },
            ][idx % 3];

            return (
              <Link
                key={service.id}
                href={`/services/${serviceSlug}`}
                className={`group relative overflow-hidden rounded-[28px] backdrop-blur-xl transition-all duration-300 ${
                  isFeatured
                    ? 'md:scale-[1.03] md:-translate-y-1 shadow-[0_18px_60px_-36px_rgba(120,81,169,0.22)] bg-white/75 border border-white/25'
                    : 'bg-white/70 border border-white/20 shadow-[0_12px_38px_-28px_rgba(15,16,36,0.14)]'
                }`}
                style={{ animationDelay: `${idx * 0.12}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cardStyles.gradient}`} aria-hidden />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-white/60 to-transparent`} aria-hidden />
                <div className={`absolute inset-[1px] rounded-[26px] ring-1 ${cardStyles.ring} ring-inset`} aria-hidden />

                {service.tag && (
                  <span className={`absolute top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] backdrop-blur-md border ${
                    isFeatured
                      ? 'bg-white text-[#0f1024] border-purple-200'
                      : 'bg-white/80 text-[#0f1024] border-white/60'
                  }`}>
                    {isFeatured ? '★ ' : ''}{service.tag}
                  </span>
                )}

                <div className="relative p-6 md:p-7 flex flex-col gap-4 min-h-[300px] md:min-h-[320px]">
                  <div className="flex items-center justify-between">
                    <div className={`h-11 w-11 rounded-2xl ${cardStyles.icon} flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-black/20`}>
                      {service.number}
                    </div>
                    <svg className={`w-6 h-6 ${isFeatured ? 'text-black/30 group-hover:text-black/60' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    {service.subtitle && (
                      <p className={`text-[12px] uppercase tracking-[0.18em] ${isFeatured ? 'text-black/60' : 'text-slate-500'}`}>{service.subtitle}</p>
                    )}
                    <h3 className={`font-poppins text-2xl font-semibold leading-tight ${isFeatured ? 'text-[#0f1024]' : 'text-[#0f1024]'}`}>
                      {service.title}
                    </h3>
                  </div>

                  <p className={`text-sm leading-relaxed flex-1 ${isFeatured ? 'text-black/70' : 'text-slate-600'}`}>
                    {service.description}
                  </p>

                  <div className="pt-1">
                    <span className={`inline-flex items-center gap-2 font-medium text-sm group-hover:gap-3 transition-all duration-300 ${isFeatured ? 'text-[#0f1024]' : 'text-[#0f1024]'}`}>
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
      </div>
    </section>
  );
}
