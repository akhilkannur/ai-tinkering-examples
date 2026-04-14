import React, { useState, useMemo, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../lib/ai-tools-data';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  RotateCcw, 
  LayoutGrid, 
  Move,
  Info,
  ExternalLink,
  Trash2,
  Sparkles
} from 'lucide-react';

// Wes Anderson / Neal.fun hybrid palette
const PALETTE = {
  paper: "#F4F1EA",
  blueprint: "#2C3E50",
  mustard: "#E1AD01",
  sage: "#93A891",
  terracotta: "#CD5C5C",
  sky: "#A8DADC",
  ink: "#1A1A1A"
};

const CATEGORY_COLORS: Record<string, string> = {
  "Video & Audio": "#CD5C5C",
  "Productivity": "#E1AD01",
  "Image Generation": "#457B9D",
  "Writing & Content": "#93A891",
  "Development": "#1A1A1A",
  "Marketing & Sales": "#F2D2BD",
  "Research": "#7A8FA1",
  "Design": "#E63946"
};

const ToolToken = ({ tool, isOrganized, index, total }: { tool: AiTool, isOrganized: boolean, index: number, total: number }) => {
  // Random starting position for the "mess"
  const randomX = useMemo(() => (Math.random() - 0.5) * 800, []);
  const randomY = useMemo(() => (Math.random() - 0.5) * 400, []);
  const randomRotate = useMemo(() => (Math.random() - 0.5) * 40, []);

  // Organized position (simplified grid for this demo)
  const organizedX = (index % 10) * 110 - 500;
  const organizedY = Math.floor(index / 10) * 130 - 200;

  return (
    <motion.div
      drag
      dragMomentum={true}
      initial={{ x: randomX, y: randomY, rotate: randomRotate, opacity: 0 }}
      animate={{ 
        x: isOrganized ? organizedX : randomX, 
        y: isOrganized ? organizedY : randomY,
        rotate: isOrganized ? 0 : randomRotate,
        opacity: 1,
        scale: 1
      }}
      whileHover={{ scale: 1.1, zIndex: 50, rotate: 0 }}
      whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0 }}
      className="absolute cursor-grab active:cursor-grabbing group"
    >
      <div className="w-24 h-28 bg-white border-2 border-black rounded-lg p-2 flex flex-col items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_#E1AD01] transition-shadow">
        <div 
            className="w-full h-12 rounded border border-black/10 mb-1 flex items-center justify-center overflow-hidden bg-gray-50"
            style={{ borderTop: `4px solid ${CATEGORY_COLORS[tool.category] || '#ccc'}` }}
        >
          {tool.image ? (
            <img src={tool.image} alt="" className="w-6 h-6 object-contain" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-gray-200" />
          )}
        </div>
        <span className="text-[9px] font-black uppercase tracking-tighter text-center leading-none line-clamp-2">
          {tool.name}
        </span>
        <div className="flex w-full justify-between items-center mt-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[tool.category] || '#ccc' }} />
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-gray-100 rounded">
                <ExternalLink className="w-3 h-3" />
            </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function MagneticOffice() {
  const [isOrganized, setIsOrganized] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // We limit to a playable set for performance in the physics view
  const displayTools = useMemo(() => aiTools.slice(0, 100), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-[#F4F1EA] overflow-hidden font-sans text-[#1A1A1A] select-none">
      <Head>
        <title>THE OFFICE SANDBOX // REALAIFX</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Outfit:wght@400;900&display=swap');
          
          .blueprint-grid {
            background-image: 
                radial-gradient(#d1d1d1 1px, transparent 1px);
            background-size: 40px 40px;
          }

          .serif-brand {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
          }

          .heavy-black {
            font-family: 'Outfit', sans-serif;
            font-weight: 900;
          }

          .neo-brutal {
            box-shadow: 8px 8px 0px #000;
            transition: all 0.1s ease;
          }

          .neo-brutal:active {
            transform: translate(2px, 2px);
            box-shadow: 4px 4px 0px #000;
          }
        `}</style>
      </Head>

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
      
      {/* THE OFFICE ROOMS (VISUAL ONLY) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <div className="grid grid-cols-4 gap-20">
             {[...Array(8)].map((_, i) => (
                 <div key={i} className="w-80 h-80 border-[10px] border-black rounded-3xl" />
             ))}
          </div>
      </div>

      {/* THE TOYS (PHYSICS LAYER) */}
      <main className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence>
            {displayTools.map((tool, idx) => (
                <ToolToken 
                    key={tool.name} 
                    tool={tool} 
                    isOrganized={isOrganized} 
                    index={idx}
                    total={displayTools.length}
                />
            ))}
        </AnimatePresence>

        {/* HUD: CENTER INSTRUCTIONS */}
        {!isOrganized && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="pointer-events-none text-center"
            >
                <Move className="w-20 h-20 mx-auto mb-4" />
                <h2 className="heavy-black text-6xl uppercase tracking-tighter italic">Drag Anything</h2>
            </motion.div>
        )}
      </main>

      {/* THE CONTROL CENTER (NEAL.FUN STYLE) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-50">
        
        {/* RESET / MESS UP */}
        <button 
            onClick={() => setIsOrganized(false)}
            className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center neo-brutal hover:bg-red-50"
            title="Mess up the office"
        >
            <RotateCcw className="w-8 h-8" />
        </button>

        {/* THE BIG ACTION BUTTON */}
        <button 
            onClick={() => setIsOrganized(!isOrganized)}
            className={`px-10 py-5 rounded-2xl border-4 border-black heavy-black text-2xl uppercase tracking-tight neo-brutal transition-colors ${isOrganized ? 'bg-[#93A891] text-white' : 'bg-[#FF4F00] text-white'}`}
        >
            {isOrganized ? 'Release the Tools' : 'Organize Everything'}
        </button>

        {/* INFO / STATS */}
        <div className="bg-white border-4 border-black p-4 rounded-2xl hidden md:flex flex-col justify-center neo-brutal min-w-[150px]">
            <span className="text-[10px] font-black uppercase opacity-40 leading-none mb-1">Office Inventory</span>
            <span className="heavy-black text-xl leading-none">{aiTools.length} ASSETS</span>
        </div>
      </div>

      {/* TOP HEADER */}
      <header className="fixed top-8 left-10 right-10 flex justify-between items-start z-50">
        <div className="flex flex-col">
            <h1 className="serif-brand text-5xl leading-none">The Great AI Floor Plan</h1>
            <p className="heavy-black text-[10px] uppercase tracking-[0.3em] mt-2 opacity-30">Experimental Sandbox // v1.0</p>
        </div>

        <div className="flex space-x-4">
            <Link href="/tools" className="bg-black text-white px-6 py-3 rounded-xl heavy-black text-xs uppercase tracking-widest hover:bg-[#E1AD01] transition-colors">
                Standard View
            </Link>
        </div>
      </header>

      {/* FLOOR PLAN LABELS (ONLY WHEN ORGANIZED) */}
      <AnimatePresence>
          {isOrganized && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 pointer-events-none z-10"
              >
                  <div className="absolute top-[18%] left-[10%] heavy-black text-4xl opacity-5 uppercase italic">Department Alpha</div>
                  <div className="absolute top-[18%] right-[10%] heavy-black text-4xl opacity-5 uppercase italic">Creative Suites</div>
                  <div className="absolute bottom-[20%] left-[10%] heavy-black text-4xl opacity-5 uppercase italic">Development Lab</div>
                  <div className="absolute bottom-[20%] right-[10%] heavy-black text-4xl opacity-5 uppercase italic">Strategic Ops</div>
              </motion.div>
          )}
      </AnimatePresence>

      {/* FOOTER TIP */}
      <div className="fixed bottom-4 left-10 text-[9px] font-black uppercase opacity-20 tracking-widest">
          Hint: You can flick the cards across the room.
      </div>

    </div>
  );
}
