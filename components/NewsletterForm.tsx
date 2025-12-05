import { useState } from 'react';
import { ArrowRight, X, Mail } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Slim On-Page Form */}
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
            />
          </div>
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

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md bg-secondary-bg border border-navy-dark shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-navy-dark">
              <h3 className="text-lg font-mono font-bold text-text-color">Confirm Subscription</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Iframe */}
            <div className="p-4 bg-primary-bg">
              <p className="text-sm text-text-secondary mb-4 font-sans">
                Please complete the captcha if required and click Subscribe below.
              </p>
              <div className="relative w-full h-[350px] bg-white/5"> {/* Dark placeholder bg */}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
