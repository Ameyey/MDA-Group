import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, FileText, Tag } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

export const ProductCard = ({ 
  product, 
  darkMode, 
  onQuickView, 
  onGetQuote 
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`glass-card rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 group ${
        darkMode 
          ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]' 
          : 'bg-white/90 border-slate-200 hover:border-blue-500/40 hover:shadow-xl'
      }`}
    >
      <div>
        {/* Top Header: Badge & Category */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
            product.badge === 'Best Seller' 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : product.badge === 'New Arrival' || product.badge === 'New' 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
          }`}>
            {product.badge || 'Stocked'}
          </span>
          <span className="text-[11px] font-mono text-slate-400 truncate">
            {product.category}
          </span>
        </div>

        {/* Product Image Container (HD Photo + Fallback Visual Diagram) */}
        <div 
          onClick={() => onQuickView(product)}
          className="relative cursor-pointer overflow-hidden rounded-xl mb-4 group-hover:shadow-lg transition-all h-44 bg-slate-950 flex items-center justify-center border border-slate-800"
        >
          {product.imageUrl && !imgError ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <ProductVisual visualType={product.visualType} className="w-full h-full" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
              100% Genuine
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 
          onClick={() => onQuickView(product)}
          className={`text-base font-extrabold cursor-pointer group-hover:text-cyan-500 transition-colors line-clamp-1 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          {product.name}
        </h3>

        {/* Price Placeholder */}
        <div className="mt-1.5 flex items-center space-x-1 text-xs font-bold text-cyan-400 font-mono">
          <Tag className="w-3.5 h-3.5" />
          <span>{product.pricePlaceholder || 'Contact for Price'}</span>
        </div>

        {/* Short Description */}
        <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
          darkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {product.shortDesc}
        </p>

        {/* Compatible Brands Tags */}
        <div className="mt-3 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Compatible Brands:
          </span>
          <div className="flex flex-wrap gap-1">
            {product.compatibleBrands.slice(0, 3).map((brand) => (
              <span 
                key={brand} 
                className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  darkMode 
                    ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {brand}
              </span>
            ))}
            {product.compatibleBrands.length > 3 && (
              <span className="text-[10px] font-medium text-slate-400 px-1">
                +{product.compatibleBrands.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 gap-2">
        <button
          onClick={() => onQuickView(product)}
          className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
            darkMode 
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Details</span>
        </button>

        <button
          onClick={() => onGetQuote(product)}
          className="w-full py-2 px-2.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md hover:shadow-cyan-500/20 flex items-center justify-center space-x-1"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </button>
      </div>

    </motion.div>
  );
};
