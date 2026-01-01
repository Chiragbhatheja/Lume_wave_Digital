"use client";

import Image from 'next/image';

export default function ClientsCarousel() {
  // Replace these with your actual client logo paths
  const clients = [
    { name: 'Client 1', logo: '/clients/shj logo.png' },
    { name: 'Client 2', logo: '/clients/client_2.png' },
    { name: 'Client 3', logo: '/clients/client_3.svg' },
    { name: 'Client 4', logo: '/clients/Client_4.png' },
    { name: 'Client 5', logo: '/clients/Client_5.png' },
    { name: 'Client 6', logo: '/clients/Client_6.png' },
    { name: 'Client 7', logo: '/clients/Client_7.png' },
  ];

  return (
    <section className="pt-6 pb-12 overflow-hidden bg-transparent">
      <div className="relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f7f9fc]/60 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f7f9fc]/60 to-transparent z-10"></div>
        
        {/* Scrolling container */}
        <div className="flex items-center animate-scroll">
          {/* First set of logos */}
          {clients.map((client, index) => (
            <div
              key={`client-1-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={70}
                unoptimized
                sizes="140px"
                className="object-contain grayscale-[60%] hover:grayscale-0 hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`client-2-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={70}
                unoptimized
                sizes="140px"
                className="object-contain grayscale-[60%] hover:grayscale-0 hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
