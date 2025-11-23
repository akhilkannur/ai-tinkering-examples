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
      className="block p-4 border border-[#001858] rounded-lg bg-primary-bg shadow-lg h-full flex flex-col justify-between transform hover:-translate-y-1 hover:border-[#001858] transition-all duration-300"
    >
      <div>
        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-100 mb-4">
          <Image
            src={imageUrl}
            alt={`${name} logo`}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-text-color mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </div>
      <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1 self-start">
        {category}
      </div>
    </a>
  );
}