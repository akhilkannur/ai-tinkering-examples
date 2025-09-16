import React from 'react'

interface HorizontalStripProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function HorizontalStrip<T>({ title, items, renderItem }: HorizontalStripProps<T>) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
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
