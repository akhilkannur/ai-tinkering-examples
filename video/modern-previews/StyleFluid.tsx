import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const StyleFluid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth sliding background
  const bgPos = interpolate(frame, [0, 90], [0, 100]);

  // Word logic
  const phase = frame < 30 ? 0 : frame < 60 ? 1 : 2;
  const words = ["IDEAS", "INTO", "REALITY"];
  const currentWord = words[phase];

  // Animation reset for each word
  const localFrame = frame % 30;
  
  // Elastic spring
  const moveUp = spring({
    frame: localFrame,
    fps,
    from: 200,
    to: 0,
    config: {
      damping: 12,
      stiffness: 120,
      mass: 0.8
    }
  });

  const stretch = interpolate(localFrame, [0, 5, 15], [1.5, 0.8, 1]); // Stretch Y on entry, squash, then normalize
  const opacity = interpolate(localFrame, [0, 5], [0, 1]);

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)',
      backgroundSize: '200% 200%',
      backgroundPosition: `${bgPos}% 50%`,
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      
      {/* Glassmorphism Card */}
      <div style={{
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '60px 100px',
        borderRadius: '40px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
        transform: `translateY(${moveUp}px) scaleY(${stretch})`,
        opacity
      }}>
        <h1 style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 90,
          fontWeight: 800,
          color: 'white',
          letterSpacing: '-0.02em',
          margin: 0,
          textAlign: 'center'
        }}>
          {currentWord}
        </h1>
      </div>

    </AbsoluteFill>
  );
};
