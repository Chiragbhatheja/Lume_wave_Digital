'use client';

import { useRef, useEffect, useState } from 'react';

export default function Blogs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const blogs = [
    {
      title: 'The Future of Web Development',
      desc: 'Exploring emerging trends and technologies shaping the future of web applications',
      category: 'Technology',
      date: 'Dec 5, 2024',
      color: 'from-[#FF6B6B] to-[#FF4B4B]',
      slug: 'future-of-web-development'
    },
    {
      title: 'SaaS Growth Strategies',
      desc: 'Proven strategies to scale your SaaS business and achieve exponential growth',
      category: 'Business',
      date: 'Dec 3, 2024',
      color: 'from-[#4C6EF5] to-[#0A66A9]',
      slug: 'saas-growth-strategies'
    },
    {
      title: 'UI/UX Best Practices 2024',
      desc: 'Latest design trends and user experience principles for modern applications',
      category: 'Design',
      date: 'Nov 28, 2024',
      color: 'from-[#00D4FF] to-[#0099FF]',
      slug: 'ui-ux-best-practices'
    },
    {
      title: 'Mobile-First Development',
      desc: 'Building responsive and fast mobile applications that convert users',
      category: 'Development',
      date: 'Nov 20, 2024',
      color: 'from-[#11998E] to-[#38EF7D]',
      slug: 'mobile-first-development'
    },
    {
      title: 'Digital Marketing Trends',
      desc: 'Latest digital marketing strategies to reach and engage your target audience',
      category: 'Marketing',
      date: 'Nov 15, 2024',
      color: 'from-[#F093FB] to-[#F5576C]',
      slug: 'digital-marketing-trends'
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="mb-12">
        <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Latest Insights</p>
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">
          Explore our latest articles and insights
        </h2>
      </div>

      {/* Scrollable Blogs Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-96 h-72 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              onClick={() => window.location.href = `/blogs/${blog.slug}`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${blog.color}`} />

              {/* Content */}
              <div className="relative p-6 h-full flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-inter text-xs uppercase tracking-widest text-white/70 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <span className="font-inter text-xs text-white/60">
                      {blog.date}
                    </span>
                  </div>
                  <h3 className="font-poppins text-2xl font-bold text-white mb-2">
                    {blog.title}
                  </h3>
                  <p className="font-inter text-sm text-white/80 line-clamp-2">
                    {blog.desc}
                  </p>
                </div>

                {/* Arrow Icon - Bottom Right */}
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-white/60 hover:text-white transition-colors">Read Article</span>
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
