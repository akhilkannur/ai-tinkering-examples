import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../lib/ai-tools-data';
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Search,
  Power,
  Zap,
  Activity,
  Maximize2,
  Move,
  X,
  Volume2,
  Lock,
  Unlock
} from 'lucide-react';

const DEPARTMENTS = [
  { id: 'writing', name: "CONTENT_LAB", category: "Writing & Content", x: -1000, y: -600, w: 800, h: 600, color: "#EC4899" }, // Hot Pink
  { id: 'video', name: "RENDER_CORE", category: "Video & Audio", x: 200, y: -700, w: 1000, h: 800, color: "#3B82F6" }, // Electric Blue
  { id: 'image', name: "SYNTH_STUDIO", category: "Image Generation", x: 1400, y: -500, w: 800, h: 900, color: "#22C55E" }, // Toxic Green
  { id: 'market', name: "MARKET_GRID", category: "Marketing & Sales", x: 100, y: 300, w: 1100, h: 700, color: "#F97316" }, // Safety Orange
  { id: 'dev', name: "ENGINE_ROOM", category: "Development", x: -1100, y: 200, w: 900, h: 800, color: "#FFFFFF" }, // Clean White
  { id: 'research', name: "DATA_VAULT", category: "Research", x: 1400, y: 600, w: 800, h: 600, color: "#A855F7" }, // Purple
];

const GridRoom = ({ dept, tools, isActive, onToggle, onFocus }: any) => {
  return (
    <motion.div 
      className="absolute"
      style={{ left: dept.x, top: dept.y, width: dept.w, height: dept.h }}
    >
      {/* GLOW EFFECT */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-[-40px] blur-[100px] rounded-full pointer-events-none"
            style={{ backgroundColor: dept.color + '33' }}
          />
        )}
      </AnimatePresence>

      {/* THE ROOM CONTAINER */}
      <div 
        className={`relative w-full h-full border-2 transition-all duration-700 overflow-hidden ${isActive ? 'bg-black/80 border-white shadow-[0_0_50px_rgba(255,255,255,0.1)]' : 'bg-transparent border-white/10 hover:border-white/30'}`}
        onClick={() => !isActive && onToggle()}
      >
          {/* BACKGROUND SCANLINES */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          {/* ROOM HEADER */}
          <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-black/50">
              <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-white/50">{dept.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                  <span className="text-[8px] font-mono text-white/20">COORD_{dept.x}_{dept.y}</span>
                  {isActive && <button onClick={(e) => { e.stopPropagation(); onFocus(); }}><Maximize2 className="w-3 h-3 text-white/50 hover:text-white" /></button>}
              </div>
          </div>

          {/* THE "POWER SWITCH" (WHEN INACTIVE) */}
          <AnimatePresence mode="wait">
            {!isActive ? (
                <motion.div 
                    key="inactive"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center space-y-4 cursor-pointer group"
                >
                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                        <Power className="w-8 h-8 text-white/10 group-hover:text-white group-hover:scale-110 transition-all" />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.5em] text-white/20 group-hover:text-white transition-colors italic">INITIALIZE_SYSTEM</span>
                </motion.div>
            ) : (
                <motion.div 
                    key="active"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 grid grid-cols-2 gap-4 h-full"
                >
                    {tools.slice(0, 8).map((tool: any, i: number) => (
                        <motion.a 
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-white/40 transition-all flex flex-col justify-between group/tool"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="text-xs font-black text-white/90 group-hover/tool:text-white">{tool.name}</h4>
                                <ArrowUpRight className="w-3 h-3 text-white/20 group-hover/tool:text-white" />
                            </div>
                            <div className="w-full h-px bg-white/5 mt-3 group-hover/tool:bg-white/20" />
                        </motion.a>
                    ))}
                    {tools.length > 8 && (
                        <div className="flex items-center justify-center text-[8px] font-bold text-white/20 uppercase tracking-widest">
                            + {tools.length - 8} ASSETS_LOADED
                        </div>
                    )}
                </motion.div>
            )}
          </AnimatePresence>

          {/* ROOM ACCENT (GLOWING BAR) */}
          {isActive && (
              <motion.div 
                layoutId={`accent-${dept.id}`}
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: dept.color }}
              />
          )}
      </div>
    </motion.div>
  );
};

