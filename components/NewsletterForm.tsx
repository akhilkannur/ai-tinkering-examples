import { useState } from 'react';
import { ArrowRight, Mail, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'input' | 'confirm'>('input');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      // Simulate a brief loading state for better UX
      setTimeout(() => {
        setStep('confirm');
        setIsLoading(false);
      }, 600);
    }
  };

  if (step === 'confirm') {
    return (
      <div className="w-full max-w-md mx-auto fade-in">
        <div className="relative w-full h-[160px] bg-primary-bg border border-navy-dark animate-in slide-in-from-bottom-2 duration-300">
          <iframe 
            src={`https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798?email=${encodeURIComponent(email)}`}
            data-test-id="beehiiv-embed" 
            frameBorder="0" 
            scrolling="no" 
            style={{ width: '100%', height: '100%' }} 
            className="block" 
            title="Beehiiv Newsletter Signup"
          />
        </div>
        <p className="text-xs text-accent mt-2 font-mono text-center animate-pulse">
          Almost there! Please confirm above.
        </p>
        <button 
          onClick={() => setStep('input')}
          className="text-xs text-text-secondary mt-2 hover:underline block mx-auto font-mono"
        >
          Back to edit email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-0 shadow-lg">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={16} className="text-text-secondary" />
          </div>
          <input
            className="w-full appearance-none bg-primary-bg border border-navy-dark border-r-0 sm:border-r-0 text-text-color py-3 pl-10 pr-4 leading-tight focus:outline-none focus:border-accent font-mono placeholder-text-secondary rounded-none transition-colors"
            type="email"
            placeholder="Enter your email..."
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button
          className="flex-shrink-0 bg-accent hover:bg-accent-hover border border-accent text-electric-blue text-sm font-bold py-3 px-6 rounded-none font-mono uppercase tracking-wide transition-colors flex items-center justify-center gap-2 group min-w-[140px]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-text-secondary mt-2 font-mono text-center sm:text-left">
        Join hundreds of other tinkerers. No spam.
      </p>
    </form>
  );
}
