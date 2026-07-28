import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/additionalData';



export const QuoteSection = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    partsNeeded: '',
    urgency: 'Immediate Dispatch',
    message: ''
  });



 console.log(formData)
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
    setSubmitted(true);
  };

  const sendWhatsApp = async () => {
  try {
    const message = `
Hello MDA Group,

I just submitted a quote request.

    urgency: ' *Contact Details* ',
    name: ${formData.name},
    phone: ${formData.phone},,
    email: ${formData.email},
    company: ${formData.company},
    partsNeeded: ${formData.partsNeeded},,
    
    message: ${formData.message},   


`;

    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("Error opening WhatsApp:", error);
  }
};
  const inputClass = darkMode
    ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:ring-cyan-500'
    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-400';

  const labelClass = darkMode ? 'text-slate-300' : 'text-slate-700';

  return (
    <section id="contact" className={`py-16 px-4 transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Fast Response Inquiry
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Request a <span className="text-cyan-600">Quote</span>
          </h2>
          <p className={`text-sm max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Need urgent spare parts or custom wholesale pricing? Send us your requirements and our technical team will contact you within 30 minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Contact Card */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 shadow-sm ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              
              <div className={`border-b pb-4 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className="text-xs font-mono font-bold text-cyan-600">MDA GROUP HQ PUNE</span>
                <h3 className="text-2xl font-black mt-1">Contact Details</h3>
                <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Fiber Laser Spare Parts &amp; Optics Supplier</p>
              </div>

              <div className="space-y-4 text-xs">
                <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-start space-x-3 group">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`font-semibold block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Call / WhatsApp:</span>
                    <span className={`text-base font-bold group-hover:text-cyan-600 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {COMPANY_INFO.phone}
                    </span>
                  </div>
                </a>

                <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start space-x-3 group">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`font-semibold block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email Inquiry:</span>
                    <span className={`text-sm font-semibold group-hover:text-cyan-600 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {COMPANY_INFO.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`font-semibold block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Warehouse Address:</span>
                    <span className={`text-xs leading-relaxed block mt-0.5 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {COMPANY_INFO.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`pt-4 border-t space-y-2 text-xs ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-center space-x-2 text-emerald-600 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Business Hours: {COMPANY_INFO.workingHours}</span>
                </div>
                <div className={`flex items-center space-x-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  <span>Same-Day Local Pickup &amp; Express All-India Air Courier</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Request Quote Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-emerald-600">Quote Request Received!</h3>
                  <p className={`text-xs max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Thank you {formData.name}! MDA Group team in Pune has received your inquiry. We will contact you at {formData.phone} shortly.
                  </p>
                 <div className='' style={{ display: "flex", gap: "12px"  ,justifyContent: "center",}}>
                   <button  
                    onClick={() => setSubmitted(false)}
                    className=" bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                   <button
                    onClick={() => sendWhatsApp()}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                  >
                   Chat directly on WhatsApp
                  </button>
                 </div>

                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`font-semibold ${labelClass}`}>Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${inputClass}`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`font-semibold ${labelClass}`}>Phone / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${inputClass}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`font-semibold ${labelClass}`}>Email Address</label>
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${inputClass}`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`font-semibold ${labelClass}`}>Company Name</label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${inputClass}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`font-semibold ${labelClass}`}>Laser Parts Needed</label>
                    <input
                      type="text"
                      placeholder="e.g., Raytools 27.9x4.1 Optics (Qty 20), Single Nozzle 1.5mm (Qty 50)"
                      value={formData.partsNeeded}
                      onChange={(e) => setFormData({ ...formData, partsNeeded: e.target.value })}
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${inputClass}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`font-semibold ${labelClass}`}>Requirement Details / Remarks</label>
                    <textarea
                      rows="3"
                      placeholder="Specify focal length, laser machine wattage, or delivery requirements."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 ${inputClass}`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to MDA Group</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
