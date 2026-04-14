import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../lib/ai-tools-data';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Map as MapIcon, 
  Coffee, 
  Video, 
  PenTool, 
  Terminal, 
  Camera, 
  Users, 
  Search,
  BookOpen,
  Anchor,
  Compass
} from 'lucide-react';

const COLORS = {
  bg: "#FDF8F1", // Warm Cream Paper
  mustard: "#E1AD01",
  sage: "#93A891",
  terracotta: "#CD5C5C",
  palePink: "#F2D2BD",
  dustyBlue: "#7A8FA1",
  text: "#3A3A3A"
};

const categoryIcons: Record<string, any> = {
  "Video & Audio": Video,
  "Productivity": Coffee,
  "Image Generation": Camera,
  "Writing & Content": PenTool,
  "Development": Terminal,
  "Marketing & Sales": Users,
  "Research": BookOpen,
  "Data & Analytics": Compass,
  "Design": Anchor
};

const categoryColors: Record<string, string> = {
  "Video & Audio": COLORS.terracotta,
  "Productivity": COLORS.mustard,
  "Image Generation": COLORS.dustyBlue,
  "Writing & Content": COLORS.sage,
  "Development": COLORS.text,
  "Marketing & Sales": COLORS.palePink,
  "Research": COLORS.sage,
  "Data & Analytics": COLORS.mustard,
  "Design": COLORS.dustyBlue
};

export default function WesAndersonOffice() {
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(aiTools.map(t => t.category))).sort();
  }, []);

  const categorizedTools = useMemo(() => {
    const map: Record<string, AiTool[]> = {};
    categories.forEach(cat => {
      map[cat] = aiTools.filter(t => t.category === cat);
    });
    return map;
  }, [categories]);

  const scrollToRoom = (cat: string) => {
    const el = document.getElementById(`room-${cat.replace(/\s+/g, '-')}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveDept(cat);
      setIsZoomed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F1] font-sans text-[#3A3A3A] selection:bg-[#E1AD01] selection:text-white overflow-x-hidden">
      <Head>
        <title>THE DIRECTORY // A WES ANDERSON PRODUCTION</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,700&family=Outfit:wght@300;400;600&display=swap');
          
          .paper-texture {
            background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
            opacity: 0.15;
            pointer-events: none;
          }
          
          .serif-title {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
          }

          .room-border {
             border: 4px solid #3A3A3A;
             box-shadow: 8px 8px 0px rgba(0,0,0,0.05);
          }
          
          .room-label {
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          /* Symmetry Helper */
          .office-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          @media (max-width: 768px) {
            .office-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Head>

      <div className="fixed inset-0 paper-texture z-50"></div>

      {/* TOP NAV - GRAND HOTEL STYLE */}
      <header className="fixed top-0 left-0 right-0 h-24 bg-[#FDF8F1] border-b-2 border-[#3A3A3A] flex flex-col items-center justify-center z-40 px-10">
        <h1 className="serif-title text-4xl font-bold tracking-tight">The Curated Archive of Artificial Intelligence</h1>
        <div className="flex space-x-8 mt-2 text-[10px] room-label font-bold text-gray-400">
            <span>OFFICE FLOOR PLAN v.26</span>
            <span>EST. 2024</span>
            <Link href="/tools" className="text-[#3A3A3A] hover:text-[#E1AD01] border-b border-black">Exit to standard view</Link>
        </div>
      </header>

      <main className="pt-40 pb-40 px-6 md:px-20 relative">
        
        {/* THE DIRECTORY BOARD (FIXED NAVIGATION) */}
        <div className="fixed left-10 top-40 w-64 bg-white p-8 border-2 border-[#3A3A3A] shadow-[10px_10px_0px_#E1AD01] hidden xl:block z-30">
            <h3 className="serif-title text-2xl border-b border-black mb-4 italic">Directory</h3>
            <nav className="flex flex-col space-y-3">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => scrollToRoom(cat)}
                        className={`text-[11px] room-label text-left hover:text-[#E1AD01] transition-colors ${activeDept === cat ? 'text-[#E1AD01] font-bold' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </nav>
        </div>

        {/* THE OFFICE FLOOR PLAN */}
        <div className="office-grid">
            {categories.map((cat, idx) => {
                const tools = categorizedTools[cat];
                const Icon = categoryIcons[cat] || MapIcon;
                const roomColor = categoryColors[cat];

                return (
                    <motion.section 
                        key={cat}
                        id={`room-${cat.replace(/\s+/g, '-')}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`bg-white room-border p-10 flex flex-col items-center transition-all duration-500 ${activeDept === cat ? 'scale-105 shadow-[20px_20px_0px_rgba(0,0,0,0.1)]' : ''}`}
                    >
                        {/* THE ICON / DECORATIVE OBJECT */}
                        <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-6" style={{ backgroundColor: roomColor + '20' }}>
                            <Icon className="w-8 h-8" style={{ color: roomColor }} />
                        </div>

                        <span className="text-[10px] room-label font-bold text-gray-400 mb-1">DEPT NO. {String(idx + 1).padStart(2, '0')}</span>
                        <h2 className="serif-title text-3xl font-bold mb-8 text-center">{cat}</h2>

                        {/* THE TOOLS - LISTED LIKE STATIONERY */}
                        <div className="w-full space-y-4">
                            {tools.map(tool => (
                                <a 
                                    key={tool.name}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block border-b border-black/10 pb-2 hover:border-[#E1AD01] transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold tracking-tight group-hover:text-[#E1AD01] transition-colors">{tool.name}</span>
                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-[#E1AD01]" />
                                    </div>
                                    <p className="text-[11px] italic text-gray-500 mt-1 line-clamp-1">{tool.description}</p>
                                </a>
                            ))}
                        </div>

                        {/* THE "STAMP" */}
                        <div className="mt-10 pt-6 border-t border-dotted border-gray-300 w-full flex justify-center">
                            <div className="border border-black px-4 py-1 text-[9px] room-label font-bold text-gray-400">
                                INSPECTED & VERIFIED
                            </div>
                        </div>
                    </motion.section>
                )
            })}
        </div>

      </main>

      {/* FOOTER - THE END CREDITS */}
      <footer className="bg-[#3A3A3A] text-[#FDF8F1] py-20 px-10 flex flex-col items-center text-center">
          <div className="w-px h-24 bg-[#FDF8F1] mb-10"></div>
          <h2 className="serif-title text-5xl italic mb-6">Fin.</h2>
          <p className="room-label text-[10px] font-bold tracking-[0.4em] opacity-50">A Product of Exceptional Utility</p>
          <div className="mt-20 flex space-x-10 text-[9px] room-label font-bold uppercase">
              <Link href="/">Homepage</Link>
              <Link href="/tools">Standard Tools</Link>
              <Link href="/about">About the Archive</Link>
          </div>
      </footer>
    </div>
  );
}
