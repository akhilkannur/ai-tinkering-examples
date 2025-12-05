import React from 'react';

export default function NewsletterForm() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative w-full bg-transparent">
        <iframe 
          src="https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798" 
          data-test-id="beehiiv-embed" 
          frameBorder="0" 
          scrolling="no" 
          style={{ 
            width: '100%', 
            height: '52px', // Matches the slim input height
            backgroundColor: 'transparent'
          }} 
          className="mx-auto block" 
          title="Beehiiv Newsletter Signup"
        />
      </div>
      <p className="text-xs text-text-secondary mt-2 font-mono text-center">
        Join hundreds of other tinkerers. No spam.
      </p>
    </div>
  );
}
