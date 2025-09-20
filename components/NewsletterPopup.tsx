import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image component
import Script from 'next/script';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={handleClose}>
      <div className="bg-primary-bg p-8 rounded-lg shadow-lg max-w-md text-center relative border border-text-color font-sans" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-text-color hover:text-accent text-xl"
        >
          &times;
        </button>
        <div className="mb-4">
          <Image src="/favicon.png" alt="Favicon" width={128} height={128} className="mx-auto" />
        </div>
        <p className="text-xl font-semibold mb-4 text-text-color">
          Hey, I'm Akhil. Every Monday I share the AI examples I compiled in the last week. Maybe you should subscribe to it.
        </p>
        <div className="beehiiv-form-embed">
          <Script async src="https://subscribe-forms.beehiiv.com/embed.js" />
          <iframe src="https://subscribe-forms.beehiiv.com/3881a34c-be47-4794-a1d5-73fe5d800844" className="beehiiv-embed" data-test-id="beehiiv-embed" frameBorder="0" scrolling="no" style={{width: "100%", height: "307px", margin: "0 auto", borderRadius: "0px !important", backgroundColor: "transparent", boxShadow: "0 0 #0000", maxWidth: "100%"}}></iframe>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;