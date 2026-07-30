import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

export function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isString = typeof toast === 'string';
  const message = isString ? toast : toast.message;
  const type = isString ? 'success' : toast.type || 'success';

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle
  };

  const styles = {
    success: 'border-emerald-500/40 bg-slate-900/95 text-emerald-300 shadow-emerald-500/10',
    error: 'border-red-500/40 bg-slate-900/95 text-red-300 shadow-red-500/10',
    info: 'border-cyan-500/40 bg-slate-900/95 text-cyan-300 shadow-cyan-500/10',
    warning: 'border-amber-500/40 bg-slate-900/95 text-amber-300 shadow-amber-500/10'
  };

  const iconColors = {
    success: 'text-emerald-400',
    error: 'text-red-400',
    info: 'text-cyan-400',
    warning: 'text-amber-400'
  };

  const Icon = icons[type] || CheckCircle2;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 shadow-2xl backdrop-blur-xl transition-all duration-300 ${styles[type]}`}
      >
        <Icon className={`h-5 w-5 flex-shrink-0 ${iconColors[type]}`} />
        <span className="text-xs font-semibold text-slate-100 pr-2">{message}</span>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
