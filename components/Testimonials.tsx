'use client';

import { useEffect, useState, useRef } from 'react';

export default function Testimonials() {
  const [counts, setCounts] = useState({
    projects: 0,
    systems: 0,
    businesses: 0,
    approach: 0,
  });

  const animationRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            const targets = {
              projects: 15,
              systems: 8,
              businesses: 10,
              approach: 1,
            };

            const duration = 2000; // 2 seconds
            const startTime = Date.now();

            const animate = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);

              setCounts({
                projects: Math.floor(targets.projects * progress),
                systems: Math.floor(targets.systems * progress),
                businesses: Math.floor(targets.businesses * progress),
                approach: Math.floor(targets.approach * progress),
              });

              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              }
            };

            animationRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-transparent pt-8 lg:pt-10 pb-8 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60">BY THE NUMBERS</p>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f]">
            What working with us actually feels like.
          </h2>
          <p className="font-inter text-base md:text-lg text-[#003366] max-w-2xl leading-relaxed">
              Founder led businesses across different stages rely on us to build systems that work websites, inbound engines, and internal tools.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Projects Delivered */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="font-poppins text-5xl md:text-6xl font-bold text-[#001f3f]">
                {counts.projects}
              </span>
              <span className="font-poppins text-3xl md:text-4xl font-bold text-[#1ba9e8]">+</span>
            </div>
            <p className="font-inter text-base md:text-lg font-semibold text-[#001f3f]">Projects Delivered</p>
            <p className="font-inter text-sm text-[#003366]/80 mt-1">Across web, inbound, and systems</p>
          </div>

          {/* Systems Built */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="font-poppins text-5xl md:text-6xl font-bold text-[#001f3f]">
                {counts.systems}
              </span>
              <span className="font-poppins text-3xl md:text-4xl font-bold text-[#1ba9e8]">+</span>
            </div>
            <p className="font-inter text-base md:text-lg font-semibold text-[#001f3f]">Systems Built</p>
            <p className="font-inter text-sm text-[#003366]/80 mt-1">Websites, workflows, internal tools</p>
          </div>

          {/* Founder-Led Businesses */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="font-poppins text-5xl md:text-6xl font-bold text-[#001f3f]">
                {counts.businesses}
              </span>
              <span className="font-poppins text-3xl md:text-4xl font-bold text-[#1ba9e8]">+</span>
            </div>
            <p className="font-inter text-base md:text-lg font-semibold text-[#001f3f]">Founder-Led Businesses</p>
            <p className="font-inter text-sm text-[#003366]/80 mt-1">Supported across different stages</p>
          </div>

          {/* One Approach */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="font-poppins text-5xl md:text-6xl font-bold text-[#001f3f]">
                {counts.approach}
              </span>
            </div>
            <p className="font-inter text-base md:text-lg font-semibold text-[#001f3f]">Approach</p>
            <p className="font-inter text-sm text-[#003366]/80 mt-1">One system, three phases</p>
          </div>
        </div>
      </div>
    </section>
  );
}
