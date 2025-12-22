'use client';

import { useRef, useEffect, useState } from 'react';

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = [
    {
      title: 'E-Commerce Platform',
      desc: 'Complete digital transformation for retail brand',
      color: 'from-[#0099FF] to-[#0066CC]',
      slug: 'ecommerce-platform'
    },
    {
      title: 'SaaS Dashboard',
      desc: 'Analytics platform for enterprise clients',
      color: 'from-[#0066CC] to-[#003399]',
      slug: 'saas-dashboard'
    },
    {
      title: 'Brand Campaign',
      desc: 'Multi-channel marketing strategy and execution',
      color: 'from-[#FF6B6B] to-[#FF4B4B]',
      slug: 'brand-campaign'
    },
    {
      title: 'Mobile App Launch',
      desc: 'Fintech application with real-time features',
      color: 'from-[#00D4FF] to-[#0099FF]',
      slug: 'mobile-app-launch'
    },
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-transparent py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Featured Projects</p>
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">
          Explore our latest work and success stories
        </h2>
      </div>

      {/* Scrollable Projects Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-96 h-64 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              onClick={() => window.location.href = `/projects/${project.slug}`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

              {/* Content */}
              <div className="relative p-6 h-full flex flex-col justify-between z-10">
                <div>
                  <h3 className="font-poppins text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="font-inter text-base text-white/80">
                    {project.desc}
                  </p>
                </div>

                {/* Arrow Icon - Bottom Right */}
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-white/60 hover:text-white transition-colors">View Case Study</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h10v10M7 17L17 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 bg-white border border-[#e8f1f7] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f5f9fc]"
        >
          <svg className="w-5 h-5 text-[#001f3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 bg-white border border-[#e8f1f7] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f5f9fc]"
        >
          <svg className="w-5 h-5 text-[#001f3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
