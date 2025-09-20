import React, { useEffect, useState } from 'react';

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
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <p className="text-xl font-semibold mb-4">
          Hey, I'm Akhil. Every Monday I share the AI examples I compiled in the last week. Maybe you should subscribe to it.
        </p>
        {/* Beehiiv embedded form button will go here */}
        <div className="beehiiv-form-embed">
          {/* Replace with actual Beehiiv embed code */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Subscribe to Beehiiv</button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
