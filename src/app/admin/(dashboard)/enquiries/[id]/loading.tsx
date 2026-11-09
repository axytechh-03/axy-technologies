import React from "react";

export default function EnquiryDetailLoading() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-7 w-28 bg-white border border-[#e2e8f0] rounded-xl" />
        <div className="h-4 w-px bg-[#cbd5e1]" />
        <div className="h-4 w-32 bg-[#eff4ff] rounded-md" />
      </div>

      {/* Main Header / Client Card Skeleton */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-7 w-48 bg-[#e2e8f0] rounded-lg" />
            <div className="h-6 w-20 bg-[#eff4ff] rounded-full" />
          </div>
          <div className="h-3 w-64 bg-[#f1f5f9] rounded-md" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-9 w-28 bg-[#eff4ff] rounded-xl" />
          <div className="h-9 w-20 bg-[#f8fafc] rounded-xl" />
          <div className="h-9 w-24 bg-[#ecfdf5] rounded-xl" />
          <div className="h-9 w-20 bg-[#fef2f2] rounded-xl" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <div className="h-4 w-36 bg-[#e2e8f0] rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-16 bg-[#f8fafc] rounded-xl" />
              <div className="h-16 bg-[#f8fafc] rounded-xl" />
              <div className="h-16 bg-[#f8fafc] rounded-xl" />
              <div className="h-16 bg-[#f8fafc] rounded-xl" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <div className="h-4 w-44 bg-[#e2e8f0] rounded-md" />
            <div className="flex gap-2">
              <div className="h-7 w-32 bg-[#eff4ff] rounded-xl" />
              <div className="h-7 w-24 bg-[#eff4ff] rounded-xl" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-3">
            <div className="h-4 w-36 bg-[#e2e8f0] rounded-md" />
            <div className="h-28 bg-[#f8fafc] rounded-xl" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <div className="h-4 w-40 bg-[#e2e8f0] rounded-md" />
            <div className="h-12 bg-[#f8fafc] rounded-xl" />
            <div className="space-y-2">
              <div className="h-10 bg-white border border-[#e2e8f0] rounded-xl" />
              <div className="h-10 bg-white border border-[#e2e8f0] rounded-xl" />
              <div className="h-10 bg-white border border-[#e2e8f0] rounded-xl" />
              <div className="h-10 bg-white border border-[#e2e8f0] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
