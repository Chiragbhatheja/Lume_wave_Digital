'use client';

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

  const team = [
    {
      role: 'CEO & Founder',
      desc: 'Visionary leader with 10+ years in digital transformation and agency growth.',
    },
    {
      role: 'Head of Design',
      desc: 'Creative director specializing in brand identity and user experience design.',
    },
    {
      role: 'CTO & Lead Developer',
      desc: 'Full-stack engineer passionate about scalable, performant web applications.',
    },
    {
      role: 'Project Manager',
      desc: 'Orchestrates seamless collaboration, timelines, and client satisfaction.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-4">About Us</p>
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-[#001f3f] mb-6 leading-tight">
            Creativity meets strategy. That&apos;s LumeWave Digital.
          </h1>
          <p className="font-inter text-lg text-[#003366] leading-relaxed mb-6">
            We&apos;re a fully remote digital agency specializing in custom web experiences, cinematic content, and growth-driven strategies. Since our founding, we&apos;ve partnered with ambitious brands to transform ideas into digital assets that drive real business results.
          </p>
          <p className="font-inter text-lg text-[#003366] leading-relaxed">
            Whether it&apos;s a conversion-focused website, a powerful SaaS product, or a viral campaign—we bring strategy, craft, and obsessive attention to detail to every project.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="font-poppins text-5xl font-bold text-[#001f3f] mb-2">5+</p>
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

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Our Values</h2>
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

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-4">About Us</p>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f]">
            Why Choose LumeWave Digital
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="rounded-3xl border border-[#e8f1f7] bg-[#ffecec] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Custom Digital Solutions</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Tailored websites and digital experiences designed around your goals and target audience.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#e8f3ff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Remote Team Excellence</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Fully remote studio with seamless collaboration, clear communication, and timezone-friendly delivery.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#e9f7ef] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Latest Technology</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Built with Next.js, React, and modern stacks to keep your product fast, secure, and future-ready.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#fff3e6] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Transparent Partnership</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Clear pricing, milestones, and frequent updates so you always know progress and next steps.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#eef0ff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Results-Driven Approach</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Conversion-focused design with measurable KPIs to grow your brand, revenue, and retention.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#e6f7ff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Rapid Turnaround</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Agile sprints, tight feedback loops, and disciplined QA to ship faster without sacrificing quality.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Meet the Team</h2>
          <p className="font-inter text-base text-[#003366]">Diverse talents united by a passion for digital excellence.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="rounded-2xl border border-[#e8f1f7] bg-gradient-to-br from-white to-[#f8fafc] p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1ba9e8] to-[#0a66a9] mx-auto mb-4"></div>
              <h3 className="font-poppins text-lg font-semibold text-[#001f3f] mb-2">{member.role}</h3>
              <p className="font-inter text-sm text-[#003366] leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="rounded-3xl border border-[#e8f1f7] bg-gradient-to-br from-[#e6f7ff] to-[#eef0ff] p-8 md:p-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Our Mission</h2>
          <p className="font-inter text-lg text-[#003366] leading-relaxed max-w-2xl">
            To empower ambitious brands with digital solutions that don&apos;t just look incredible—they drive measurable business growth. We believe great digital work is an investment, not an expense. Every pixel, every line of code, every strategy detail is crafted to deliver ROI.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
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
