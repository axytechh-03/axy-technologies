import React from "react";

export default function SettingsLoading() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full animate-pulse">
      {/* Page Header Skeleton */}
      <div className="pb-4 border-b border-[#e2e8f0] space-y-2">
        <div className="h-7 w-64 bg-[#e2e8f0] rounded-lg" />
        <div className="h-3.5 w-96 bg-[#f1f5f9] rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <div className="h-4 w-44 bg-[#e2e8f0] rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-16 bg-[#f8fafc] rounded-xl" />
              <div className="h-16 bg-[#f8fafc] rounded-xl" />
              <div className="h-16 bg-[#f8fafc] rounded-xl" />
              <div className="h-16 bg-[#f8fafc] rounded-xl" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <div className="h-4 w-52 bg-[#e2e8f0] rounded-md" />
            <div className="h-10 bg-[#f8fafc] rounded-xl" />
            <div className="h-10 bg-[#f8fafc] rounded-xl" />
            <div className="h-9 w-32 bg-[#eff4ff] rounded-xl ml-auto" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <div className="h-4 w-40 bg-[#e2e8f0] rounded-md" />
            <div className="h-20 bg-[#f8fafc] rounded-xl" />
            <div className="h-28 bg-[#f8fafc] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
