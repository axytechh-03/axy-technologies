"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw new Error(error.message || "Invalid email or password.");
      }

      if (!data.user) {
        throw new Error("Login failed. No active session returned.");
      }

      // Check authorization
      const userEmail = (data.user.email || "").toLowerCase();
      const isAuthorizedOwner = userEmail === "axy.techh@gmail.com";

      if (!isAuthorizedOwner) {
        // Check if exists in admin_profiles
        const { data: profile } = await supabase
          .from("admin_profiles")
          .select("role")
          .eq("id", data.user.id)
          .maybeSingle();

        if (!profile) {
          await supabase.auth.signOut();
          throw new Error(
            "Access restricted. This account is not an authorized AXY Technologies administrator."
          );
        }
      }

      router.push(nextUrl);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your administrator email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/admin/settings`,
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      setSuccessMessage(
        "A password reset link has been dispatched to your email address if registered."
      );
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to initiate password reset.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#10182e] border border-[#ffffff15] rounded-2xl p-8 shadow-2xl relative z-10">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <svg
            className="w-9 h-7"
            viewBox="0 0 90 60"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 49 31 8h17L21 49H4Z" fill="#6E9AFF" />
            <path d="m28 49 19-29 19 29H48L39 35l-7 14H28Z" fill="#fff" />
            <path d="m49 8 37 41H68L31 8h18Z" fill="#3563F5" />
          </svg>
          <span className="font-heading font-bold text-xl text-white tracking-tight">
            AXY <small className="text-[9px] tracking-widest text-[#82a5ff]">ADMIN</small>
          </span>
        </div>
        <h1 className="text-lg font-semibold text-white">
          {isResetMode ? "Reset Administrator Password" : "Administrator Portal"}
        </h1>
        <p className="text-xs text-[#8290ac] mt-1">
          {isResetMode
            ? "Enter your email to receive recovery instructions."
            : "Private management access for AXY Technologies."}
        </p>
      </div>

      {/* Error / Success Feedback */}
      {errorMessage && (
        <div
          className="mb-5 p-3 rounded-xl bg-[#3b1219] border border-[#ff7b7240] text-[#ff9b9b] text-xs font-medium"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          className="mb-5 p-3 rounded-xl bg-[#0e3321] border border-[#46c27e40] text-[#7ce2a7] text-xs font-medium"
          role="status"
        >
          {successMessage}
        </div>
      )}

      {isResetMode ? (
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label
              htmlFor="resetEmail"
              className="block text-[11px] uppercase font-bold text-[#9cb0d8] mb-1.5 tracking-wider"
            >
              Administrator Email
            </label>
            <input
              id="resetEmail"
              type="email"
              required
              placeholder="axy.techh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#090f1f] border border-[#ffffff18] text-white text-sm focus:outline-none focus:border-[#5b87ff] focus:ring-2 focus:ring-[#3563f5]/25"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#3563f5] hover:bg-[#2850d9] text-white text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-[#3563f5]/25"
          >
            {isLoading ? "Sending instructions…" : "Send Reset Link"}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsResetMode(false);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className="w-full text-center text-xs text-[#8290ac] hover:text-white pt-2 cursor-pointer transition-colors"
          >
            ← Back to Sign In
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="loginEmail"
              className="block text-[11px] uppercase font-bold text-[#9cb0d8] mb-1.5 tracking-wider"
            >
              Administrator Email
            </label>
            <input
              id="loginEmail"
              type="email"
              required
              autoComplete="email"
              placeholder="axy.techh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#090f1f] border border-[#ffffff18] text-white text-sm focus:outline-none focus:border-[#5b87ff] focus:ring-2 focus:ring-[#3563f5]/25"
              disabled={isLoading}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="loginPassword"
                className="block text-[11px] uppercase font-bold text-[#9cb0d8] tracking-wider"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsResetMode(true);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="text-[11px] text-[#6e9aff] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <input
              id="loginPassword"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#090f1f] border border-[#ffffff18] text-white text-sm focus:outline-none focus:border-[#5b87ff] focus:ring-2 focus:ring-[#3563f5]/25"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#3563f5] hover:bg-[#2850d9] text-white text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-[#3563f5]/25 mt-2"
          >
            {isLoading ? "Signing in…" : "Sign In to Dashboard"}
          </button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-[#ffffff10] text-center">
        <p className="text-[11px] text-[#5d6880]">
          Authorized personnel only. All access attempts are recorded.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#080d1b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#183c9133] rounded-full blur-[120px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-[#10182e] border border-[#ffffff15] rounded-2xl p-8 shadow-2xl relative z-10 text-center text-[#8290ac] text-xs">
            Loading administrator portal...
          </div>
        }
      >
        <LoginFormInner />
      </Suspense>
    </div>
  );
}