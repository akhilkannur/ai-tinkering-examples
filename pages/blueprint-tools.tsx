import React, { useState, useMemo, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../lib/ai-tools-data';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, Maximize2, Minimize2, Move, Zap, Activity } from 'lucide-react';

const TE_ORANGE = "#FF4F00";
const TE_BLACK = "#121212";
const TE_GRAY = "#F0F0F0";
const TE_BONE = "#E8E8E1";

// Isometric helper component for a "Room"
const IsoRoom = ({ category, tools, color, x, y, id, active, onSelect }: any) => {
  return (
    <motion.div 
      id={id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ 
        position: 'absolute', 
        left: x, 
        top: y,
        cursor: 'pointer'
      }}
      onClick={onSelect}
      className="group"
    >
      {/* ISOMETRIC ROOM BASE */}
      <div className="relative">
        {/* ROOM TOP / FLOOR */}
        <div 
          className={`w-[350px] h-[350px] border-2 border-black transition-all duration-300 flex flex-col p-6 overflow-hidden ${active ? 'bg-white shadow-[12px_12px_0px_#FF4F00]' : 'bg-[#E8E8E1] hover:bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]'}`}
          style={{ transform: 'rotateX(55deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="bg-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">{id.toUpperCase()}</div>
                <Activity className={`w-4 h-4 ${active ? 'text-[#FF4F00]' : 'text-gray-400'}`} />
            </div>
            
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-none">{category}</h2>
            
            {/* TOOL MODULES INSIDE ROOM */}
            <div className="grid grid-cols-2 gap-2 mt-4">
                {tools.slice(0, 8).map((tool: any) => (
                    <div key={tool.name} className="flex items-center space-x-2 border border-black/10 p-2 bg-white/50 text-[9px] font-bold uppercase truncate">
                        <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-[#FF4F00] animate-pulse' : 'bg-gray-300'}`}></div>
                        <span className="truncate">{tool.name}</span>
                    </div>
                ))}
            </div>

            {/* DECORATIVE "CIRCUIT" LINES */}
            <div className="absolute bottom-4 right-4 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-4 bg-black/5"></div>
                ))}
            </div>
        </div>

        {/* ROOM SIDE WALLS (FOR DEPTH) */}
        <div className="absolute top-[175px] left-[175px] w-full h-full pointer-events-none opacity-20">
            {/* Visual depth elements could go here */}
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkspaceMap() {
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Motion values for dragging
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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

  // Spatial arrangement for the departments
  const roomPositions = useMemo(() => {
    const positions: any[] = [];
    const radius = 600;
    categories.forEach((cat, i) => {
        const angle = (i / categories.length) * Math.PI * 2;
        positions.push({
            id: `unit-${i+1}`,
            category: cat,
            x: Math.cos(angle) * radius + 500,
            y: Math.sin(angle) * radius + 300,
        });
    });
    return positions;
  }, [categories]);

  return (
    <div className="fixed inset-0 bg-[#DEDEDE] overflow-hidden font-mono select-none">
      <Head>
        <title>WORKSPACE_01 // TE PROTOCOL</title>
        <style>{`
          .map-grid {
            background-image: 
                linear-gradient(to right, #ccc 1px, transparent 1px),
                linear-gradient(to bottom, #ccc 1px, transparent 1px);
            background-size: 50px 50px;
          }
          .te-lcd {
            font-family: 'JetBrains Mono', monospace;
            text-shadow: 0 0 5px rgba(255, 79, 0, 0.2);
          }
          .analog-knob {
            background: conic-gradient(from 0deg, #333 0%, #111 45%, #444 50%, #111 55%, #333 100%);
            box-shadow: inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.4);
          }
        `}</style>
      </Head>

      {/* DRAGGABLE CANVAS */}
      <motion.div 
        drag
        dragConstraints={{ left: -2000, right: 2000, top: -2000, bottom: 2000 }}
        style={{ x, y, scale: zoom }}
        className="absolute inset-0 w-[5000px] h-[5000px] map-grid flex items-center justify-center pointer-events-auto"
      >
        <div className="relative w-full h-full">
            {/* CENTER CORE */}
            <div className="absolute left-[2500px] top-[2500px] -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 border-[10px] border-black rounded-full flex items-center justify-center opacity-10">
                    <span className="text-4xl font-black italic tracking-tighter">CENTRAL_CORE</span>
                </div>
                {/* CONNECTING TRACES */}
                {roomPositions.map((pos, i) => (
                    <div 
                        key={i} 
                        className="absolute h-px bg-black/10 origin-left"
                        style={{ 
                            width: 600, 
                            left: 0, 
                            top: 0, 
                            transform: `rotate(${(i / categories.length) * 360}deg)` 
                        }}
                    ></div>
                ))}
            </div>

            {/* ROOMS / DEPARTMENTS */}
            <div className="absolute left-[2000px] top-[2200px]">
                {roomPositions.map((pos) => (
                    <IsoRoom 
                        key={pos.id}
                        id={pos.id}
                        category={pos.category}
                        tools={categorizedTools[pos.category]}
                        x={pos.x}
                        y={pos.y}
                        active={activeDept === pos.id}
                        onSelect={() => setActiveDept(pos.id)}
                    />
                ))}
            </div>
        </div>
      </motion.div>

      {/* OVERLAY: CONTROL PANEL (THE "REMOTE") */}
      <div className="fixed bottom-10 right-10 w-80 bg-[#1A1A1A] border-4 border-black p-6 text-white shadow-[12px_12px_0px_rgba(0,0,0,1)] z-50">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest">NAV_CONROLLER</span>
                <span className="text-sm font-bold uppercase tracking-tight">System v1.04</span>
            </div>
            <div className="w-3 h-3 bg-[#FF4F00] rounded-full animate-pulse"></div>
        </div>

        {/* ANALOG KNOB (ZOOM) */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 mb-2 uppercase">Scale_Multiplier</span>
                <div className="flex space-x-2">
                    <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="w-8 h-8 bg-black border border-white/20 flex items-center justify-center hover:bg-[#FF4F00]"><Minimize2 className="w-4 h-4"/></button>
                    <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="w-8 h-8 bg-black border border-white/20 flex items-center justify-center hover:bg-[#FF4F00]"><Maximize2 className="w-4 h-4"/></button>
                </div>
            </div>
            <div className="analog-knob w-16 h-16 rounded-full border-4 border-black relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/20 rounded-full" style={{ transform: `rotate(${(zoom - 1) * 180}deg)`, transformOrigin: 'bottom center' }}></div>
            </div>
        </div>

        {/* ACTIVE MODULE INFO */}
        <div className="bg-black/50 border border-white/10 p-4 mb-6 min-h-[100px] te-lcd">
            {activeDept ? (
                <div>
                    <span className="text-[9px] text-[#FF4F00] font-bold block mb-1">SELECTED_UNIT: {activeDept.toUpperCase()}</span>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-2">{roomPositions.find(r => r.id === activeDept)?.category}</h3>
                    <p className="text-[9px] text-gray-400 leading-tight uppercase">Ready for deployment. All assets verified. Select tool module within room to execute link.</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-12 text-gray-600 italic text-[10px]">
                    <Move className="w-4 h-4 mb-2 animate-bounce" />
                    DRAG MAP TO EXPLORE
                </div>
            )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-2">
            <Link href="/tools" className="bg-[#E8E8E1] text-black text-[10px] font-bold py-2 px-4 text-center uppercase hover:bg-white transition-colors">List_View</Link>
            <button onClick={() => { x.set(0); y.set(0); setZoom(1); }} className="bg-[#FF4F00] text-white text-[10px] font-bold py-2 px-4 text-center uppercase hover:bg-orange-600 transition-colors">Reset_Pos</button>
        </div>
      </div>

      {/* TOP HUD */}
      <div className="fixed top-8 left-8 right-8 flex justify-between items-start pointer-events-none z-50">
        <div className="bg-black text-white px-4 py-2 pointer-events-auto border-2 border-black flex items-center space-x-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="w-4 h-4 bg-white flex items-center justify-center text-black font-black text-[10px]">RE</div>
            <span className="text-[11px] font-black uppercase tracking-widest">Station: Office Floor Plan</span>
        </div>
        
        <div className="bg-white border-2 border-black p-2 pointer-events-auto shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest">
                <span className="text-gray-400">FPS: 60.0</span>
                <span className="w-px h-3 bg-gray-200"></span>
                <span className="text-[#FF4F00]">Signal: Optimal</span>
            </div>
        </div>
      </div>

      {/* FULLSCREEN OVERLAY TOOLS LIST (FOR QUICK ACCESS) */}
      {activeDept && (
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-24 right-10 bottom-[400px] w-80 bg-white border-4 border-black p-6 overflow-y-auto shadow-[12px_12px_0px_#FF4F00] z-40"
        >
            <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
                <h3 className="text-xs font-black uppercase">Asset_Inventory</h3>
                <button onClick={() => setActiveDept(null)} className="text-[10px] font-bold hover:text-[#FF4F00]">CLOSE_X</button>
            </div>
            <div className="space-y-4">
                {categorizedTools[roomPositions.find(r => r.id === activeDept)?.category || '']?.map(tool => (
                    <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block group border border-gray-100 p-3 hover:border-black hover:bg-black hover:text-white transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-[11px] font-bold uppercase tracking-tight">{tool.name}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                        </div>
                        <p className="text-[9px] leading-tight text-gray-500 group-hover:text-gray-300 mt-1 line-clamp-2 uppercase">{tool.description}</p>
                    </a>
                ))}
            </div>
        </motion.div>
      )}

    </div>
  );
}
