interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 py-2 scrollbar-hide overflow-x-auto">
      <button 
        onClick={() => onSelect('All')} 
        className={`px-6 py-2 border-2 border-black font-display text-xs uppercase transition-all brutalist-shadow-sm ${
          selectedCategory === 'All' 
            ? 'bg-black text-[#ccff00]' 
            : 'bg-white text-black hover:bg-[#ccff00]'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button 
          key={category} 
          onClick={() => onSelect(category)} 
          className={`px-6 py-2 border-2 border-black font-display text-xs uppercase transition-all brutalist-shadow-sm ${
            selectedCategory === category 
              ? 'bg-black text-[#ccff00]' 
              : 'bg-white text-black hover:bg-[#ccff00]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
