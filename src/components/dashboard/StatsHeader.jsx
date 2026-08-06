import React from 'react';
import { Image, CheckCircle, AlertCircle, HardDrive } from 'lucide-react';
import { formatBytes } from '../../services/imageService';

export function StatsHeader({ stats }) {
  const cards = [
    {
      title: 'Total Assets',
      value: stats.total,
      sub: 'All uploaded images',
      icon: Image,
      gradient: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400'
    },
    {
      title: 'Active Images',
      value: stats.active,
      sub: 'Visible in gallery',
      icon: CheckCircle,
      gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400'
    },
    {
      title: 'Inactive / Draft',
      value: stats.inactive,
      sub: 'Hidden from public',
      icon: AlertCircle,
      gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
    },
    {
      title: 'Storage Capacity',
      value: formatBytes(stats.storageUsed),
      sub: 'Cloud storage Limit: 512 MB ',
      icon: HardDrive,
      gradient: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl border bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-cyan-500/5 ${card.gradient}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{card.title}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">{card.value}</h3>
                <p className="mt-1 text-xs text-slate-400">{card.sub}</p>
              </div>
              <div className={`rounded-xl border border-current/20 bg-slate-950/50 p-3 ${card.gradient}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
