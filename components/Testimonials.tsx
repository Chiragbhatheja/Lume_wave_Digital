'use client';

import { useEffect, useState } from 'react';

export default function Testimonials() {
  const [counts, setCounts] = useState({
    websites: 0,
    satisfaction: 0,
    projects: 0,
    views: 0,
  });

  useEffect(() => {
    const targets = {
      websites: 10,
      satisfaction: 99,
      projects: 50,
      views: 10,
    };

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      setCounts({
        websites: Math.floor(targets.websites * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
        projects: Math.floor(targets.projects * progress),
        views: Math.floor(targets.views * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="mb-12 space-y-4">
        <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60">TESTIMONIALS</p>
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f]">
          Hear from the <span className="relative inline-block">
            creators
            <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#FF6B6B]/30"></span>
          </span>
        </h2>
        <p className="font-inter text-base md:text-lg text-[#003366] max-w-2xl leading-relaxed">
          Creators worldwide trust us across all kinds of content — reaction videos, vlogs, shorts/reels, talking head, podcasts, and more.
        </p>
        <p className="font-inter text-base text-[#003366]">Here&apos;s what they have to say!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
        {/* Websites Delivered */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="font-poppins text-5xl md:text-6xl font-bold text-[#001f3f]">
              {counts.websites}
            </span>
            <span className="font-poppins text-3xl md:text-4xl font-bold text-[#1ba9e8]">+</span>
          </div>
          <p className="font-inter text-base md:text-lg text-[#003366]">Websites Delivered</p>
        </div>

        {/* Client Satisfaction */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="font-poppins text-5xl md:text-6xl font-bold text-[#001f3f]">
              {counts.satisfaction}
            </span>
            <span className="font-poppins text-3xl md:text-4xl font-bold text-[#FF4B4B]">%</span>
          </div>
          <p className="font-inter text-base md:text-lg text-[#003366]">Client Satisfaction</p>
        </div>

        {/* Projects Completed */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="font-poppins text-5xl md:text-6xl font-bold text-[#001f3f]">
              {counts.projects}
            </span>
            <span className="font-poppins text-3xl md:text-4xl font-bold text-[#1ba9e8]">+</span>
          </div>
          <p className="font-inter text-base md:text-lg text-[#003366]">Projects Completed</p>
        </div>

        {/* Views Gained */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="font-poppins text-5xl md:text-6xl font-bold text-[#001f3f]">
              {counts.views}
            </span>
            <span className="font-poppins text-3xl md:text-4xl font-bold text-[#00407a]">k+</span>
          </div>
          <p className="font-inter text-base md:text-lg text-[#003366]">Views Gained</p>
        </div>
      </div>
    </section>
  );
}
