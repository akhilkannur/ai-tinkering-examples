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

const Scene: React.FC<{
  children: React.ReactNode;
  bg: string;
}> = ({ children, bg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const fadeIn = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: bg,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn,
        padding: 60,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const TypeText: React.FC<{
  text: string;
  color?: string;
  size?: number;
  delay?: number;
  weight?: number;
}> = ({ text, color = '#1a1a1a', size = 90, delay = 0, weight = 800 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 12, stiffness: 200 },
  });

  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const y = spring({
    frame: frame - delay,
    fps,
    from: 40,
    to: 0,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: size,
        fontWeight: weight,
        color,
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        transform: `scale(${scale}) translateY(${y}px)`,
        opacity,
      }}
    >
      {text}
    </div>
  );
};

const Counter: React.FC<{ target: number; prefix?: string; suffix?: string }> = ({
  target,
  prefix = '',
  suffix = '',
}) => {
  const frame = useCurrentFrame();
  const count = Math.min(Math.floor(frame * 0.8), target);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
};

const ToolList: React.FC = () => {
  const frame = useCurrentFrame();
  const tools = ['ChatGPT', 'Claude', 'Cursor', 'Gemini', 'Copilot', 'Midjourney', 'Perplexity'];
  
  const visibleCount = Math.min(Math.floor(frame / 6), tools.length);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      {tools.slice(0, visibleCount).map((tool, i) => (
        <div
          key={tool}
          style={{
            fontFamily: 'SF Pro Display, -apple-system, sans-serif',
            fontSize: 72,
            fontWeight: 600,
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <span style={{ opacity: 0.4 }}>✓</span> {tool}
        </div>
      ))}
    </div>
  );
};

const PulsingZero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const pulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.95, 1.05]
  );
  
  const enterScale = spring({
    frame,
    fps,
    from: 3,
    to: 1,
    config: { damping: 8, stiffness: 80 },
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 400,
          fontWeight: 900,
          color: '#ef4444',
          transform: `scale(${enterScale * pulse})`,
          lineHeight: 1,
        }}
      >
        0
      </div>
      <div
        style={{
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 48,
          fontWeight: 500,
          color: '#666',
          marginTop: -20,
        }}
      >
        things shipped
      </div>
    </div>
  );
};

const WeekCounter: React.FC<{ week: number; text: string }> = ({ week, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12 },
  });

  return (
    <div style={{ textAlign: 'center', transform: `scale(${scale})` }}>
      <div
        style={{
          fontFamily: 'SF Mono, monospace',
          fontSize: 140,
          fontWeight: 700,
          color: '#6366f1',
          lineHeight: 1,
        }}
      >
        Week {week}
      </div>
      <div
        style={{
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 52,
          fontWeight: 500,
          color: '#374151',
          marginTop: 30,
          maxWidth: 800,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const SplitComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const leftSlide = spring({
    frame,
    fps,
    from: -400,
    to: 0,
    config: { damping: 15 },
  });
  
  const rightSlide = spring({
    frame: frame - 10,
    fps,
    from: 400,
    to: 0,
    config: { damping: 15 },
  });

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div
        style={{
          flex: 1,
          background: '#fef3c7',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateX(${leftSlide}px)`,
          padding: 40,
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>📺</div>
        <div
          style={{
            fontFamily: 'SF Pro Display, -apple-system, sans-serif',
            fontSize: 56,
            fontWeight: 700,
            color: '#92400e',
            textAlign: 'center',
          }}
        >
          "I'll watch one more tutorial"
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: '#d1fae5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateX(${rightSlide}px)`,
          padding: 40,
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🚀</div>
        <div
          style={{
            fontFamily: 'SF Pro Display, -apple-system, sans-serif',
            fontSize: 56,
            fontWeight: 700,
            color: '#065f46',
            textAlign: 'center',
          }}
        >
          "I shipped something ugly but real"
        </div>
      </div>
    </div>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const lines = [
    { text: 'Small group.', delay: 0 },
    { text: 'Weekly builds.', delay: 12 },
    { text: "Proof or it didn't happen.", delay: 24 },
  ];
  
  return (
    <div style={{ textAlign: 'center' }}>
      {lines.map((line, i) => (
        <div key={i} style={{ marginBottom: 30 }}>
          <TypeText
            text={line.text}
            size={i === 2 ? 64 : 80}
            delay={line.delay}
            color={i === 2 ? '#6366f1' : '#1a1a1a'}
            weight={i === 2 ? 600 : 800}
          />
        </div>
      ))}
    </div>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10 },
  });
  
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        textAlign: 'center',
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 100,
          fontWeight: 800,
          color: '#1a1a1a',
          marginBottom: 40,
        }}
      >
        Stop collecting.
      </div>
      <div
        style={{
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 100,
          fontWeight: 800,
          color: '#6366f1',
        }}
      >
        Start shipping.
      </div>
      <div
        style={{
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 44,
          fontWeight: 500,
          color: '#9ca3af',
          marginTop: 80,
        }}
      >
        DM to join the group
      </div>
    </div>
  );
};

export const ToolGraveyard: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#fafafa' }}>
      {/* Scene 1: Your AI tools */}
      <Sequence from={0} durationInFrames={45}>
        <Scene bg="linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)">
          <div style={{ textAlign: 'center' }}>
            <TypeText text="Your AI subscriptions:" size={70} color="#666" weight={500} />
            <div style={{ marginTop: 50 }}>
              <ToolList />
            </div>
          </div>
        </Scene>
      </Sequence>

      {/* Scene 2: Big zero */}
      <Sequence from={45} durationInFrames={50}>
        <Scene bg="linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%)">
          <PulsingZero />
        </Scene>
      </Sequence>

      {/* Scene 3: Week 1 */}
      <Sequence from={95} durationInFrames={45}>
        <Scene bg="linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)">
          <WeekCounter week={1} text="This week I'll finally build something" />
        </Scene>
      </Sequence>

      {/* Scene 4: Week 47 */}
      <Sequence from={140} durationInFrames={50}>
        <Scene bg="linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)">
          <WeekCounter week={47} text="Opens Claude to ask what to build" />
        </Scene>
      </Sequence>

      {/* Scene 5: Split comparison */}
      <Sequence from={190} durationInFrames={55}>
        <AbsoluteFill>
          <SplitComparison />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: CTA */}
      <Sequence from={245} durationInFrames={55}>
        <Scene bg="linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)">
          <CTA />
        </Scene>
      </Sequence>

      {/* Scene 7: End card */}
      <Sequence from={300} durationInFrames={60}>
        <Scene bg="linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)">
          <EndCard />
        </Scene>
      </Sequence>
    </AbsoluteFill>
  );
};
