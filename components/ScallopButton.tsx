import React from 'react';

interface ScallopButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ScallopButton: React.FC<ScallopButtonProps> = ({ children, onClick, className }) => {
  return (
    <button className={`scallop-btn ${className || ''}`} onClick={onClick}>
      <div className="scallop-svg-wrapper">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 180 60">
          <path
            d="
              M 30 2 
              Q 40 5 50 2 Q 60 -1 70 2 Q 80 5 90 2 Q 100 -1 110 2 Q 120 5 130 2 Q 140 -1 150 2 
              A 28 28 0 0 1 178 30
              A 28 28 0 0 1 150 58
              Q 140 61 130 58 Q 120 55 110 58 Q 100 61 90 58 Q 80 55 70 58 Q 60 61 50 58 Q 40 55 30 58 
              A 28 28 0 0 1 2 30
              A 28 28 0 0 1 30 2 Z"
            fill="none"
            stroke="var(--c-brand)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transition: 'fill 0.3s ease' }}
          ></path>
        </svg>
      </div>
      <span>{children}</span>
      <style jsx>{`
        .scallop-btn {
            position: relative;
            background: transparent;
            color: var(--c-brand);
            font-family: var(--f-display);
            font-size: 1.1rem;
            font-weight: 400;
            padding: 1rem 2.5rem;
            cursor: pointer;
            border: none;
            outline: none;
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            text-decoration: none; /* Ensure no underline for Link usage */
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .scallop-btn:hover {
            transform: scale(1.05);
        }
        .scallop-btn:hover path {
            fill: var(--c-brand);
        }
        .scallop-btn:hover span {
            color: var(--c-bg);
        }

        .scallop-svg-wrapper {
            position: absolute;
            top: -4px; left: -4px; right: -4px; bottom: -4px;
            z-index: -1;
            pointer-events: none;
        }
        .scallop-svg-wrapper svg path {
          transition: stroke 0.3s ease;
        }
        .scallop-btn:hover .scallop-svg-wrapper svg path {
          stroke: var(--c-brand);
        }
        
        .scallop-btn span {
            position: relative;
            z-index: 2;
        }
      `}</style>
    </button>
  );
};

export default ScallopButton;