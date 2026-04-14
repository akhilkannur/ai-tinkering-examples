import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../lib/ai-tools-data';
import { motion, useMotionValue, useSpring, useAnimation, animate } from 'framer-motion';
import { 
  ArrowUpRight, 
  Map as MapIcon, 
  Search,
  Maximize2,
  Minimize2,
  Compass,
  Layout,
  Navigation,
  Move,
  Info
} from 'lucide-react';

const COLORS = {
  paper: "#FDF8F1",
  wall: "#2C3E50",
  wood: "#D2B48C",
  rug: "#E1AD01",
  sage: "#93A891",
  terracotta: "#CD5C5C",
  blueprint: "#A8DADC",
  ink: "#3A3A3A"
};

// DEPARTMENT CONFIGURATION (THE FLOOR PLAN)
const ROOMS = [
  { id: 'writing', name: "The Writers' Room", category: "Writing & Content", x: -800, y: -600, w: 700, h: 500, color: COLORS.sage },
  { id: 'video', name: "The Render Farm", category: "Video & Audio", x: 0, y: -600, w: 800, h: 600, color: COLORS.terracotta },
  { id: 'studio', name: "The Creative Studio", category: "Image Generation", x: 900, y: -600, w: 700, h: 700, color: COLORS.wood },
  { id: 'lab', name: "The Engineering Lab", category: "Development", x: -800, y: 0, w: 700, h: 800, color: "#1A1A1A" },
  { id: 'warroom', name: "The Strategic Hub", category: "Marketing & Sales", x: 0, y: 100, w: 800, h: 700, color: COLORS.rug },
  { id: 'archive', name: "The Knowledge Vault", category: "Research", x: 900, y: 200, w: 700, h: 600, color: COLORS.blueprint },
];

// DECORATIVE FURNITURE (TOP-DOWN)
const Plant = ({ x, y }: { x: number, y: number }) => (
  <div className="absolute rounded-full bg-[#2D5A27] w-12 h-12 shadow-lg flex items-center justify-center overflow-hidden" style={{ left: x, top: y }}>
    <div className="w-10 h-10 border-4 border-[#3D7A36] rounded-full rotate-45" />
    <div className="w-10 h-10 border-4 border-[#3D7A36] rounded-full -rotate-45 absolute" />
  </div>
);

const Desk = ({ x, y, w, h }: { x: number, y: number, w: number, h: number }) => (
  <div className="absolute bg-[#C19A6B] border-2 border-[#8B5E3C] shadow-md flex items-center justify-center" style={{ left: x, top: y, width: w, height: h }}>
    <div className="w-full h-px bg-[#8B5E3C] mt-2 opacity-50" />
    <div className="absolute w-12 h-8 bg-white/20 border border-white/30 top-1 right-2 rounded-sm" />
  </div>
);

