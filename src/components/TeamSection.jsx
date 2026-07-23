import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ShieldCheck, Users } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/images';
import { COMPANY_INFO } from '../data/additionalData';

export const TeamSection = ({ darkMode }) => {
  return (
    <section id="team" className={`py-16 px-4 transition-colors duration-300 ${
      darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 inline-flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Technical Leadership & Engineering</span>
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Meet Our <span className="text-cyan-500">Expert Team</span>
          </h2>
          <p className={`text-sm max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Dedicated optical engineers, sales specialists, and warehouse operations leads serving your fiber laser machinery spare parts needs. Exactly 5 team members.
          </p>
        </div>

        {/* 5 Team Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -6 }}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all group ${
                darkMode ? 'bg-slate-950/90 border-slate-800 hover:border-cyan-500/50' : 'bg-white border-slate-200 shadow-md hover:border-blue-400'
              }`}
            >
              <div>
                {/* Team Member Photo */}
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                  <span className="absolute bottom-2 left-2 text-[9px] font-mono font-bold text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                    MDA PUNE HQ
                  </span>
                </div>

                <h3 className={`text-base font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-cyan-400 mt-0.5">{member.role}</p>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{member.bio}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-cyan-400 flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>Call</span>
                </a>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-cyan-400 flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-cyan-400" />
                  <span>Email</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
