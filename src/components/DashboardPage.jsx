import React, { useState } from 'react';
import { Activity, ArrowLeft, BarChart3, Lock, Package, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { ImageManagementModule } from './ImageManagementModule';

export function DashboardPage({ onBackToHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const stats = [
    { label: 'Active Orders', value: '124', icon: Package, accent: 'from-cyan-500 to-blue-500' },
    { label: 'Customer Reach', value: '18.2K', icon: Users, accent: 'from-violet-500 to-fuchsia-500' },
    { label: 'Performance', value: '92%', icon: BarChart3, accent: 'from-emerald-500 to-teal-500' }
  ];

  const quickActions = [
    'Review pending quotes',
    'Approve supplier requests',
    'Schedule a dispatch',
    'Share updates with clients'
  ];

  const handleLogin = (event) => {
    event.preventDefault();

    if (username.trim().toLowerCase() === 'root' && password === '12345') {
      setIsAuthenticated(true);
      setError('');
      return;
    }

    setError('Invalid username or password. Try root / 12345.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#111827_45%,_#0f172a_100%)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-800/70 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <div className="flex items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-300">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-white">Client Dashboard Access</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Sign in to access the dashboard. Use the client credentials below.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-cyan-400"
                  placeholder="root"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-cyan-400"
                  placeholder="12345"
                />
              </div>

              {error ? <p className="text-sm text-rose-400">{error}</p> : null}

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Login to Dashboard
              </button>
            </form>

            <button
              type="button"
              onClick={onBackToHome}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-cyan-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="">              
        
        <div className="">
          <ImageManagementModule onBackToHome={onBackToHome} />
        </div>
      </div>
    </div>
  );
}
