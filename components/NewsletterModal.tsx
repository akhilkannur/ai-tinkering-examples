import React from 'react';
import { X } from 'lucide-react';
import NewsletterForm from './NewsletterForm'; // Assuming NewsletterForm is in the same components directory

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-primary-text">Join the creative revolution!</h2>
        <p className="text-center text-secondary-text mb-6">
          Sign up for our newsletter to get updates, tips, and early access.
        </p>
        <NewsletterForm />
      </div>
    </div>
  );
};

export default NewsletterModal;
