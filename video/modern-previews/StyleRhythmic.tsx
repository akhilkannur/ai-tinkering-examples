import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const StyleRhythmic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat logic: New word every 20 frames
  const phase = Math.floor(frame / 20); 
  const words = ["BUILD.", "SHIP.", "REPEAT.", "NOW."];
  const currentWord = words[phase % words.length];

  // Local frame for the "Stomp" effect
  const localFrame = frame % 20;
  
  // Spring that slams down: starts huge (3x), lands at 1x
  const scale = spring({
    frame: localFrame,
    fps,
    from: 4,
    to: 1,
    config: {
      mass: 0.5,
      damping: 10, // A bit of bounce
      stiffness: 100,
    }
  });

  // Background flashes on impact
  const flash = interpolate(localFrame, [0, 5], [1, 0], { extrapolateRight: 'clamp' });
  const bgColor = phase % 2 === 0 ? '#000000' : '#FFFFFF';
  const textColor = phase % 2 === 0 ? '#FFFFFF' : '#000000';

  return (
    <AbsoluteFill style={{ 
      backgroundColor: bgColor, 
      justifyContent: 'center', 
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Flash overlay */}
      <AbsoluteFill style={{ 
        backgroundColor: textColor, 
        opacity: flash * 0.3 
      }} />

      <div style={{
        fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 900,
        fontSize: 180,
        color: textColor,
        textTransform: 'uppercase',
        transform: `scale(${scale})`,
        letterSpacing: '-0.05em'
      }}>
        {currentWord}
      </div>
    </AbsoluteFill>
  );
};
