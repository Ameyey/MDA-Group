import React from 'react';

export const MDALogo = ({ className = "w-12 h-12", showText = false, textLayout = "horizontal", darkMode = true }) => {
  return (
    <div className={`flex items-center ${textLayout === 'vertical' ? 'flex-col text-center space-y-2' : 'space-x-3'}`}>
      
      {/* Exact MDA Group Emblem SVG */}
      <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          <defs>
            {/* Top Cyan Swoosh Gradient */}
            <linearGradient id="mdaCyanSwoosh" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            
            {/* Bottom Navy Swoosh Gradient */}
            <linearGradient id="mdaNavySwoosh" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>

            {/* D Gradient */}
            <linearGradient id="dLetterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
          </defs>

          {/* Background Clean Disc */}
          <circle cx="100" cy="100" r="95" fill={darkMode ? "#090d16" : "#ffffff"} stroke={darkMode ? "#1e293b" : "#e2e8f0"} strokeWidth="2" />

          {/* Top Cyan Arch Swoosh */}
          <path 
            d="M 35 95 A 65 65 0 0 1 165 95 C 150 50, 110 35, 75 42 C 55 48, 40 65, 35 95 Z" 
            fill="url(#mdaCyanSwoosh)" 
          />
          <path 
            d="M 45 75 A 60 60 0 0 1 155 75" 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />

          {/* Bottom Deep Blue Arch Swoosh */}
          <path 
            d="M 165 105 A 65 65 0 0 1 35 105 C 50 150, 90 165, 125 158 C 145 152, 160 135, 165 105 Z" 
            fill="url(#mdaNavySwoosh)" 
          />
          <path 
            d="M 155 125 A 60 60 0 0 1 45 125" 
            fill="none" 
            stroke="#1d4ed8" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />

          {/* Central MDA Letters */}
          {/* M Letter (Light Cyan) */}
          <text 
            x="32" 
            y="118" 
            fill="#0284c7" 
            fontSize="52" 
            fontWeight="900" 
            fontFamily="Arial, sans-serif"
            letterSpacing="-2"
          >
            M
          </text>

          {/* D Letter (Dark Purple / Navy) */}
          <text 
            x="76" 
            y="118" 
            fill="#312e81" 
            fontSize="52" 
            fontWeight="900" 
            fontFamily="Arial, sans-serif"
            letterSpacing="-2"
          >
            D
          </text>

          {/* A Letter (Vibrant Red) */}
          <text 
            x="122" 
            y="118" 
            fill="#ef4444" 
            fontSize="52" 
            fontWeight="900" 
            fontFamily="Arial, sans-serif"
            letterSpacing="-2"
          >
            A
          </text>

        </svg>
      </div>

      {/* Text Branding */}
      {showText && (
        <div className={textLayout === 'vertical' ? 'text-center' : 'text-left'}>
          <div className="flex items-baseline space-x-1.5 justify-center sm:justify-start">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-700 dark:text-blue-400">
              M D A
            </span>
            <span className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Group
            </span>
          </div>
          <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase italic">
            Fiber Laser Spare Parts & optics
          </p>
        </div>
      )}

    </div>
  );
};
