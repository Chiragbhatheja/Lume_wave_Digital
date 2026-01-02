'use client';

import Link from 'next/link';
import content from '@/data/content.json';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  gradient: string;
}

export default function Projects() {
  const projects = content.projects as Project[];

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('projects-scroll');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="mb-12">
        <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#1ba9e8] mb-4 flex items-center gap-3">
          <span className="text-[#1ba9e8]">OUR WORK</span>
          <span className="w-8 h-1 bg-gradient-to-r from-[#1ba9e8] to-[#0a66a9]"></span>
        </p>
        <h2 className="font-poppins text-4xl md:text-5xl font-bold text-[#001f3f] mb-4">
          Recent Projects
        </h2>
        <p className="font-inter text-base md:text-lg text-[#003366] max-w-2xl leading-relaxed">
          From custom web apps to brand transformations — here&apos;s a glimpse of how we bring ideas to life.
        </p>
      </div>

      {/* Projects Scroll Container */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1ba9e8] hover:text-white transition-colors duration-200 -ml-6"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1ba9e8] hover:text-white transition-colors duration-200 -mr-6"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable Projects */}
        <div
          id="projects-scroll"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex-shrink-0 w-[340px] lg:w-[380px] bg-gradient-to-br ${project.gradient} rounded-3xl p-8 cursor-pointer hover:scale-[1.02] transition-transform duration-300 border border-white/40`}
            >
              <p className="font-inter text-sm uppercase tracking-[0.15em] text-[#003366]/70 mb-3">
                {project.category}
              </p>
              <h3 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">
                {project.name}
              </h3>
              <p className="font-inter text-[15px] text-[#003366] leading-relaxed mb-6">
                {project.description}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#1ba9e8] hover:text-[#0a66a9] font-semibold transition-colors duration-200"
              >
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
