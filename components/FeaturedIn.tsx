import React from 'react';

export default function FeaturedIn() {
  return (
    <section className="bg-white py-10 border-y-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <p className="text-xs uppercase tracking-[0.3em] font-black text-black bg-[#ccff00] border-2 border-black px-2 py-1 transform -rotate-2 brutalist-shadow-sm whitespace-nowrap italic">As Featured In:</p>
          
          <div className="flex flex-wrap justify-center items-center gap-10">
            {/* ProjectHunt Badge */}
            <a 
              href="https://projecthunt.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform border-2 border-black brutalist-shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="180" height="48" role="img" aria-label="Featured on: projecthunt.me">
                <title>Featured on projecthunt.me</title>
                <g>
                  <rect width="180" height="48" fill="#FFFFFF"/>
                </g>
                <g transform="translate(10, 8)">
                  <image href="https://projecthunt.me/favicon.ico" width="32" height="32"/>
                </g>
                <g fill="#000000" textAnchor="start" fontFamily="monospace" fontWeight="900">
                  <text x="50" y="22" fontSize="13">FEATURED ON</text>
                  <text x="50" y="38" fontSize="14" fill="#E85C0D">projecthunt.me</text>
                </g>
              </svg>
            </a>

            {/* Top Trend Tools Badge */}
            <a 
              href="https://toptrendtools.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform border-2 border-black brutalist-shadow-sm grayscale hover:grayscale-0"
            >
              <img 
                src="https://toptrendtools.com/assets/images/badge.png" 
                alt="Top Trend Tools" 
                height="48"
                width="150"
                loading="lazy"
                className="h-[48px] w-auto" 
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
