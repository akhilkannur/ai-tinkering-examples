import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from 'remotion';

// Film grain overlay
const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = frame * 1000;
  
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='${seed}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />
  );
};

// Cinematic letterbox bars
const Letterbox: React.FC = () => (
  <>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        background: '#000',
        zIndex: 999,
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: '#000',
        zIndex: 999,
      }}
    />
  </>
);

// Volumetric light rays
const LightRays: React.FC<{ x: number; y: number; intensity?: number }> = ({
  x,
  y,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const flicker = 0.8 + Math.sin(frame * 0.1) * 0.2;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 400,
        top: y - 400,
        width: 800,
        height: 800,
        background: `radial-gradient(ellipse at center, rgba(255,220,180,${0.3 * intensity * flicker}) 0%, rgba(255,180,100,${0.1 * intensity * flicker}) 30%, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />
  );
};

// Lens flare
const LensFlare: React.FC<{ x: number; y: number; size?: number }> = ({
  x,
  y,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.15) * 0.1;
  
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x - size / 2,
          top: y - size / 2,
          width: size * pulse,
          height: size * pulse,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,150,0.8) 0%, rgba(255,150,50,0.3) 30%, transparent 60%)',
          filter: 'blur(2px)',
        }}
      />
      {/* Secondary flares */}
      <div
        style={{
          position: 'absolute',
          left: x + 150,
          top: y + 80,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,200,255,0.6) 0%, transparent 70%)',
          filter: 'blur(3px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x - 200,
          top: y + 120,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,100,150,0.5) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
    </>
  );
};

// Floating dust particles
const DustParticles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const frame = useCurrentFrame();
  
  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (i * 137.5) % 100,
      y: (i * 73.3) % 100,
      size: 2 + (i % 4),
      speed: 0.3 + (i % 5) * 0.1,
      opacity: 0.2 + (i % 3) * 0.15,
    }));
  }, [count]);
  
  return (
    <>
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed * 0.5) % 120 - 10;
        const x = p.x + Math.sin(frame * 0.02 + i) * 3;
        const flicker = 0.5 + Math.sin(frame * 0.1 + i * 0.5) * 0.5;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: `rgba(255,240,200,${p.opacity * flicker})`,
              filter: 'blur(1px)',
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </>
  );
};

// Dramatic text reveal with light
const CinematicText: React.FC<{
  children: string;
  size?: number;
  delay?: number;
  color?: string;
}> = ({ children, size = 100, delay = 0, color = '#fff' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const y = interpolate(frame - delay, [0, 30], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const scale = interpolate(frame - delay, [0, 25], [1.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const glow = interpolate(frame - delay, [10, 40], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
        fontSize: size,
        fontWeight: 700,
        color,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        textShadow: `0 0 ${glow}px rgba(255,200,150,0.8), 0 4px 30px rgba(0,0,0,0.5)`,
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </div>
  );
};

// Scene wrapper with cinematic feel
const CinematicScene: React.FC<{
  children: React.ReactNode;
  bg?: string;
  lightX?: number;
  lightY?: number;
}> = ({ children, bg = '#0a0a0a', lightX = 540, lightY = 400 }) => {
  return (
    <AbsoluteFill style={{ background: bg, overflow: 'hidden' }}>
      <LightRays x={lightX} y={lightY} />
      <DustParticles />
      {children}
      <FilmGrain />
      <Letterbox />
    </AbsoluteFill>
  );
};

// Scene 1: The tools you own (dramatic reveal)
const ToolsReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const tools = ['ChatGPT', 'Claude', 'Cursor', 'Gemini', 'Copilot', 'Midjourney'];
  
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 40], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <CinematicScene bg="linear-gradient(180deg, #0a0808 0%, #1a1210 100%)" lightX={540} lightY={300}>
      <LensFlare x={800} y={200} size={150} />
      
      <div
        style={{
          position: 'absolute',
          top: 280,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 48,
            fontWeight: 400,
            color: 'rgba(255,200,150,0.6)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          You own
        </div>
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: 450,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 25,
        }}
      >
        {tools.map((tool, i) => {
          const delay = 20 + i * 12;
          const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const x = interpolate(frame - delay, [0, 20], [100, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });
          const glow = interpolate(frame - delay, [5, 25], [30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          
          return (
            <div
              key={tool}
              style={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: 72,
                fontWeight: 600,
                color: '#fff',
                opacity,
                transform: `translateX(${x}px)`,
                textShadow: `0 0 ${glow}px rgba(255,150,50,0.8), 0 2px 20px rgba(0,0,0,0.5)`,
              }}
            >
              {tool}
            </div>
          );
        })}
      </div>
    </CinematicScene>
  );
};

// Scene 2: The devastating zero
const TheZero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const zoomIn = interpolate(frame, [0, 60], [0.5, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const zeroOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const zeroScale = interpolate(frame, [20, 50], [2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const shake = frame > 45 ? Math.sin(frame * 2) * (1 - (frame - 45) / 30) * 5 : 0;
  
  const subtitleOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <CinematicScene bg="linear-gradient(180deg, #0a0505 0%, #1a0a0a 100%)" lightX={540} lightY={960}>
      <LensFlare x={540} y={800} size={300} />
      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${zoomIn}) translateX(${shake}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 500,
            fontWeight: 900,
            color: '#ff3333',
            opacity: zeroOpacity,
            transform: `scale(${zeroScale})`,
            textShadow: '0 0 100px rgba(255,50,50,0.8), 0 0 200px rgba(255,0,0,0.4)',
            lineHeight: 0.8,
          }}
        >
          0
        </div>
        
        <div
          style={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 56,
            fontWeight: 400,
            color: 'rgba(255,150,150,0.8)',
            opacity: subtitleOpacity,
            marginTop: 40,
            letterSpacing: '0.1em',
          }}
        >
          things shipped
        </div>
      </div>
    </CinematicScene>
  );
};

// Scene 3: The endless loop (slow, dramatic)
const TheLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const stages = [
    { text: 'Get inspired', angle: 0 },
    { text: 'Research', angle: 72 },
    { text: 'Overthink', angle: 144 },
    { text: 'Abandon', angle: 216 },
    { text: 'Repeat', angle: 288 },
  ];
  
  const rotation = interpolate(frame, [0, 120], [0, 360], {
    easing: Easing.inOut(Easing.cubic),
  });
  
  const centerPulse = 1 + Math.sin(frame * 0.08) * 0.05;

  return (
    <CinematicScene bg="linear-gradient(180deg, #050510 0%, #0a0a1a 100%)" lightX={540} lightY={960}>
      <LensFlare x={540} y={960} size={100} />
      
      <div
        style={{
          position: 'absolute',
          top: 250,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <CinematicText size={64} color="rgba(255,200,150,0.7)">
          The cycle never ends
        </CinematicText>
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: 500,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 700,
        }}
      >
        {/* Rotating ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '2px solid rgba(255,200,150,0.2)',
            borderRadius: '50%',
            transform: `rotate(${rotation}deg)`,
          }}
        />
        
        {/* Stages */}
        {stages.map((stage, i) => {
          const stageAngle = (stage.angle + rotation) * (Math.PI / 180);
          const radius = 280;
          const x = Math.cos(stageAngle - Math.PI / 2) * radius + 350;
          const y = Math.sin(stageAngle - Math.PI / 2) * radius + 350;
          
          const activeIndex = Math.floor((rotation % 360) / 72);
          const isActive = i === activeIndex;
          
          return (
            <div
              key={stage.text}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: isActive ? 36 : 28,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                textShadow: isActive ? '0 0 30px rgba(255,200,150,0.8)' : 'none',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              {stage.text}
            </div>
          );
        })}
        
        {/* Center */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${centerPulse})`,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,100,50,0.3) 0%, transparent 70%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 60,
          }}
        >
          ∞
        </div>
      </div>
    </CinematicScene>
  );
};

