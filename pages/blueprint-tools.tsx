import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../lib/ai-tools-data';
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Search,
  Maximize2,
  Navigation,
  Move,
  Activity,
  Zap,
  Coffee,
  Terminal,
  Video,
  PenTool,
  Users,
  Compass,
  Layout,
  Radio,
  Power,
  X,
  Book
} from 'lucide-react';

const COLORS = {
  desk: "#D4B996", // Warm Oak Wood
  paper: "#FDFBF7",
  ink: "#2D241E",
  accent: "#9D8461",
  ceramic: "#F0EAD6"
};

const OBJECTS = [
  { id: 'writing', name: "The Notebook", category: "Writing & Content", x: -400, y: -300, w: 300, h: 400, rotation: -5, icon: PenTool, type: 'notebook' },
  { id: 'video', name: "The Film Reel", category: "Video & Audio", x: 200, y: -350, w: 350, h: 350, rotation: 10, icon: Video, type: 'film' },
  { id: 'image', name: "The Polaroids", category: "Image Generation", x: 500, y: 100, w: 400, h: 300, rotation: -12, icon: Radio, type: 'polaroid' },
  { id: 'prod', name: "The Coffee Mug", category: "Productivity", x: -500, y: 200, w: 250, h: 250, rotation: 5, icon: Coffee, type: 'mug' },
  { id: 'market', name: "The Business Cards", category: "Marketing & Sales", x: 50, y: 300, w: 300, h: 200, rotation: 8, icon: Users, type: 'cards' },
  { id: 'dev', name: "The Sketchbook", category: "Development", x: -900, y: -50, w: 450, h: 350, rotation: -3, icon: Terminal, type: 'notebook' },
];

const DeskObject = ({ obj, tools, onOpen }: { obj: any, tools: AiTool[], onOpen: () => void }) => {
  return (
    <motion.div 
      className="absolute cursor-pointer"
      style={{ left: obj.x, top: obj.y, width: obj.w, height: obj.h, rotate: obj.rotation }}
      whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.2 } }}
      onClick={onOpen}
    >
      {/* SHADOW */}
      <div className="absolute inset-0 bg-black/10 blur-xl translate-x-4 translate-y-4 rounded-lg pointer-events-none" />

      {/* THE OBJECT ITSELF */}
      <div className="absolute inset-0 bg-[#FDFBF7] border border-[#2D241E]/10 rounded-sm shadow-sm flex flex-col p-6 items-center justify-center text-center group">
          
          {/* VISUAL TYPE HELPERS */}
          {obj.type === 'notebook' && (
              <div className="absolute left-4 top-0 bottom-0 w-8 bg-[#2D241E]/5 border-r border-black/5" />
          )}

          {obj.type === 'mug' && (
              <div className="w-40 h-40 bg-[#FDFBF7] border-[6px] border-[#2D241E]/10 rounded-full flex items-center justify-center relative">
                  <div className="w-32 h-32 bg-[#2D241E]/5 rounded-full" />
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 border-[6px] border-[#2D241E]/10 rounded-r-full" />
              </div>
          )}

          {obj.type === 'polaroid' && (
             <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full border-[10px] border-white shadow-inner flex items-center justify-center bg-gray-50 opacity-20">
                    <span className="serif-title text-4xl italic opacity-10">IMAGE</span>
                </div>
             </div>
          )}

          <obj.icon className="w-10 h-10 text-[#2D241E]/20 mb-4 group-hover:text-[#9D8461] transition-colors" />
          <h3 className="serif-title text-2xl font-bold tracking-tight italic text-[#2D241E] leading-tight">{obj.name}</h3>
          <span className="text-[10px] uppercase tracking-widest text-[#2D241E]/40 mt-2 font-semibold">{obj.category}</span>
          
          {/* "PEEK" AT TOOLS */}
          <div className="mt-6 flex space-x-1 opacity-20 group-hover:opacity-100 transition-opacity">
              {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-[#2D241E]" />
              ))}
          </div>
      </div>
    </motion.div>
  );
};

