import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Award, ArrowRight, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/additionalData';
import { HERO_BG_IMAGE } from '../data/images';

export const Hero = ({ onOpenQuoteModal, onExploreClick }) => {
  return (
    <section id="hero" className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-16 px-4">
      {/* Full-width Hero Background Image of Fiber Laser Cutting Machine */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_BG_IMAGE} 
          alt="Fiber Laser Cutting Machine" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform transition-transform duration-1000 hover:scale-100"
        />
        {/* Dark Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>
      
      {/* Glowing Laser Axis Lines */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-10"></div>
      <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent z-10"></div>

      {/* Radiant Glow Spots */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Top Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/90 to-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-inner backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>DIRECT OEM SUPPLIER & STOCKIST IN INDIA</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            High-Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Fiber Laser Spare Parts
            </span> <br />
            & Optics
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            {COMPANY_INFO.tagline}. Sourcing premium protective lenses, laser nozzles, auto-focus cutting heads, ceramic rings, and fiber sources from world-class brands.
          </p>

          {/* Key OEM Brands Badge Line */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
            <span className="text-slate-500">Stocking Spares For:</span>
            {["Raytools", "Raycus", "MAX Photonics", "BOCI", "Precitec", "WSX", "IPG", "OSPRI"].map((brand) => (
              <span key={brand} className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-cyan-300 font-mono">
                {brand}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center space-x-2.5 group"
            >
              <span>Explore Spares Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500 font-semibold px-6 py-3.5 rounded-xl transition-all flex items-center space-x-2 shadow-md backdrop-blur-sm"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Get Custom Quote</span>
            </button>
          </div>

          {/* Metric Highlights Grid */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80">
            <div className="space-y-0.5">
              <p className="text-2xl font-black text-white">50,000+</p>
              <p className="text-xs text-slate-400 font-medium">Parts Delivered</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-2xl font-black text-cyan-400">10+ Top</p>
              <p className="text-xs text-slate-400 font-medium">Global Brands</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-2xl font-black text-white">Same Day</p>
              <p className="text-xs text-slate-400 font-medium">Pune Dispatch</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-2xl font-black text-emerald-400">100%</p>
              <p className="text-xs text-slate-400 font-medium">OEM Quality</p>
            </div>
          </div>
        </motion.div>

        {/* Right Animated CAD Showcase Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          {/* Main Visual Glass Card */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
            
            {/* Header of Visual */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-mono text-slate-400 pl-2">MDA_CUTTING_HEAD_SYS.CAD</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                1064nm ACTIVE
              </span>
            </div>

            {/* Central Animated Graphic */}
            <div className="relative h-64 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800/80 p-4 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
              
              {/* Laser Beam Animation */}
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-red-500 via-cyan-400 to-amber-400 transform -translate-x-1/2 laser-active-glow"></div>

              {/* Graphic Elements */}
              <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
                <rect x="85" y="10" width="30" height="25" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="100" cy="55" r="22" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                <path d="M 85 55 Q 100 40 115 55 Q 100 70 85 55 Z" fill="#38bdf8" opacity="0.7" />
                <rect x="65" y="85" width="70" height="45" rx="5" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <rect x="75" y="95" width="50" height="10" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
                <circle cx="120" cy="115" r="4" fill="#10b981" />
                <ellipse cx="100" cy="140" rx="25" ry="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                <path d="M 82 145 L 118 145 L 108 175 L 92 175 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
                <ellipse cx="100" cy="175" rx="8" ry="3" fill="#451a03" />
                <circle cx="100" cy="188" r="4" fill="#ef4444" className="animate-ping" />
              </svg>

              <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded text-[11px] font-mono text-cyan-300">
                Transmittance: &gt;99.8%
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded text-[11px] font-mono text-amber-400">
                Oxygen/Nitrogen Coaxial
              </div>
            </div>

            {/* Quick Benefits List */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-slate-300 font-medium">Zero Defect</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <Truck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-slate-300 font-medium">Ready Stock</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-slate-300 font-medium">Tested & Sealed</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
