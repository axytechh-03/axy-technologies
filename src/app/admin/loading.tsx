import React from "react";

/**
 * Admin Portal Loading Fallback
 * 
 * Ensures private admin routes display a clean, dedicated administrative loading
 * state and never trigger the public customer-facing branded intro screen.
 */
export default function AdminLoading() {
  return (
    <div
      className="min-h-screen bg-[#080d1b] flex flex-col items-center justify-center p-4 select-none"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center">
        {/* Minimal admin spinner */}
        <div className="w-8 h-8 rounded-full border-2 border-[#1e2f57] border-t-[#3563f5] animate-spin mb-4" />
        <span className="text-xs font-mono tracking-wider text-[#6b7fa6] uppercase">
          AXY Admin Portal
        </span>
      </div>
    </div>
  );
}
