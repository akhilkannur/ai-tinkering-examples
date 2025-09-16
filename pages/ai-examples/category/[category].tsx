import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Navbar from '../../../components/Navbar'
import ExampleCard from '../../../components/ExampleCard'
import ExampleModal from '../../../components/ExampleModal'
import { fetchExamples, fetchExampleBySlug, ExampleRecord } from '../../../lib/airtable'

interface CategoryPageProps {
  examples: ExampleRecord[]
  category: string
}

export default function CategoryPage({ examples, category }: CategoryPageProps) {
  const [selectedExample, setSelectedExample] = useState<ExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (example: ExampleRecord) => {
    setSelectedExample(example)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedExample(null), 300)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {category} Examples
          </h1>
          <p className="text-slate-600">
            {examples.length} example{examples.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        {examples.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No examples found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {examples.map((example, index) => (
              <ExampleCard 
                key={example.id} 
                example={example}
                priority={index < 4} // Prioritize first 4 images
                onOpen={handleOpenModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <ExampleModal
        example={selectedExample}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

// Keep your existing getStaticPaths and getStaticProps exactly as they are
// Just add this if they don't exist:

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const examples = await fetchExamples()
    const categories = examples
      .map(ex => ex.category)
      .filter(Boolean)
      .filter((cat, idx, arr) => arr.indexOf(cat) === idx)
    
    const paths = categories.map(category => ({
      params: { 
        category: category!.toLowerCase().replace(/\s+/g, '-') 
      }
    }))
    
    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.error('Error generating static paths:', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  try {
    const categorySlug = params?.category as string
    const allExamples = await fetchExamples()
    
    // Convert URL slug back to category name
    const categoryName = categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    // Filter examples for this category
    const examples = allExamples.filter(ex => 
      ex.category?.toLowerCase() === categoryName.toLowerCase()
    )
    
    if (examples.length === 0) {
      return { notFound: true }
    }
    
    return {
      props: {
        examples,
        category: categoryName
      },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Error fetching examples:', error)
    return { notFound: true }
  }
}
