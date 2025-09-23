import React from 'react';

interface ZigzagDividerProps {
  fromColor: string;
  toColor: string;
}

export default function ZigzagDivider({ fromColor, toColor }: ZigzagDividerProps) {
  const gradientId = `gradient-${fromColor.replace(/#/g, '')}-${toColor.replace(/#/g, '')}`;
  return (
    <div className="w-full -mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 20">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: fromColor }} />
            <stop offset="100%" style={{ stopColor: toColor }} />
          </linearGradient>
        </defs>
        <path fill={`url(#${gradientId})`} d="M0,0 L576,0 L600,10 L624,0 L648,10 L672,0 L696,10 L720,0 L744,10 L768,0 L792,10 L816,0 L840,10 L864,0 L1440,0 L1440,20 L0,20 Z"></path>
      </svg>
    </div>
  );
}