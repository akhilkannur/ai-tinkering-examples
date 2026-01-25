import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence } from 'remotion';
import { Copy, Terminal, CheckCircle, ArrowRight, Briefcase, Database, Search, Shield, Zap } from 'lucide-react';

const COLORS = {
  bg: '#0f172a',      // Slate 900 (Unified Background)
  primary: '#3b82f6', // Blue 500
  accent: '#f43f5e',  // Rose 500
  text: '#ffffff',
  textDim: '#94a3b8', // Slate 400
  success: '#10b981', // Emerald 500
  card: '#1e293b'     // Slate 800
};

const FONT_FAMILY = 'system-ui, sans-serif';

// --- SCENE 1: HOOK (0-4s / 0-120 frames) ---
// "Stop Chatting. Start Building."
const SceneHook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity1 = interpolate(frame, [0, 20], [0, 1]);
  const opacity2 = interpolate(frame, [40, 60], [0, 1]);
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center', fontFamily: FONT_FAMILY }}>
      <h1 style={{ fontSize: 80, color: COLORS.textDim, opacity: opacity1, marginBottom: 20 }}>
        Stop Chatting.
      </h1>
      <h1 style={{ fontSize: 100, color: 'white', fontWeight: 900, opacity: opacity2 }}>
        START BUILDING.
      </h1>
    </AbsoluteFill>
  );
};

// --- SCENE 2: INTRO (4-10s / 120-300 frames) ---
// "Access 600+ AI Blueprints"
const SceneIntro = () => {
  const frame = useCurrentFrame();
  
  const counter = Math.min(600, Math.floor(interpolate(frame, [0, 60], [0, 600])));
  const scale = interpolate(frame, [0, 100], [0.9, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center', fontFamily: FONT_FAMILY }}>
      <div style={{ textAlign: 'center', transform: `scale(${scale})` }}>
        <h2 style={{ fontSize: 40, color: COLORS.textDim, textTransform: 'uppercase', letterSpacing: 4, marginBottom: 20 }}>
          The Master Vault
        </h2>
        <div style={{ 
          fontSize: 200, 
          fontWeight: 900, 
          color: 'transparent',
          WebkitTextStroke: `4px ${COLORS.primary}`,
          marginBottom: 0,
          lineHeight: 1
        }}>
          {counter}+
        </div>
        <div style={{ fontSize: 60, color: 'white', fontWeight: 'bold' }}>
          WORK-READY BLUEPRINTS
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 3: UTILITY (10-20s / 300-600 frames) ---
// "Give AI a Real Job" - scrolling list of roles
const SceneUtility = () => {
  const frame = useCurrentFrame();
  
  const jobs = [
    { title: "SEO Auditor", icon: Search, color: COLORS.primary },
    { title: "Competitor Spy", icon: Shield, color: COLORS.accent },
    { title: "Lead Scraper", icon: Database, color: COLORS.success },
    { title: "Churn Detective", icon: Zap, color: "#fbbf24" },
    { title: "Content Engine", icon: Briefcase, color: "#a855f7" }
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center', fontFamily: FONT_FAMILY }}>
      <h2 style={{ position: 'absolute', top: 100, fontSize: 50, color: 'white', opacity: 0.8 }}>
        Don't just prompt. <span style={{ color: COLORS.accent }}>Deploy.</span>
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 100 }}>
        {jobs.map((job, i) => {
          const delay = i * 15;
          const slideIn = interpolate(frame, [delay, delay + 20], [100, 0], { extrapolateRight: 'clamp' });
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{ 
              opacity,
              transform: `translateX(${slideIn}px)`,
              background: COLORS.card,
              padding: '20px 40px',
              borderRadius: 15,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              width: 600,
              borderLeft: `8px solid ${job.color}`
            }}>
              <job.icon color={job.color} size={40} />
              <h3 style={{ fontSize: 40, color: 'white', margin: 0 }}>{job.title}</h3>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 4: WORKFLOW (20-26s / 600-780 frames) ---
// "Copy -> Paste -> Done"
const SceneWorkflow = () => {
  const frame = useCurrentFrame();
  
  // 6s total: 0-2s Copy, 2-4s Paste, 4-6s Done
  const step = Math.floor(frame / 60); 

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center', fontFamily: FONT_FAMILY }}>
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        
        {/* Step 1: Copy */}
        <div style={{ opacity: step >= 0 ? 1 : 0.3, transform: step === 0 ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.5s', textAlign: 'center' }}>
          <div style={{ background: step === 0 ? COLORS.primary : COLORS.card, padding: 40, borderRadius: '50%' }}>
            <Copy size={60} color="white" />
          </div>
          <div style={{ color: 'white', fontSize: 24, marginTop: 20, fontWeight: 'bold' }}>COPY</div>
        </div>

        <ArrowRight size={40} color={COLORS.textDim} />

        {/* Step 2: Paste */}
        <div style={{ opacity: step >= 1 ? 1 : 0.3, transform: step === 1 ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.5s', textAlign: 'center' }}>
          <div style={{ background: step === 1 ? COLORS.accent : COLORS.card, padding: 40, borderRadius: '50%' }}>
            <Terminal size={60} color="white" />
          </div>
          <div style={{ color: 'white', fontSize: 24, marginTop: 20, fontWeight: 'bold' }}>PASTE</div>
        </div>

        <ArrowRight size={40} color={COLORS.textDim} />

        {/* Step 3: Done */}
        <div style={{ opacity: step >= 2 ? 1 : 0.3, transform: step >= 2 ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.5s', textAlign: 'center' }}>
          <div style={{ background: step >= 2 ? COLORS.success : COLORS.card, padding: 40, borderRadius: '50%' }}>
            <CheckCircle size={60} color="white" />
          </div>
          <div style={{ color: 'white', fontSize: 24, marginTop: 20, fontWeight: 'bold' }}>DONE</div>
        </div>

      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 5: CTA (26-30s / 780-900 frames) ---
// "RealAIExamples.com"
const SceneCTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({ frame, fps, from: 0.9, to: 1 });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center', fontFamily: FONT_FAMILY }}>
      <div style={{ transform: `scale(${scale})`, textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 80, 
          color: 'white', 
          fontWeight: 900, 
          marginBottom: 40 
        }}>
          RealAIExamples.com
        </h1>
        <div style={{ 
          display: 'inline-block',
          background: COLORS.primary, 
          color: 'white', 
          padding: '20px 60px', 
          borderRadius: 50, 
          fontSize: 40, 
          fontWeight: 'bold',
          boxShadow: `0 0 40px ${COLORS.primary}66`
        }}>
          Get Started Free
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- MAIN COMPOSITION ---

export const PromoRealAI: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      
      {/* 0-4s: Hook */}
      <Sequence from={0} durationInFrames={120}>
        <SceneHook />
      </Sequence>

      {/* 4-10s: Intro */}
      <Sequence from={120} durationInFrames={180}>
        <SceneIntro />
      </Sequence>

      {/* 10-20s: Utility */}
      <Sequence from={300} durationInFrames={300}>
        <SceneUtility />
      </Sequence>

      {/* 20-26s: Workflow */}
      <Sequence from={600} durationInFrames={180}>
        <SceneWorkflow />
      </Sequence>

      {/* 26-30s: CTA */}
      <Sequence from={780} durationInFrames={120}>
        <SceneCTA />
      </Sequence>

    </AbsoluteFill>
  );
};