const Room = ({ room, tools, onFocus }: { room: any, tools: AiTool[], onFocus: () => void }) => {
  return (
    <motion.div 
      className="absolute group cursor-pointer"
      style={{ left: room.x, top: room.y, width: room.w, height: room.h }}
      onClick={onFocus}
    >
      {/* WALLS & FLOOR */}
      <div 
        className="absolute inset-0 border-[8px] border-[#3A3A3A] shadow-[20px_20px_0px_rgba(0,0,0,0.05)] transition-all duration-500 bg-white"
        style={{ borderTop: `16px solid ${room.color}` }}
      >
          {/* FLOOR TEXTURE */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
          
          {/* ROOM LABEL */}
          <div className="absolute -top-10 left-0">
             <span className="serif-title text-2xl font-bold tracking-tight italic text-[#3A3A3A]">{room.name}</span>
          </div>

          {/* FURNITURE DECORATION (THE SOUL) */}
          <Plant x={20} y={20} />
          <Desk x={room.w / 2 - 100} y={40} w={200} h={80} />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gray-100 rounded-lg border-2 border-black/5 opacity-50" />
          <div className="absolute bottom-10 right-10 w-48 h-2 bg-black/10 rounded-full" />

          {/* TOOLS GRID (VISIBLE ON ZOOM) */}
          <div className="p-10 pt-20 grid grid-cols-2 md:grid-cols-3 gap-4 h-full overflow-hidden">
             {tools.slice(0, 12).map((tool, i) => (
                <a 
                   key={tool.name} 
                   href={tool.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="relative bg-white border border-black/20 p-3 shadow-sm hover:shadow-md hover:border-black transition-all flex flex-col justify-between group/tool"
                >
                   <div>
                      <span className="text-[10px] heavy-black uppercase opacity-40 leading-none mb-1 block">{tool.category}</span>
                      <h4 className="text-xs font-black uppercase tracking-tighter leading-tight group-hover/tool:text-[#E1AD01]">{tool.name}</h4>
                   </div>
                   <ArrowUpRight className="w-3 h-3 self-end opacity-20 group-hover/tool:opacity-100 transition-opacity" />
                </a>
             ))}
             {tools.length > 12 && (
                <div className="flex items-center justify-center text-[9px] font-bold opacity-30 uppercase">
                    + {tools.length - 12} more assets
                </div>
             )}
          </div>
      </div>
    </motion.div>
  );
};

export default function ArchitecturalOffice() {
  const [mounted, setMounted] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Motion values for Camera
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Smooth springs for camera
  const springConfig = { damping: 30, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  const categorizedTools = useMemo(() => {
    const map: Record<string, AiTool[]> = {};
    ROOMS.forEach(r => {
      map[r.category] = aiTools.filter(t => t.category === r.category);
    });
    return map;
  }, []);

  const flyTo = useCallback((targetX: number, targetY: number, targetScale: number, roomId: string | null) => {
    // Calculate centering offset
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // We want to center the room's center point in the viewport
    // Room coordinates are absolute, camera translates the world
    const room = ROOMS.find(r => r.id === roomId);
    let finalX = 0;
    let finalY = 0;

    if (roomId && room) {
        const centerX = room.x + room.w / 2;
        const centerY = room.y + room.h / 2;
        finalX = -centerX * targetScale;
        finalY = -centerY * targetScale;
    }

    animate(x, finalX, { duration: 0.8, ease: "easeInOut" });
    animate(y, finalY, { duration: 0.8, ease: "easeInOut" });
    animate(scale, targetScale, { duration: 0.8, ease: "easeInOut" });
    setActiveRoom(roomId);
  }, [x, y, scale]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-[#FDF8F1] overflow-hidden font-sans text-[#3A3A3A] select-none">
      <Head>
        <title>OFFICE FLOOR PLAN // REALAIFX ARCHIVE</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Outfit:wght@400;900&display=swap');
          
          .paper-texture {
            background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
            opacity: 0.1;
            pointer-events: none;
          }
          
          .serif-title {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
          }

          .heavy-black {
            font-family: 'Outfit', sans-serif;
            font-weight: 900;
          }

          .blueprint-lines {
            background-image: 
                linear-gradient(to right, #e0e0e0 1px, transparent 1px),
                linear-gradient(to bottom, #e0e0e0 1px, transparent 1px);
            background-size: 100px 100px;
          }
        `}</style>
      </Head>

      <div className="fixed inset-0 paper-texture z-50 pointer-events-none" />
      <div className="fixed inset-0 blueprint-lines opacity-40" />

      {/* THE CAMERA VIEWPORT */}
      <motion.main 
        drag
        dragConstraints={{ left: -3000, right: 3000, top: -2000, bottom: 2000 }}
        style={{ x: springX, y: springY, scale: springScale }}
        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
          <div className="relative">
             {/* CENTRAL HUB / ELEVATOR SHAFT */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-black/10 rounded-full flex flex-col items-center justify-center">
                <span className="text-[8px] heavy-black uppercase opacity-20 tracking-widest">Main Hub</span>
                <div className="w-1 h-32 bg-black/5 absolute top-full mt-4" />
                <div className="w-1 h-32 bg-black/5 absolute bottom-full mb-4" />
                <div className="h-1 w-32 bg-black/5 absolute left-full ml-4" />
                <div className="h-1 w-32 bg-black/5 absolute right-full mr-4" />
             </div>

             {/* RENDER ROOMS */}
             {ROOMS.map((room) => (
                <Room 
                    key={room.id} 
                    room={room} 
                    tools={categorizedTools[room.category] || []} 
                    onFocus={() => flyTo(0, 0, 1.5, room.id)}
                />
             ))}
          </div>
      </motion.main>

      {/* ELEVATOR DIRECTORY (FAST TRAVEL SIDEBAR) */}
      <aside className="fixed left-10 top-1/2 -translate-y-1/2 w-72 bg-white border-4 border-black p-8 z-40 shadow-[10px_10px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col mb-8 border-b-2 border-black pb-4">
            <h2 className="serif-title text-3xl italic leading-none">The Archive</h2>
            <span className="heavy-black text-[9px] uppercase tracking-widest mt-2 opacity-40">Elevator Directory</span>
        </div>

        <nav className="space-y-4">
            {ROOMS.map((room) => (
                <button 
                    key={room.id}
                    onClick={() => flyTo(0, 0, 1.5, room.id)}
                    className={`w-full flex items-center justify-between group text-left ${activeRoom === room.id ? 'text-[#E1AD01]' : 'hover:text-[#E1AD01]'}`}
                >
                    <div className="flex flex-col">
                        <span className="text-[8px] heavy-black uppercase opacity-30 leading-none mb-1">Floor 0{ROOMS.indexOf(room) + 1}</span>
                        <span className="text-sm font-black uppercase tracking-tight">{room.name}</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full border-2 border-black transition-colors ${activeRoom === room.id ? 'bg-[#E1AD01]' : 'group-hover:bg-gray-100'}`} />
                </button>
            ))}
        </nav>

        <button 
            onClick={() => flyTo(0, 0, 0.6, null)}
            className="w-full mt-10 py-3 bg-black text-white heavy-black text-[10px] uppercase tracking-widest hover:bg-[#E1AD01] transition-colors flex items-center justify-center space-x-2"
        >
            <Maximize2 className="w-3 h-3" />
            <span>Full Floor Plan</span>
        </button>
      </aside>

      {/* HUD: SEARCH & STATUS */}
      <header className="fixed top-10 left-10 right-10 flex justify-between items-start pointer-events-none z-40">
        <div className="bg-white border-2 border-black p-4 pointer-events-auto flex items-center space-x-4 shadow-[5px_5px_0px_rgba(0,0,0,1)]">
            <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-black text-xs">FX</div>
            <div className="flex flex-col">
                <span className="text-[9px] heavy-black uppercase opacity-40 leading-none">Live Protocol</span>
                <span className="text-xs font-black uppercase tracking-widest">Office: Operational</span>
            </div>
        </div>

        <div className="flex flex-col items-end space-y-4">
            <div className="bg-white border-2 border-black p-4 pointer-events-auto shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center space-x-3">
                <Search className="w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="FIND ASSET..." 
                    className="bg-transparent border-none outline-none text-xs heavy-black uppercase tracking-widest w-40"
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        // If searching, maybe fly to a global view
                        if (e.target.value) flyTo(0, 0, 0.5, null);
                    }}
                />
            </div>
            <Link href="/tools" className="bg-[#E1AD01] text-white border-2 border-black px-6 py-2 pointer-events-auto shadow-[5px_5px_0px_rgba(0,0,0,1)] heavy-black text-xs uppercase tracking-widest hover:translate-y-0.5 transition-transform">
                Standard View
            </Link>
        </div>
      </header>

      {/* HUD: NAVIGATION HELP */}
      <div className="fixed bottom-10 right-10 flex items-center space-x-4 z-40">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-black p-4 rounded-xl shadow-lg text-[10px] heavy-black uppercase opacity-50 flex items-center space-x-3">
            <Move className="w-4 h-4" />
            <span>Click Rooms to Zoom • Drag to Pan</span>
        </div>
      </div>

    </div>
  );
}
