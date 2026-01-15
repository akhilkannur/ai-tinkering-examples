import React from 'react'
import Link from 'next/link'
import { ArrowRight, Settings } from 'lucide-react'

interface HorizontalStripProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  viewAllLink?: string;
}

export default function HorizontalStrip<T>({ title, items, renderItem, viewAllLink }: HorizontalStripProps<T>) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-headline text-text-color flex items-center gap-3 uppercase tracking-tight">
          <Settings size={24} className="text-accent" />
          {title}
        </h2>
        {viewAllLink && (
          <Link 
            href={viewAllLink}
            className="inline-flex items-center gap-1 text-text-secondary hover:text-accent transition-colors font-sans text-sm font-bold uppercase tracking-wider"
          >
            View All <ArrowRight size={16} />
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-64">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </section>
  );
}