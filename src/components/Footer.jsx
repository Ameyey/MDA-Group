import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, ChevronRight, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/additionalData';
import { BRANDS } from '../data/brands.jsx';
import { CATEGORIES } from '../data/products';
import { MDALogo } from './MDALogo';

export const Footer = ({ darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-slate-900 text-slate-200 border-slate-800'
    }`}>
      
      {/* Upper Partner Brands Strip */}
      <div className="border-b border-slate-800/80 py-6 px-4 bg-slate-950/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Authorized Supply & Support Partners:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Raytools", "Raycus", "MAX Photonics", "BOCI", "Precitec", "WSX", "IPG Photonics", "FSCUT"].map((partner) => (
              <span key={partner} className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-left text-xs">
        
        {/* Col 1: Brand Info & MDALogo */}
        <div className="lg:col-span-2 space-y-4">
          <MDALogo className="w-14 h-14" showText={true} darkMode={darkMode} />

          <p className="text-slate-400 leading-relaxed max-w-sm pt-2">
            {COMPANY_INFO.tagline}. Sourcing high performance protective optics, laser nozzles, auto-focus cutting heads, ceramic sensor rings, and fiber laser generators.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-2 text-slate-300">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-bold text-white">{COMPANY_INFO.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </div>
            <div className="flex items-start space-x-2 text-slate-400">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2">
            {["Hero", "Brands", "Products", "Brand-Products", "Industries", "Gallery", "Team", "FAQ", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>{link.replace('-', ' ')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Product Categories</h4>
          <ul className="space-y-2">
            {CATEGORIES.filter(c => c !== "All").map((cat) => (
              <li key={cat}>
                <a href="#products" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>{cat}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Payment & Express Shipping */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Accepted Payment Options</h4>
          <div className="flex flex-wrap gap-2 text-slate-300">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] font-bold">UPI / PhonePe</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] font-bold">Visa / Mastercard</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] font-bold">NEFT / RTGS</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] font-bold">GST Billing</span>
          </div>

          <div className="pt-2 space-y-1.5 text-slate-400">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Logistics Partners:</span>
            </h4>
            <p className="text-[11px]">BlueDart Air, DTDC Express, Same-Day Pune Counter Dispatch.</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-6 px-4 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} MDA Group Pune. All Rights Reserved.</span>
          </div>

          <p className="text-[11px] text-slate-500">
            High Precision Fiber Laser Spare Parts & Optics Supplier • Pune, Maharashtra, India.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-slate-300 hover:text-white transition-colors border border-slate-800 flex items-center space-x-1 text-xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
};
