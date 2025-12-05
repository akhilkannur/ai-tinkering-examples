import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

interface NewsletterPopupProps {
  delay?: number; // in seconds
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ delay = 20 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    if (hasSeenPopup) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem('hasSeenNewsletterPopup', 'true');
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={handleClose}>
      <div 
        className="bg-primary-bg p-8 w-full max-w-md text-center relative border border-accent shadow-[0_0_30px_rgba(212,255,0,0.15)]" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 p-3 text-text-secondary hover:text-accent hover:bg-secondary-bg transition-all duration-100 hover:scale-110 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="mb-6 border border-navy-dark inline-block p-2 bg-secondary-bg">
          <Image src="/favicon_canva.png" alt="Favicon" width={80} height={80} className="mx-auto grayscale hover:grayscale-0 transition-all duration-500" />
        </div>

        <h3 className="text-2xl font-headline font-bold mb-3 text-text-color uppercase tracking-tight">
          Join the <span className="text-accent">Lab</span>
        </h3>
        
        <p className="text-sm font-mono text-text-secondary mb-8 leading-relaxed">
          Hey, I'm Akhil. I curate a weekly newsletter with the most interesting AI examples I find. Sound useful? Subscribe today!
        </p>

        <div className="w-full">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;