"use client";

import { useState } from "react";
import Link from "next/link";
import { Spinner } from "@/app/components/ui/spinner";
import { AlertCircle, ArrowRight } from "lucide-react";
import FormInput from "@/app/components/formInput";

interface SignUpFormProps {
  loading: boolean;
  error: string;
  onSubmit: (formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export default function SignUpForm({
  loading,
  error,
  onSubmit,
}: SignUpFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="dark:bg-background relative flex flex-1 items-center justify-center overflow-hidden bg-gray-50 px-6 py-12 sm:px-10 lg:px-16">
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8">
          <h1 className="dark:text-foreground mb-1.5 text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="dark:text-muted-foreground text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="dark:bg-card dark:border-border rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-black/5">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
          >
            {error && (
              <div className="dark:bg-destructive/10 dark:border-destructive/30 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <AlertCircle className="dark:text-destructive mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <p className="dark:text-destructive text-sm font-medium text-red-500">
                  {error}
                </p>
              </div>
            )}

            <FormInput
              id="name"
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              placeholder="Your Name"
            />
            <FormInput
              id="email"
              label="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
            <FormInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
            />
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              type="password"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200"
            >
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="dark:text-muted-foreground mt-6 text-center text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
