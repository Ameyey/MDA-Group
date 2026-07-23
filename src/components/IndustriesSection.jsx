import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { INDUSTRY_IMAGES } from '../data/images';

export const IndustriesSection = ({ darkMode }) => {
  const INDUSTRIES_LIST = [
    {
      id: "automotive",
      title: "Automotive Industry",
      image: INDUSTRY_IMAGES.automotive,
      desc: "3D fiber laser cutting head spares, high-power optics, and robot arm sensor cables for auto chassis & body panels.",
      highlights: ["OEM Tolerances", "Robotic Arm Flex Cables", "Heat Resistant Optics"]
    },
    {
      id: "aerospace",
      title: "Aerospace Industry",
      image: INDUSTRY_IMAGES.aerospace,
      desc: "Ultra-pure synthetic fused silica protective optics and precision focus lenses for super-alloy turbine machining.",
      highlights: ["JGS1 Quartz Optical Grade", "Zero Focus Shift", "1064nm Low Absorption"]
    },
    {
      id: "sheetMetal",
      title: "Sheet Metal Fabrication",
      image: INDUSTRY_IMAGES.sheetMetal,
      desc: "Laser cutting nozzles, ceramics & protective lenses for high-speed mild steel, stainless steel & aluminum sheet cutting.",
      highlights: ["Minimal Dross Edge", "High Speed Gas Flow", "Continuous 24/7 Operation"]
    },
    {
      id: "medical",
      title: "Medical Device Manufacturing",
      image: INDUSTRY_IMAGES.medical,
      desc: "Ultra-clean laser optics for stent cutting, surgical tool laser welding, and stainless tube laser processing.",
      highlights: ["Cleanroom Grade 10 Optics", "Spatter Resistance", "Pure Nitrogen Assist Nozzles"]
    },
    {
      id: "electronics",
      title: "Electronics Industry",
      image: INDUSTRY_IMAGES.electronics,
      desc: "Fine spot precision collimators, height control cards, and ceramic sensor rings for micro-welding & PCB laser cutting.",
      highlights: ["High Speed Height Tracking", "Sub-micron Precision", "ESD Safe Cables"]
    },
    {
      id: "manufacturing",
      title: "Heavy Manufacturing",
      image: INDUSTRY_IMAGES.manufacturing,
      desc: "High power laser sources (12KW - 30KW), heavy duty laser heads, and chillers for thick plate steel processing.",
      highlights: ["30KW Fiber Source Support", "Heavy Load Motion Slides", "Dual-Stage Gas Regulators"]
    }
  ];

  return (
    <section id="industries" className={`py-16 px-4 transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            Industrial Applications
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Industries We <span className="text-cyan-500">Serve</span>
          </h2>
          <p className={`text-sm max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            MDA Group supplies specialized optics, nozzles, and laser sources tailored to the rigorous demands of 6 core industrial sectors.
          </p>
        </div>

        {/* 6 Industry Cards with HD Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_LIST.map((ind) => (
            <motion.div
              key={ind.id}
              whileHover={{ y: -5 }}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all group overflow-hidden ${
                darkMode ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 shadow-lg hover:border-blue-400'
              }`}
            >
              <div className="space-y-3">
                {/* Image Container */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img 
                    src={ind.image} 
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                    PRECISION GRADE
                  </span>
                </div>

                <h3 className="text-xl font-bold">{ind.title}</h3>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {ind.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 space-y-1.5">
                {ind.highlights.map((h, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-mono text-[11px]">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
