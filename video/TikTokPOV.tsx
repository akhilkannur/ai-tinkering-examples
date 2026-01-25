import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence, random } from 'remotion';
import { MousePointer2, Copy, Send, Zap, Search, Database, ChevronRight, Check } from 'lucide-react';

const COLORS = {
  bg: '#000000',
  tiktokRed: '#ff0050',
  tiktokCyan: '#00f2ea',
  chatUser: '#374151',
  chatAI: '#10a37f',
  surface: '#ffffff',
  blue: '#2563eb'
};

const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// --- HELPER COMPONENTS ---

const Cursor = ({ x, y, click }: { x: number, y: number, click: boolean }) => (
  <div style={{ 
    position: 'absolute', 
    left: x, 
    top: y, 
    pointerEvents: 'none',
    zIndex: 100,
    transform: `scale(${click ? 0.8 : 1})`,
    transition: 'transform 0.1s'
  }}>
    <MousePointer2 fill="black" color="white" size={60} />
  </div>
);

const TikTokText = ({ text, top, rotate = 0 }: { text: string, top: number, rotate?: number }) => (
  <div style={{
    position: 'absolute',
    top,
    width: '100%',
    textAlign: 'center',
    zIndex: 50,
    transform: `rotate(${rotate}deg)`
  }}>
    <h1 style={{
      fontFamily: 'Proxima Nova, sans-serif',
      fontWeight: 900,
      fontSize: 60,
      color: 'white',
      textShadow: '2px 2px 0px rgba(0,0,0,0.5), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      background: 'rgba(0,0,0,0.6)',
      display: 'inline-block',
      padding: '10px 30px',
      borderRadius: 10,
    }}>
      {text}
    </h1>
  </div>
);

// Simulates handheld camera movement
const HandheldCamera = ({ children }: { children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  const x = Math.sin(frame * 0.05) * 10 + Math.cos(frame * 0.1) * 5;
  const y = Math.cos(frame * 0.07) * 10 + Math.sin(frame * 0.12) * 5;
  const rot = Math.sin(frame * 0.03) * 1;
  
  return (
    <div style={{ 
      flex: 1, 
      width: '100%', 
      height: '100%', 
      transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(1.05)`, // Scale up slightly to avoid black edges
      transformOrigin: 'center center'
    }}>
      {children}
    </div>
  );
};

// --- SCENES ---

// Scene 1: The Pain (Messy Prompting)
const ScenePain = () => {
  const frame = useCurrentFrame();
  
  // Typing animation
  const text = "Please write a marketing strategy for a B2B SaaS company that targets... ummm... enterprise sales teams?";
  const charsShown = Math.floor(frame / 2);
  const currentText = text.slice(0, charsShown);

  return (
    <AbsoluteFill style={{ backgroundColor: '#f3f4f6', fontFamily: FONT_FAMILY }}>
      <div style={{ padding: 40, paddingTop: 200 }}>
        <div style={{ background: 'white', padding: 40, borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#d1d5db' }} />
            <div style={{ flex: 1, height: 20, background: '#e5e7eb', borderRadius: 10 }} />
          </div>
          <p style={{ fontSize: 40, color: '#374151', lineHeight: 1.5 }}>
            {currentText}
            <span style={{ opacity: frame % 15 < 7 ? 1 : 0 }}>|</span>
          </p>
        </div>
      </div>
      <TikTokText text="Me spending 4 hours writing prompts 💀" top={800} rotate={-2} />
    </AbsoluteFill>
  );
};

// Scene 2: Discovery (The Website Grid)
const SceneDiscovery = () => {
  const frame = useCurrentFrame();
  
  const scrollY = interpolate(frame, [0, 100], [0, -1000]);

  const cards = Array(12).fill(0).map((_, i) => ({
    color: [COLORS.blue, COLORS.tiktokRed, COLORS.tiktokCyan, '#8b5cf6'][i % 4],
    title: ['Competitor Spy', 'SEO Auditor', 'Lead Scraper', 'Content Gen'][i % 4]
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily: FONT_FAMILY }}>
      <div style={{ padding: 40, transform: `translateY(${scrollY}px)` }}>
        <h2 style={{ color: 'white', fontSize: 60, marginBottom: 40, marginTop: 100 }}>RealAIExamples.com</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 30 }}>
          {cards.map((card, i) => (
            <div key={i} style={{ 
              background: '#1e293b', 
              padding: 40, 
              borderRadius: 20, 
              borderLeft: `15px solid ${card.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ color: 'white', fontSize: 40, margin: 0 }}>{card.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 24, margin: '10px 0 0 0' }}>Automate your workflow</p>
              </div>
              <ChevronRight color="white" size={40} />
            </div>
          ))}
        </div>
      </div>
      <TikTokText text="Until I found this... 🤫" top={500} rotate={2} />
    </AbsoluteFill>
  );
};

