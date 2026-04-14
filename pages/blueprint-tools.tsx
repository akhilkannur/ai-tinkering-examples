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
  Power
} from 'lucide-react';

const COLORS = {
  bg: "#0F172A", // Midnight Blue
  electric: "#3B82F6",
  toxic: "#22C55E",
  hotPink: "#EC4899",
  safety: "#F97316",
  yellow: "#EAB308",
  ink: "#000000",
  white: "#FFFFFF"
};

const ROOMS = [
  { id: 'writing', name: "CONTENT_LAB", category: "Writing & Content", x: -1000, y: -800, w: 900, h: 700, color: COLORS.hotPink, icon: PenTool },
  { id: 'video', name: "RENDER_CORE", category: "Video & Audio", x: 200, y: -900, w: 1000, h: 800, color: COLORS.electric, icon: Video },
  { id: 'studio', name: "IMAGE_SYNTH", category: "Image Generation", x: 1400, y: -700, w: 800, h: 900, color: COLORS.toxic, icon: Radio },
  { id: 'lab', name: "CODE_BASE", category: "Development", x: -1100, y: 100, w: 1000, h: 900, color: COLORS.white, icon: Terminal },
  { id: 'warroom', name: "MARKET_GRID", category: "Marketing & Sales", x: 100, y: 200, w: 1100, h: 800, color: COLORS.safety, icon: Users },
  { id: 'archive', name: "DATA_VAULT", category: "Research", x: 1400, y: 400, w: 900, h: 700, color: COLORS.yellow, icon: Compass },
];

