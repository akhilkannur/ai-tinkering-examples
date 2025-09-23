

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
        <h3 className="text-2xl font-bold text-text-color mb-4">Want 5+ examples every week?</h3>
        <p className="text-lg text-text-color mb-4">Get weekly AI ideas</p>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-accent animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
