import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ShieldCheck, ArrowRight, ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';
import { BRANDS } from '../data/brands.jsx';
import { PRODUCTS } from '../data/products';

export const BrandWiseSection = ({ darkMode, onGetQuote }) => {
  const [activeBrandId, setActiveBrandId] = useState("raytools");

  // Specific brand product requirements specified in user prompt:
  const BRAND_MAPPINGS = {
    "raytools": {
      title: "Raytools AG (Switzerland)",
      tagline: "Industry Standard Laser Cutting Heads & Precision Optics",
      featuredList: [
        { name: "Laser Head", spec: "BM111 / BM114S / BT240S Auto-Focus Series" },
        { name: "Ceramic Ring", spec: "28mm Zirconia Body with Gold Contact Pins" },
        { name: "Nozzles", spec: "Single & Double Layer Copper M11/M14 Thread" },
        { name: "Protective Lens", spec: "27.9x4.1mm & 37x7mm JGS1 Quartz Windows" }
      ]
    },
    "raycus": {
      title: "Raycus Fiber Laser (Wuhan)",
      tagline: "High Power Continuous & Pulsed Laser Source Generators",
      featuredList: [
        { name: "Fiber Laser Source", spec: "RFL-C4000 (4KW), RFL-C12000 (12KW), Continuous Wave" },
        { name: "Welding Laser Source", spec: "RFL-1500/1500 Handheld & Robotic Fiber Welding Units" },
        { name: "QBH Fiber Delivery Cable", spec: "Armored 10m - 20m Beam Delivery Cables" }
      ]
    },
    "max-photonics": {
      title: "MAX Photonics Co., Ltd.",
      tagline: "Ultra-High Power Industrial Fiber Laser Generators",
      featuredList: [
        { name: "Fiber Laser Source", spec: "MFSC-1000W to MFSC-6000W Compact Rack Series" },
        { name: "Ultra High Power Source", spec: "MFMC-30000W to MFMC-50000W Multi-Module Generator" },
        { name: "Power Modules", spec: "DC Pump Module & Control Driver Cards" }
      ]
    },
    "boci": {
      title: "BOCI Smart Laser Technology",
      tagline: "Intelligent Auto-Focus Cutting Heads with Realtime Diagnostics",
      featuredList: [
        { name: "Laser Head", spec: "BLT420 (6KW) & BLT641 (12KW/30KW) Intelligent Heads" },
        { name: "Nozzles", spec: "High Flow Chromed Double Layer Cutting Nozzles" },
        { name: "Ceramic Holders", spec: "BOCI Integrated Sensor Ring Assemblies" }
      ]
    },
    "precitec": {
      title: "Precitec GmbH (Germany)",
      tagline: "Benchmark German Laser Cutting Heads & Distance Sensors",
      featuredList: [
        { name: "Laser Head", spec: "ProCutter 2.0, ProCutter Zoom, FineCutter & MiniCutter" },
        { name: "Sensory Systems", spec: "Capacitance Distance Sensor Cables & Preamplifier Box" },
        { name: "Optics", spec: "Precitec Protective Cartridge Windows" }
      ]
    },
    "wsx": {
      title: "WSX Laser Equipment",
      tagline: "Precision Manual & Auto-Focus Processing Heads",
      featuredList: [
        { name: "Laser Head", spec: "NC30 Auto Focus & KC15 Manual Focus Cutting Heads" },
        { name: "Ceramic Parts", spec: "High Temperature Insulated Ceramic Rings" },
        { name: "Collimator Optics", spec: "WSX Lens Assemblies" }
      ]
    },
    "ipg-photonics": {
      title: "IPG Photonics (USA)",
      tagline: "The World Leader in High Power Fiber Laser Solutions",
      featuredList: [
        { name: "Fiber Laser Source", spec: "YLS & YLR Series Continuous Wave Industrial Lasers" },
        { name: "QBH Fiber Cable", spec: "High Power Delivery Armor Cables" },
        { name: "Optic Modules", spec: "Beam Combiner & Diode Drivers" }
      ]
    }
  };

  const activeBrandData = BRANDS.find(b => b.id === activeBrandId) || BRANDS[0];
  const activeMapping = BRAND_MAPPINGS[activeBrandId] || {
    title: activeBrandData.name,
    tagline: activeBrandData.tagline,
    featuredList: [
      { name: "Laser Head", spec: "Compatible Cutting Head Assemblies" },
      { name: "Optics & Spares", spec: "Protective Lenses & Consumables" }
    ]
  };

  return (
    <section id="brand-products" className={`py-16 px-4 transition-colors duration-300 ${darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-200'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            Brand Compatibility Matrix
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Brand-Wise <span className="text-cyan-500">Products & Spares</span>
          </h2>
          <p className={`text-sm max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Select a brand to explore key spare parts, specs, laser sources, and optical modules configured for that ecosystem.
          </p>
        </div>

        {/* Brand Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 no-scrollbar">
          {Object.keys(BRAND_MAPPINGS).map((bId) => {
            const bInfo = BRANDS.find(b => b.id === bId);
            const isActive = activeBrandId === bId;
            return (
              <button
                key={bId}
                onClick={() => setActiveBrandId(bId)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : darkMode
                    ? 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <span>{bInfo ? bInfo.name : bId}</span>
              </button>
            );
          })}
        </div>

        {/* Brand Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrandId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-8 rounded-3xl border ${
              darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 shadow-xl text-slate-900'
            }`}
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Brand Header & Info */}
              <div className="lg:col-span-5 space-y-4 text-left border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-6">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 inline-block text-cyan-400">
                  {activeBrandData.svgLogo}
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-cyan-500 uppercase">
                    {activeBrandData.country} Origin
                  </span>
                  <h3 className="text-2xl font-black mt-1">{activeMapping.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{activeMapping.tagline}</p>
                </div>

                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {activeBrandData.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onGetQuote({ name: `${activeBrandData.name} Spares Package`, category: "Brand Package" })}
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Request {activeBrandData.name} Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right List of Mapped Spares */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Key {activeBrandData.name} Components We Supply:
                  </h4>
                  <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Stock at Pune HQ</span>
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activeMapping.featuredList.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        darkMode ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40' : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                          Item #{idx + 1}
                        </span>
                        <Cpu className="w-4 h-4 text-slate-500" />
                      </div>
                      <h5 className="text-base font-bold mt-2">{item.name}</h5>
                      <p className="text-xs text-slate-400 mt-1 font-mono">{item.spec}</p>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
