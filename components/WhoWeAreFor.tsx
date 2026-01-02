"use client";

import Link from 'next/link';

export default function WhoWeAreFor() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent text-[#0f1024] pt-8 lg:pt-10 pb-8 lg:pb-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-10 h-64 w-64 rounded-full bg-emerald-400/6 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-rose-400/6 blur-3xl" />
        {/* Section edge fades for seamless flow */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f7f9fc]/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f7f9fc]/95 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 space-y-2">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#0f1024]">
            WHO LUMEWAVE IS BUILT FOR
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[32px] bg-white/38 backdrop-blur-xl shadow-[0_12px_42px_-34px_rgba(0,0,0,0.12)] max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/14 via-white/12 to-rose-100/14" aria-hidden />
          <div className="absolute inset-[1px] rounded-[30px] ring-1 ring-white/8" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(27,169,232,0.05),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(255,107,107,0.05),transparent_40%)]" aria-hidden />

          <div className="relative grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/40">
            {/* Green Light - Who We Are For */}
            <div className="p-8 lg:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-400/18">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-poppins text-2xl font-bold text-[#0f1024]">The Green Light</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-emerald-50/70 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">
                    Businesses getting attention but no consistent inbound leads
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-emerald-50/70 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">
                    Founders exhausted by manual follow-ups and scattered tools
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-emerald-50/70 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">
                    Professionals who want clarity, systems, and calm growth
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  I&apos;m a Fit Let&apos;s Talk
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Red Light - Who We Are Not For */}
            <div className="p-8 lg:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center text-white shadow-md shadow-rose-400/18">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-poppins text-2xl font-bold text-[#0f1024]">The Red Light</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-rose-50/70 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">
                    Quick hacks, shortcuts, or instant results
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-rose-50/70 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">
                    One-off tasks without a long-term system
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-rose-50/70 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">
                    Price-first decisions over structure and outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
