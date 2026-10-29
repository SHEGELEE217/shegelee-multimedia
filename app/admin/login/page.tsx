"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // If successful, push to the admin dashboard
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center border-r border-border">
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(124,58,237,0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(245,158,11,0.15), transparent 50%), #0b0b0f",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="z-10 text-center px-12">
          <ShieldCheck className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="font-display text-4xl tracking-tight mb-4">
            Shegelee <span className="text-accent">Admin</span>
          </h1>
          <p className="text-muted text-lg max-w-md mx-auto">
            Secure portal for managing studio bookings, inventory, and client inquiries.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <Link
          href="/"
          className="absolute top-8 right-8 text-sm text-muted hover:text-white transition"
        >
          ← Back to site
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 rounded-3xl bg-surface border border-border shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

          <div className="mb-8">
            <h2 className="font-display text-2xl mb-2">Welcome back</h2>
            <p className="text-muted text-sm">Sign in to access your dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm text-muted mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg border border-border focus:border-accent outline-none transition"
                  placeholder="admin@shegelee.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg border border-border focus:border-accent outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}