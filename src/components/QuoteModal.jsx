import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, FileText, Phone, Mail, Building, Package, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS } from '../data/products';
import { COMPANY_INFO } from '../data/additionalData';

export const QuoteModal = ({ 
  isOpen, 
  onClose, 
  initialProduct = null,
  darkMode 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    productName: initialProduct ? initialProduct.name : PRODUCTS[0].name,
    quantity: '1',
    urgency: 'Normal (1-3 days)',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({ ...prev, productName: initialProduct.name }));
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trigger festive confetti celebrate effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`relative max-w-xl w-full p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold">Request Instant Quote</h3>
                <p className="text-xs text-slate-400">MDA Group Pune • Direct OEM Wholesale Pricing</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content / Success Confirmation */}
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-emerald-400">Quote Inquiry Submitted!</h4>
              <p className={`text-xs max-w-md mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Thank you, <span className="font-bold text-white">{formData.name}</span>! Our sales team at MDA Group Pune has received your inquiry for <span className="font-bold text-cyan-400">{formData.productName} (Qty: {formData.quantity})</span>. We will call you back on {formData.phone} shortly with discount details.
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20MDA%20Group,%20I%20just%20submitted%20a%20quote%20for%20${encodeURIComponent(formData.productName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Chat directly on WhatsApp</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Product Selection */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center justify-between">
                  <span>Selected Product / Spare Part:</span>
                  <span className="text-cyan-400 font-mono text-[10px]">In Stock</span>
                </label>
                <select
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-cyan-300 focus:ring-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-blue-500'
                  }`}
                >
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.compatibleBrands.slice(0, 2).join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Your Full Name *</label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Mobile / WhatsApp No. *</label>
                  <div className="relative">
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Email & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Company / Shop Name</label>
                  <input
                    type="text"
                    placeholder="Laser Cutting Works, Pune"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Quantity & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Estimated Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Delivery Requirement</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Urgent (Same Day Pune Pickup)">Urgent (Same Day Pune Pickup)</option>
                    <option value="Normal (1-3 days)">Express Air (1-3 days)</option>
                    <option value="Bulk Order Plan">Bulk Contract Plan</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Additional Specs / Remarks</label>
                <textarea
                  rows="2"
                  placeholder="Mention thread sizes (M11/M14), focal distances, or laser machine model (Raytools BM111, Raycus 6KW, etc.)."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Quote Request</span>
              </button>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
