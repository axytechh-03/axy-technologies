import React from "react";

export default function DashboardLoading() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div className="space-y-2">
          <div className="h-7 w-52 bg-[#e2e8f0] rounded-lg" />
          <div className="h-3.5 w-80 bg-[#f1f5f9] rounded-md" />
        </div>
        <div className="h-9 w-36 bg-[#e2e8f0] rounded-xl" />
      </div>

      {/* KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-[#e2e8f0] bg-white shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 bg-[#e2e8f0] rounded-md" />
              <div className="w-8 h-8 rounded-xl bg-[#f1f5f9]" />
            </div>
            <div className="h-8 w-16 bg-[#e2e8f0] rounded-lg" />
            <div className="h-3 w-28 bg-[#f1f5f9] rounded-md" />
          </div>
        ))}
      </div>

      {/* Two Column Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries Skeleton (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
            <div className="space-y-1.5">
              <div className="h-4 w-40 bg-[#e2e8f0] rounded-md" />
              <div className="h-3 w-56 bg-[#f1f5f9] rounded-md" />
            </div>
            <div className="h-3.5 w-20 bg-[#f1f5f9] rounded-md" />
          </div>
          <div className="space-y-3 pt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-[#f8fafc]"
              >
                <div className="space-y-1">
                  <div className="h-3.5 w-32 bg-[#e2e8f0] rounded-md" />
                  <div className="h-2.5 w-44 bg-[#f1f5f9] rounded-md" />
                </div>
                <div className="h-5 w-20 bg-[#f1f5f9] rounded-full" />
                <div className="h-6 w-16 bg-[#f1f5f9] rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log Skeleton (1 Col) */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs p-5 space-y-4">
          <div className="pb-3 border-b border-[#f1f5f9] space-y-1.5">
            <div className="h-4 w-28 bg-[#e2e8f0] rounded-md" />
            <div className="h-3 w-48 bg-[#f1f5f9] rounded-md" />
          </div>
          <div className="space-y-4 pt-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#cbd5e1] mt-1.5 shrink-0" />
                <div className="space-y-1 flex-1">
                  <div className="h-3 w-36 bg-[#e2e8f0] rounded-md" />
                  <div className="h-2.5 w-24 bg-[#f1f5f9] rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
