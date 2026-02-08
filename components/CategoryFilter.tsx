interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
      <button 
        onClick={() => onSelect('All')} 
        className={`px-4 py-2 border-2 whitespace-nowrap transition-colors font-bold uppercase tracking-widest text-xs ${
          selectedCategory === 'All' 
            ? 'bg-accent text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
            : 'border-black text-text-color bg-black/20 hover:bg-black/40'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button 
          key={category} 
          onClick={() => onSelect(category)} 
          className={`px-4 py-2 border-2 whitespace-nowrap transition-colors font-bold uppercase tracking-widest text-xs ${
            selectedCategory === category 
              ? 'bg-accent text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
              : 'border-black text-text-color bg-black/20 hover:bg-black/40'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
