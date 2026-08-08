"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import FloatingPetals from "@/components/effects/FloatingPetals";
import { Lock, Mail, Sparkles, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@rumiatlas.com");
  const [password, setPassword] = useState("rumiatlas2026");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email address or master password.");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#0B0813] text-[#F3E8FF] overflow-hidden">
      <FloatingPetals />

      <div className="relative z-10 max-w-md w-full liquid-glass p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8 animate-fade-rise">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full liquid-glass text-[#FDE047] text-[10px] uppercase tracking-[0.25em] font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Restricted Access</span>
          </div>
          <h1 className="font-instrument italic text-4xl sm:text-5xl font-normal text-white">
            The Rumi Atlas
          </h1>
          <p className="text-xs text-[#A78BFA] font-light">
            Enter your credentials to manage travel stories & dispatches.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs text-center font-light">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#A78BFA] block">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rumiatlas.com"
                className="w-full bg-white/5 border border-[#2E2352] rounded-full px-5 py-3 pl-11 text-sm text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6] transition-all"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#A78BFA] block">
              Master Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-[#2E2352] rounded-full px-5 py-3 pl-11 text-sm text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6] transition-all"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-full flex items-center justify-center space-x-2 transition-all shadow-xl hover:scale-[1.02]"
          >
            <span>{loading ? "Authenticating..." : "Unlock Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-[#A78BFA] text-center space-y-1">
            <span className="text-[#FDE047] font-semibold block uppercase tracking-wider">Default Studio Credentials</span>
            <p>Email: <code className="text-white font-mono">admin@rumiatlas.com</code></p>
            <p>Password: <code className="text-white font-mono">rumiatlas2026</code></p>
          </div>
        </form>

      </div>
    </div>
  );
}
