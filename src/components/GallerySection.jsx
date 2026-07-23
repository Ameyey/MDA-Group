import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Tag } from 'lucide-react';
import { GALLERY_12_IMAGES } from '../data/images';

export const GallerySection = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  const categories = ["All", "Laser Processing", "Laser Heads", "Optics & Lenses", "Nozzles", "Laser Sources", "Electronics"];

  const filteredItems = activeTab === "All" 
    ? GALLERY_12_IMAGES 
    : GALLERY_12_IMAGES.filter(item => item.category.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section id="gallery" className={`py-16 px-4 transition-colors duration-300 ${darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-200'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            Industrial Photo & Optics Gallery
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Gallery & <span className="text-cyan-500">Stock Showcase</span>
          </h2>
          <p className={`text-sm max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Examine our high-resolution inventory of laser cutting optics, CNC head assemblies, ceramics, and fiber laser power generators. Exactly 12 HD visual items.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === cat
                  ? 'bg-cyan-600 text-white shadow-md'
                  : darkMode
                  ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (3 columns x 4 rows on desktop = 12 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveLightboxItem(item)}
                className={`group rounded-2xl p-4 border cursor-pointer transition-all ${
                  darkMode ? 'bg-slate-950/90 border-slate-800 hover:border-cyan-500/50' : 'bg-white border-slate-200 shadow-md hover:border-blue-400'
                }`}
              >
                {/* Visual HD Image Container */}
                <div className="relative rounded-xl overflow-hidden mb-3 h-52 bg-slate-950">
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 backdrop-blur-xs">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    <span className="text-xs font-bold text-white">Expand HD View</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-cyan-500 font-mono font-bold">{item.category}</span>
                  <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>

                <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxItem(null)}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className={`max-w-2xl w-full p-6 rounded-3xl border shadow-2xl space-y-4 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                    MDA HD GALLERY LIGHTBOX
                  </span>
                  <button onClick={() => setActiveLightboxItem(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="h-72 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img 
                    src={activeLightboxItem.url} 
                    alt={activeLightboxItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-xl font-bold">{activeLightboxItem.title}</h3>
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-xs bg-cyan-950 text-cyan-400 px-2.5 py-1 rounded border border-cyan-800 font-mono">
                      Category: {activeLightboxItem.category}
                    </span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 font-mono">
                      Tag: {activeLightboxItem.tag}
                    </span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
