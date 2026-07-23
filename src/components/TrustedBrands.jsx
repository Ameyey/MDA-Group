import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BRANDS } from '../data/brands.jsx';
import { ShieldCheck, Award, ArrowRight, Grid, LayoutList } from 'lucide-react';

export const TrustedBrands = ({ darkMode, onSelectBrand }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'

  return (
    <section id="brands" className={`py-16 px-4 transition-colors duration-300 ${darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-200'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-500">
              <Award className="w-4 h-4" />
              <span>Global OEM Strategic Partnerships</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Our Trusted <span className="text-cyan-500">Brands</span>
            </h2>
            <p className={`text-sm max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              We deal in genuine fiber laser spare parts and optics compatible with world-leading cutting head and laser source manufacturers. Displayed in high-contrast monochrome white & black logos.
            </p>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                viewMode === 'grid' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`p-2 rounded text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                viewMode === 'carousel' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutList className="w-4 h-4" />
              <span>Scrolling Strip</span>
            </button>
          </div>
        </div>

        {/* View Mode: Scrolling Strip Carousel */}
        {viewMode === 'carousel' ? (
          <div className={`relative overflow-hidden py-6 rounded-2xl border shadow-inner ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex space-x-8 animate-[marquee_25s_linear_infinite] whitespace-nowrap px-4">
              {[...BRANDS, ...BRANDS].map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  onClick={() => onSelectBrand(brand.name)}
                  className="inline-flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer min-w-[180px] group transition-all"
                >
                  <div className="text-white flex items-center justify-center h-12 transition-transform group-hover:scale-110">
                    {brand.svgLogo}
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 mt-2">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* View Mode: Responsive Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {BRANDS.map((brand) => (
              <motion.div
                key={brand.id}
                whileHover={{ y: -4 }}
                onClick={() => onSelectBrand(brand.name)}
                className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                  darkMode 
                    ? 'bg-slate-950/90 border-slate-800 hover:border-white/50 text-white hover:bg-slate-900' 
                    : 'bg-white border-slate-300 hover:border-black/50 text-black hover:shadow-xl'
                }`}
              >
                {/* Brand Logo in Monochrome White & Black */}
                <div className={`flex items-center justify-center h-14 w-full transition-transform duration-300 group-hover:scale-110 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {brand.svgLogo}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 w-full text-center">
                  <h3 className={`text-sm font-bold transition-colors ${
                    darkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    {brand.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block truncate mt-0.5">
                    {brand.specialty.split(',')[0]}
                  </span>
                </div>

                {/* Corner Hover Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                    darkMode ? 'text-white bg-slate-800 border-slate-700' : 'text-black bg-slate-100 border-slate-300'
                  }`}>
                    Explore
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quality Guarantee Banner */}
        <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          darkMode ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-slate-800 text-white' : 'bg-gradient-to-r from-slate-100 via-white to-slate-100 border-slate-300 text-slate-900'
        }`}>
          <div className="flex items-center space-x-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-base font-bold">100% Genuine Compatibility & Warranty</h4>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                All spares are strictly benchmarked against OEM optics specifications for focal distance, anti-reflective coating transmittance, and beam centering.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectBrand('All')}
            className={`shrink-0 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center space-x-2 ${
              darkMode ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <span>View All Brand Spares</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
