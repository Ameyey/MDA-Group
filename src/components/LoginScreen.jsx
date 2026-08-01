import React, { useState } from 'react';
import { ArrowRight, Lock, ShieldCheck, Sparkles } from 'lucide-react';

export function LoginScreen({ onLogin, errorMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#111827_45%,_#0f172a_100%)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-800/70 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur xl:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
            <ShieldCheck className="h-4 w-4" />
            Secure access portal
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Welcome back to your workspace
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Sign in to unlock the dashboard, review insights, and manage your operations in one place.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 pr-12 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  autoComplete="current-password"
                />
                <Lock className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Continue to dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {errorMessage ? (
            <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {errorMessage}
            </div>
          ) : null}
        </div>

        {/* <div className="w-full max-w-xl rounded-3xl border border-slate-800/70 bg-slate-900/50 p-8 shadow-xl shadow-slate-950/40 backdrop-blur">
          <div className="flex items-center gap-2 text-cyan-300">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em]">Dashboard highlights</span>
          </div>

          <ul className="mt-6 space-y-4 text-sm text-slate-300">
            <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="font-semibold text-white">Instant analytics</p>
              <p className="mt-1 text-slate-400">Monitor performance, orders, and customer activity in one glance.</p>
            </li>
            <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="font-semibold text-white">Secure sign-in</p>
              <p className="mt-1 text-slate-400">Your account stays protected with a streamlined authentication flow.</p>
            </li>
            <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="font-semibold text-white">Modern layout</p>
              <p className="mt-1 text-slate-400">Responsive cards, clear actions, and polished visuals for daily use.</p>
            </li>
          </ul>

          <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-1">Username: root</p>
            <p>Password: 12345</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
