import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence } from 'remotion';
import { XCircle, Terminal, Zap, ArrowRight, Lock, TrendingUp } from 'lucide-react';

interface BlueprintPromoProps {
  title: string;
  tagline: string;
  category: string;
}

const COLORS = {
  bg: '#000000', // Pitch black for high contrast
  primary: '#00ff41', // Matrix/Hacker Green
  accent: '#ff0055',  // Aggressive Red
  text: '#ffffff',
  textSecondary: '#cccccc',
  panel: '#111111'
};

const FONT_FAMILY = '"Impact", "Arial Black", sans-serif'; // Heavy fonts

// --- SUB-COMPONENTS ---

const SceneHook: React.FC<{ category: string }> = ({ category }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { stiffness: 200, damping: 10 } });
  
  // Flash effect
  const bgFlash = frame % 10 < 5 ? COLORS.accent : COLORS.bg;
  const isFlashFrame = frame < 15;

  return (
    <AbsoluteFill style={{ 
      backgroundColor: isFlashFrame ? bgFlash : COLORS.bg, 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: FONT_FAMILY 
    }}>
      <div style={{ transform: `scale(${scale})`, textAlign: 'center' }}>
        <XCircle size={150} color={isFlashFrame ? 'white' : COLORS.accent} style={{ marginBottom: 40, display: 'inline-block' }} />
        <h2 style={{ fontSize: 60, color: 'white', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 2 }}>
          STOP DOING MANUAL
        </h2>
        <h1 style={{ 
          fontSize: 100, 
          color: isFlashFrame ? COLORS.bg : COLORS.accent, 
          fontWeight: 900, 
          textTransform: 'uppercase',
          lineHeight: 0.9,
          padding: '0 40px'
        }}>
          {category}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

const SceneAgitation: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Rapid fire text
  const step = Math.floor(frame / 20); // Switch every 20 frames
  const words = ["IT'S SLOW.", "IT'S COSTLY.", "IT'S BROKEN."];
  const activeWord = words[Math.min(step, words.length - 1)];
  const isLast = step >= 2;

  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.bg, 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: FONT_FAMILY 
    }}>
      <h1 style={{ 
        fontSize: 140, 
        color: 'white', 
        textAlign: 'center',
        textTransform: 'uppercase',
        fontStyle: 'italic',
        lineHeight: 1
      }}>
        {activeWord}
      </h1>
      {isLast && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,0,0,0.2)' }} />
      )}
    </AbsoluteFill>
  );
};

const SceneSolution: React.FC<{ title: string; tagline: string }> = ({ title, tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, from: 1000, to: 0 });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.primary, // Invert for impact
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: FONT_FAMILY 
    }}>
      <div style={{ 
        transform: `translateX(${slideIn}px)`, 
        textAlign: 'center',
        padding: '0 50px',
        color: COLORS.bg // Black text on green
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
          <Terminal size={80} color="black" strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: 40, fontWeight: 900, textTransform: 'uppercase', marginBottom: 20 }}>
          DEPLOY THE SYSTEM:
        </h2>
        <h1 style={{ 
          fontSize: 110, 
          fontWeight: 900, 
          lineHeight: 0.9, 
          textTransform: 'uppercase',
          border: '10px solid black',
          padding: '40px',
          display: 'inline-block'
        }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

const SceneOutcome: React.FC<{ tagline: string }> = ({ tagline }) => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.bg, 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: 'sans-serif' // Switch to cleaner font for reading
    }}>
      <div style={{ textAlign: 'center', padding: '0 80px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
          <TrendingUp size={60} color={COLORS.primary} />
          <span style={{ fontSize: 40, color: COLORS.primary, fontWeight: 'bold', textTransform: 'uppercase' }}>
            Result
          </span>
        </div>
        <h1 style={{ fontSize: 60, color: 'white', fontWeight: 600, lineHeight: 1.3 }}>
          "{tagline}"
        </h1>
      </div>
    </AbsoluteFill>
  );
};

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({ frame, fps, from: 0.5, to: 1, config: { stiffness: 100 } });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.bg, 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: FONT_FAMILY 
    }}>
      <div style={{ transform: `scale(${scale})`, textAlign: 'center' }}>
        <h2 style={{ fontSize: 50, color: 'white', marginBottom: 30 }}>
          STEAL THIS SYSTEM
        </h2>
        <div style={{ 
          background: COLORS.primary, 
          padding: '30px 80px', 
          fontSize: 70, 
          fontWeight: 900, 
          color: 'black',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 30,
          transform: 'rotate(-2deg)' // Edgy tilt
        }}>
          RealAIExamples.com <Lock size={60} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- MAIN COMPONENT ---

export const BlueprintPromo: React.FC<BlueprintPromoProps> = ({ title, tagline, category }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      
      {/* 0-3s: STOP! */}
      <Sequence from={0} durationInFrames={90}>
        <SceneHook category={category} />
      </Sequence>

      {/* 3-5s: Agitation */}
      <Sequence from={90} durationInFrames={60}>
        <SceneAgitation />
      </Sequence>

      {/* 5-9s: Solution Reveal */}
      <Sequence from={150} durationInFrames={120}>
        <SceneSolution title={title} tagline={tagline} />
      </Sequence>

      {/* 9-13s: Outcome/Tagline */}
      <Sequence from={270} durationInFrames={120}>
        <SceneOutcome tagline={tagline} />
      </Sequence>

      {/* 13-15s: CTA */}
      <Sequence from={390} durationInFrames={60}>
        <SceneCTA />
      </Sequence>

    </AbsoluteFill>
  );
};
