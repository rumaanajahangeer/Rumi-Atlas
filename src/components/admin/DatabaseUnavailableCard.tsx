import React from "react";
import { Database, AlertTriangle, ExternalLink } from "lucide-react";

export default function DatabaseUnavailableCard() {
  return (
    <div className="liquid-glass p-8 rounded-3xl border border-[#2E2352] shadow-2xl max-w-3xl space-y-6 my-6">
      <div className="flex items-center space-x-3 text-amber-400">
        <AlertTriangle className="w-6 h-6 shrink-0" />
        <h2 className="font-instrument italic text-2xl text-white">Database Not Configured</h2>
      </div>

      <p className="text-sm text-[#A78BFA] leading-relaxed font-light">
        The <code className="text-[#FDE047] font-mono bg-white/10 px-2 py-0.5 rounded">DATABASE_URL</code> environment variable is not set. Admin features, live database querying, subscriber tracking, and dynamic entry publishing require an active database connection.
      </p>

      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-stone-300 font-mono">
        <div className="flex items-center space-x-2 text-[#FDE047]">
          <Database className="w-4 h-4" />
          <span>Recommended Configuration:</span>
        </div>
        <p>1. Provision a Turso database (or SQLite database).</p>
        <p>2. Add <code className="text-emerald-300">DATABASE_URL</code> and <code className="text-emerald-300">TURSO_AUTH_TOKEN</code> in your Vercel Project Environment Variables.</p>
        <p>3. Redeploy your production application.</p>
      </div>

      <div className="pt-2">
        <a
          href="https://vercel.com/docs/projects/environment-variables"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
        >
          <span>Vercel Env Docs</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
