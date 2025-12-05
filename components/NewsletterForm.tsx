import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Beehiiv hosted form with email pre-filled
    const beehiivUrl = `https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798?email=${encodeURIComponent(email)}`;
    window.open(beehiivUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-0">
        <input
          className="flex-grow appearance-none bg-primary-bg border border-navy-dark border-r-0 sm:border-r-0 text-text-color py-3 px-4 leading-tight focus:outline-none focus:border-accent font-mono placeholder-text-secondary rounded-none transition-colors"
          type="email"
          placeholder="Enter your email..."
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="flex-shrink-0 bg-accent hover:bg-accent-hover border border-accent text-electric-blue text-sm font-bold py-3 px-6 rounded-none font-mono uppercase tracking-wide transition-colors flex items-center justify-center gap-2 group"
          type="submit"
        >
          Subscribe
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <p className="text-xs text-text-secondary mt-2 font-mono text-center sm:text-left">
        Join hundreds of other tinkerers. No spam.
      </p>
    </form>
  );
}
