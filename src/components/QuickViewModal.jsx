import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, FileText, Phone, Award } from 'lucide-react';
import { ProductVisual } from './ProductVisual';
import { COMPANY_INFO } from '../data/additionalData';

export const QuickViewModal = ({ 
  product, 
  onClose, 
  onGetQuote,
  darkMode 
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
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
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                {product.category}
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready Stock</span>
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-12 gap-6 items-start">
            
            {/* Visual Column */}
            <div className="sm:col-span-5 space-y-3">
              <ProductVisual visualType={product.visualType} className="w-full h-56 rounded-2xl" />

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quality Assurance:
                </span>
                <p className="text-[11px] text-slate-300 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 inline shrink-0" />
                  <span>100% Anti-reflective coating verified</span>
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="sm:col-span-7 space-y-4 text-left">
              <div>
                <h3 className="text-2xl font-black">{product.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{product.fullDesc}</p>
              </div>

              {/* Compatible Brands */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Compatible OEM Brands:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.compatibleBrands.map((brand) => (
                    <span 
                      key={brand} 
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Technical Specifications:
                </span>
                <div className="rounded-xl border border-slate-800 overflow-hidden text-xs divide-y divide-slate-800">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-2 p-2 bg-slate-950/60">
                      <span className="text-slate-400 font-medium">{key}</span>
                      <span className="text-white font-mono font-bold">{val}</span>
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
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
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
