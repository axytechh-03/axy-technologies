import React from "react";
import Image from "next/image";

/**
 * Root Route Loading Fallback (Next.js Suspense)
 * 
 * Provides an instantaneous circular emblem loading screen during Next.js route transitions
 * and server streaming. Reuses the exact original blue-and-orange AXY emblem asset.
 */
export default function RootLoading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080D1B] select-none"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center w-[330px] sm:w-[410px] md:w-[450px] aspect-square">
        {/* Subtle Radial Illumination */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none axy-radial-pulse"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(34, 88, 238, 0.26) 0%, rgba(209, 119, 92, 0.12) 38%, rgba(8, 13, 27, 0) 68%)",
          }}
          aria-hidden="true"
        />

        {/* Concentric Circular Graphics */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 500 500"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="axyCircularSweepRoot"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#d1775c" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#3563f5" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#2258ee" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3563f5" stopOpacity="0" />
            </linearGradient>
            <filter
              id="axyRingGlowRoot"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outermost coordinate boundary */}
          <circle
            cx="250"
            cy="250"
            r="234"
            stroke="rgba(110, 154, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray="2 14"
          />

          {/* Guide circle */}
          <circle
            cx="250"
            cy="250"
            r="206"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
          />

          {/* Thin animated circular progress ring */}
          <circle
            cx="250"
            cy="250"
            r="206"
            stroke="url(#axyCircularSweepRoot)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="190 1100"
            className="axy-orbit-spin"
            filter="url(#axyRingGlowRoot)"
          />

          {/* Counter-rotating dashed orbit */}
          <circle
            cx="250"
            cy="250"
            r="174"
            stroke="rgba(53, 99, 245, 0.18)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            className="axy-orbit-reverse"
          />

          {/* Cardinal Ticks */}
          <line
            x1="250"
            y1="40"
            x2="250"
            y2="48"
            stroke="rgba(209, 119, 92, 0.55)"
            strokeWidth="1.5"
          />
          <line
            x1="460"
            y1="250"
            x2="452"
            y2="250"
            stroke="rgba(53, 99, 245, 0.5)"
            strokeWidth="1.5"
          />
          <line
            x1="250"
            y1="460"
            x2="250"
            y2="452"
            stroke="rgba(53, 99, 245, 0.5)"
            strokeWidth="1.5"
          />
          <line
            x1="40"
            y1="250"
            x2="48"
            y2="250"
            stroke="rgba(53, 99, 245, 0.5)"
            strokeWidth="1.5"
          />

          {/* Inner aperture boundary */}
          <circle
            cx="250"
            cy="250"
            r="142"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        </svg>

        {/* Center Emblem */}
        <div className="relative z-10 flex items-center justify-center axy-emblem-in">
          <Image
            src="/images/axy-emblem.png"
            alt="AXY Emblem"
            width={280}
            height={87}
            priority
            className="w-[180px] sm:w-[220px] md:w-[250px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_8px_30px_rgba(24,79,224,0.4)]"
          />
        </div>
      </div>
    </div>
  );
}
