import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, RefreshCw, PackageX } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

export const ProductShowcase = ({ 
  darkMode, 
  searchTerm, 
  setSearchTerm, 
  selectedBrand, 
  setSelectedBrand,
  onQuickView, 
  onGetQuote 
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesBrand = selectedBrand === "All" || 
        product.compatibleBrands.some(b => b.toLowerCase().includes(selectedBrand.toLowerCase()));
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term || 
        product.name.toLowerCase().includes(term) ||
        product.shortDesc.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.compatibleBrands.some(b => b.toLowerCase().includes(term));
      return matchesCategory && matchesBrand && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [selectedCategory, selectedBrand, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <section id="products" className={`py-16 px-4 transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Catalog &amp; Spares Inventory
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Featured Laser <span className="text-cyan-600">Products &amp; Optics</span>
          </h2>
          <p className={`text-sm max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Explore our comprehensive inventory of 20+ specialized fiber laser cutting and welding components. Filter by category, compatible brand, or search by spec.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className={`p-4 rounded-2xl border space-y-4 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          {/* Top Controls Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
            
            {/* Category Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar ">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                      : darkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right Sort & Search Inputs */}
            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
              {/* Search Bar */}
              <div className="relative flex-1 md:w-56">
                <input
                  type="text"
                  placeholder="Filter catalog..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                    darkMode 
                      ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-sky-400'
                  }`}
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`py-1.5 px-3 text-xs rounded-xl border font-medium focus:outline-none ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700 text-slate-200' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <option value="featured">Sort: Featured</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

          </div>

          {/* Active Filter Tags Bar */}
          {(selectedCategory !== "All" || selectedBrand !== "All" || searchTerm) && (
            <div className={`pt-2 border-t flex items-center justify-between text-xs ${
              darkMode ? 'border-slate-800/60' : 'border-slate-100'
            }`}>
              <div className="flex items-center space-x-2 flex-wrap gap-1">
                <span className={`font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Filters:</span>
                {selectedCategory !== "All" && (
                  <span className={`px-2 py-0.5 rounded font-mono ${
                    darkMode 
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' 
                      : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                  }`}>
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedBrand !== "All" && (
                  <span className={`px-2 py-0.5 rounded font-mono ${
                    darkMode 
                      ? 'bg-blue-950 text-blue-400 border border-blue-800' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    Brand: {selectedBrand}
                    
                  </span>
                )}
                {searchTerm && (
                  <span className={`px-2 py-0.5 rounded font-mono ${
                    darkMode 
                      ? 'bg-amber-950 text-amber-400 border border-amber-800' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    Query: "{searchTerm}"
                  </span>
                )}
              </div>
              <button
                onClick={handleResetFilters}
                className="text-cyan-600 hover:underline flex items-center space-x-1 font-semibold"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  darkMode={darkMode}
                  onQuickView={onQuickView}
                  onGetQuote={onGetQuote}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className={`p-12 rounded-2xl text-center space-y-4 border ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            <PackageX className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold">No Products Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We couldn't find any laser spare parts matching your active filter criteria. Try resetting filters or search for another term.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Search Filters</span>
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className={`flex items-center justify-between pt-4 border-t ${
            darkMode ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <span className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} items
            </span>

            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                className={`p-2 rounded-xl border text-xs transition-colors ${
                  currentPage === 1 
                    ? 'opacity-40 cursor-not-allowed border-slate-300' 
                    : darkMode 
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    currentPage === pg
                      ? 'bg-cyan-600 text-white shadow-md'
                      : darkMode
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                className={`p-2 rounded-xl border text-xs transition-colors ${
                  currentPage === totalPages 
                    ? 'opacity-40 cursor-not-allowed border-slate-300' 
                    : darkMode 
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
