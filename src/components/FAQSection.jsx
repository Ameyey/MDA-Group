import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { FAQS } from '../data/additionalData';

export const FAQSection = ({ darkMode }) => {
  const [openIdx, setOpenIdx] = useState(0);
  const [filterText, setFilterText] = useState("");

  const filteredFaqs = FAQS.filter(f => 
    !filterText || 
    f.question.toLowerCase().includes(filterText.toLowerCase()) || 
    f.answer.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <section id="faq" className={`py-16 px-4 transition-colors duration-300 ${darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-200'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            Frequently Asked Questions
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Got <span className="text-cyan-500">Questions?</span> We Have Answers
          </h2>
          <p className={`text-sm max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Find quick answers regarding laser optics compatibility, shipping timelines, OEM standards, and nozzle selection.
          </p>
        </div>

        {/* FAQ Filter Input */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search questions (e.g., nozzles, Raytools, optics)..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
              darkMode ? 'bg-slate-950 border-slate-800 text-white focus:ring-cyan-500' : 'bg-white border-slate-300 text-slate-900 focus:ring-blue-500'
            }`}
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left font-bold text-sm flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className={`flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan-500' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`px-4 pb-4 text-xs leading-relaxed border-t border-slate-800/40 pt-3 ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
