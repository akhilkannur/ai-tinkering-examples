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

// Animated floating blob
const Blob: React.FC<{
  color: string;
  size: number;
  x: number;
  y: number;
  delay?: number;
}> = ({ color, size, x, y, delay = 0 }) => {
  const frame = useCurrentFrame();
  
  const floatY = Math.sin((frame + delay) * 0.05) * 30;
  const floatX = Math.cos((frame + delay) * 0.03) * 20;
  const scale = 1 + Math.sin((frame + delay) * 0.04) * 0.1;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(60px)',
        transform: `translate(${floatX}px, ${floatY}px) scale(${scale})`,
        opacity: 0.6,
      }}
    />
  );
};

// Tool card that stacks
const ToolCard: React.FC<{
  name: string;
  index: number;
  total: number;
  color: string;
}> = ({ name, index, total, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const enterDelay = index * 5;
  
  const y = spring({
    frame: frame - enterDelay,
    fps,
    from: -200,
    to: index * 12,
    config: { damping: 12, stiffness: 100 },
  });
  
  const rotation = interpolate(index, [0, total], [-8, 8]);
  const scale = interpolate(index, [0, total], [1, 0.92]);
  
  const opacity = spring({
    frame: frame - enterDelay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 20 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        width: 700,
        height: 140,
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'SF Pro Display, -apple-system, sans-serif',
        fontSize: 52,
        fontWeight: 700,
        color: '#fff',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        transform: `translateY(${y}px) rotate(${rotation}deg) scale(${scale})`,
        opacity,
        zIndex: total - index,
      }}
    >
      {name}
    </div>
  );
};

// Animated counter ring
const CounterRing: React.FC<{ progress: number; size: number; color: string }> = ({
  progress,
  size,
  color,
}) => {
  const circumference = 2 * Math.PI * (size / 2 - 20);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} style={{ position: 'absolute' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 20}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={12}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 20}
        fill="none"
        stroke={color}
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

