import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/additionalData';
import { TESTIMONIAL_AVATARS } from '../data/images';

export const TestimonialsSection = ({ darkMode }) => {
  const TESTIMONIALS_4 = [
    {
      id: 1,
      name: "Rajesh Sharma",
      role: "Plant Operations Manager",
      company: "Apex Precision Sheet Metal, Pune",
      content: "MDA Group is our go-to partner for Raytools laser nozzles and protective lenses. Their 27.9x4.1 optics last 30% longer than generic aftermarket parts and delivery in Pune is prompt!",
      rating: 5,
      avatar: TESTIMONIAL_AVATARS[0]
    },
    {
      id: 2,
      name: "Vikramaditya Kulkarni",
      role: "Laser Maintenance Lead",
      company: "LaserTech Solutions, Chakan Industrial Hub",
      content: "When our 6KW Raycus source needed a replacement QBH cable and BOCI ceramic rings, MDA Group delivered genuine OEM spares within 4 hours. Phenomenal technical knowledge and service.",
      rating: 5,
      avatar: TESTIMONIAL_AVATARS[1]
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Director of Manufacturing",
      company: "Gujrat Fiber Fabrication Works, Ahmedabad",
      content: "We purchased a complete OSPRI H20B auto-focus head along with Precitec sensor cables from MDA Group. Prices are very competitive and customer service is 10/10.",
      rating: 5,
      avatar: TESTIMONIAL_AVATARS[2]
    },
    {
      id: 4,
      name: "Sanjay Kumar",
      role: "Laser Job Shop Owner",
      company: "National CNC Cutting Works, Nashik",
      content: "Sensors, single and double layer nozzles, and focus optics supplied by MDA Group are 100% verified. We have reduced our cutting downtime significantly.",
      rating: 5,
      avatar: TESTIMONIAL_AVATARS[3]
    }
  ];

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            Client Verification & Feedback
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            What Our <span className="text-cyan-500">Clients Say</span>
          </h2>
          <p className={`text-sm max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Trusted by plant engineers, laser job shop owners, and machinery maintenance teams across Pune and India. Exactly 4 verified customer reviews.
          </p>
        </div>

        {/* 4 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_4.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border flex flex-col justify-between relative transition-all ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <Quote className="w-8 h-8 text-cyan-500/20 absolute top-4 right-4" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className={`text-xs italic leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  "{t.content}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/40 shrink-0">
                  <img 
                    src={t.avatar} 
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center space-x-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 inline" />
                  </h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                  <p className="text-[10px] font-mono text-cyan-500">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
