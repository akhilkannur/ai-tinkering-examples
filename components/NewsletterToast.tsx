import React, { useEffect, useState } from 'react';
import { X, Mail } from 'lucide-react';
import Link from 'next/link';

const NewsletterToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const hasSeenToast = localStorage.getItem('hasDismissedNewsletterToast');
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    
    // Don't show if they've dismissed this toast specifically
    if (hasSeenToast) {
      return;
    }

    // Scroll handler
    const handleScroll = () => {
      // If popup has been seen recently, maybe don't show toast immediately? 
      // For now, let's just trigger on scroll depth
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 35) { // Show after 35% scroll
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('hasDismissedNewsletterToast', 'true');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-40 max-w-sm w-full bg-white border border-border-color shadow-xl rounded-md p-4 flex items-start gap-4 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="bg-hero-tint p-2 rounded-md text-accent-dark">
        <Mail size={20} />
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-primary-text text-sm mb-1">Get free AI blueprints</h4>
        <p className="text-xs text-secondary-text mb-3 leading-relaxed">
          Free blueprints starter pack and tactical updates on actionable AI tactics.
        </p>
        <Link 
          href="/#newsletter"
          onClick={(e) => {
             setIsVisible(false);
          }}
          className="text-xs font-medium bg-accent-dark text-white px-3 py-1.5 rounded-sm hover:bg-black transition-colors inline-block"
        >
          Subscribe Free
        </Link>
      </div>

      <button 
        onClick={handleClose}
        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default NewsletterToast;
