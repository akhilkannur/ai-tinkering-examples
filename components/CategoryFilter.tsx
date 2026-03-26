interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-sm">
      <button 
        onClick={() => onSelect('All')} 
        className={`px-lg py-sm rounded-pill border text-[0.875rem] font-medium transition-all ${
          selectedCategory === 'All' 
            ? 'bg-accent-dark border-accent-dark text-white' 
            : 'bg-transparent border-border-color text-secondary-text hover:border-secondary-text hover:text-primary-text'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button 
          key={category} 
          onClick={() => onSelect(category)} 
          className={`px-lg py-sm rounded-pill border text-[0.875rem] font-medium transition-all ${
            selectedCategory === category 
              ? 'bg-accent-dark border-accent-dark text-white' 
              : 'bg-transparent border-border-color text-secondary-text hover:border-secondary-text hover:text-primary-text'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
