import React from 'react';

interface ZigzagDividerProps {
  fillColor: string;
}

export default function ZigzagDivider({ fillColor }: ZigzagDividerProps) {
  return (
    <div className="w-full -mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 20">
        <path fill={fillColor} fillOpacity="1" d="M0,0 L1440,0 L1440,20 L1320,10 L1200,20 L1080,10 L960,20 L840,10 L720,20 L600,10 L480,20 L360,10 L240,20 L120,10 L0,20 Z"></path>
      </svg>
    </div>
  );
}