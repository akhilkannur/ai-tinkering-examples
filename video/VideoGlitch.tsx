import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence, random } from 'remotion';

const COLORS = {
  neonGreen: '#0f0',
  neonRed: '#f00',
  neonBlue: '#0ff',
  bg: '#000'
};

const FONT_MONO = '"Courier New", Courier, monospace';

// --- COMPONENTS ---

const MatrixRain = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  const columns = useMemo(() => new Array(50).fill(0).map((_, i) => ({
    x: random(i) * 100, // %
    speed: random(i + 1) * 2 + 1,
    chars: '010101010101RECIPE'.split(''),
    offset: random(i + 2) * 100
  })), []);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {columns.map((col, i) => {
        const y = ((frame * col.speed) + col.offset) % 150 - 20; // Loop vertically
        return (
           <div key={i} style={{
             position: 'absolute',
             left: `${col.x}%`,
             top: `${y}%`,
             color: COLORS.neonGreen,
             fontSize: 20,
             fontFamily: FONT_MONO,
             opacity: 0.3,
             writingMode: 'vertical-rl',
             textShadow: `0 0 5px ${COLORS.neonGreen}`
           }}>
             {col.chars.map((c, j) => (
               <span key={j} style={{ opacity: random(frame + j) > 0.5 ? 1 : 0.5 }}>{c}</span>
             ))}
           </div>
        );
      })}
    </AbsoluteFill>
  );
};

// CSS 3D Tunnel of Cards
const CSSTunnel = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  // 100 Cards flying at us
  const cards = useMemo(() => new Array(100).fill(0).map((_, i) => ({
    x: (random(i) - 0.5) * width * 2,
    y: (random(i + 1) - 0.5) * height * 2,
    zOffset: random(i + 2) * 5000,
    color: [COLORS.neonGreen, COLORS.neonBlue, COLORS.neonRed][Math.floor(random(i + 3) * 3)],
    text: ['COLD EMAIL', 'LEAD GEN', 'COMPETITOR SPY', 'SEO AUDIT', 'ABM CAMPAIGN'][Math.floor(random(i + 4) * 5)]
  })), [width, height]);

  // Speed increases over time
  const speed = interpolate(frame, [0, 450], [20, 100]); 

  return (
    <div style={{
      width: '100%', height: '100%',
      perspective: '1000px',
      transformStyle: 'preserve-3d',
      background: 'black'
    }}>
      {cards.map((card, i) => {
        // Calculate Z position based on frame and offset
        // Loop it so it feels infinite
        let z = (frame * speed + card.zOffset) % 5000;
        
        // Don't render if behind camera
        if (z > 1000) z -= 5000;

        const opacity = interpolate(z, [0, 800], [0, 1]);

        return (
          <div key={i} style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: 300, height: 400,
            transform: `translate3d(${card.x}px, ${card.y}px, ${z}px)`,
            border: `2px solid ${card.color}`,
            color: card.color,
            fontFamily: FONT_MONO,
            fontSize: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
            opacity,
            boxShadow: `0 0 20px ${card.color}`,
            textAlign: 'center'
          }}>
            {card.text}
          </div>
        );
      })}
    </div>
  );
};

const GlitchText = ({ text, scale = 1, color = 'white' }: { text: string, scale?: number, color?: string }) => {
  const frame = useCurrentFrame();
  
  const x = random(frame) > 0.8 ? (random(frame + 1) - 0.5) * 20 : 0;
  const skew = random(frame) > 0.9 ? (random(frame + 2) - 0.5) * 20 : 0;
  
  return (
    <h1 style={{
      color: color,
      fontFamily: FONT_MONO,
      fontSize: 100 * scale,
      fontWeight: 900,
      transform: `translate(${x}px, 0) skew(${skew}deg)`,
      textShadow: `4px 0 ${COLORS.neonRed}, -4px 0 ${COLORS.neonBlue}`,
      textAlign: 'center',
      textTransform: 'uppercase',
      lineHeight: 0.9,
      letterSpacing: -5
    }}>
      {text}
    </h1>
  );
};

// --- SCENES ---

const SceneBoot = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: 'black', padding: 40 }}>
      <MatrixRain />
      <div style={{ zIndex: 10, marginTop: 200 }}>
         <GlitchText text="ROLE:" color={COLORS.neonBlue} />
         <GlitchText text="OBSOLETE" color={COLORS.neonRed} />
      </div>
      <div style={{ position: 'absolute', bottom: 100, left: 40, fontFamily: FONT_MONO, color: COLORS.neonGreen, fontSize: 30 }}>
         {`> SCANNING_DEPT: SALES_OPS... [FOUND]`} <br/>
         {`> SCANNING_DEPT: MARKETING... [FOUND]`} <br/>
         {`> INITIATING_AUTOMATION_SEQUENCE...`}
      </div>
    </AbsoluteFill>
  );
};

const SceneWarp = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <CSSTunnel />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
         {frame > 30 && frame < 120 && <GlitchText text="MARKETING" color="white" />}
         {frame > 120 && frame < 210 && <GlitchText text="SALES" color={COLORS.neonGreen} />}
         {frame > 210 && frame < 360 && <GlitchText text="AUTOMATED" color={COLORS.neonRed} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SceneLogo = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 15], [3, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
       <MatrixRain />
       <div style={{ transform: `scale(${scale})`, background: 'black', padding: 20 }}>
          <GlitchText text="REAL" color={COLORS.neonBlue} scale={0.6} />
          <GlitchText text="AI" color="white" scale={1.2} />
          <GlitchText text="EXAMPLES" color={COLORS.neonGreen} scale={0.6} />
       </div>
       <div style={{ marginTop: 20, fontFamily: FONT_MONO, color: COLORS.neonBlue, fontSize: 30, letterSpacing: 2 }}>
          FOR FOUNDERS & OPS
       </div>
       <div style={{ marginTop: 50, fontFamily: FONT_MONO, color: 'white', fontSize: 40, border: '2px solid white', padding: '10px 40px' }}>
          LINK_IN_BIO
       </div>
    </AbsoluteFill>
  );
};

export const VideoGlitch: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Sequence from={0} durationInFrames={90}>
        <SceneBoot />
      </Sequence>
      <Sequence from={90} durationInFrames={360}>
        <SceneWarp />
      </Sequence>
      <Sequence from={450} durationInFrames={150}>
        <SceneLogo />
      </Sequence>
      
      {/* Scanline Overlay */}
      <div style={{
         position: 'absolute', width: '100%', height: '100%',
         background: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 50%)',
         backgroundSize: '100% 4px',
         pointerEvents: 'none'
      }} />
    </AbsoluteFill>
  );
};