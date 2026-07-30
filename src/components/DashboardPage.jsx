import React, { useState } from 'react';
import { ArrowLeft, LogOut, ShieldCheck } from 'lucide-react';
import { ImageManagementModule } from './ImageManagementModule';
import { LoginScreen } from './LoginScreen';

export function DashboardPage({ onBackToHome }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (username, password) => {
    if (username.trim() === 'root' && password === '12345') {
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid username or password. ')
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setErrorMessage('');
  };

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute right-6 top-6 z-20">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-md transition hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>
        </div>
        <LoginScreen onLogin={handleLogin} errorMessage={errorMessage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#111827_45%,_#0f172a_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Authenticated as Admin (root)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </button>
        </div>
      </div>

      <ImageManagementModule onBackToHome={onBackToHome} />
    </div>
  );
}
