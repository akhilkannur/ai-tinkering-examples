import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
  random,
} from 'remotion';

// Technical Grid Background
const TechGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const moveY = (frame * 2) % 100;
  const opacity = 0.15;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,${opacity}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `perspective(1000px) rotateX(60deg) translateY(${moveY}px)`,
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// Moving grain and random micro-glitches
const GritOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const isGlitch = random(frame) > 0.98;
  
  return (
    <AbsoluteFill
      style={{
        opacity: isGlitch ? 0.1 : 0.05,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        transform: `translate(${random(frame) * 20}px, ${random(frame + 1) * 20}px)`,
        filter: isGlitch ? 'invert(1)' : 'none',
      }}
    />
  );
};

// High-impact text with Chromatic Aberration & Echo
const StompText: React.FC<{
  children: string;
  size?: number;
  inverted?: boolean;
  accentColor?: string;
}> = ({ children, size = 160, inverted = false, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 5,
    to: 1,
    config: { mass: 0.5, damping: 12, stiffness: 120 },
  });

  const chromatic = interpolate(frame, [0, 5], [15, 0], { extrapolateRight: 'clamp' });
  const flash = interpolate(frame, [0, 8], [1, 0], { extrapolateRight: 'clamp' });

  const bgColor = inverted ? '#FFFFFF' : '#000000';
  const textColor = accentColor || (inverted ? '#000000' : '#FFFFFF');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill style={{ backgroundColor: textColor, opacity: flash * 0.3 }} />
      
      {/* Chromatic layers */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: size,
          color: textColor,
          textTransform: 'uppercase',
          transform: `scale(${scale}) translate(${chromatic}px, 0)`,
          opacity: 0.5,
          position: 'absolute',
          textAlign: 'center',
          width: '100%',
          filter: 'hue-rotate(90deg)',
        }}
      >
        {children}
      </div>

      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: size,
          color: textColor,
          textTransform: 'uppercase',
          transform: `scale(${scale})`,
          letterSpacing: '-0.05em',
          textAlign: 'center',
          padding: '0 60px',
          lineHeight: 0.9,
          zIndex: 2,
          textShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

