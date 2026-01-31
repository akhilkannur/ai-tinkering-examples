import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const StyleKinetic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 10 } });
  
  const rotation = interpolate(frame, [0, 90], [-5, 5]);
  
  // Phase logic
  const phase = Math.floor(frame / 30); // 0, 1, 2
  const words = ["NO COURSES", "NO GURUS", "JUST BUILD"];
  const colors = ["#8B5CF6", "#FBBF24", "#EF4444"];
  const bgs = ["#111", "#8B5CF6", "#FBBF24"];
  
  const currentWord = words[phase] || words[2];
  const currentColor = colors[phase] || colors[2];
  const currentBg = bgs[phase] || bgs[2];

  // Reset spring for each word roughly
  const localFrame = frame % 30;
  const wordScale = spring({ frame: localFrame, fps, from: 0.2, to: 1.2, config: { stiffness: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: currentBg, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        fontFamily: 'Impact, sans-serif',
        fontSize: 180,
        color: phase === 1 ? '#FFF' : (phase === 2 ? '#FFF' : '#FFF'),
        textTransform: 'uppercase',
        transform: `scale(${wordScale}) rotate(${phase % 2 === 0 ? rotation : -rotation}deg)`,
        textAlign: 'center',
        lineHeight: 0.9,
        textShadow: '10px 10px 0px rgba(0,0,0,0.2)'
      }}>
        {currentWord}
      </div>
    </AbsoluteFill>
  );
};
