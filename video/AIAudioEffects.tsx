import React from 'react';
import { Audio, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// Function to generate a simple beep sound frequency
const generateBeep = (frequency: number, duration: number, sampleRate: number) => {
  const length = duration * sampleRate;
  const buffer = new Float32Array(length);
  
  for (let i = 0; i < length; i++) {
    buffer[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
  }
  
  return buffer;
};

// Cash register sound effect component
const CashRegisterSound: React.FC<{ frame: number }> = ({ frame }) => {
  // Play at the beginning (Scene 1)
  const volume = interpolate(frame, [0, 5, 10], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Generate a simple cash register sound
  const sampleRate = 44100;
  const beep1 = generateBeep(523.25, 0.1, sampleRate); // C5 note
  const beep2 = generateBeep(659.25, 0.1, sampleRate); // E6 note
  const combinedBuffer = new Float32Array(beep1.length + beep2.length);
  combinedBuffer.set(beep1);
  combinedBuffer.set(beep2, beep1.length);
  
  return (
    <Audio
      src={`data:audio/wav;base64,${arrayBufferToBase64(float32ArrayToWav(combinedBuffer, sampleRate))}`}
      volume={volume}
    />
  );
};

// Snoring sound effect component
const SnoringSound: React.FC<{ frame: number }> = ({ frame }) => {
  // Start after Scene 1 ends (around frame 150)
  const startFrame = 150;
  const activeFrame = frame - startFrame;
  const volume = interpolate(activeFrame, [0, 5, 30, 35], [0, 0.7, 0.7, 0], { 
    extrapolateLeft: 'clamp', 
    extrapolateRight: 'clamp' 
  });
  
  // Generate a simple snoring sound
  const sampleRate = 44100;
  const length = sampleRate * 0.5; // 0.5 second snore
  const buffer = new Float32Array(length);
  
  for (let i = 0; i < length; i++) {
    // Create a low-frequency oscillating sound with varying amplitude
    const time = i / sampleRate;
    const freq = 80 + 10 * Math.sin(2 * Math.PI * 0.5 * time); // Oscillate between 70-90Hz
    buffer[i] = Math.sin(2 * Math.PI * freq * time) * (0.5 + 0.3 * Math.sin(2 * Math.PI * 2 * time));
  }
  
  return (
    <Audio
      src={`data:audio/wav;base64,${arrayBufferToBase64(float32ArrayToWav(buffer, sampleRate))}`}
      volume={volume}
    />
  );
};

// Whistle sound effect component
const WhistleSound: React.FC<{ frame: number }> = ({ frame }) => {
  // Play during Scene 3 (around frame 300)
  const startFrame = 300;
  const activeFrame = frame - startFrame;
  const volume = interpolate(activeFrame, [0, 5, 10], [0, 1, 0], { 
    extrapolateLeft: 'clamp', 
    extrapolateRight: 'clamp' 
  });
  
  // Generate a simple whistle sound
  const sampleRate = 44100;
  const length = sampleRate * 0.3; // 0.3 second whistle
  const buffer = new Float32Array(length);
  
  for (let i = 0; i < length; i++) {
    // Create a clear, high-frequency whistle
    const time = i / sampleRate;
    buffer[i] = Math.sin(2 * Math.PI * 1000 * time) * Math.exp(-time * 2); // Exponential decay
  }
  
  return (
    <Audio
      src={`data:audio/wav;base64,${arrayBufferToBase64(float32ArrayToWav(buffer, sampleRate))}`}
      volume={volume}
    />
  );
};

// Stamp sound effect component
const StampSound: React.FC<{ frame: number }> = ({ frame }) => {
  // Play during Scene 3 when stamp appears (around frame 350)
  const startFrame = 350;
  const activeFrame = frame - startFrame;
  const volume = interpolate(activeFrame, [0, 3, 8], [0, 1, 0], { 
    extrapolateLeft: 'clamp', 
    extrapolateRight: 'clamp' 
  });
  
  // Generate a simple stamp sound (thud)
  const sampleRate = 44100;
  const length = sampleRate * 0.1; // 0.1 second thud
  const buffer = new Float32Array(length);
  
  for (let i = 0; i < length; i++) {
    // Create a low-frequency thud sound
    const time = i / sampleRate;
    buffer[i] = Math.sin(2 * Math.PI * 120 * time) * Math.exp(-time * 20); // Quick decay
  }
  
  return (
    <Audio
      src={`data:audio/wav;base64,${arrayBufferToBase64(float32ArrayToWav(buffer, sampleRate))}`}
      volume={volume}
    />
  );
};

// Drum fill sound effect component
const DrumFillSound: React.FC<{ frame: number }> = ({ frame }) => {
  // Play during Scene 4 (around frame 540)
  const startFrame = 540;
  const activeFrame = frame - startFrame;
  const volume = interpolate(activeFrame, [0, 20, 30], [0, 0.8, 0], { 
    extrapolateLeft: 'clamp', 
    extrapolateRight: 'clamp' 
  });
  
  // Generate a simple drum fill
  const sampleRate = 44100;
  const kickDrum = generateBeep(60, 0.2, sampleRate);
  const snare = generateBeep(200, 0.15, sampleRate);
  const hiHat = generateBeep(800, 0.1, sampleRate);
  
  // Combine them into a sequence
  const totalLength = kickDrum.length * 4; // Enough space for the sequence
  const buffer = new Float32Array(totalLength);
  
  // Add kick drum hits
  buffer.set(kickDrum, 0);
  buffer.set(kickDrum, kickDrum.length * 2);
  
  // Add snare hit
  buffer.set(snare, kickDrum.length);
  
  // Add hi-hat hits
  buffer.set(hiHat, kickDrum.length + snare.length);
  buffer.set(hiHat, kickDrum.length * 3);
  
  return (
    <Audio
      src={`data:audio/wav;base64,${arrayBufferToBase64(float32ArrayToWav(buffer, sampleRate))}`}
      volume={volume}
    />
  );
};

// Helper function to convert Float32Array to WAV ArrayBuffer
const float32ArrayToWav = (buffer: Float32Array, sampleRate: number): ArrayBuffer => {
  const length = buffer.length;
  const wavBuffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(wavBuffer);

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // RIFF chunk length
  view.setUint32(4, 36 + length * 2, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // Format chunk identifier
  writeString(view, 12, 'fmt ');
  // Format chunk length
  view.setUint32(16, 16, true);
  // Sample format (raw)
  view.setUint16(20, 1, true);
  // Channel count
  view.setUint16(22, 1, true);
  // Sample rate
  view.setUint32(24, sampleRate, true);
  // Byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * 2, true);
  // Block align (channel count * bytes per sample)
  view.setUint16(32, 2, true);
  // Bits per sample
  view.setUint16(34, 16, true);
  // Data chunk identifier
  writeString(view, 36, 'data');
  // Data chunk length
  view.setUint32(40, length * 2, true);

  // Write the PCM samples
  const offset = 44;
  for (let i = 0; i < length; i++) {
    const sample = Math.max(-1, Math.min(1, buffer[i]));
    view.setInt16(offset + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
  }

  return wavBuffer;
};

// Helper function to write string to DataView
const writeString = (view: DataView, offset: number, str: string) => {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
};

// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// Main audio component that combines all sound effects
export const AIAudioEffects: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <>
      <CashRegisterSound frame={frame} />
      <SnoringSound frame={frame} />
      <WhistleSound frame={frame} />
      <StampSound frame={frame} />
      <DrumFillSound frame={frame} />
    </>
  );
};