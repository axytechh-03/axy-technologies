"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  adminEmail: string;
  adminName: string;
  adminRole: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    {
      label: "Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Enquiries",
      href: "/admin/enquiries",
      icon: Inbox,
      active: pathname.startsWith("/admin/enquiries"),
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      active: pathname === "/admin/settings",
    },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#080d1b] text-white border-b border-[#ffffff15] sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-5" viewBox="0 0 90 60" fill="none" aria-hidden="true">
            <path d="M4 49 31 8h17L21 49H4Z" fill="#6E9AFF" />
            <path d="m28 49 19-29 19 29H48L39 35l-7 14H28Z" fill="#fff" />
            <path d="m49 8 37 41H68L31 8h18Z" fill="#3563F5" />
          </svg>
          <span className="font-heading font-bold text-base tracking-tight">
            AXY <span className="text-[10px] text-[#82a5ff] font-mono tracking-wider">CONSOLE</span>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-[#ffffff0a] text-[#aab7d0] hover:text-white hover:bg-[#ffffff15] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-150"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-64 bg-[#080d1b] text-white flex flex-col justify-between border-r border-[#ffffff12] transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "100vh" }}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Brand Header */}
          <div className="p-5 border-b border-[#ffffff10] flex items-center justify-between">
            <Link
              href="/admin/dashboard"
              onClick={closeMobile}
              className="flex items-center gap-2.5 text-white group"
            >
              <svg
                className="w-8 h-6 transition-transform group-hover:scale-105 duration-200"
                viewBox="0 0 90 60"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 49 31 8h17L21 49H4Z" fill="#6E9AFF" />
                <path d="m28 49 19-29 19 29H48L39 35l-7 14H28Z" fill="#fff" />
                <path d="m49 8 37 41H68L31 8h18Z" fill="#3563F5" />
              </svg>
              <div>
                <span className="font-heading font-bold text-lg tracking-tight block leading-none">
                  AXY
                </span>
                <span className="text-[9px] tracking-widest text-[#82a5ff] font-semibold block mt-0.5">
                  ADMIN CONSOLE
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-5 space-y-6 overflow-y-auto flex-1">
            <div>
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#63708a] block mb-2">
                Workspace
              </span>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all min-h-[40px] ${
                        item.active
                          ? "bg-[#3563f5] text-white shadow-sm shadow-[#3563f5]/25 font-semibold"
                          : "text-[#a2aeca] hover:bg-[#ffffff0e] hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#63708a] block mb-2">
                External
              </span>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-[#a2aeca] hover:bg-[#ffffff0e] hover:text-white transition-colors min-h-[40px]"
              >
                <span className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-[#63708a]" />
                  <span>Live Website</span>
                </span>
                <span className="text-[10px] text-[#63708a]">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Refined Minimal Footer: AXY Branding & Subtle Sign Out */}
        <div className="p-3 border-t border-[#ffffff0f] bg-[#060a17]/70">
          <div className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-[#ffffff05] border border-[#ffffff08]">
            {/* Minimal Brand & Console Status */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3563f5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3563f5]" />
              </span>
              <div className="truncate">
                <span className="text-[11px] font-semibold text-[#c8d3ea] block truncate leading-tight">
                  AXY Technologies
                </span>
                <span className="text-[9px] font-mono tracking-wider text-[#63708a] block leading-tight">
                  CONSOLE ACTIVE
                </span>
              </div>
            </div>

            {/* Subtle, Refined Sign Out Control */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-[#8290ac] hover:text-[#ff8585] hover:bg-[#ffffff0e] transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              title="Sign out of admin console"
              aria-label="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">{isLoggingOut ? "…" : "Sign out"}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
