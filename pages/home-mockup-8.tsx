import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import Link from 'next/link'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup8({ recipes }: MockupPageProps) {
  return (
    <div className="min-h-screen bg-white text-[#37352f] font-sans selection:bg-[#2383e2] selection:text-white pb-24">
      <Head>
        <title>Untitled | AI Blueprints</title>
      </Head>

      <Navbar />

      <main className="pt-32 container mx-auto px-4 max-w-[900px]">
        
        {/* HERO */}
        <div className="mb-16 group relative">
            <div className="text-7xl mb-6">🤖</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 placeholder:text-gray-300">
                The AI Blueprint Library
            </h1>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 border-b border-gray-200 pb-8">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-[10px] font-bold">A</div>
                <span>Created by Akhil</span>
                <span className="text-gray-300">•</span>
                <span>Updated today</span>
            </div>

            <p className="text-lg leading-relaxed mb-6">
                Most people use LLMs like a chatbot. The pros use them like a compiler.<br/>
                Here is a database of <strong>{recipes.length} structured workflows</strong> you can copy-paste to automate your job.
            </p>

            <div className="bg-[#F7F6F3] p-4 rounded text-sm text-gray-600 mb-12 flex gap-4">
                <span className="font-bold">💡 Tip:</span>
                <span>Press <code className="bg-white border border-gray-200 px-1 rounded text-xs">Cmd+K</code> to search the database.</span>
            </div>
        </div>

        {/* TABLE OF CONTENTS */}
        <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Table of Contents</h2>
            <ul className="list-disc list-inside text-blue-600 underline decoration-gray-300 underline-offset-4 space-y-2">
                <li><a href="#sales">Sales Operations</a></li>
                <li><a href="#seo">SEO & Content</a></li>
                <li><a href="#growth">Growth Engineering</a></li>
            </ul>
        </div>

        {/* DATABASE VIEW */}
        <h2 id="sales" className="text-2xl font-bold mb-6 mt-16 flex items-center gap-2">
            <span className="bg-yellow-100 px-1 rounded text-yellow-800 text-sm font-normal align-middle">DATA</span>
            All Blueprints
        </h2>

        <div className="border border-gray-200 rounded overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 bg-[#F7F6F3] text-xs font-bold text-gray-500 border-b border-gray-200 py-2 px-4">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Tags</div>
                <div className="col-span-3">Status</div>
            </div>

            {/* Rows */}
            {recipes.slice(0, 20).map((recipe) => (
                <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="grid grid-cols-12 py-3 px-4 border-b border-gray-100 hover:bg-[#F7F6F3] transition-colors text-sm items-center">
                    <div className="col-span-6 font-medium flex items-center gap-2 truncate pr-4">
                        <span className="text-lg">📄</span>
                        <span className="border-b border-gray-300 pb-0.5 truncate">{recipe.title}</span>
                    </div>
                    <div className="col-span-3">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                            recipe.category === 'Sales Ops' ? 'bg-orange-100 text-orange-800' :
                            recipe.category === 'SEO' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-600'
                        }`}>
                            {recipe.category || 'Draft'}
                        </span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                        <input type="checkbox" checked readOnly className="rounded border-gray-300 text-blue-600 focus:ring-0" />
                        <span className="text-gray-400">Done</span>
                    </div>
                </Link>
            ))}
            
            <div className="py-3 px-4 text-sm text-gray-400 italic hover:bg-[#F7F6F3] cursor-pointer">
                + New
            </div>
        </div>

      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<MockupPageProps> = async () => {
  try {
    const recipes = getAllRecipes();
    return {
      props: { recipes },
      revalidate: 300,
    }
  } catch (error) {
    return {
      props: { recipes: [] },
      revalidate: 60,
    }
  }
}
