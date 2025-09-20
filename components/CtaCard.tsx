import { ArrowDown } from 'lucide-react';

export default function CtaCard() {
  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative group bg-secondary-bg p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center h-full cursor-pointer hover:bg-accent/20 transition-all duration-300"
      onClick={scrollToNewsletter}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4">Want 40+ more examples?</h3>
        <p className="text-lg text-light-purple mb-4">Get weekly AI workflows ↓</p>
        <ArrowDown className="w-8 h-8 text-white mx-auto" />
      </div>
    </div>
  );
}
