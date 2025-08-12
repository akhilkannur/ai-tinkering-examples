import type { GetStaticProps } from 'next'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import NewsletterSignup from '../components/NewsletterSignup'
import ExampleCard from '../components/ExampleCard'
import CategoryFilter from '../components/CategoryFilter'
import { fetchExamples, ExampleRecord } from '../lib/airtable'
import { useState } from 'react'

export default function Home({ examples }: { examples: ExampleRecord[] }) {
  const [category, setCategory] = useState('All')
  const cats = Array.from(new Set(examples.map(e => e.category || 'Uncategorized').filter(Boolean)))
  const filtered = category === 'All' ? examples : examples.filter(e => (e.category || '') === category)

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-pink-50 min-h-screen">
      <Navbar />
      <main>
        <Hero />

        <section className="max-w-6xl mx-auto px-4">
          <CategoryFilter
            categories={cats}
            onSelect={(c) => setCategory(c)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-8">
            {filtered.map(e => (
              <div
                key={e.id}
                className="hover:scale-105 transition-transform duration-200"
              >
                <ExampleCard example={e} />
              </div>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-r from-pink-200 via-yellow-100 to-green-200 py-8 mt-12">
          <NewsletterSignup />
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const examples = await fetchExamples()
  return {
    props: { examples },
    revalidate: 60,
  }
}
