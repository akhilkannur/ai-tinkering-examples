import Image from 'next/image';
import React from 'react';

interface AIToolCardProps {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
}

export default function AIToolCard({ name, description, url, imageUrl, category }: AIToolCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-navy-dark rounded-none bg-secondary-bg shadow-none h-full flex flex-col justify-between transform hover:-translate-y-1 hover:border-accent transition-all duration-300"
    >
      <div>
        <div className="relative w-full h-40 rounded-none overflow-hidden bg-navy-dark mb-4 border-b border-navy-dark">
          <Image
            src={imageUrl}
            alt={`${name} logo`}
            fill
            className="object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
        <h3 className="text-lg font-mono font-semibold text-text-color mb-2">{name}</h3>
        <p className="text-sm text-text-secondary mb-4">{description}</p>
      </div>
      <div className="text-xs text-accent font-mono bg-navy-dark border border-navy-dark rounded-none px-2 py-1 self-start">
        {category}
      </div>
    </a>
  );
}