const CounterStomp: React.FC<{ number: string; label: string }> = ({ number, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numberScale = spring({
    frame,
    fps,
    from: 8,
    to: 1,
    config: { mass: 0.8, damping: 8, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 500,
            color: '#FFFFFF',
            transform: `scale(${numberScale})`,
            lineHeight: 0.8,
          }}
        >
          {number}
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 45,
            color: '#FFFFFF',
            marginTop: 40,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0 40px',
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SplitStomp: React.FC<{ left: string; right: string }> = ({ left, right }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftX = spring({
    frame,
    fps,
    from: -1000,
    to: 0,
    config: { mass: 0.6, damping: 14, stiffness: 120 },
  });

  const rightX = spring({
    frame: frame - 5,
    fps,
    from: 1000,
    to: 0,
    config: { mass: 0.6, damping: 14, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{
            flex: 1,
            backgroundColor: '#111',
            borderRight: '8px solid #FFD700',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translateX(${leftX}px)`,
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 60,
              color: '#444',
              textTransform: 'uppercase',
              textAlign: 'center',
              padding: 20,
            }}
          >
            {left}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFD700',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translateX(${rightX}px)`,
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 60,
              color: '#000',
              textTransform: 'uppercase',
              textAlign: 'center',
              padding: 20,
            }}
          >
            {right}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const RapidSequence: React.FC<{ words: string[]; framePerWord?: number }> = ({
  words,
  framePerWord = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase = Math.floor(frame / framePerWord);
  const currentWord = words[Math.min(phase, words.length - 1)];
  const localFrame = frame % framePerWord;

  const scale = spring({
    frame: localFrame,
    fps,
    from: 2.5,
    to: 1,
    config: { mass: 0.4, damping: 12, stiffness: 180 },
  });

  const inverted = phase % 2 === 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: inverted ? '#FFFFFF' : '#000000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: 140,
          color: inverted ? '#000000' : '#FFFFFF',
          textTransform: 'uppercase',
          transform: `scale(${scale})`,
          letterSpacing: '-0.05em',
          textAlign: 'center',
          padding: '0 40px',
        }}
      >
        {currentWord}
      </div>
    </AbsoluteFill>
  );
};

const FinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 12, stiffness: 100 },
  });

  const pulse = 1 + Math.sin(frame * 0.15) * 0.03;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center', transform: `scale(${scale * pulse})`, width: '100%' }}>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 80,
            color: '#000000',
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
            padding: '0 20px',
            lineHeight: 1,
          }}
        >
          JOIN<br/>
          <span style={{ color: '#FF0000' }}>REALAIEXAMPLES</span><br/>
          .COM/BUILD-CLUB
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 36,
            color: '#666666',
            marginTop: 50,
            padding: '0 40px',
            letterSpacing: '0.05em',
          }}
        >
          Stop paying. Start building.<br/>
          <span style={{ fontWeight: 900, color: '#000' }}>PROOF REQUIRED.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ToolGraveyardRhythmic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <TechGrid />
      <GritOverlay />
      
      {/* Intro Hook */}
      <Sequence from={0} durationInFrames={30}>
        <StompText size={100} accentColor="#FFD700">AI SUBS = YOUR NEW GYM MEMBERSHIP?</StompText>
      </Sequence>

      {/* Tools (Rapid Fire) */}
      <Sequence from={30} durationInFrames={60}>
        <RapidSequence
          words={['CHATGPT', 'CLAUDE CODE', 'GEMINI', 'LOVABLE', 'MIDJOURNEY']}
          framePerWord={12}
        />
      </Sequence>

      {/* The Problem */}
      <Sequence from={90} durationInFrames={30}>
        <StompText size={120} inverted>DONATING TO AI COMPANIES.</StompText>
      </Sequence>

      {/* Work Check */}
      <Sequence from={120} durationInFrames={45}>
        <CounterStomp number="0" label="PROJECTS SHIPPED" />
      </Sequence>

      {/* The Excuse */}
      <Sequence from={165} durationInFrames={30}>
        <StompText size={100}>"I'LL BUILD IT THIS WEEKEND"</StompText>
      </Sequence>

      {/* Reality Check */}
      <Sequence from={195} durationInFrames={30}>
        <StompText size={180} inverted accentColor="#FF0000">YOU WON'T.</StompText>
      </Sequence>

      {/* The Solution */}
      <Sequence from={225} durationInFrames={30}>
        <StompText size={140} accentColor="#FFD700">BUILDER CLUB.</StompText>
      </Sequence>

      {/* What It Is */}
      <Sequence from={255} durationInFrames={30}>
        <StompText size={100} inverted>YOUR AI ACCOUNTABILITY CREW.</StompText>
      </Sequence>

      {/* The Rule */}
      <Sequence from={285} durationInFrames={35}>
        <StompText size={90}>SHOW PROOF WEEKLY OR GET KICKED.</StompText>
      </Sequence>

      {/* The Split */}
      <Sequence from={320} durationInFrames={40}>
        <SplitStomp left="BOOKMARKING TUTORIALS" right="FINISHING PROJECTS" />
      </Sequence>

      {/* No Mercy */}
      <Sequence from={360} durationInFrames={30}>
        <StompText size={140} inverted accentColor="#FF0000">NO PROOF = NO SPOT.</StompText>
      </Sequence>

      {/* Weekly Rhythm */}
      <Sequence from={390} durationInFrames={40}>
        <RapidSequence
          words={['PING', 'BUILD', 'PROVE', 'REPEAT']}
          framePerWord={10}
        />
      </Sequence>

      {/* The Ultimatum */}
      <Sequence from={430} durationInFrames={30}>
        <StompText size={110}>TINKERING ≠ BUILDING.</StompText>
      </Sequence>

      {/* Final CTA */}
      <Sequence from={460} durationInFrames={60}>
        <FinalCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
