import { useState, useEffect } from 'react'
import { getAllExamples } from '../../lib/airtable'
import ExampleCard from '../../components/ExampleCard'
import CategoryFilter from '../../components/CategoryFilter'
import ExampleModal from '../../components/ExampleModal'
import { ExampleRecord } from '../../types'

export default function ExamplesPage({ examples }: { examples: ExampleRecord[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredExamples, setFilteredExamples] = useState<ExampleRecord[]>([])
  const [modalExample, setModalExample] = useState<ExampleRecord | null>(null)

  useEffect(() => {
    let results = examples

    if (selectedCategory !== 'All') {
      results = results.filter(ex => ex.category === selectedCategory)
    }
    if (searchTerm) {
      results = results.filter(ex =>
        ex.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredExamples(results)
  }, [examples, searchTerm, selectedCategory])

  return (
    <div>
      {/* Filters Section */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <input
          type="text"
          placeholder="Search examples..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Results Count */}
        <div className="mt-4">
          <p className="text-sm text-slate-600">
            {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      </section>

      {/* Examples Grid */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {filteredExamples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredExamples.map(example => (
              <ExampleCard
                key={example.id}
                example={example}
                onOpen={(ex) => setModalExample(ex)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-2">No examples found</p>
            <p className="text-sm text-slate-500 mb-4">
              Try adjusting your search or category filter
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {modalExample && (
        <ExampleModal
          example={modalExample}
          onClose={() => setModalExample(null)}
        />
      )}
    </div>
  )
}

export async function getStaticProps() {
  const examples = await getAllExamples()
  return { props: { examples } }
}
