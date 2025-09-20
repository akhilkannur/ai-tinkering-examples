import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image component

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-primary-bg p-8 rounded-lg shadow-lg max-w-md text-center relative border border-text-color font-sans">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-text-color hover:text-accent"
        >
          &times;
        </button>
        <div className="mb-4">
          <Image src="/favicon.png" alt="Favicon" width={64} height={64} className="mx-auto" />
        </div>
        <p className="text-xl font-semibold mb-4 text-text-color">
          Hey, I'm Akhil. Every Monday I share the AI examples I compiled in the last week. Maybe you should subscribe to it.
        </p>
        {/* Beehiiv embedded form button will go here */}
        <div className="beehiiv-form-embed">
          {/* Replace with actual Beehiiv embed code */}
          <button className="bg-accent text-primary-bg px-4 py-2 rounded-md hover:bg-bright-pink transition-colors">Subscribe to Beehiiv</button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;