const ToyRoom = ({ room, tools, onFocus }: { room: any, tools: AiTool[], onFocus: () => void }) => {
  const Icon = room.icon;
  return (
    <motion.div 
      className="absolute cursor-pointer"
      style={{ left: room.x, top: room.y, width: room.w, height: room.h }}
      onClick={onFocus}
      whileHover={{ y: -10, transition: { duration: 0.1 } }}
    >
      {/* NEO-BRUTALIST CONTAINER */}
      <div 
        className="absolute inset-0 border-[4px] border-black shadow-[12px_12px_0px_#000] transition-all duration-300 flex flex-col"
        style={{ backgroundColor: room.color }}
      >
          {/* HEADER BAR */}
          <div className="h-14 border-b-[4px] border-black bg-white flex items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center rounded-full text-white">
                      <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-[900] text-xl tracking-tighter uppercase italic">{room.name}</span>
              </div>
              <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-black" />
                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              </div>
          </div>

          {/* ROOM FLOOR */}
          <div className="flex-1 p-8 grid grid-cols-2 lg:grid-cols-3 gap-4 relative overflow-hidden">
             {/* BACKGROUND DECORATION */}
             <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none scale-[2]">
                <Icon className="w-64 h-64 text-black" />
             </div>

             {tools.slice(0, 12).map((tool) => (
                <a 
                   key={tool.name} 
                   href={tool.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="bg-white border-[3px] border-black p-4 shadow-[5px_5px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col justify-between group"
                >
                   <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-black bg-gray-100 flex items-center justify-center text-[10px] font-black group-hover:bg-[#FF4F00] group-hover:text-white">
                         {tool.name.charAt(0)}
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-tight leading-none truncate">{tool.name}</h4>
                   </div>
                   <ArrowUpRight className="w-3 h-3 self-end opacity-20 group-hover:opacity-100 transition-opacity" />
                </a>
             ))}

             {/* DECORATIVE "SOUL" OBJECTS */}
             <div className="absolute bottom-4 right-4 animate-bounce">
                <Zap className="w-8 h-8 text-black opacity-20" />
             </div>
          </div>

          {/* ROOM FOOTER */}
          <div className="h-10 bg-black/10 flex items-center justify-between px-6 text-[10px] font-black uppercase tracking-widest opacity-50">
             <span>Units: {tools.length}</span>
             <span>Status: Active</span>
          </div>
      </div>
    </motion.div>
  );
};

export default function MegaToyOffice() {
  const [mounted, setMounted] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.7);

  const springX = useSpring(x, { damping: 40, stiffness: 200 });
  const springY = useSpring(y, { damping: 40, stiffness: 200 });
  const springScale = useSpring(scale, { damping: 40, stiffness: 200 });

  const categorizedTools = useMemo(() => {
    const map: Record<string, AiTool[]> = {};
    ROOMS.forEach(r => {
      map[r.category] = aiTools.filter(t => t.category === r.category);
    });
    return map;
  }, []);

  const flyTo = useCallback((roomId: string | null) => {
    const room = ROOMS.find(r => r.id === roomId);
    let targetX = 0;
    let targetY = 0;
    let targetScale = 0.7;

    if (roomId && room) {
        targetX = -(room.x + room.w / 2) * 1.5;
        targetY = -(room.y + room.h / 2) * 1.5;
        targetScale = 1.5;
    }

    animate(x, targetX, { duration: 0.8, ease: "circOut" });
    animate(y, targetY, { duration: 0.8, ease: "circOut" });
    animate(scale, targetScale, { duration: 0.8, ease: "circOut" });
    setActiveRoom(roomId);
  }, [x, y, scale]);

  useEffect(() => {
    setMounted(true);
    // Auto-focus on first room or central view
    setTimeout(() => flyTo(null), 100);
  }, [flyTo]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-[#0F172A] overflow-hidden font-sans text-black select-none">
      <Head>
        <title>MEGA_OFFICE // REALAIFX</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;900&display=swap');
          
          .grid-pattern {
            background-image: 
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 50px 50px;
          }

          .heavy-black {
            font-family: 'Outfit', sans-serif;
            font-weight: 900;
          }

          .joy-shadow {
            box-shadow: 10px 10px 0px #000;
          }
        `}</style>
      </Head>

      {/* BACKGROUND CANVAS */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />

      {/* DRAGGABLE MAP ENGINE */}
      <motion.main 
        drag
        dragConstraints={{ left: -3000, right: 3000, top: -2000, bottom: 2000 }}
        style={{ x: springX, y: springY, scale: springScale }}
        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
          <div className="relative">
             {/* DECORATIVE CENTER COIL */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-80 h-80 border-[20px] border-white/5 rounded-full flex items-center justify-center">
                    <div className="w-40 h-40 border-[10px] border-white/5 rounded-full animate-spin-slow" />
                </div>
             </div>

             {/* RENDER THE TOY ROOMS */}
             {ROOMS.map((room) => (
                <ToyRoom 
                    key={room.id} 
                    room={room} 
                    tools={categorizedTools[room.category] || []} 
                    onFocus={() => flyTo(room.id)}
                />
             ))}
          </div>
      </motion.main>

      {/* HUD: THE "JOYSTICK" (FLOATING NAV) */}
      <aside className="fixed left-10 bottom-10 flex flex-col space-y-4 z-50">
        <div className="bg-white border-[4px] border-black p-6 joy-shadow flex flex-col space-y-3">
            <div className="flex items-center space-x-3 border-b-2 border-black pb-3 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
                <span className="heavy-black text-sm uppercase tracking-widest">Office_Navigator</span>
            </div>
            {ROOMS.map((room) => (
                <button 
                    key={room.id}
                    onClick={() => flyTo(room.id)}
                    className={`flex items-center space-x-3 group transition-all ${activeRoom === room.id ? 'translate-x-2' : ''}`}
                >
                    <div className="w-3 h-3 border-2 border-black transition-colors group-hover:bg-[#FF4F00]" style={{ backgroundColor: activeRoom === room.id ? room.color : 'transparent' }} />
                    <span className={`text-[11px] heavy-black uppercase tracking-tight ${activeRoom === room.id ? 'text-[#FF4F00]' : 'text-gray-400 group-hover:text-black'}`}>
                        {room.name}
                    </span>
                </button>
            ))}
            <div className="pt-4 mt-2 border-t-2 border-black">
                <button 
                    onClick={() => flyTo(null)}
                    className="w-full py-2 bg-black text-white text-[10px] heavy-black uppercase tracking-widest hover:bg-[#FF4F00] transition-colors"
                >
                    RESET_VIEW
                </button>
            </div>
        </div>
      </aside>

      {/* HUD: SEARCH CONSOLE */}
      <header className="fixed top-10 left-10 right-10 flex justify-between items-start pointer-events-none z-50">
        <div className="bg-white border-[4px] border-black p-6 joy-shadow pointer-events-auto flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-black flex items-center justify-center group-hover:rotate-90 transition-transform">
                   <Layout className="w-6 h-6 text-[#22C55E]" />
                </div>
                <div className="flex flex-col">
                    <h1 className="heavy-black text-2xl uppercase tracking-tighter leading-none">MEGA_OFFICE</h1>
                    <span className="text-[9px] heavy-black uppercase opacity-40 tracking-widest mt-1">Experimental Toy Map</span>
                </div>
            </Link>
        </div>

        <div className="flex items-center space-x-4 pointer-events-auto">
            <div className="bg-white border-[4px] border-black p-4 joy-shadow flex items-center space-x-4">
                <Search className="w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="LOCATE ASSET..." 
                    className="bg-transparent border-none outline-none text-xs heavy-black uppercase tracking-widest w-48 placeholder:text-gray-300"
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value) flyTo(null);
                    }}
                />
            </div>
            <Link href="/tools" className="bg-[#FF4F00] text-white border-[4px] border-black px-8 py-4 joy-shadow heavy-black text-xs uppercase tracking-widest hover:translate-y-1 hover:shadow-none transition-all">
                EXIT_LIST
            </Link>
        </div>
      </header>

      {/* HUD: INTERACTION GUIDE */}
      <div className="fixed right-10 bottom-10 flex flex-col items-end space-y-4 z-50 pointer-events-none">
          <div className="bg-white border-[4px] border-black p-4 joy-shadow flex items-center space-x-3 pointer-events-auto">
              <Move className="w-5 h-5 animate-bounce" />
              <span className="text-[10px] heavy-black uppercase tracking-widest">DRAG TO PAN • CLICK TO ZOOM</span>
          </div>
          <div className="bg-[#22C55E] text-white border-[4px] border-black p-4 joy-shadow flex items-center space-x-3 pointer-events-auto">
              <Power className="w-5 h-5" />
              <span className="text-[10px] heavy-black uppercase tracking-widest">SYSTEM: OPTIMAL</span>
          </div>
      </div>

    </div>
  );
}