export default function MidnightOffice() {
  const [mounted, setMounted] = useState(false);
  const [activeRooms, setActiveRooms] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.5);

  const springX = useSpring(x, { damping: 30, stiffness: 150 });
  const springY = useSpring(y, { damping: 30, stiffness: 150 });
  const springScale = useSpring(scale, { damping: 30, stiffness: 150 });

  const categorizedTools = useMemo(() => {
    const map: Record<string, AiTool[]> = {};
    DEPARTMENTS.forEach(d => {
      map[d.category] = aiTools.filter(t => t.category === d.category);
    });
    return map;
  }, []);

  const toggleRoom = (id: string) => {
    setActiveRooms(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const flyToRoom = (id: string | null) => {
    const dept = DEPARTMENTS.find(d => d.id === id);
    if (dept) {
        animate(x, -(dept.x + dept.w / 2) * 1.2, { duration: 1, ease: "circOut" });
        animate(y, -(dept.y + dept.h / 2) * 1.2, { duration: 1, ease: "circOut" });
        animate(scale, 1.2, { duration: 1, ease: "circOut" });
    } else {
        animate(x, 0, { duration: 1, ease: "circOut" });
        animate(y, 0, { duration: 1, ease: "circOut" });
        animate(scale, 0.5, { duration: 1, ease: "circOut" });
    }
  };

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden font-sans text-white select-none">
      <Head>
        <title>PROTOCOL_01 // THE ARCHIVE</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=JetBrains+Mono:wght@400;700&display=swap');
          
          .grid-bg {
            background-image: 
                radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 60px 60px;
          }

          .serif-brand {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
          }

          .mono {
            font-family: 'JetBrains Mono', monospace;
          }

          .flicker {
            animation: flicker 2s infinite;
          }

          @keyframes flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
            20%, 22%, 24%, 55% { opacity: 0.2; }
          }
        `}</style>
      </Head>

      {/* BACKGROUND BLUEPRINT */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      {/* THE CAMERA ENGINE */}
      <motion.main 
        drag
        dragConstraints={{ left: -2000, right: 2000, top: -2000, bottom: 2000 }}
        style={{ x: springX, y: springY, scale: springScale }}
        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
          <div className="relative">
             {/* CENTRAL CORE RADIUS */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[800px] h-[800px] border border-white/5 rounded-full" />
                <div className="w-[1200px] h-[1200px] border border-white/5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
             </div>

             {/* RENDER SYSTEM ROOMS */}
             {DEPARTMENTS.map((dept) => (
                <GridRoom 
                    key={dept.id}
                    dept={dept}
                    tools={categorizedTools[dept.category] || []}
                    isActive={activeRooms.includes(dept.id)}
                    onToggle={() => toggleRoom(dept.id)}
                    onFocus={() => flyToRoom(dept.id)}
                />
             ))}
          </div>
      </motion.main>

      {/* TOP HEADER - THE STATUS BAR */}
      <header className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-12 z-50 pointer-events-none">
        <div className="flex flex-col pointer-events-auto">
            <h1 className="serif-brand text-5xl tracking-tight text-white/90">The Archive</h1>
            <div className="flex items-center space-x-3 mt-2">
                <div className="h-1 w-12 bg-white/20" />
                <span className="mono text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Protocol Office // 2026.04.14</span>
            </div>
        </div>

        <div className="flex items-center space-x-8 pointer-events-auto">
            <div className="flex flex-col items-end mono text-[10px]">
                <span className="text-white/20 uppercase tracking-widest">System_Load</span>
                <span className="text-white/80">{(activeRooms.length / DEPARTMENTS.length * 100).toFixed(0)}% ACTIVE</span>
            </div>
            <Link href="/tools" className="bg-white text-black px-6 py-3 mono text-[10px] font-black uppercase tracking-widest hover:bg-[#EC4899] hover:text-white transition-colors">
                Exit_Session
            </Link>
        </div>
      </header>

      {/* SIDE NAV: FAST TRAVEL DIRECTORY */}
      <aside className="fixed left-12 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-50">
        <div className="w-px h-24 bg-white/10 mx-auto mb-4" />
        {DEPARTMENTS.map((dept) => (
            <button 
                key={dept.id}
                onClick={() => {
                    if (!activeRooms.includes(dept.id)) toggleRoom(dept.id);
                    flyToRoom(dept.id);
                }}
                className={`group flex items-center space-x-4 transition-all ${activeRooms.includes(dept.id) ? 'translate-x-2' : ''}`}
            >
                <div 
                    className={`w-3 h-3 rounded-full border transition-all ${activeRooms.includes(dept.id) ? 'scale-125' : 'border-white/20 group-hover:border-white'}`}
                    style={{ backgroundColor: activeRooms.includes(dept.id) ? dept.color : 'transparent' }}
                />
                <span className={`mono text-[10px] uppercase tracking-tighter ${activeRooms.includes(dept.id) ? 'text-white' : 'text-white/20 group-hover:text-white'}`}>
                    {dept.name}
                </span>
            </button>
        ))}
        <button 
            onClick={() => flyToRoom(null)}
            className="mt-8 mono text-[9px] text-white/20 hover:text-white uppercase tracking-widest"
        >
            [ Reset_Camera ]
        </button>
      </aside>

      {/* FOOTER TIP */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end z-50 pointer-events-none">
          <div className="mono text-[9px] text-white/10 uppercase tracking-[0.5em] max-w-xs leading-relaxed">
             Initialize departments to access decrypted tool assets. Panning required for full perimeter scan.
          </div>
          
          <div className="flex space-x-6 pointer-events-auto">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-5 flex items-center space-x-4">
                  <Activity className="w-5 h-5 text-green-500 animate-pulse" />
                  <div className="flex flex-col">
                      <span className="mono text-[10px] text-white font-bold">{aiTools.length} ASSETS</span>
                      <span className="mono text-[8px] text-white/30 uppercase tracking-widest">Verified & Secure</span>
                  </div>
              </div>
          </div>
      </div>

      {/* INITIAL LOAD OVERLAY */}
      <AnimatePresence>
          {!isReady && (
              <motion.div 
                exit={{ opacity: 0, scale: 1.1 }}
                className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center space-y-6"
              >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-t-2 border-white rounded-full"
                  />
                  <span className="mono text-[10px] uppercase tracking-[1em] text-white/40 animate-pulse">Establishing Connection...</span>
              </motion.div>
          )}
      </AnimatePresence>

    </div>
  );
}
