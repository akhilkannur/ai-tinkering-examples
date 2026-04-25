import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function StickyActionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 20% down
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCta = () => {
    const ctaSection = document.getElementById('database-download');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-2xl bg-secondary-bg border border-accent/20 shadow-[0_-5px_20px_rgba(0,0,0,0.3)] rounded-sm p-4 flex items-center justify-between backdrop-blur-md bg-secondary-bg/95">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 p-2 rounded-sm text-accent hidden sm:block">
                <Download size={20} />
              </div>
              <div>
                <p className="font-bold text-text-color text-sm sm:text-base">Get the full 500+ list</p>
                <p className="text-xs text-text-secondary hidden sm:block">Save the database for later.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={scrollToCta}
                className="bg-accent hover:bg-accent-hover text-white text-sm font-bold py-2 px-4 rounded-sm transition-colors shadow-lg"
              >
                Download CSV
              </button>
              <button 
                onClick={() => setIsDismissed(true)}
                className="text-text-secondary hover:text-text-color p-1 rounded-md hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
