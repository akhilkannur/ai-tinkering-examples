import React from 'react';

export default function FeaturedIn() {
  return (
    <section className="bg-primary-bg py-8 border-y border-navy-dark/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-secondary/50 whitespace-nowrap">As Featured In:</p>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* ProjectHunt Badge */}
            <a 
              href="https://projecthunt.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity transform scale-90 md:scale-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="180" height="48" role="img" aria-label="Featured on: projecthunt.me">
                <title>Featured on projecthunt.me</title>
                <g>
                  <rect width="180" height="48" rx="4" fill="#FFFFFF" stroke="#E85C0D" strokeWidth="1.5"/>
                </g>
                <g transform="translate(10, 8)">
                  <image href="https://projecthunt.me/favicon.ico" width="32" height="32"/>
                </g>
                <g fill="#666666" textAnchor="start" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif">
                  <text x="50" y="22" fontSize="13" fontWeight="500">Featured on</text>
                  <text x="50" y="38" fontSize="14" fontWeight="600" fill="#E85C0D">projecthunt.me</text>
                </g>
              </svg>
            </a>

            {/* Top Trend Tools Badge */}
            <a 
              href="https://toptrendtools.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity transform scale-90 md:scale-100"
            >
              <img 
                src="https://toptrendtools.com/assets/images/badge.png" 
                alt="Top Trend Tools" 
                height="54"
                className="h-[48px] w-auto" 
              />
            </a>

            {/* Placeholder for next real badge */}
          </div>
        </div>
      </div>
    </section>
  );
}