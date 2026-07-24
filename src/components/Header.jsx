import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Sun, 
  Moon, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronRight,
  FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../data/additionalData';
import { MDALogo } from './MDALogo';

export const Header = ({ 
  darkMode, 
  setDarkMode, 
  searchTerm, 
  setSearchTerm, 
  quoteItemsCount, 
  onOpenQuoteModal,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Trusted Brands", href: "#brands" },
    { name: "Featured Products", href: "#products" },
    { name: "Max Fibier Laser", href: "#gallery" },
    { name: "Team", href: "#team" },   
    { name: "Contact Us", href: "#contact" }
  ];

  const handleNavClick = (href) => {
    setActiveSection(href.replace('#', ''));
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 shadow-sm backdrop-blur-md transition-colors duration-300">
      {/* Top Bar with Real MDA Group Contact Details */}
      <div className={`text-xs py-2 px-4 border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-slate-300 border-slate-800' 
          : 'bg-gradient-to-r from-slate-800 via-slate-900 to-sky-900 text-slate-200 border-slate-700'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-6 flex-wrap">
            <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">{COMPANY_INFO.phone}</span>
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <div className="hidden lg:flex items-center space-x-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Hingne Khurd, Pune - 411051</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center space-x-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Express Dispatch Active</span>
            </span>
            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm hover:shadow-cyan-500/20 flex items-center space-x-1"
            >
              <FileText className="w-3 h-3" />
              <span>Instant Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-900/95 border-b border-slate-800 text-white' 
          : 'bg-white/95 border-b border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          <a href="#hero" onClick={() => handleNavClick('#hero')} className="group">
            <MDALogo className="w-12 h-12" showText={true} darkMode={darkMode} />
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <input
              type="text"
              placeholder="Search optics, nozzles, heads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-1.5 text-xs rounded-full border transition-all focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500' 
                  : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-400'
              }`}
            />
            <Search className={`w-3.5 h-3.5 absolute left-3 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`} />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className={`absolute right-3 text-xs hover:text-slate-600 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}
              >
                ×
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-colors relative py-1 hover:text-cyan-600 ${
                  activeSection === link.href.replace('#', '') 
                    ? 'text-cyan-600 font-bold' 
                    : darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {link.name}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" 
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all ${
                darkMode 
                  ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onOpenQuoteModal()}
              className={`relative p-2 rounded-full transition-all hover:scale-105 shadow-sm flex items-center justify-center border ${
                darkMode 
                  ? 'bg-slate-950 text-white border-cyan-500/40 hover:border-cyan-400' 
                  : 'bg-slate-900 text-white border-slate-700 hover:border-cyan-500'
              }`}
              title="View Quote List"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              {quoteItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {quoteItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Search & Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-b ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products & brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-sm rounded-lg border ${
                    darkMode 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`px-3 py-2 text-sm rounded-md flex items-center justify-between ${
                      darkMode 
                        ? 'hover:bg-slate-800 text-slate-300' 
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
