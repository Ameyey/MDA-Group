import React from 'react';

export const ProductVisual = ({ visualType, className = "w-full h-48" }) => {
  switch (visualType) {
    case 'nozzle':
    case 'single_nozzle':
    case 'double_nozzle':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent rounded-xl p-4 overflow-hidden border border-amber-500/20 group-hover:border-amber-500/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <svg viewBox="0 0 160 160" className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <defs>
              <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
            {/* Thread top */}
            <rect x="50" y="20" width="60" height="25" rx="3" fill="url(#copperGrad)" stroke="#78350f" strokeWidth="1.5" />
            <line x1="50" y1="28" x2="110" y2="28" stroke="#78350f" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="50" y1="36" x2="110" y2="36" stroke="#78350f" strokeWidth="1" strokeDasharray="3 2" />
            
            {/* Hexagon flange */}
            <path d="M 40 45 L 120 45 L 110 65 L 50 65 Z" fill="url(#chromeGrad)" stroke="#334155" strokeWidth="1.5" />
            
            {/* Tapered cone body */}
            <path d="M 50 65 L 110 65 L 90 125 L 70 125 Z" fill="url(#copperGrad)" stroke="#78350f" strokeWidth="1.5" />
            
            {/* Tip orifice */}
            <ellipse cx="80" cy="125" rx="10" ry="4" fill="#451a03" />
            <circle cx="80" cy="125" r="3" fill="#fef08a" className="animate-pulse" />
            
            {/* Beam laser simulation line */}
            <line x1="80" y1="10" x2="80" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 3" className="opacity-75" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-amber-500 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            {visualType === 'single_nozzle' ? 'N2 SINGLE' : visualType === 'double_nozzle' ? 'O2 DUAL' : 'COPPER CNC'}
          </span>
        </div>
      );

    case 'protective_lens':
    case 'focus_lens':
    case 'collimating_lens':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-transparent rounded-xl p-4 overflow-hidden border border-cyan-500/20 group-hover:border-cyan-500/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <svg viewBox="0 0 160 160" className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <defs>
              <linearGradient id="lensGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Outer brass/metal ring */}
            <circle cx="80" cy="80" r="62" fill="none" stroke="#64748b" strokeWidth="6" />
            <circle cx="80" cy="80" r="56" fill="url(#lensGlass)" stroke="#38bdf8" strokeWidth="2" />
            
            {/* Reflection highlights */}
            <path d="M 45 55 Q 80 30 115 55 Q 80 42 45 55 Z" fill="#ffffff" opacity="0.6" />
            <path d="M 50 110 Q 80 125 110 110" stroke="#06b6d4" strokeWidth="3" fill="none" opacity="0.7" />

            {/* Wavelength watermark */}
            <text x="80" y="85" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="monospace" opacity="0.9">
              1064nm AR
            </text>
            <text x="80" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
              JGS1 QUARTZ
            </text>
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            OPTIC &gt;99.8%
          </span>
        </div>
      );

    case 'laser_head':
    case 'raytools_head':
    case 'boci_head':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-indigo-500/10 via-slate-800/20 to-transparent rounded-xl p-4 overflow-hidden border border-indigo-500/20 group-hover:border-indigo-500/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <svg viewBox="0 0 160 160" className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <defs>
              <linearGradient id="bodyMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Top fiber receptor QBH */}
            <rect x="68" y="10" width="24" height="20" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            
            {/* Upper body */}
            <rect x="52" y="30" width="56" height="40" rx="4" fill="url(#bodyMetal)" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="80" cy="50" r="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            
            {/* Lower module & Drawer */}
            <rect x="58" y="70" width="44" height="35" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <rect x="62" y="82" width="36" height="10" rx="2" fill="#0284c7" opacity="0.8" />
            
            {/* Cone & Tip */}
            <path d="M 64 105 L 96 105 L 86 135 L 74 135 Z" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
            <ellipse cx="80" cy="135" rx="6" ry="2" fill="#78350f" />
            
            {/* Status LED */}
            <circle cx="98" cy="40" r="3" fill="#10b981" className="animate-ping" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
            AUTO-FOCUS
          </span>
        </div>
      );

    case 'ceramic':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-slate-400/10 via-zinc-600/5 to-transparent rounded-xl p-4 overflow-hidden border border-slate-400/20 group-hover:border-slate-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <svg viewBox="0 0 160 160" className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(226,232,240,0.3)]">
            <circle cx="80" cy="80" r="55" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" />
            <circle cx="80" cy="80" r="35" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="80" cy="80" r="18" fill="#0f172a" />
            
            {/* Gold contact pins */}
            <circle cx="80" cy="38" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <circle cx="122" cy="80" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <circle cx="80" cy="122" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <circle cx="38" cy="80" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-500/30">
            ZIRCONIA 28MM
          </span>
        </div>
      );

    case 'sensor_cable':
    case 'fiber_cable':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-red-500/10 via-rose-600/5 to-transparent rounded-xl p-4 overflow-hidden border border-red-500/20 group-hover:border-red-500/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <svg viewBox="0 0 160 160" className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <path d="M 25 130 C 50 130, 40 40, 80 40 C 120 40, 110 120, 135 120" stroke="#dc2626" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M 25 130 C 50 130, 40 40, 80 40 C 120 40, 110 120, 135 120" stroke="#f87171" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="8 4" />
            
            {/* Metallic QBH ends */}
            <rect x="15" y="118" width="20" height="24" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="125" y="108" width="20" height="24" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.5" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
            QBH / M12
          </span>
        </div>
      );

    case 'power_supply':
    case 'height_controller':
    case 'servo_motor':
    case 'chiller_parts':
    case 'consumables':
    case 'linear_guide':
    case 'air_filter':
    case 'gas_regulator':
    default:
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-blue-500/10 via-indigo-600/5 to-transparent rounded-xl p-4 overflow-hidden border border-blue-500/20 group-hover:border-blue-500/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <svg viewBox="0 0 160 160" className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <rect x="30" y="35" width="100" height="90" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="2" />
            <rect x="40" y="45" width="80" height="30" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            
            {/* Digital readout */}
            <text x="80" y="65" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold" fontFamily="monospace">
              MDA-30KW
            </text>
            
            {/* Control knobs & terminals */}
            <circle cx="50" cy="95" r="8" fill="#3b82f6" />
            <circle cx="80" cy="95" r="8" fill="#ef4444" />
            <circle cx="110" cy="95" r="8" fill="#10b981" />
          </svg>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
            INDUSTRIAL HEAVY
          </span>
        </div>
      );
  }
};
