import React from 'react';

export default function NewsletterForm() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden h-[50px] border border-navy-dark rounded-none bg-primary-bg flex items-center">
        {/*
          The iframe height is set to allow the Beehiiv form's input and button to show,
          while the parent div crops out the header/extra spacing.
          Adjust the iframe's `margin-top` and the parent `h-[XXpx]` value if Beehiiv's embed changes.
        */}
        <iframe 
          src="https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798" 
          data-test-id="beehiiv-embed" 
          frameBorder="0" 
          scrolling="no" 
          style={{ 
            width: '100%', 
            height: '147px', // Beehiiv's default embed height
            marginTop: '-62px', // Adjust this to crop the header, showing only input/button
          }} 
          className="mx-auto block bg-transparent" 
        />
      </div>
      <p className="text-xs text-text-secondary mt-2 font-mono text-center">
        Join hundreds of other tinkerers. No spam.
      </p>
    </div>
  );
}
