"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

/**
 * BrandedPageLoader
 * 
 * Sophisticated circular logo-based loading experience for AXY Technologies.
 * Displays only the original blue-and-orange AXY emblem cropped directly from the uploaded asset,
 * surrounded by concentric circular graphics, an animated progress ring, and subtle radial illumination.
 * Dismisses smoothly as soon as the page is ready, with no artificial delays or fake progress numbers.
 */
export function BrandedPageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let unmountTimer: NodeJS.Timeout | null = null;

    const startDismiss = () => {
      setIsFadingOut(true);
      unmountTimer = setTimeout(() => {
        setIsVisible(false);
      }, 450); // Matches transition duration
    };

    // Real loading check: Dismiss immediately when the page is ready
    if (document.readyState === "complete") {
      const frame = requestAnimationFrame(startDismiss);
      return () => {
        cancelAnimationFrame(frame);
        if (unmountTimer) clearTimeout(unmountTimer);
      };
    } else {
      window.addEventListener("load", startDismiss, { once: true });
      const safetyFallback = setTimeout(startDismiss, 2500);

      return () => {
        window.removeEventListener("load", startDismiss);
        clearTimeout(safetyFallback);
        if (unmountTimer) clearTimeout(unmountTimer);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="axy-branded-loader"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080D1B] select-none transition-all duration-450 ease-out ${
        isFadingOut
          ? "opacity-0 pointer-events-none scale-[1.015]"
          : "opacity-100 pointer-events-auto"
      }`}
      aria-live="polite"
      aria-busy={!isFadingOut}
      role="status"
    >
      {/* Central Circular Graphic Composition */}
      <div className="relative flex items-center justify-center w-[330px] sm:w-[410px] md:w-[450px] aspect-square">
        {/* Subtle Radial Illumination behind the Emblem */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none axy-radial-pulse"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(34, 88, 238, 0.26) 0%, rgba(209, 119, 92, 0.12) 38%, rgba(8, 13, 27, 0) 68%)",
          }}
          aria-hidden="true"
        />

        {/* Concentric Circular Graphics & Animated Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 500 500"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            {/* Luminous progress sweep gradient combining Cobalt Blue and subtle Terracotta Orange */}
            <linearGradient
              id="axyCircularSweep"
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

            {/* Subtle glow filter */}
            <filter
              id="axyRingGlow"
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

          {/* Outermost subtle coordinate boundary */}
          <circle
            cx="250"
            cy="250"
            r="234"
            stroke="rgba(110, 154, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray="2 14"
          />

          {/* Guide circle for progress ring */}
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
            stroke="url(#axyCircularSweep)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="190 1100"
            className="axy-orbit-spin"
            filter="url(#axyRingGlow)"
          />

          {/* Counter-rotating dashed middle orbit */}
          <circle
            cx="250"
            cy="250"
            r="174"
            stroke="rgba(53, 99, 245, 0.18)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            className="axy-orbit-reverse"
          />

          {/* Precision tick marks at 0, 90, 180, 270 degrees */}
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

        {/* Center Emblem: Exact original blue-and-orange AXY emblem */}
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
