import React from 'react';

const OrbitingCards: React.FC = () => {
  return (
    <div className="orbit-container">
      {/* Card 1: Generative Flora */}
      <div className="tool-card card-1" title="Generative Flora">
        <div className="card-art art-gen-flora">
          <svg viewBox="0 0 160 100">
            <circle cx="80" cy="50" r="30" fill="var(--figment-card-orange)"></circle>
            <circle cx="80" cy="50" r="10" fill="var(--figment-card-light)"></circle>
            <path d="M 65 35 Q 50 20 35 40 Q 50 55 65 35" fill="var(--figment-brand)"></path>
            <path d="M 95 35 Q 110 20 125 40 Q 110 55 95 35" fill="var(--figment-brand)"></path>
            <path d="M 80 65 L 80 100" stroke="var(--figment-card-dark)" strokeWidth="4"></path>
            <circle cx="30" cy="20" r="3" fill="var(--figment-card-light)"></circle>
            <circle cx="130" cy="80" r="4" fill="var(--figment-card-orange)"></circle>
          </svg>
        </div>
      </div>

      {/* Card 2: Neural Mapping */}
      <div className="tool-card card-2" title="Neural Mapping">
        <div className="card-art art-neural">
          <svg viewBox="0 0 160 100">
            <path d="M 20 50 Q 50 10 80 50 T 140 50" fill="none" stroke="var(--figment-card-light)" strokeWidth="3"></path>
            <rect x="70" y="40" width="20" height="20" rx="4" fill="var(--figment-card-green)"></rect>
            <circle cx="35" cy="35" r="8" fill="var(--figment-brand)"></circle>
            <circle cx="125" cy="65" r="12" fill="var(--figment-card-dark)"></circle>
            <line x1="125" y1="65" x2="140" y2="80" stroke="var(--figment-card-dark)" strokeWidth="2"></line>
            <circle cx="140" cy="80" r="4" fill="var(--figment-card-green)"></circle>
          </svg>
        </div>
      </div>

      {/* Card 3: Style Transfer */}
      <div className="tool-card card-3" title="Style Transfer">
        <div className="card-art art-style">
          <svg viewBox="0 0 160 100">
            <polygon points="40,20 120,20 100,80 60,80" fill="var(--figment-card-orange)"></polygon>
            <polygon points="100,20 120,20 100,80" fill="var(--figment-card-green)"></polygon>
            <circle cx="80" cy="35" r="12" fill="var(--figment-card-light)"></circle>
            <path d="M 60 80 L 75 50 L 85 50 L 100 80" fill="none" stroke="var(--figment-card-light)" strokeWidth="4"></path>
          </svg>
        </div>
      </div>

      {/* Card 4: Data Connect */}
      <div className="tool-card card-4" title="Data Connect">
        <div className="card-art art-nodes">
          <svg viewBox="0 0 160 100">
            <circle cx="50" cy="50" r="25" fill="var(--figment-brand)"></circle>
            <circle cx="100" cy="40" r="35" fill="var(--figment-card-green)" opacity="0.9"></circle>
            <circle cx="80" cy="70" r="15" fill="var(--figment-card-dark)"></circle>
            <circle cx="100" cy="40" r="10" fill="var(--figment-card-orange)"></circle>
            <circle cx="140" cy="20" r="3" fill="var(--figment-card-dark)"></circle>
            <circle cx="20" cy="80" r="5" fill="var(--figment-card-green)"></circle>
          </svg>
        </div>
      </div>

      {/* Card 5: Physics Canvas */}
      <div className="tool-card card-5" title="Physics Canvas">
        <div className="card-art art-motion">
          <svg viewBox="0 0 160 100">
            <line x1="0" y1="20" x2="160" y2="20" stroke="#E0E0E0" strokeWidth="1"></line>
            <line x1="0" y1="40" x2="160" y2="40" stroke="#E0E0E0" strokeWidth="1"></line>
            <line x1="0" y1="60" x2="160" y2="60" stroke="#E0E0E0" strokeWidth="1"></line>
            <line x1="0" y1="80" x2="160" y2="80" stroke="#E0E0E0" strokeWidth="1"></line>
            <path d="M 30 70 L 130 70" stroke="var(--figment-brand)" strokeWidth="3" strokeLinecap="round"></path>
            <rect x="70" y="50" width="20" height="20" fill="var(--figment-card-dark)"></rect>
            <circle cx="95" cy="55" r="5" fill="var(--figment-card-orange)"></circle>
            <line x1="75" y1="70" x2="70" y2="85" stroke="var(--figment-card-dark)" strokeWidth="3"></line>
            <line x1="85" y1="70" x2="90" y2="85" stroke="var(--figment-card-dark)" strokeWidth="3"></line>
          </svg>
        </div>
      </div>

      {/* Card 6: Geometry Morph */}
      <div className="tool-card card-6" title="Geometry Morph">
        <div className="card-art art-morph">
          <svg viewBox="0 0 160 100">
            <path d="M 20 20 Q 80 -10 140 20 T 140 80 Q 80 110 20 80 T 20 20" fill="var(--figment-card-dark)"></path>
            <circle cx="50" cy="40" r="15" fill="var(--figment-card-orange)"></circle>
            <rect x="90" y="50" width="25" height="25" rx="12" fill="var(--figment-card-green)"></rect>
            <path d="M 65 65 L 85 35" stroke="var(--figment-card-light)" strokeWidth="3" strokeLinecap="round"></path>
          </svg>
        </div>
      </div>

      {/* Card 7: Vector Abstraction */}
      <div className="tool-card card-7" title="Vector Abstraction">
        <div className="card-art art-canvas">
          <svg viewBox="0 0 160 100">
            <path d="M 80 90 L 60 40 L 100 40 Z" fill="var(--figment-brand)" opacity="0.8"></path>
            <circle cx="60" cy="40" r="12" fill="var(--figment-card-green)"></circle>
            <rect x="90" y="30" width="20" height="20" fill="var(--figment-card-orange)" transform="rotate(15 100 40)"></rect>
            <line x1="80" y1="90" x2="40" y2="20" stroke="var(--figment-card-dark)" strokeWidth="2"></line>
            <line x1="80" y1="90" x2="120" y2="15" stroke="var(--figment-card-dark)" strokeWidth="2"></line>
          </svg>
        </div>
      </div>

      {/* Card 8: AI Vision */}
      <div className="tool-card card-8" title="AI Vision">
        <div className="card-art art-vision">
          <svg viewBox="0 0 160 100">
            <path d="M 30 50 Q 80 10 130 50 Q 80 90 30 50" fill="var(--figment-card-green)"></path>
            <circle cx="80" cy="50" r="20" fill="var(--figment-card-light)"></circle>
            <circle cx="80" cy="50" r="8" fill="var(--figment-brand)"></circle>
            <path d="M 20 20 L 30 25 M 25 15 L 20 25" stroke="var(--figment-card-orange)" strokeWidth="2"></path>
            <path d="M 140 80 L 130 75 M 135 85 L 140 75" stroke="var(--figment-card-orange)" strokeWidth="2"></path>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .orbit-container {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            z-index: 2;
        }

        .tool-card {
            position: absolute;
            width: 160px;
            height: 100px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            margin-top: -50px;
            margin-left: -80px;
            cursor: pointer;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .tool-card:hover {
            z-index: 10;
        }

        .card-1 { transform: translate(0px, -320px) rotate(-10deg); background: var(--figment-card-green); animation: float 6s ease-in-out infinite alternate; }
        .card-2 { transform: translate(226px, -226px) rotate(15deg); background: var(--figment-card-orange); animation: float 7s ease-in-out infinite alternate-reverse; }
        .card-3 { transform: translate(320px, 0px) rotate(-5deg); background: var(--figment-card-dark); animation: float 5s ease-in-out infinite alternate; }
        .card-4 { transform: translate(226px, 226px) rotate(20deg); background: var(--figment-card-orange); animation: float 8s ease-in-out infinite alternate-reverse; }
        .card-5 { transform: translate(0px, 320px) rotate(-15deg); background: var(--figment-card-light); animation: float 6s ease-in-out infinite alternate; }
        .card-6 { transform: translate(-226px, 226px) rotate(10deg); background: var(--figment-card-light); animation: float 7s ease-in-out infinite alternate-reverse; }
        .card-7 { transform: translate(-320px, 0px) rotate(-20deg); background: var(--figment-card-light); animation: float 5s ease-in-out infinite alternate; }
        .card-8 { transform: translate(-226px, -226px) rotate(5deg); background: var(--figment-card-dark); animation: float 8s ease-in-out infinite alternate-reverse; }

        .tool-card:hover.card-1 { transform: translate(0px, -320px) rotate(0deg) scale(1.15); }
        .tool-card:hover.card-2 { transform: translate(226px, -226px) rotate(0deg) scale(1.15); }
        .tool-card:hover.card-3 { transform: translate(320px, 0px) rotate(0deg) scale(1.15); }
        .tool-card:hover.card-4 { transform: translate(226px, 226px) rotate(0deg) scale(1.15); }
        .tool-card:hover.card-5 { transform: translate(0px, 320px) rotate(0deg) scale(1.15); }
        .tool-card:hover.card-6 { transform: translate(-226px, 226px) rotate(0deg) scale(1.15); }
        .tool-card:hover.card-7 { transform: translate(-320px, 0px) rotate(0deg) scale(1.15); }
        .tool-card:hover.card-8 { transform: translate(-226px, -226px) rotate(0deg) scale(1.15); }

        @keyframes float {
            0% { margin-top: -50px; }
            100% { margin-top: -65px; }
        }

        /* Responsive adjustments */
        @media (max-width: 900px) {
            .orbit-container { transform: scale(0.7); }
        }
        @media (max-width: 600px) {
            .orbit-container { transform: scale(0.45); }
        }
      `}</style>
    </div>
  );
};

export default OrbitingCards;