export default function CozyStudio() {
  const [mounted, setMounted] = useState(false);
  const [activeObj, setActiveObj] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.9);

  const springX = useSpring(x, { damping: 40, stiffness: 200 });
  const springY = useSpring(y, { damping: 40, stiffness: 200 });
  const springScale = useSpring(scale, { damping: 40, stiffness: 200 });

  const categorizedTools = useMemo(() => {
    const map: Record<string, AiTool[]> = {};
    OBJECTS.forEach(r => {
      map[r.category] = aiTools.filter(t => t.category === r.category);
    });
    return map;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeOverlay = () => setActiveObj(null);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-[#D4B996] overflow-hidden font-sans text-[#2D241E] select-none">
      <Head>
        <title>THE STUDIO // REALAIFX</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,700&family=Outfit:wght@400;600&display=swap');
          
          .wood-texture {
            background-image: url("https://www.transparenttextures.com/patterns/wood-pattern.png");
            opacity: 0.15;
            pointer-events: none;
          }

          .serif-title {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
          }

          .human-sans {
            font-family: 'Outfit', sans-serif;
          }

          .soft-glow {
            box-shadow: 0 0 50px rgba(255,255,255,0.1);
          }
        `}</style>
      </Head>

      <div className="fixed inset-0 wood-texture z-50 pointer-events-none" />
      
      {/* THE DESK (DRAGGABLE) */}
      <motion.main 
        drag
        dragConstraints={{ left: -1000, right: 1000, top: -800, bottom: 800 }}
        style={{ x: springX, y: springY, scale: springScale }}
        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
          <div className="relative">
             {/* THE CENTRAL DECORATION (THE SOUL) */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                <div className="w-[1200px] h-px bg-[#2D241E]/10" />
                <div className="h-[1200px] w-px bg-[#2D241E]/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
             </div>

             {OBJECTS.map((obj) => (
                <DeskObject 
                    key={obj.id} 
                    obj={obj} 
                    tools={categorizedTools[obj.category] || []} 
                    onOpen={() => setActiveObj(obj.id)}
                />
             ))}
          </div>
      </motion.main>

      {/* OVERLAY: THE REVEAL (WHEN AN OBJECT IS CLICKED) */}
      <AnimatePresence>
        {activeObj && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[#2D241E]/40 backdrop-blur-sm z-[100] flex items-center justify-center p-10"
                onClick={closeOverlay}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-[#FDFBF7] w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={closeOverlay} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
                        <X className="w-5 h-5" />
                    </button>

                    {/* LEFT SIDE: THE OBJECT ICON & TITLE */}
                    <div className="w-full md:w-1/3 bg-[#F4F1EA] p-12 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#2D241E]/5">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                            {React.createElement(OBJECTS.find(o => o.id === activeObj)?.icon || Book, { className: "w-10 h-10 text-[#9D8461]" })}
                        </div>
                        <h2 className="serif-title text-4xl font-bold italic text-[#2D241E] mb-2">
                            {OBJECTS.find(o => o.id === activeObj)?.name}
                        </h2>
                        <span className="text-[11px] uppercase tracking-widest text-[#2D241E]/40 font-bold">
                            {OBJECTS.find(o => o.id === activeObj)?.category}
                        </span>
                    </div>

                    {/* RIGHT SIDE: THE TOOL LIST */}
                    <div className="w-full md:w-2/3 p-12 overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {categorizedTools[OBJECTS.find(o => o.id === activeObj)?.category || '']?.map(tool => (
                                <a 
                                    key={tool.name}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block"
                                >
                                    <div className="flex justify-between items-start border-b border-[#2D241E]/10 pb-2 group-hover:border-[#9D8461] transition-colors">
                                        <h4 className="text-sm font-bold tracking-tight text-[#2D241E] group-hover:text-[#9D8461] transition-colors">{tool.name}</h4>
                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-[#9D8461]" />
                                    </div>
                                    <p className="text-xs italic text-[#2D241E]/60 mt-2 line-clamp-2 leading-relaxed">
                                        {tool.description}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* HUD: THE HUMAN TOUCH */}
      <header className="fixed top-12 left-12 right-12 flex justify-between items-start pointer-events-none z-40">
        <div className="flex flex-col">
            <h1 className="serif-title text-5xl font-bold tracking-tight italic text-[#2D241E] opacity-90 drop-shadow-sm">The Creative Studio</h1>
            <p className="human-sans text-[11px] uppercase tracking-[0.4em] mt-3 opacity-40 font-bold">A Collection of Useful Things</p>
        </div>

        <div className="flex space-x-6 pointer-events-auto items-center">
            <div className="flex items-center space-x-4 bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40 shadow-sm">
                <Search className="w-4 h-4 opacity-40" />
                <input 
                    type="text" 
                    placeholder="Search my desk..." 
                    className="bg-transparent border-none outline-none text-xs human-sans italic text-[#2D241E] w-40 placeholder:text-[#2D241E]/30"
                />
            </div>
            <Link href="/tools" className="text-[11px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity">
                List View
            </Link>
        </div>
      </header>

      {/* FOOTER TIP (HAND-LETTERED FEEL) */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end pointer-events-none z-40 text-[#2D241E]/30">
        <div className="serif-title text-xl italic max-w-xs leading-tight">
            "Everything in its right place, even if it feels like a mess."
        </div>
        <div className="flex items-center space-x-4">
             <div className="flex flex-col items-end">
                <span className="text-[10px] human-sans font-bold uppercase tracking-widest">Inventory Status</span>
                <span className="serif-title text-lg italic">{aiTools.length} Assets Found</span>
             </div>
             <div className="w-px h-10 bg-[#2D241E]/10" />
             <div className="w-12 h-12 rounded-full border border-[#2D241E]/10 flex items-center justify-center bg-white/20">
                <Move className="w-4 h-4" />
             </div>
        </div>
      </div>

    </div>
  );
}
