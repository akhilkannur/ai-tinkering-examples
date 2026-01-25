import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence, Img, staticFile } from 'remotion';
import { Copy, ArrowRight } from 'lucide-react';

const FONT_FAMILY = '"Georgia", serif';
const FONT_BOLD = '"Inter", "system-ui", sans-serif';

// --- COMPONENTS ---

// 1. Dynamic Background: Slow moving "Aurora" gradients
const AnimatedBackground = () => {
  const frame = useCurrentFrame();
  
  // Rotate the hue/gradient position slowly
  const pos = interpolate(frame, [0, 900], [0, 100]);
  
  return (
    <AbsoluteFill style={{
      background: `
        radial-gradient(circle at ${50 + Math.sin(frame * 0.01) * 20}% ${50 + Math.cos(frame * 0.01) * 20}%, #1e1b4b 0%, #0f172a 50%, #020617 100%)
      `,
      // Add a subtle noise texture if we could, but CSS gradients are safer for video encoding
    }}>
      {/* Floating Orbs for depth */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '600px',
        height: '600px',
        background: 'rgba(56, 189, 248, 0.05)', // Light Blue
        filter: 'blur(100px)',
        transform: `translate(${Math.sin(frame * 0.02) * 50}px, ${Math.cos(frame * 0.02) * 50}px)`
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'rgba(168, 85, 247, 0.05)', // Purple
        filter: 'blur(100px)',
        transform: `translate(${Math.cos(frame * 0.015) * 50}px, ${Math.sin(frame * 0.015) * 50}px)`
      }} />
    </AbsoluteFill>
  );
};

const NarrationText = ({ text, opacity = 1, bold = false }: { text: string, opacity?: number, bold?: boolean }) => (
  <h1 style={{
    fontFamily: bold ? FONT_BOLD : FONT_FAMILY,
    fontSize: bold ? 70 : 55,
    color: '#f8fafc',
    textAlign: 'center',
    fontWeight: bold ? 900 : 'normal',
    fontStyle: bold ? 'normal' : 'italic',
    lineHeight: 1.2,
    maxWidth: '85%',
    zIndex: 10,
    textShadow: '0 10px 30px rgba(0,0,0,0.8)',
    // Glassmorphism backing for readability
    background: 'rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)',
    padding: '20px 40px',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.1)',
    opacity,
    transform: `translateY(${bold ? -20 : 0}px)`
  }}>
    {text}
  </h1>
);

const SmoothCursor = ({ x, y, click }: { x: number, y: number, click: boolean }) => {
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.9)',
      boxShadow: '0 0 20px rgba(255,255,255,0.6), 0 0 50px rgba(59, 130, 246, 0.5)',
      transform: `scale(${click ? 0.8 : 1})`,
      transition: 'transform 0.1s',
      pointerEvents: 'none',
      zIndex: 100,
      border: '2px solid rgba(0,0,0,0.1)'
    }} />
  );
};

// --- SCENES ---

