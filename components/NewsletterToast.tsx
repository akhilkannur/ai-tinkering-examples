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
      className={`fixed bottom-4 right-4 z-40 max-w-sm w-full bg-white border border-slate-200 shadow-xl rounded-xl p-4 flex items-start gap-4 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="bg-accent/10 p-2 rounded-lg text-accent">
        <Mail size={20} />
      </div>
      
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 text-sm mb-1">Get 3 AI emails a week</h4>
        <p className="text-xs text-slate-600 mb-3">
          We send files you can use. If they suck, unsubscribe.
        </p>
        <Link 
          href="/#newsletter"
          onClick={(e) => {
             // Let it scroll to newsletter section
             // Optionally dismiss toast
             setIsVisible(false);
          }}
          className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors inline-block"
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