// Scene 4: Week 1 vs Week 47
const WeekContrast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const week1Opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const vsOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const week47Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const parallax1 = interpolate(frame, [0, 120], [50, 0], {
    extrapolateRight: 'clamp',
  });
  
  const parallax2 = interpolate(frame, [60, 120], [50, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <CinematicScene bg="linear-gradient(180deg, #0a0a0a 0%, #151520 100%)" lightX={540} lightY={500}>
      <LensFlare x={200} y={400} size={100} />
      
      {/* Week 1 */}
      <div
        style={{
          position: 'absolute',
          top: 350,
          left: 100,
          opacity: week1Opacity,
          transform: `translateY(${parallax1}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 100,
            fontWeight: 700,
            color: '#4ade80',
            textShadow: '0 0 60px rgba(74,222,128,0.5)',
          }}
        >
          Week 1
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 40,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 20,
            maxWidth: 500,
          }}
        >
          "This is the week I finally build something"
        </div>
      </div>
      
      {/* VS */}
      <div
        style={{
          position: 'absolute',
          top: 900,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: vsOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 60,
            fontWeight: 300,
            color: 'rgba(255,200,150,0.4)',
            letterSpacing: '0.3em',
          }}
        >
          VS
        </div>
      </div>
      
      {/* Week 47 */}
      <div
        style={{
          position: 'absolute',
          top: 1100,
          right: 100,
          textAlign: 'right',
          opacity: week47Opacity,
          transform: `translateY(${parallax2}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 100,
            fontWeight: 700,
            color: '#f87171',
            textShadow: '0 0 60px rgba(248,113,113,0.5)',
          }}
        >
          Week 47
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 40,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 20,
            maxWidth: 500,
          }}
        >
          *opens Claude to ask what to build*
        </div>
      </div>
    </CinematicScene>
  );
};

