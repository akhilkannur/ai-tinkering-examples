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
      className="relative group p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center h-full cursor-pointer hover:bg-accent/20 transition-all duration-300"
      onClick={scrollToNewsletter}
      style={{ backgroundColor: '#ff8ba7' }}
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-black mb-4">Want 40+ more examples?</h3>
        <p className="text-lg text-black mb-4">Get weekly AI workflows ↓</p>
        <ArrowDown className="w-8 h-8 text-black mx-auto" />
      </div>
    </div>
  );
}
