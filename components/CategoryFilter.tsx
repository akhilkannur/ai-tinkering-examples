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
        className={`px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
          selectedCategory === 'All' 
            ? 'bg-black text-white border-black' 
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button 
          key={category} 
          onClick={() => onSelect(category)} 
          className={`px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
            selectedCategory === category 
              ? 'bg-black text-white border-black' 
              : 'border-slate-300 hover:border-slate-400'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