// Scene 5: The solution reveal
const TheSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const spotlightSize = interpolate(frame, [0, 60], [0, 1000], {
    easing: Easing.out(Easing.cubic),
  });
  
  const textReveal = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const line2Reveal = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const line3Reveal = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      {/* Spotlight reveal */}
      <div
        style={{
          position: 'absolute',
          left: 540 - spotlightSize / 2,
          top: 960 - spotlightSize / 2,
          width: spotlightSize,
          height: spotlightSize,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,150,0.15) 0%, rgba(255,150,50,0.05) 50%, transparent 70%)',
        }}
      />
      
      <DustParticles count={20} />
      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <div style={{ opacity: textReveal, transform: `translateY(${(1 - textReveal) * 40}px)` }}>
          <div
            style={{
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: 90,
              fontWeight: 800,
              color: '#fff',
              textShadow: '0 0 60px rgba(255,200,150,0.5)',
              textAlign: 'center',
            }}
          >
            Small group.
          </div>
        </div>
        
        <div style={{ opacity: line2Reveal, transform: `translateY(${(1 - line2Reveal) * 40}px)` }}>
          <div
            style={{
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: 90,
              fontWeight: 800,
              color: '#fff',
              textShadow: '0 0 60px rgba(255,200,150,0.5)',
              textAlign: 'center',
            }}
          >
            Weekly builds.
          </div>
        </div>
        
        <div style={{ opacity: line3Reveal, transform: `translateY(${(1 - line3Reveal) * 40}px)` }}>
          <div
            style={{
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: 60,
              fontWeight: 500,
              color: 'rgba(255,180,100,0.9)',
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Proof or it didn't happen.
          </div>
        </div>
      </div>
      
      <FilmGrain />
      <Letterbox />
    </AbsoluteFill>
  );
};

// Scene 6: Final CTA
const FinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const mainOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const mainScale = interpolate(frame, [0, 40], [0.9, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const ctaOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const pulse = 1 + Math.sin(frame * 0.1) * 0.02;

  return (
    <CinematicScene bg="linear-gradient(180deg, #050505 0%, #0a0a0a 100%)" lightX={540} lightY={800}>
      <LensFlare x={540} y={700} size={200} />
      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: mainOpacity,
          transform: `scale(${mainScale})`,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 100,
            fontWeight: 800,
            color: '#fff',
            textAlign: 'center',
            textShadow: '0 0 80px rgba(255,200,150,0.6)',
            lineHeight: 1.2,
          }}
        >
          Stop collecting.
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 100,
            fontWeight: 800,
            color: '#f59e0b',
            textAlign: 'center',
            textShadow: '0 0 80px rgba(245,158,11,0.6)',
            lineHeight: 1.2,
            marginTop: 20,
          }}
        >
          Start shipping.
        </div>
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: 350,
          left: '50%',
          transform: `translateX(-50%) scale(${pulse})`,
          opacity: ctaOpacity,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255,200,150,0.2) 0%, rgba(255,150,50,0.1) 100%)',
            border: '1px solid rgba(255,200,150,0.3)',
            padding: '30px 80px',
            borderRadius: 100,
            fontFamily: "'SF Pro Display', sans-serif",
            fontSize: 44,
            fontWeight: 600,
            color: 'rgba(255,220,180,0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          DM to join →
        </div>
      </div>
    </CinematicScene>
  );
};

export const ToolGraveyardCinematic: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Sequence from={0} durationInFrames={100}>
        <ToolsReveal />
      </Sequence>
      
      <Sequence from={100} durationInFrames={90}>
        <TheZero />
      </Sequence>
      
      <Sequence from={190} durationInFrames={130}>
        <TheLoop />
      </Sequence>
      
      <Sequence from={320} durationInFrames={130}>
        <WeekContrast />
      </Sequence>
      
      <Sequence from={450} durationInFrames={120}>
        <TheSolution />
      </Sequence>
      
      <Sequence from={570} durationInFrames={100}>
        <FinalCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
