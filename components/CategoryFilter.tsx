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
            ? 'bg-accent text-white border-accent' 
            : 'border-navy-dark text-text-secondary hover:text-text-color hover:border-text-secondary'
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
              ? 'bg-accent text-white border-accent' 
              : 'border-navy-dark text-text-secondary hover:text-text-color hover:border-text-secondary'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
