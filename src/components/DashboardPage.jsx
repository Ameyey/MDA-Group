import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageManagementModule } from './ImageManagementModule';

export function DashboardPage({ onBackToHome }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#111827_45%,_#0f172a_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto mb-4 flex max-w-7xl items-center justify-end">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </button>
      </div>
      <ImageManagementModule onBackToHome={onBackToHome} />
    </div>
  );
}
