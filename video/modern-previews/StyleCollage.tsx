import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random, interpolate } from 'remotion';

export const StyleCollage: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Simulate lower framerate (Stop motion feel) - 12fps effective
  const posterize = Math.floor(frame / 5) * 5; 
  
  const rotation = random(posterize) * 10 - 5; // Jitter rotation
  const offsetX = random(posterize + 1) * 20 - 10;
  const offsetY = random(posterize + 2) * 20 - 10;

  // Paper texture background (simulated with CSS)
  return (
    <AbsoluteFill style={{ backgroundColor: '#F0E68C', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Background Elements - Polka Dots */}
      <AbsoluteFill style={{ 
        backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
        backgroundSize: '30px 30px',
        opacity: 0.1
      }} />

      {/* Abstract Shape 1 */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: 300,
        height: 300,
        background: '#FF6B6B',
        borderRadius: '50%',
        transform: `translate(${offsetX * 2}px, ${offsetY * 2}px)`
      }} />

      {/* Abstract Shape 2 */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '5%',
        width: 400,
        height: 100,
        background: '#4ECDC4',
        transform: `rotate(-15deg) translate(${offsetX}px, ${offsetY}px)`
      }} />

      {/* Main Sticker */}
      <div style={{
        background: 'white',
        padding: '40px 60px',
        border: '8px solid black',
        boxShadow: '20px 20px 0px rgba(0,0,0,1)',
        transform: `rotate(${rotation}deg)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif', // Intentional casual font
          fontSize: 80,
          margin: 0,
          color: 'black',
          textTransform: 'uppercase',
          lineHeight: 1
        }}>
          NO GURUS.
        </h1>
        <div style={{
          marginTop: 20,
          background: 'black',
          color: 'white',
          padding: '10px 20px',
          fontSize: 40,
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}>
          JUST BUILD
        </div>
      </div>

    </AbsoluteFill>
  );
};
