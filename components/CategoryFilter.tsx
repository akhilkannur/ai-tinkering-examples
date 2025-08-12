export default function CategoryFilter({
  categories,
  onSelect,
}: {
  categories: string[];
  onSelect: (c: string) => void;
}) {
  const allCategories = ["All", ...categories];

  return (
    <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
      {allCategories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className="px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium bg-white hover:bg-gray-100 hover:shadow-sm transition-all whitespace-nowrap"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
