import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../lib/ai-tools-data';
import Navbar from '../components/Navbar';
import { ExternalLink, ArrowUpRight, Search, Map as MapIcon, Layers, Info } from 'lucide-react';

const TE_ORANGE = "#FF4F00";
const TE_BLACK = "#1A1A1A";
const TE_GRAY = "#F4F4F4";
const TE_BORDER = "#333333";

export default function BlueprintTools() {
  const [activeDept, setActiveDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return Array.from(new Set(aiTools.map(t => t.category))).sort();
  }, []);

  const filteredGroups = useMemo(() => {
    const groups: Record<string, AiTool[]> = {};
    
    categories.forEach(cat => {
      const tools = aiTools.filter(t => 
        t.category === cat && 
        (t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         t.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      if (tools.length > 0) {
        groups[cat] = tools;
      }
    });
    
    return groups;
  }, [categories, searchQuery]);

  const scrollToDept = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveDept(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F4F4] font-mono text-black selection:bg-[#FF4F00] selection:text-white overflow-hidden">
      <Head>
        <title>BLUEPRINT // AI TOOLS DIRECTORY</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
          
          .te-grid {
            background-image: radial-gradient(#d1d1d1 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          .dept-card {
            box-shadow: 4px 4px 0px rgba(0,0,0,1);
            transition: all 0.1s ease;
          }
          
          .dept-card:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px #FF4F00;
          }

          .tool-module {
            border: 1px solid #000;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: white;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .tool-module:hover {
            background: #FF4F00;
            color: white;
          }

          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #F4F4F4;
          }
          ::-webkit-scrollbar-thumb {
            background: #1A1A1A;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #FF4F00;
          }
        `}</style>
      </Head>

      {/* TOP HEADER / NAV BAR - INDUSTRIAL LOOK */}
      <header className="h-16 border-b-2 border-black flex items-center justify-between px-6 bg-white z-50">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-bold text-xs">TE</div>
          <div className="flex flex-col">
            <span className="text-[10px] leading-none opacity-50">STATION // 01</span>
            <span className="font-bold text-sm tracking-tighter uppercase">Blueprint Directory</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-[#FF4F00]">Home</Link>
            <Link href="/tools" className="hover:text-[#FF4F00]">Standard View</Link>
            <div className="px-3 py-1 border border-black bg-black text-white">MAP MODE</div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="SEARCH_SYSTEM..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#E0E0E0] border border-black px-3 py-1 text-[11px] w-48 focus:outline-none focus:ring-1 focus:ring-[#FF4F00] uppercase"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR DIRECTORY (FIXED NAV) */}
        <aside className="w-64 border-r-2 border-black bg-[#1A1A1A] text-white flex flex-col z-40">
          <div className="p-4 border-b border-[#333]">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Departments / Index</span>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => scrollToDept(`dept-${idx}`)}
                className={`w-full text-left px-4 py-3 border-b border-[#333] flex items-center justify-between group transition-colors ${activeDept === `dept-${idx}` ? 'bg-[#FF4F00] text-white' : 'hover:bg-[#2A2A2A]'}`}
              >
                <div className="flex flex-col">
                    <span className="text-[9px] opacity-40 leading-none mb-1">UNIT_{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-xs font-bold uppercase tracking-tight">{cat}</span>
                </div>
                <div className="w-2 h-2 rounded-full border border-white group-hover:bg-white"></div>
              </button>
            ))}
          </nav>
          <div className="p-4 bg-black text-[9px] leading-tight text-gray-500 uppercase">
             Status: Operational<br/>
             Tools: {aiTools.length}<br/>
             Build: 2026.04.14
          </div>
        </aside>

        {/* MAIN MAP AREA */}
        <main className="flex-1 overflow-y-auto p-12 te-grid relative">
          
          {/* INTRO BLOCK */}
          <div className="max-w-xl mb-16 border-l-4 border-[#FF4F00] pl-6 py-2">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Operation: Workspace</h1>
            <p className="text-xs text-gray-600 leading-relaxed uppercase">
              A high-precision functional map of the AI tool landscape. Each module represents a verified asset within the organizational framework. Navigate via the department index or explore the floor plan below.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {categories.map((cat, idx) => {
                const tools = filteredGroups[cat];
                if (!tools) return null;

                return (
                    <section 
                        key={cat} 
                        id={`dept-${idx}`}
                        className="dept-card bg-white border-2 border-black p-8 relative flex flex-col min-h-[400px]"
                    >
                        {/* DEPT HEADER */}
                        <div className="absolute top-0 right-0 p-4 text-[10px] text-gray-400 font-bold">
                            L-COORD: {String(idx).padStart(2, '0')}.{Math.floor(Math.random() * 99)}
                        </div>

                        <div className="mb-8 border-b-2 border-black pb-4">
                            <span className="inline-block bg-black text-white px-2 py-0.5 text-[10px] mb-2">DEPT-0{idx+1}</span>
                            <h2 className="text-2xl font-black uppercase tracking-tight">{cat}</h2>
                            <p className="text-[10px] text-gray-500 mt-1">{tools.length} MODULES DETECTED</p>
                        </div>

                        {/* TOOLS GRID WITHIN ROOM */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                            {tools.map((tool, tIdx) => (
                                <a 
                                    key={tool.name} 
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tool-module group"
                                >
                                    <div className="flex items-center space-x-2 truncate">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:bg-white animate-pulse"></div>
                                        <span className="truncate">{tool.name}</span>
                                    </div>
                                    <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                                </a>
                            ))}
                        </div>

                        {/* ROOM FLOOR DETAILS */}
                        <div className="mt-auto pt-4 border-t border-dotted border-gray-300 flex justify-between items-end text-[9px] text-gray-400 uppercase">
                            <div>
                                Access: Open Source / Freemium<br/>
                                Clearance: Level 1-3
                            </div>
                            <div className="text-right">
                                Room Capacity: {Math.ceil(tools.length * 1.5)}%<br/>
                                Maintenance: Verified Weekly
                            </div>
                        </div>
                    </section>
                )
            })}
          </div>

          {/* BACKGROUND DECORATIVE ELEMENTS */}
          <div className="absolute top-[200px] left-[50%] opacity-10 pointer-events-none -translate-x-1/2">
             <div className="text-[200px] font-black leading-none select-none">MAP_01</div>
          </div>
        </main>
      </div>

      {/* FOOTER BAR */}
      <footer className="h-8 border-t-2 border-black bg-white flex items-center justify-between px-6 z-50">
          <div className="text-[9px] font-bold uppercase tracking-widest flex space-x-4">
              <span className="text-[#FF4F00]">● LIVE_FEED</span>
              <span>Coordinates: 52.3676° N, 4.9041° E</span>
              <span className="hidden md:inline">Memory: 84% Available</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-widest">
              © 2026 Teenage Engineering Style Protocol
          </div>
      </footer>
    </div>
  );
}
