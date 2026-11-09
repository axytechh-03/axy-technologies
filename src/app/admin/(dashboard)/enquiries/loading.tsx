import React from "react";

export default function EnquiriesLoading() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="pb-2 border-b border-[#e2e8f0] space-y-2">
        <div className="h-7 w-48 bg-[#e2e8f0] rounded-lg" />
        <div className="h-3.5 w-96 bg-[#f1f5f9] rounded-md" />
      </div>

      {/* Filter / Search Bar Skeleton */}
      <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="h-9 w-full md:w-80 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl" />
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="h-8 w-28 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl" />
            <div className="h-8 w-28 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl" />
            <div className="h-8 w-24 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl" />
            <div className="h-8 w-24 bg-[#eff4ff] border border-[#c7d7fe] rounded-xl" />
          </div>
        </div>
        <div className="h-3 w-56 bg-[#f1f5f9] rounded-md" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs p-4 space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-[#f1f5f9]"
          >
            <div className="h-4 w-28 bg-[#eff4ff] rounded-md" />
            <div className="space-y-1">
              <div className="h-3.5 w-36 bg-[#e2e8f0] rounded-md" />
              <div className="h-2.5 w-48 bg-[#f1f5f9] rounded-md" />
            </div>
            <div className="h-4 w-24 bg-[#f1f5f9] rounded-md" />
            <div className="h-5 w-20 bg-[#f1f5f9] rounded-full" />
            <div className="h-4 w-16 bg-[#f1f5f9] rounded-md" />
            <div className="h-7 w-20 bg-[#eff4ff] rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
