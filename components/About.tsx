'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const values = [
    {
      title: 'Innovation First',
      desc: 'We push boundaries with cutting-edge technology and creative thinking to deliver future-proof solutions.',
      icon: '🚀'
    },
    {
      title: 'Client-Centric',
      desc: 'Your goals drive our strategy. We listen, collaborate, and deliver results that matter to your business.',
      icon: '🎯'
    },
    {
      title: 'Quality at Scale',
      desc: 'From concept to launch, we maintain exceptional standards across design, development, and delivery.',
      icon: '⭐'
    },
    {
      title: 'Transparent Partnership',
      desc: 'Clear communication, honest timelines, and regular updates keep you informed every step of the way.',
      icon: '🤝'
    },
  ];

  // Team section removed per request

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl">
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">About</p>
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-[#001f3f] mb-5 leading-tight">
            Creativity meets strategy. That&apos;s LumeWave Digital.
          </h1>
          <p className="font-inter text-lg text-[#003366] leading-relaxed mb-4">
            LumeWave Digital helps founders, professionals, and growing businesses build clear, automated growth systems.

We don’t believe growth comes from scattered marketing or constant hustle. It comes from clarity, inbound systems, and operations that work together — consistently.

Our work focuses on three things:
clear positioning, predictable inbound leads, and automation that removes manual dependency.
          </p>
          <p className="font-inter text-lg text-[#003366] leading-relaxed">
            Everything we build is designed to scale calmly, run reliably, and keep the business moving even when the founder steps away.
That’s how we approach growth — with structure, intention, and long-term thinking.
          </p>
        </div>
      </section>

      {/* Founder Section (moved below stats & values) */}
      

      {/* Stats Section (above founder) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="font-poppins text-5xl font-bold text-[#001f3f] mb-2">3+</p>
            <p className="font-inter text-base text-[#003366]">Years in Business</p>
          </div>
          <div className="text-center">
            <p className="font-poppins text-5xl font-bold text-[#001f3f] mb-2">100+</p>
            <p className="font-inter text-base text-[#003366]">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="font-poppins text-5xl font-bold text-[#001f3f] mb-2">50+</p>
            <p className="font-inter text-base text-[#003366]">Projects Delivered</p>
          </div>
          <div className="text-center">
            <p className="font-poppins text-5xl font-bold text-[#001f3f] mb-2">99%</p>
            <p className="font-inter text-base text-[#003366]">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Values Section (above founder) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-10">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-3">Our Values</h2>
          <p className="font-inter text-base text-[#003366]">The principles that guide every decision we make.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-[#e8f1f7] bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <p className="text-3xl mb-3">{value.icon}</p>
              <h3 className="font-poppins text-lg font-semibold text-[#001f3f] mb-2">{value.title}</h3>
              <p className="font-inter text-sm text-[#003366] leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="space-y-4">
            <h2 className="font-poppins text-2xl md:text-3xl font-semibold text-[#001f3f]">I’m Chirag, founder of LumeWave Digital.</h2>
            <p className="font-inter text-base md:text-lg text-[#003366] leading-relaxed">
              I work with founders, professionals, and growing businesses who feel stuck not because they lack effort, but because they lack clarity and systems.
            </p>
            <p className="font-inter text-base md:text-lg text-[#003366] leading-relaxed">
              LumeWave was built around a simple belief: growth should be structured, predictable, and calm not chaotic or manual.
            </p>
            <p className="font-inter text-base md:text-lg text-[#003366] leading-relaxed">
              Instead of chasing trends or selling disconnected services, I focus on building clear positioning, inbound systems, and automation that let businesses grow without everything depending on the founder.
            </p>
            <p className="font-inter text-base md:text-lg text-[#003366] leading-relaxed">
              That’s the work we do. Quietly, intentionally, and with structure.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="https://www.linkedin.com/in/chiragbhatheja"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1ba9e8] text-[#1ba9e8] hover:bg-[#1ba9e8] hover:text-white transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.37h.04c.4-.75 1.36-1.54 2.8-1.54 3 0 3.56 1.98 3.56 4.55v5.62z" /></svg>
                LinkedIn
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#e6f7ff] via-white to-[#ffecec] rounded-3xl blur-2xl opacity-70" aria-hidden />
            <div className="relative rounded-3xl overflow-hidden border border-[#e8f1f7] bg-white shadow-lg">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/founder.jpeg"
                  alt="Chirag, Founder of LumeWave Digital"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div className="p-5">
                <h3 className="font-poppins text-xl font-semibold text-[#001f3f]">Chirag Bhatheja</h3>
                <p className="font-inter text-sm text-[#003366]">Founder, LumeWave Digital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="rounded-3xl border border-[#e8f1f7] bg-gradient-to-br from-[#e6f7ff] to-[#eef0ff] p-8 md:p-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Our Mission</h2>
          <p className="font-inter text-lg text-[#003366] leading-relaxed max-w-2xl">
            Our mission is to help businesses grow with clarity, not chaos by building systems that bring predictable leads and reduce manual effort.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18 text-center">
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Ready to work with us?</h2>
        <p className="font-inter text-base md:text-lg text-[#003366] mb-8 max-w-2xl mx-auto">
          Let&apos;s chat about your project, goals, and vision. Get a free consultation today.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-gradient-to-r from-[#1ba9e8] to-[#0a66a9] hover:from-[#0a66a9] hover:to-[#003366] text-white font-poppins font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
