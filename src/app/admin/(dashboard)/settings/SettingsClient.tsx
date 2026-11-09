"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Mail,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Server,
  Lock,
  ExternalLink,
  Users,
  Copy,
  Check,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface SettingsClientProps {
  adminEmail: string;
  adminName: string;
  adminRole: string;
  isResendConfigured: boolean;
  notificationEmail: string;
  supabaseUrl: string;
}

export const SettingsClient: React.FC<SettingsClientProps> = ({
  adminEmail,
  adminName,
  adminRole,
  isResendConfigured,
  notificationEmail,
  supabaseUrl,
}) => {
  // Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const [copiedUrl, setCopiedUrl] = useState(false);

  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({ type: "idle" });

    if (!newPassword || newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        message: "Password must be at least 8 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setPasswordStatus({
        type: "success",
        message: "Your administrator password has been updated successfully.",
      });
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      console.error("[Password Update Error]", err);
      setPasswordStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Failed to update password. Please check your credentials.",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(supabaseUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="pb-4 border-b border-[#e2e8f0]">
        <h1 className="font-heading text-2xl font-bold text-[#0f172a] tracking-tight">
          Settings & System Configuration
        </h1>
        <p className="text-xs text-[#64748b] mt-0.5">
          Manage administrator security, email notifications, partner team access, and Supabase integration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Profile & Password Update */}
        <div className="lg:col-span-7 space-y-6">
          {/* Administrator Profile Card */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#3563f5]" />
                Administrator Profile
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                Active Session
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Full Name
                </div>
                <div className="text-sm font-bold text-[#0f172a]">{adminName}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Primary Email
                </div>
                <div className="text-sm font-bold text-[#0f172a] truncate">
                  {adminEmail}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  System Role
                </div>
                <div className="text-sm font-bold text-[#3563f5] capitalize">
                  {adminRole} (Super Admin)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Security Level
                </div>
                <div className="text-sm font-bold text-[#0f172a] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3563f5]" />
                  <span>Full RLS Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security / Password Update Form */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#3563f5]" />
              Update Administrator Password
            </h2>
            <p className="text-xs text-[#64748b]">
              Ensure your account uses a secure password (minimum 8 characters with letters, numbers, and symbols).
            </p>

            <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-1">
              {passwordStatus.type === "success" && (
                <div className="p-3.5 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] text-emerald-700 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{passwordStatus.message}</span>
                </div>
              )}

              {passwordStatus.type === "error" && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{passwordStatus.message}</span>
                </div>
              )}

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    minLength={8}
                    required
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] focus:border-[#3563f5] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] outline-none transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#334155] cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  minLength={8}
                  required
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] focus:border-[#3563f5] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] outline-none transition-all"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3563f5] hover:bg-[#284fd4] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingPassword ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Email Notification Settings */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3563f5]" />
                Enquiry Email Alerts (Resend)
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isResendConfigured
                    ? "bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]"
                    : "bg-[#fefce8] text-[#a16207] border border-[#fef08a]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isResendConfigured ? "bg-[#16a34a]" : "bg-[#eab308]"
                  }`}
                />
                {isResendConfigured ? "Operational" : "Pending API Key"}
              </span>
            </div>

            <p className="text-xs text-[#64748b]">
              When visitors submit the public contact form, instant HTML notifications are delivered to your mailbox via Resend.
            </p>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider">
                    Notification Inbox
                  </div>
                  <div className="text-xs font-bold text-[#0f172a] mt-0.5">
                    {notificationEmail}
                  </div>
                </div>
                <span className="text-[11px] text-[#64748b] bg-white border border-[#e2e8f0] px-2.5 py-1 rounded-lg self-start sm:self-auto">
                  Primary Destination
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Subject Line Template
                </div>
                <div className="font-mono text-xs text-[#3563f5] bg-white border border-[#e2e8f0] p-2 rounded-lg">
                  [New Enquiry AXY-XXXX-XXXX] Customer Name - Website development
                </div>
              </div>

              {!isResendConfigured && (
                <div className="p-3.5 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] text-xs text-[#1e40af] space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Resend API Key Notice
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Add <code className="font-mono bg-white px-1 py-0.5 rounded">RESEND_API_KEY</code> and{" "}
                    <code className="font-mono bg-white px-1 py-0.5 rounded">EMAIL_FROM</code> in your local{" "}
                    <code className="font-mono">.env.local</code> and Netlify Environment Variables to activate live email delivery.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Partner Team & Multi-Admin Architecture */}
        <div className="lg:col-span-5 space-y-6">
          {/* Multi-Admin Team Management */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#3563f5]" />
              Team & Partner Administrator
            </h2>

            <p className="text-xs text-[#64748b]">
              The architecture is pre-configured to support a secondary partner administrator.
            </p>

            <div className="space-y-3 pt-1">
              {/* Existing Owner */}
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0f172a]">{adminEmail}</div>
                  <div className="text-[11px] text-[#64748b]">System Owner</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#eff4ff] text-[#3563f5] border border-[#c7d7fe]">
                  Owner
                </span>
              </div>

              {/* Ready for Partner slot */}
              <div className="p-4 rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#334155]">
                    Partner Administrator
                  </div>
                  <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">
                    Slot Ready
                  </span>
                </div>
                <p className="text-[11px] text-[#64748b] leading-relaxed">
                  When ready to onboard a partner, invite them via Supabase Auth. The system automatically provisions their dashboard access.
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-[#e2e8f0] text-[11px] text-[#475569] space-y-1">
                  <div className="font-semibold text-[#0f172a]">How to invite:</div>
                  <ol className="list-decimal pl-4 space-y-0.5">
                    <li>Open your Supabase Dashboard</li>
                    <li>Go to Authentication &gt; Users &gt; Invite User</li>
                    <li>Enter partner&apos;s email address</li>
                    <li>Insert their email into the <code className="font-mono text-[10px]">admin_profiles</code> table</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure & Security Diagnostics */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-[#3563f5]" />
              System Diagnostics
            </h2>

            <div className="space-y-3 pt-1 text-xs">
              {/* Supabase URL */}
              <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Supabase Project URL
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#334155]">
                  <span className="truncate max-w-[200px]">{supabaseUrl}</span>
                  <button
                    onClick={handleCopyUrl}
                    className="text-[#94a3b8] hover:text-[#3563f5] p-1 transition-colors"
                    title="Copy URL"
                  >
                    {copiedUrl ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Hosting */}
              <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider">
                    Deployment Platform
                  </div>
                  <div className="font-bold text-[#0f172a] mt-0.5">Netlify</div>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  Edge Runtime Ready
                </span>
              </div>

              {/* Security */}
              <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider">
                    Admin Route Indexing
                  </div>
                  <div className="font-bold text-[#0f172a] mt-0.5">Blocked (noindex)</div>
                </div>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  Secure
                </span>
              </div>

              {/* External Supabase Link */}
              {supabaseUrl ? (
                <a
                  href={
                    supabaseUrl.includes(".supabase.co")
                      ? `https://supabase.com/dashboard/project/${supabaseUrl.replace("https://", "").split(".")[0]}`
                      : "https://supabase.com/dashboard"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#f8fafc] hover:bg-[#eff4ff] text-[#3563f5] border border-[#e2e8f0] text-xs font-semibold transition-colors mt-2"
                >
                  <span>Open Supabase Console</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};