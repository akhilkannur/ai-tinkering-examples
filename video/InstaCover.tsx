import React from 'react';
import { AbsoluteFill } from 'remotion';

const COLORS = {
  bg: '#1c1917',      // Stone 900
  text: '#e7e5e4',    // Stone 200
  accent: '#3b82f6',  // Blue 500
  muted: '#a8a29e'    // Stone 400
};

const FONT_SERIF = '"Georgia", serif';
const FONT_SANS = 'system-ui, sans-serif';

export const InstaCover: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.bg, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 80,
      textAlign: 'center',
      border: '20px solid #292524'
    }}>
      <div style={{ 
        fontSize: 120, 
        fontFamily: FONT_SERIF, 
        color: COLORS.text, 
        fontStyle: 'italic',
        marginBottom: 40,
        lineHeight: 1
      }}>
        600+
      </div>
      <div style={{ 
        fontSize: 60, 
        fontFamily: FONT_SANS, 
        fontWeight: 900, 
        color: COLORS.text, 
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 20
      }}>
        Work-Ready
      </div>
      <div style={{ 
        fontSize: 60, 
        fontFamily: FONT_SANS, 
        fontWeight: 900, 
        color: COLORS.text, 
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 60
      }}>
        AI Blueprints
      </div>
      
      <div style={{ 
        height: 2, 
        width: 100, 
        backgroundColor: COLORS.accent, 
        marginBottom: 60 
      }} />

      <div style={{ 
        fontSize: 32, 
        fontFamily: FONT_SANS, 
        color: COLORS.muted, 
        maxWidth: 600,
        lineHeight: 1.5,
        marginBottom: 100
      }}>
        The definitive library for Sales, Marketing, and Ops leaders.
      </div>

      <div style={{ 
        fontSize: 40, 
        fontFamily: FONT_SANS, 
        fontWeight: 'bold',
        color: COLORS.accent,
        letterSpacing: 2
      }}>
        REALAIEXAMPLES.COM
      </div>
    </AbsoluteFill>
  );
};
