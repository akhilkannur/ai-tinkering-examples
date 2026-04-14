import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../lib/ai-tools-data';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Search,
  BookOpen,
  Filter,
  ChevronRight,
  Archive,
  Hash
} from 'lucide-react';

const COLORS = {
  paper: "#FDFBF7",
  ink: "#1A1A1A",
  accent: "#9D8461",
  border: "rgba(26, 26, 26, 0.1)",
  gray: "#71717A"
};

const ToolIndexCard = ({ tool, index }: { tool: AiTool, index: number }) => {
  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, rotate: 1 }}
      className="group relative bg-white border border-black/10 p-6 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* SERIAL NUMBER - THE ARCHIVAL TOUCH */}
      <div className="absolute top-4 right-6 text-[9px] font-bold tracking-[0.3em] text-gray-300 uppercase">
        Ref. #{String(index + 1).padStart(3, '0')}
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9D8461] border-b border-[#9D8461]/20 pb-0.5">
                {tool.category}
            </span>
        </div>
        
        <h3 className="serif-title text-2xl font-bold italic leading-tight text-[#1A1A1A] group-hover:text-[#9D8461] transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-xs italic leading-relaxed text-gray-500 mt-3 line-clamp-3">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 flex justify-between items-end border-t border-black/5 pt-4">
        <div className="flex space-x-1">
            {tool.tags.useCase.slice(0, 2).map(tag => (
                <span key={tag} className="text-[8px] uppercase font-bold tracking-widest text-gray-400 bg-gray-50 px-1.5 py-0.5">{tag}</span>
            ))}
        </div>
        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#9D8461] transition-colors" />
      </div>
    </motion.a>
  );
};

export default function EditorialArchive() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(aiTools.map(t => t.category))).sort()];
  }, []);

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      const matchCat = activeCategory === 'All' || tool.category === activeCategory;
      const matchSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#1A1A1A] selection:bg-[#9D8461] selection:text-white pb-40">
      <Head>
        <title>THE ARCHIVE // CURATED TOOLS</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,700&family=Outfit:wght@300;400;600&display=swap');
          
          .serif-title {
            font-family: 'Cormorant Garamond', serif;
          }
          
          .paper-grain {
            background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
            opacity: 0.1;
            pointer-events: none;
          }

          .sidebar-tab {
            position: relative;
            padding-left: 1.5rem;
            transition: all 0.3s ease;
          }

          .sidebar-tab::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 4px;
            height: 0%;
            background-color: #9D8461;
            transform: translateY(-50%);
            transition: height 0.3s ease;
          }

          .sidebar-tab:hover::before, .sidebar-tab.active::before {
            height: 70%;
          }

          /* Hidden Scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #FDFBF7;
          }
          ::-webkit-scrollbar-thumb {
            background: #E5E7EB;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #9D8461;
          }
        `}</style>
      </Head>

      <div className="fixed inset-0 paper-grain z-50 pointer-events-none" />

      {/* MINIMAL NAV BAR */}
      <header className="h-24 border-b border-black/5 flex items-center justify-between px-8 md:px-12 bg-[#FDFBF7]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex flex-col">
            <h1 className="serif-title text-4xl font-bold italic leading-none">The Archive</h1>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#9D8461] mt-2">Functional Utility Index</span>
        </div>

        <div className="flex items-center space-x-12">
            <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#9D8461] transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search the collection..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-b border-black/10 focus:border-[#9D8461] pl-8 py-2 text-sm outline-none w-64 transition-all placeholder:italic placeholder:text-gray-200"
                />
            </div>
            <Link href="/tools" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">Standard View</Link>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto flex px-8 md:px-12 mt-16">
        
        {/* THE FILING SIDEBAR */}
        <aside className="w-64 hidden xl:block sticky top-40 h-[fit-content]">
            <div className="flex items-center space-x-3 mb-10 opacity-30">
                <Archive className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Index Categories</span>
            </div>
            <nav className="flex flex-col space-y-4">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`sidebar-tab text-left text-xs font-bold uppercase tracking-tight transition-all ${activeCategory === cat ? 'active text-[#9D8461]' : 'text-gray-400 hover:text-black'}`}
                    >
                        {cat}
                        <span className="ml-2 opacity-20 text-[9px]">({aiTools.filter(t => t.category === cat || cat === 'All').length})</span>
                    </button>
                ))}
            </nav>
        </aside>

        {/* THE MAIN ARCHIVE GRID */}
        <main className="flex-1 xl:ml-20">
            <div className="mb-12 flex justify-between items-end border-b border-black/5 pb-8">
                <div className="flex flex-col">
                    <h2 className="serif-title text-5xl italic font-bold tracking-tight">{activeCategory === 'All' ? 'Complete Collection' : activeCategory}</h2>
                    <p className="text-sm italic text-gray-400 mt-2">Displaying {filteredTools.length} curated assets in this department.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool, idx) => (
                        <ToolIndexCard key={tool.name} tool={tool} index={idx} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredTools.length === 0 && (
                <div className="py-40 flex flex-col items-center justify-center opacity-20">
                    <Hash className="w-20 h-20 mb-4" />
                    <p className="serif-title text-3xl italic">No matching assets found in the archive.</p>
                </div>
            )}
        </main>
      </div>

      {/* END OF FILE STAMP */}
      <footer className="mt-40 flex flex-col items-center justify-center text-center opacity-30">
          <div className="w-px h-24 bg-black/10 mb-8" />
          <h2 className="serif-title text-5xl italic mb-4">Fin.</h2>
          <div className="border border-black px-6 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em]">
              Archival Copy // Verified 2026
          </div>
      </footer>
    </div>
  );
}
