interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 py-2 scrollbar-hide overflow-x-auto">
      <button 
        onClick={() => onSelect('All')} 
        className={`px-4 py-1.5 border text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
          selectedCategory === 'All' 
            ? 'bg-black border-black text-white' 
            : 'bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button 
          key={category} 
          onClick={() => onSelect(category)} 
          className={`px-4 py-1.5 border text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
            selectedCategory === category 
              ? 'bg-black border-black text-white' 
              : 'bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
