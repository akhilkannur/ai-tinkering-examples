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
      className="relative group p-6 rounded-lg custom-shadow flex flex-col justify-center items-center text-center h-full cursor-pointer bg-[#fef6e4] border border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-1"
      onClick={scrollToNewsletter}
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-text-color mb-4">Want 40+ more examples?</h3>
        <p className="text-lg text-text-color mb-4">Get weekly AI workflows</p>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
}
