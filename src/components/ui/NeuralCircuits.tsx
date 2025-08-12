'use client';

import { useEffect, useState } from 'react';

interface CircuitProps {
  className?: string;
  isActive?: boolean;
}

export function NeuralCircuits({ className = '', isActive = false }: CircuitProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Main Neural Pathways */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Gradient for energy flow */}
          <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          {/* Glowing effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Metallic gradient */}
          <linearGradient id="metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#e2e8f0" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#94a3b8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Primary Neural Network */}
        <g className={`transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
          {/* Main spine circuit */}
          <path
            d="M960 50 Q960 200 960 350 Q960 500 960 650 Q960 800 960 950"
            stroke="url(#metallic)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          
          {/* Branch circuits */}
          <path
            d="M960 200 Q1200 200 1400 300 Q1600 400 1800 450"
            stroke="url(#metallic)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          
          <path
            d="M960 350 Q720 350 520 450 Q320 550 120 600"
            stroke="url(#metallic)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          
          <path
            d="M960 500 Q1150 600 1350 650 Q1550 700 1750 750"
            stroke="url(#metallic)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          
          <path
            d="M960 650 Q760 750 560 800 Q360 850 160 900"
            stroke="url(#metallic)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
        </g>

        {/* Neural Nodes */}
        <g className={`transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
          <circle cx="960" cy="200" r="6" fill="#3b82f6" filter="url(#glow)" className="animate-pulse" />
          <circle cx="960" cy="350" r="6" fill="#10b981" filter="url(#glow)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="960" cy="500" r="6" fill="#8b5cf6" filter="url(#glow)" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="960" cy="650" r="6" fill="#f59e0b" filter="url(#glow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          {/* Side nodes */}
          <circle cx="1400" cy="300" r="4" fill="#3b82f6" opacity="0.7" className="animate-ping" />
          <circle cx="520" cy="450" r="4" fill="#10b981" opacity="0.7" className="animate-ping" style={{ animationDelay: '2s' }} />
          <circle cx="1350" cy="650" r="4" fill="#8b5cf6" opacity="0.7" className="animate-ping" style={{ animationDelay: '1s' }} />
          <circle cx="560" cy="800" r="4" fill="#f59e0b" opacity="0.7" className="animate-ping" style={{ animationDelay: '3s' }} />
        </g>

        {/* Energy Flow Animation */}
        {isActive && (
          <g>
            <circle r="3" fill="url(#energyFlow)" filter="url(#glow)">
              <animateMotion dur="3s" repeatCount="indefinite">
                <path d="M960 50 Q960 200 960 350 Q960 500 960 650 Q960 800 960 950" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#10b981" opacity="0.8">
              <animateMotion dur="4s" repeatCount="indefinite" begin="1s">
                <path d="M960 200 Q1200 200 1400 300 Q1600 400 1800 450" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#3b82f6" opacity="0.8">
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
                <path d="M960 350 Q720 350 520 450 Q320 550 120 600" />
              </animateMotion>
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
}

interface DNAHelixProps {
  className?: string;
  isSpinning?: boolean;
}

export function DNAHelix({ className = '', isSpinning = true }: DNAHelixProps) {
  return (
    <div className={`${className} ${isSpinning ? 'animate-spin' : ''}`} style={{ animationDuration: '20s' }}>
      <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-lg">
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          
          <filter id="dnaGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* DNA Backbone */}
        <path
          d="M15 5 Q30 15 45 5 Q30 25 15 35 Q30 45 45 35 Q30 55 15 55"
          stroke="url(#dnaGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#dnaGlow)"
        />
        <path
          d="M45 5 Q30 15 15 5 Q30 25 45 35 Q30 45 15 35 Q30 55 45 55"
          stroke="url(#dnaGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#dnaGlow)"
        />
        
        {/* Base Pairs */}
        <line x1="15" y1="10" x2="45" y2="10" stroke="#cbd5e1" strokeWidth="1" opacity="0.7" />
        <line x1="20" y1="20" x2="40" y2="20" stroke="#cbd5e1" strokeWidth="1" opacity="0.7" />
        <line x1="15" y1="30" x2="45" y2="30" stroke="#cbd5e1" strokeWidth="1" opacity="0.7" />
        <line x1="20" y1="40" x2="40" y2="40" stroke="#cbd5e1" strokeWidth="1" opacity="0.7" />
        <line x1="15" y1="50" x2="45" y2="50" stroke="#cbd5e1" strokeWidth="1" opacity="0.7" />
      </svg>
    </div>
  );
}

interface MinibrainProps {
  className?: string;
}

export function Minibrain({ className = '' }: MinibrainProps) {
  return (
    <div className={`${className}`}>
      <svg width="50" height="50" viewBox="0 0 50 50" className="drop-shadow-lg">
        <defs>
          <radialGradient id="brainGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.3" />
          </radialGradient>
          
          <filter id="brainGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Brain hemispheres */}
        <ellipse cx="20" cy="25" rx="15" ry="20" fill="url(#brainGradient)" filter="url(#brainGlow)" className="animate-pulse" />
        <ellipse cx="30" cy="25" rx="15" ry="20" fill="url(#brainGradient)" filter="url(#brainGlow)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Neural connections */}
        <path d="M25 15 Q35 20 25 25 Q15 30 25 35" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.6" className="animate-pulse" />
        <circle cx="25" cy="20" r="1.5" fill="#10b981" className="animate-ping" />
        <circle cx="25" cy="30" r="1.5" fill="#8b5cf6" className="animate-ping" style={{ animationDelay: '1s' }} />
      </svg>
    </div>
  );
}

interface ScrollActivatedCircuitsProps {
  children: React.ReactNode;
}

export function ScrollActivatedCircuits({ children }: ScrollActivatedCircuitsProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <NeuralCircuits isActive={scrollY > 100} />
      {children}
    </div>
  );
}
