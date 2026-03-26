interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar w-full p-1">
      <button 
        onClick={() => onSelect('All')} 
        className={`px-6 py-2.5 rounded-full font-medium text-sm tracking-wide whitespace-nowrap transition-all shadow-sm ${
          selectedCategory === 'All' 
            ? 'bg-coffee-900 text-white shadow-md hover:scale-105' 
            : 'bg-white border border-coffee-200 text-coffee-700 hover:bg-coffee-50 hover:text-coffee-900 hover:shadow'
        }`}
      >
        All Examples
      </button>
      {categories.map(category => (
        <button 
          key={category} 
          onClick={() => onSelect(category)} 
          className={`px-6 py-2.5 rounded-full font-medium text-sm tracking-wide whitespace-nowrap transition-all shadow-sm ${
            selectedCategory === category 
              ? 'bg-coffee-900 text-white shadow-md hover:scale-105' 
              : 'bg-white border border-coffee-200 text-coffee-700 hover:bg-coffee-50 hover:text-coffee-900 hover:shadow'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
