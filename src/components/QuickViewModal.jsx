import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, FileText, Phone } from 'lucide-react';
import { ProductVisual } from './ProductVisual';
import { COMPANY_INFO } from '../data/additionalData';

export const QuickViewModal = ({ 
  product, 
  onClose, 
  onGetQuote,
  darkMode 
}) => {
  if (!product) return null;

  const displayName = product.name || product.title || 'New Product Card';
  const displayCategory = product.category || 'Custom';
  const displayDescription = product.fullDesc || product.shortDesc || product.description || 'Added from the dashboard.';
  const displayBrands = Array.isArray(product.compatibleBrands) && product.compatibleBrands.length ? product.compatibleBrands : ['Custom'];
  const displaySpecs = product.specs && typeof product.specs === 'object' ? product.specs : {
    Summary: displayDescription,
    Source: product.customSource === 'dashboard' ? 'Dashboard upload' : 'Catalog'
  };
  const imageSource = product.imageUrl || product.url || '';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative max-w-2xl w-full p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between pb-4 border-b ${
            darkMode ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                darkMode 
                  ? 'text-cyan-400 bg-cyan-950 border-cyan-800' 
                  : 'text-cyan-700 bg-cyan-50 border-cyan-200'
              }`}>
                {displayCategory}
              </span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready Stock</span>
              </span>
            </div>
            <button 
              onClick={onClose} 
              className={`p-1.5 rounded-full transition-colors ${
                darkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-12 gap-6 items-start">
            
            {/* Visual Column */}
            <div className="sm:col-span-5 space-y-3">
              {imageSource ? (
                <img src={imageSource} alt={displayName} className="h-56 w-full rounded-2xl object-cover" />
              ) : (
                <ProductVisual visualType={product.visualType || 'custom'} className="w-full h-56 rounded-2xl" />
              )}

              <div className={`p-3 rounded-xl border space-y-1 ${
                darkMode 
                  ? 'bg-slate-950/70 border-slate-800' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Quality Assurance:
                </span>
                <p className={`text-[11px] flex items-center space-x-1 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500 inline shrink-0" />
                  <span>100% Anti-reflective coating verified</span>
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="sm:col-span-7 space-y-4 text-left">
              <div>
                <h3 className="text-2xl font-black">{displayName}</h3>
                <p className={`text-xs mt-1 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {displayDescription}
                </p>
              </div>

              {/* Compatible Brands */}
              <div className="space-y-1.5">
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Compatible OEM Brands:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {displayBrands.map((brand) => (
                    <span 
                      key={brand} 
                      className={`text-xs font-semibold px-2.5 py-1 rounded border font-mono ${
                        darkMode 
                          ? 'bg-slate-800 text-cyan-300 border-slate-700' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-1.5 pt-2">
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Technical Specifications:
                </span>
                <div className={`rounded-xl border overflow-hidden text-xs divide-y ${
                  darkMode 
                    ? 'border-slate-800 divide-slate-800' 
                    : 'border-slate-200 divide-slate-100'
                }`}>
                  {Object.entries(displaySpecs).map(([key, val]) => (
                    <div key={key} className={`grid grid-cols-2 p-2 ${
                      darkMode ? 'bg-slate-950/60' : 'bg-slate-50'
                    }`}>
                      <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{key}</span>
                      <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onGetQuote(product);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Get Quote</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className={`py-2.5 px-4 rounded-xl font-bold text-xs border flex items-center justify-center space-x-2 transition-colors ${
                    darkMode 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  <Phone className="w-4 h-4 text-cyan-500" />
                  <span>Call Pune Sales</span>
                </a>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