// Scene 1: The Hook (Bold & Controversial)
const SceneIntro = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  const scale = interpolate(frame, [0, 150], [0.9, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedBackground />
      <div style={{ transform: `scale(${scale})` }}>
        <NarrationText 
          text="Stop paying agencies for things AI can do for free." 
          opacity={opacity} 
          bold={true}
        />
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: The Solution (Real Homepage Scroll)
const SceneGallery = () => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [0, 150], [0, -1500]);

  return (
    <AbsoluteFill style={{ alignItems: 'center', overflow: 'hidden' }}>
      <AnimatedBackground />
      
      {/* Phone Frame / Container for the screenshot to make it pop */}
      <div style={{ 
        width: '90%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        overflow: 'hidden',
        boxShadow: '0 0 50px rgba(0,0,0,0.5)',
        transform: `translateY(${scroll}px)`
      }}>
        <Img 
          src={staticFile("homepage.png")} 
          style={{ width: '100%' }} 
        />
      </div>

      <div style={{ position: 'absolute', top: 200, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <NarrationText text="This archive has 600+ marketing workflows." />
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: The Action (Real Blueprint Interaction)
const SceneAction = () => {
  const frame = useCurrentFrame();
  
  const cx = interpolate(frame, [0, 40, 60, 90], [600, 850, 850, 500], { extrapolateRight: 'clamp' });
  const cy = interpolate(frame, [0, 40, 60, 90], [1200, 600, 600, 1200], { extrapolateRight: 'clamp' });
  const click = frame > 45 && frame < 55;
  const showChat = frame > 70;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedBackground />
      
      <div style={{ position: 'absolute', top: 150, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 20 }}>
        <NarrationText text={showChat ? "Instant Strategy. Zero Cost." : "Steal the exact prompt..."} bold={showChat} />
      </div>

      <div style={{ width: '90%', height: '70%', position: 'relative', marginTop: 100, borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        {!showChat ? (
           <AbsoluteFill>
             <Img src={staticFile("blueprint.png")} style={{ width: '100%', objectFit: 'cover' }} />
             {/* Click Ripple */}
             {click && (
               <div style={{ 
                 position: 'absolute', left: cx - 50, top: cy - 25, width: 100, height: 50, 
                 background: 'white', opacity: 0.4, borderRadius: 10,
                 animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' 
               }} />
             )}
           </AbsoluteFill>
        ) : (
          <div style={{ 
             background: 'rgba(15, 23, 42, 0.95)', // Slate 900 Glass
             width: '100%', height: '100%', padding: 40,
             display: 'flex', flexDirection: 'column', justifyContent: 'center',
             backdropFilter: 'blur(10px)'
           }}>
             {/* Chat Interface */}
             <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 30 }}>🤖</span>
                </div>
                <div style={{ flex: 1 }}>
                   <div style={{ color: '#94a3b8', fontSize: 20, fontFamily: 'sans-serif', marginBottom: 15 }}>Generating Competitor Analysis...</div>
                   <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <div style={{ width: '70%', height: '100%', background: '#38bdf8', borderRadius: 2, boxShadow: '0 0 10px #38bdf8' }} />
                   </div>
                </div>
             </div>
             {/* Data Blocks Fade In */}
             <div style={{ opacity: interpolate(frame, [80, 100], [0, 1]) }}>
                {[0.9, 0.7, 0.8, 0.6, 0.9].map((w, i) => (
                  <div key={i} style={{ 
                    height: 25, width: `${w * 100}%`, 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: 4, marginBottom: 15 
                  }} />
                ))}
             </div>
           </div>
        )}
      </div>

      <SmoothCursor x={cx} y={cy} click={click} />
    </AbsoluteFill>
  );
};

// Scene 4: Outro (Bold Stamp)
const SceneOutro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // "Stamp" Effect
  const scale = spring({ frame, fps, from: 3, to: 1, config: { damping: 10, stiffness: 100 } });
  const opacity = interpolate(frame, [0, 10], [0, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedBackground />
      
      <div style={{ transform: `scale(${scale})`, opacity, textAlign: 'center' }}>
        <h2 style={{ color: '#94a3b8', fontSize: 40, letterSpacing: 4, marginBottom: 20, textTransform: 'uppercase' }}>
          Stop Guessing
        </h2>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          padding: '30px 60px',
          borderRadius: 20,
          boxShadow: '0 0 60px rgba(59, 130, 246, 0.6)'
        }}>
          <h1 style={{ 
            fontFamily: FONT_BOLD, 
            fontSize: 60, 
            color: 'white', 
            fontWeight: 900,
            margin: 0
          }}>
            RealAIExamples.com
          </h1>
        </div>
        <div style={{ 
          marginTop: 40, 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 15,
          color: 'white',
          fontSize: 30,
          fontWeight: 'bold',
          background: 'rgba(255,255,255,0.1)',
          padding: '10px 30px',
          borderRadius: 50
        }}>
          Link in Bio <ArrowRight size={30} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const TikTokMuted: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={150}>
        <SceneIntro />
      </Sequence>
      <Sequence from={150} durationInFrames={150}>
        <SceneGallery />
      </Sequence>
      <Sequence from={300} durationInFrames={300}>
        <SceneAction />
      </Sequence>
      <Sequence from={600} durationInFrames={300}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};