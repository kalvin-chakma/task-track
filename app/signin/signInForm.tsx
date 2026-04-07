"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, LayoutDashboard } from "lucide-react";
import { Spinner } from "@/app/components/ui/spinner";
import FormInput from "@/app/components/formInput";
import { useState } from "react";

interface SignInFormProps {
  loading: boolean;
  error: string;
  onSubmit: (formData: { email: string; password: string }) => void;
}

export default function SignInForm({
  loading,
  error,
  onSubmit,
}: SignInFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16 relative overflow-hidden bg-[#0d0d0d]">
      <div className="relative z-10 w-full max-w-md">
        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-[#080808]" />
          </div>
          <span className="font-bold text-white tracking-tight">
            Task<span className="text-primary">Tracker</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Sign in to continue
          </p>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            Welcome back.
          </h1>
          <p className="text-[#555] text-sm">
            No account yet?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Create one free →
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#141414] border border-white/8 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
          >
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              autoComplete="email"
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#666] uppercase tracking-widest">
                  Password
                </span>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FormInput
                id="password"
                label=""
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/40 text-[#080808] font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group mt-2 text-sm"
            >
              {loading ? (
                <>
                  <Spinner className="w-4 h-4" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider & Sign Up Link */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/6" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#141414] text-[#444]">
                  New to TaskTracker?
                </span>
              </div>
            </div>

            <Link
              href="/signup"
              className="w-full block text-center px-4 py-3 rounded-lg border border-white/8 hover:bg-white/4 hover:border-white/12 transition-all text-[#888] hover:text-white font-medium text-sm"
            >
              Create Account
            </Link>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#444] mt-6">
          By signing in, you agree to our{" "}
          <Link
            href="#"
            className="text-primary/70 hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-primary/70 hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