// Scene 3: The Magic (Copy -> Paste)
const SceneMagic = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-45: Copy Click
  // 45-90: Paste & Explosion
  
  const cursorX = interpolate(frame, [0, 20, 45, 60], [800, 850, 850, 500], { extrapolateRight: 'clamp' });
  const cursorY = interpolate(frame, [0, 20, 45, 60], [1000, 500, 500, 800], { extrapolateRight: 'clamp' });
  const click = (frame > 15 && frame < 25) || (frame > 70 && frame < 80);

  const showChat = frame > 60;
  
  // Chat stream animation
  const streamHeight = interpolate(frame, [80, 150], [0, 1200], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: FONT_FAMILY }}>
      
      {!showChat ? (
        // The "Website" View
        <div style={{ background: '#0f172a', height: '100%', padding: 40, paddingTop: 300 }}>
           <div style={{ background: '#1e293b', borderRadius: 30, padding: 60, border: '2px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <Search color={COLORS.tiktokCyan} size={60} />
                    <h1 style={{ color: 'white', fontSize: 60, margin: 0 }}>Competitor Spy</h1>
                </div>
                <div style={{ background: COLORS.blue, padding: '20px 40px', borderRadius: 15, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Copy color="white" size={40} />
                    <span style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>COPY</span>
                </div>
              </div>
              <div style={{ height: 40, background: '#334155', borderRadius: 10, width: '80%', marginBottom: 20 }} />
              <div style={{ height: 40, background: '#334155', borderRadius: 10, width: '60%', marginBottom: 20 }} />
              <div style={{ height: 40, background: '#334155', borderRadius: 10, width: '90%' }} />
           </div>
        </div>
      ) : (
        // The "Chat" View
        <div style={{ background: '#343541', height: '100%', padding: 40 }}>
            <div style={{ background: '#444654', padding: 40, borderRadius: 10, marginBottom: 40 }}>
                <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ width: 60, height: 60, background: COLORS.tiktokCyan, borderRadius: 5 }} />
                    <div style={{ color: 'white', fontSize: 30 }}>Paste...</div>
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 60, height: 60, background: '#10a37f', borderRadius: 5, flexShrink: 0 }} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ 
                        background: '#e5e7eb', 
                        width: '100%', 
                        height: streamHeight, 
                        borderRadius: 10,
                        opacity: 0.8
                    }}>
                        {/* Fake data lines */}
                        {Array(20).fill(0).map((_, i) => (
                            <div key={i} style={{ 
                                height: 30, 
                                margin: 20, 
                                background: '#9ca3af', 
                                width: `${random(i) * 60 + 30}%`,
                                borderRadius: 5
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}

      <Cursor x={cursorX} y={cursorY} click={click} />
      <TikTokText text="Literally just Copy & Paste" top={200} />
    </AbsoluteFill>
  );
};

// Scene 4: The Result (Success)
const SceneResult = () => {
  const frame = useCurrentFrame();
  const scale = spring({ frame, fps: 30, config: { stiffness: 100 } });
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#ecfdf5', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_FAMILY }}>
      <div style={{ transform: `scale(${scale})`, textAlign: 'center' }}>
        <div style={{ background: '#10b981', width: 300, height: 300, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 60px' }}>
            <Check size={180} color="white" strokeWidth={4} />
        </div>
        <h1 style={{ fontSize: 80, color: '#065f46', fontWeight: 900 }}>TASK COMPLETE</h1>
        <h2 style={{ fontSize: 50, color: '#047857', marginTop: 20 }}>Saved 5 Hours</h2>
      </div>
      <TikTokText text="My boss thinks I'm a genius 💅" top={1200} rotate={-3} />
    </AbsoluteFill>
  );
};

// Scene 5: The Plug (Link)
const ScenePlug = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 100], [1, 1.2]);
  
  return (
    <AbsoluteFill style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_FAMILY }}>
       <h2 style={{ color: 'white', fontSize: 60, marginBottom: 40 }}>Don't gatekeep.</h2>
       <h1 style={{ 
           fontSize: 100, 
           fontWeight: 900, 
           background: `linear-gradient(to right, ${COLORS.tiktokCyan}, ${COLORS.tiktokRed})`,
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent',
           transform: `scale(${scale})`
       }}>
           RealAIExamples.com
       </h1>
       <div style={{ marginTop: 100, background: 'white', color: 'black', padding: '20px 60px', borderRadius: 50, fontSize: 40, fontWeight: 'bold' }}>
           Link in Bio 🔗
       </div>
    </AbsoluteFill>
  );
};

export const TikTokPOV: React.FC = () => {
  return (
    <HandheldCamera>
      <AbsoluteFill style={{ backgroundColor: '#000' }}>
        
        {/* 0-5s (0-150f): Pain */}
        <Sequence from={0} durationInFrames={150}>
            <ScenePain />
        </Sequence>

        {/* 5-10s (150-300f): Discovery */}
        <Sequence from={150} durationInFrames={150}>
            <SceneDiscovery />
        </Sequence>

        {/* 10-20s (300-600f): Magic */}
        <Sequence from={300} durationInFrames={300}>
            <SceneMagic />
        </Sequence>

        {/* 20-25s (600-750f): Result */}
        <Sequence from={600} durationInFrames={150}>
            <SceneResult />
        </Sequence>

        {/* 25-30s (750-900f): Plug */}
        <Sequence from={750} durationInFrames={150}>
            <ScenePlug />
        </Sequence>

      </AbsoluteFill>
    </HandheldCamera>
  );
};