// Scene 1: Tool cards stacking
const ToolStackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const tools = [
    { name: 'ChatGPT', color: '#10a37f' },
    { name: 'Claude', color: '#cc785c' },
    { name: 'Cursor', color: '#7c3aed' },
    { name: 'Gemini', color: '#4285f4' },
    { name: 'Copilot', color: '#000' },
    { name: 'Midjourney', color: '#0d1117' },
  ];
  
  const visibleCount = Math.min(Math.floor(frame / 8) + 1, tools.length);
  
  const titleOpacity = spring({ frame, fps, from: 0, to: 1 });
  const titleY = spring({ frame, fps, from: 30, to: 0, config: { damping: 15 } });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Blob color="#6366f1" size={400} x={100} y={200} delay={0} />
      <Blob color="#ec4899" size={350} x={600} y={1200} delay={20} />
      <Blob color="#10b981" size={300} x={700} y={400} delay={40} />
      
      <div
        style={{
          position: 'absolute',
          top: 180,
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 64,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.5)',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Your AI toolkit:
      </div>
      
      <div style={{ position: 'relative', marginTop: 100 }}>
        {tools.slice(0, visibleCount).map((tool, i) => (
          <ToolCard
            key={tool.name}
            name={tool.name}
            index={i}
            total={tools.length}
            color={tool.color}
          />
        ))}
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          display: 'flex',
          gap: 15,
        }}
      >
        {tools.map((_, i) => (
          <div
            key={i}
            style={{
              width: 50,
              height: 8,
              borderRadius: 4,
              background: i < visibleCount ? '#fff' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: The big zero with ring
const ZeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const ringProgress = spring({
    frame,
    fps,
    from: 1,
    to: 0,
    config: { damping: 30, stiffness: 50 },
  });
  
  const zeroScale = spring({
    frame: frame - 15,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 100 },
  });
  
  const shake = frame > 20 ? Math.sin(frame * 0.8) * 3 : 0;
  
  const subtitleOpacity = interpolate(frame, [25, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #1a0a0a 0%, #2d1515 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Blob color="#ef4444" size={500} x={200} y={600} delay={0} />
      <Blob color="#f97316" size={400} x={600} y={1000} delay={30} />
      
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CounterRing progress={ringProgress} size={500} color="#ef4444" />
        <div
          style={{
            fontFamily: 'SF Pro Display, -apple-system, sans-serif',
            fontSize: 280,
            fontWeight: 900,
            color: '#ef4444',
            transform: `scale(${zeroScale}) translateX(${shake}px)`,
            textShadow: '0 0 100px rgba(239,68,68,0.5)',
          }}
        >
          0
        </div>
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: 400,
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 56,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.6)',
          opacity: subtitleOpacity,
        }}
      >
        things actually shipped
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Timeline visualization
const TimelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const lineWidth = spring({
    frame,
    fps,
    from: 0,
    to: 800,
    config: { damping: 20, stiffness: 60 },
  });
  
  const week1Opacity = interpolate(frame, [15, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const week47Opacity = interpolate(frame, [35, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const week1Scale = spring({ frame: frame - 15, fps, from: 0.5, to: 1, config: { damping: 10 } });
  const week47Scale = spring({ frame: frame - 35, fps, from: 0.5, to: 1, config: { damping: 10 } });
  
  const dotPulse = 1 + Math.sin(frame * 0.2) * 0.15;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #0a1628 0%, #1e293b 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Blob color="#3b82f6" size={400} x={100} y={400} delay={0} />
      <Blob color="#8b5cf6" size={350} x={700} y={1200} delay={25} />
      
      {/* Timeline line */}
      <div
        style={{
          position: 'absolute',
          top: 960,
          left: 140,
          width: lineWidth,
          height: 8,
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          borderRadius: 4,
        }}
      />
      
      {/* Week 1 */}
      <div
        style={{
          position: 'absolute',
          left: 140,
          top: 600,
          opacity: week1Opacity,
          transform: `scale(${week1Scale})`,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#3b82f6',
            position: 'absolute',
            top: 320,
            left: 0,
            transform: `scale(${dotPulse})`,
            boxShadow: '0 0 30px rgba(59,130,246,0.6)',
          }}
        />
        <div style={{ fontFamily: 'SF Mono, monospace', fontSize: 100, fontWeight: 700, color: '#3b82f6' }}>
          Week 1
        </div>
        <div style={{ fontFamily: 'SF Pro Display, sans-serif', fontSize: 44, color: 'rgba(255,255,255,0.6)', marginTop: 10, maxWidth: 400 }}>
          "I'll build something cool this week"
        </div>
      </div>
      
      {/* Week 47 */}
      <div
        style={{
          position: 'absolute',
          right: 140,
          top: 1050,
          opacity: week47Opacity,
          transform: `scale(${week47Scale})`,
          textAlign: 'right',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#8b5cf6',
            position: 'absolute',
            top: -130,
            right: 0,
            transform: `scale(${dotPulse})`,
            boxShadow: '0 0 30px rgba(139,92,246,0.6)',
          }}
        />
        <div style={{ fontFamily: 'SF Mono, monospace', fontSize: 100, fontWeight: 700, color: '#8b5cf6' }}>
          Week 47
        </div>
        <div style={{ fontFamily: 'SF Pro Display, sans-serif', fontSize: 44, color: 'rgba(255,255,255,0.6)', marginTop: 10, maxWidth: 500 }}>
          *opens Claude to ask what to build*
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: The loop visualization
const LoopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const rotation = interpolate(frame, [0, 90], [0, 360]);
  
  const items = ['Idea', 'Research', 'Overthink', 'Abandon', 'New idea'];
  
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Blob color="#f59e0b" size={400} x={100} y={600} delay={0} />
      <Blob color="#ef4444" size={350} x={700} y={1100} delay={20} />
      
      <div
        style={{
          position: 'relative',
          width: 600,
          height: 600,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {items.map((item, i) => {
          const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * 250 + 250;
          const y = Math.sin(angle) * 250 + 250;
          
          return (
            <div
              key={item}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                padding: '20px 40px',
                borderRadius: 20,
                fontFamily: 'SF Pro Display, sans-serif',
                fontSize: 36,
                fontWeight: 600,
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              {item}
            </div>
          );
        })}
        
        {/* Center arrow loop */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 120,
          }}
        >
          🔄
        </div>
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          fontFamily: 'SF Pro Display, sans-serif',
          fontSize: 64,
          fontWeight: 700,
          color: '#fff',
        }}
      >
        The infinite loop
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Breaking the loop
const BreakLoopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const barWidth = spring({
    frame,
    fps,
    from: 0,
    to: 100,
    config: { damping: 15 },
  });
  
  const checkScale = spring({
    frame: frame - 30,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 150 },
  });
  
  const weeks = ['W1', 'W2', 'W3', 'W4'];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #052e16 0%, #14532d 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <Blob color="#10b981" size={450} x={100} y={400} delay={0} />
      <Blob color="#34d399" size={350} x={650} y={1100} delay={30} />
      
      <div
        style={{
          fontFamily: 'SF Pro Display, sans-serif',
          fontSize: 72,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 80,
          textAlign: 'center',
        }}
      >
        What if you actually shipped?
      </div>
      
      <div style={{ display: 'flex', gap: 40 }}>
        {weeks.map((week, i) => {
          const delay = i * 10;
          const thisBarWidth = spring({
            frame: frame - delay,
            fps,
            from: 0,
            to: 100,
            config: { damping: 15 },
          });
          
          return (
            <div key={week} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div
                style={{
                  width: 120,
                  height: 400,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${thisBarWidth}%`,
                    background: 'linear-gradient(180deg, #10b981, #34d399)',
                    borderRadius: 20,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'SF Mono, monospace',
                  fontSize: 36,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {week}
              </div>
            </div>
          );
        })}
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          transform: `scale(${checkScale})`,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: '#10b981',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 48,
            boxShadow: '0 0 40px rgba(16,185,129,0.5)',
          }}
        >
          ✓
        </div>
        <div
          style={{
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: 48,
            fontWeight: 600,
            color: '#fff',
          }}
        >
          4 builds. 4 weeks. Proof.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: CTA
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const line1 = spring({ frame, fps, from: 0, to: 1, config: { damping: 15 } });
  const line2 = spring({ frame: frame - 15, fps, from: 0, to: 1, config: { damping: 15 } });
  const line3 = spring({ frame: frame - 30, fps, from: 0, to: 1, config: { damping: 15 } });
  
  const buttonScale = spring({
    frame: frame - 45,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10, stiffness: 200 },
  });
  
  const buttonPulse = 1 + Math.sin((frame - 45) * 0.1) * 0.03;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <Blob color="#6366f1" size={400} x={150} y={300} delay={0} />
      <Blob color="#ec4899" size={350} x={650} y={1300} delay={25} />
      <Blob color="#8b5cf6" size={300} x={800} y={600} delay={50} />
      
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: 80,
            fontWeight: 800,
            color: '#fff',
            opacity: line1,
            transform: `translateY(${(1 - line1) * 30}px)`,
            marginBottom: 20,
          }}
        >
          Small group.
        </div>
        <div
          style={{
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: 80,
            fontWeight: 800,
            color: '#fff',
            opacity: line2,
            transform: `translateY(${(1 - line2) * 30}px)`,
            marginBottom: 20,
          }}
        >
          Weekly builds.
        </div>
        <div
          style={{
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: 64,
            fontWeight: 600,
            color: '#a78bfa',
            opacity: line3,
            transform: `translateY(${(1 - line3) * 30}px)`,
          }}
        >
          Proof or it didn't happen.
        </div>
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: 250,
          transform: `scale(${buttonScale * buttonPulse})`,
          opacity: frame > 45 ? 1 : 0,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            padding: '30px 80px',
            borderRadius: 100,
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: 48,
            fontWeight: 700,
            color: '#fff',
            boxShadow: '0 20px 60px rgba(99,102,241,0.4)',
          }}
        >
          DM to join →
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ToolGraveyardV2: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={70}>
        <ToolStackScene />
      </Sequence>
      
      <Sequence from={70} durationInFrames={60}>
        <ZeroScene />
      </Sequence>
      
      <Sequence from={130} durationInFrames={80}>
        <TimelineScene />
      </Sequence>
      
      <Sequence from={210} durationInFrames={70}>
        <LoopScene />
      </Sequence>
      
      <Sequence from={280} durationInFrames={70}>
        <BreakLoopScene />
      </Sequence>
      
      <Sequence from={350} durationInFrames={80}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
