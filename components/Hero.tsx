"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-32 pb-8 sm:pb-10 lg:pb-12 mt-20 sm:mt-0">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div
          className={`space-y-4 sm:space-y-6 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}
        >
          <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#001f3f] leading-tight tracking-tight">
            From Building Your Brand to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B4B] to-[#1ba9e8]">
              Transforming Your Story
            </span>
          </h1>
          
          <p className="font-inter text-base sm:text-lg md:text-xl text-[#00407a] leading-relaxed">
            Integrated digital innovation from SaaS development to cinematic stories.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a 
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#FF4B4B] hover:bg-[#f33a3a] text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-center text-sm sm:text-base"
            >
              Get Free Proposal
            </a>
            <a 
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white font-semibold rounded-full transition-all duration-200 text-center text-sm sm:text-base"
            >
              Start the Journey
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div
          className={`relative transform transition-all duration-1000 delay-300 ease-out mt-8 lg:mt-0 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'
          }`}
        >
          {/* Large soft background blobs - more integrated */}
          <div className="absolute inset-0 -top-16 sm:-top-32 -right-16 sm:-right-32 -bottom-16 sm:-bottom-32 -left-10 sm:-left-20">
            {/* Main purple/blue blob - top right */}
            <div className="absolute -top-10 -right-10 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-gradient-to-bl from-[#c5d4ff]/50 via-[#dae5ff]/40 to-[#f5f9fc]/20 rounded-full blur-[60px] sm:blur-[90px]"></div>
            
            {/* Yellow/orange glow - right side - BIGGER */}
            <div className="absolute top-1/4 -right-12 sm:-right-24 w-[200px] sm:w-[300px] lg:w-[380px] h-[200px] sm:h-[300px] lg:h-[380px] bg-gradient-to-l from-[#ffd966]/45 via-[#ffe699]/35 to-transparent rounded-full blur-[50px] sm:blur-[80px]"></div>
            
            {/* Bottom left pink/red blob */}
            <div className="absolute -bottom-10 -left-10 w-[250px] sm:w-[350px] lg:w-[450px] h-[250px] sm:h-[350px] lg:h-[450px] bg-gradient-to-tr from-[#ffd6d6]/40 via-[#ffe8e8]/30 to-transparent rounded-full blur-[50px] sm:blur-[80px]"></div>
            
            {/* Center soft blue blob */}
            <div className="absolute top-1/2 left-1/3 w-[280px] sm:w-[400px] lg:w-[520px] h-[280px] sm:h-[400px] lg:h-[520px] bg-[#e8f4ff]/40 rounded-full blur-[70px] sm:blur-[100px]"></div>
          </div>
          
          {/* Image - no shadow, blends naturally */}
          <div className="relative w-full aspect-[4/3] scale-105 sm:scale-110 lg:scale-125 z-10">
            <Image 
              src="/hero-image.png" 
              alt="LumeWave Digital - Transform Your Story" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
