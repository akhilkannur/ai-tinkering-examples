import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission to Beehiiv here
    console.log('Form submitted with email:', email);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center border-b border-accent py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-text-color mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="flex-shrink-0 bg-accent hover:bg-bright-pink border-accent hover:border-bright-pink text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
