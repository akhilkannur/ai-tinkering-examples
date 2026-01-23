import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Terminal, Minus, Square, X, Folder, File, ArrowRight } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import Link from 'next/link'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup7({ recipes }: MockupPageProps) {
  return (
    <div className="min-h-screen bg-[#008080] font-mono selection:bg-blue-800 selection:text-white pb-12">
      <Head>
        <title>AI Blueprints.exe</title>
      </Head>

      <Navbar />

      <main className="pt-24 px-4 container mx-auto max-w-5xl">
        
        {/* HERO WINDOW */}
        <div className="bg-[#C0C0C0] border-t-2 border-l-2 border-white shadow-[2px_2px_0px_0px_#000] mb-16 relative">
            <div className="bg-[#000080] px-2 py-1 flex justify-between items-center text-white select-none">
                <div className="font-bold text-sm tracking-wide">Welcome to AI Blueprints Setup</div>
                <div className="flex gap-1">
                    <button className="bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black w-4 h-4 flex items-center justify-center shadow-sm">
                        <Minus className="w-3 h-3 text-black" />
                    </button>
                    <button className="bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black w-4 h-4 flex items-center justify-center shadow-sm">
                        <Square className="w-2 h-2 text-black" />
                    </button>
                    <button className="bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black w-4 h-4 flex items-center justify-center shadow-sm text-black">
                        <X className="w-3 h-3" />
                    </button>
                </div>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-6 text-black">
                        Installation Wizard
                    </h1>
                    <p className="text-black mb-8 leading-relaxed">
                        This program will install <span className="bg-white px-1 border border-gray-400">700+ AI Blueprints</span> on your computer.<br/><br/>
                        It is strongly recommended that you exit all other prompting strategies before continuing.
                    </p>
                    <div className="flex gap-4">
                        <a href="#files" className="bg-[#C0C0C0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-6 py-2 active:border-t-black active:border-l-black active:border-b-white active:border-r-white font-bold text-black text-sm">
                            Next {'>'}
                        </a>
                        <button className="bg-[#C0C0C0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-6 py-2 active:border-t-black active:border-l-black active:border-b-white active:border-r-white text-black text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-64 aspect-square bg-white border-2 border-gray-500 shadow-inner p-4 overflow-y-auto">
                    <div className="font-mono text-xs space-y-1">
                        <p>Loading sales_ops.dll...</p>
                        <p>Loading seo_core.exe...</p>
                        <p>Extracting 760 files...</p>
                        <p className="text-blue-700">Done.</p>
                        <br/>
                        <p className="animate-pulse">_</p>
                    </div>
                </div>
            </div>
        </div>

        {/* FILE EXPLORER */}
        <div id="files" className="bg-white border-2 border-gray-400 shadow-xl">
            <div className="bg-[#C0C0C0] border-b border-gray-400 px-2 py-1 text-sm flex gap-4">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Help</span>
            </div>
            <div className="flex border-b border-gray-400 p-2 gap-2 bg-[#F0F0F0]">
                <div className="bg-white border border-gray-400 px-2 w-full flex items-center text-sm">
                    C:\My Documents\Blueprints\Top_Rated
                </div>
            </div>
            
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white">
                {recipes.slice(0, 16).map((recipe) => (
                    <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="group flex flex-col items-center gap-2 p-2 hover:bg-blue-700 hover:text-white cursor-pointer w-full text-center">
                        <div className="relative">
                            <FileText className="w-10 h-10 text-yellow-500 fill-current" />
                            {recipe.isPremium && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>}
                        </div>
                        <span className="text-xs truncate w-full px-1 font-sans">
                            {recipe.title.length > 20 ? recipe.title.substring(0, 18) + '...' : recipe.title}
                        </span>
                    </Link>
                ))}
            </div>
            
            <div className="bg-[#C0C0C0] border-t border-gray-400 px-2 py-1 text-xs flex gap-4">
                <span>{recipes.length} object(s)</span>
                <span>12.4 MB</span>
                <span>My Computer</span>
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
