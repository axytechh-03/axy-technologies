"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export const HeroVisual: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="visual-stage select-none"
      aria-label="Abstract AXY geometric brand visual"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Ambient Blue Radial Glow Behind Visual */}
      <div
        className="absolute w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(53, 99, 245, 0.28) 0%, rgba(53, 99, 245, 0.05) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Tilt Wrapper with smooth spring / transition */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 18,
          mass: 0.8,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Orbital Ring 1 - Solid with glowing nodes */}
        <div className="orbit" aria-hidden="true" />

        {/* Orbital Ring 2 - Reverse rotation */}
        <div className="orbit two" aria-hidden="true" />

        {/* Dashed Orbital Path */}
        <div
          className="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full border border-dashed border-[#76a1ff30] pointer-events-none"
          style={{
            transform: "rotateX(72deg) rotateZ(15deg)",
            animation: "orbit 45s linear infinite",
          }}
          aria-hidden="true"
        />

        {/* Floating Geometric Shards */}
        <div
          className="absolute -top-3 left-[20%] w-3 h-3 bg-gradient-to-tr from-[#3563f5] to-[#76a1ff] opacity-70 rotate-45 pointer-events-none animate-pulse"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-14 right-[16%] w-2.5 h-2.5 bg-gradient-to-br from-[#f18b68] to-[#ffaa88] opacity-80 rotate-12 pointer-events-none"
          style={{ animation: "tagfloat 6s ease-in-out infinite" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -right-6 w-2 h-2 bg-[#8cb0ff] rounded-full shadow-[0_0_12px_#3563f5] pointer-events-none"
          aria-hidden="true"
        />

        {/* Central Core Glassmorphism Card */}
        <div className="core-card">
          <svg
            className="core-logo"
            viewBox="0 0 180 120"
            fill="none"
            aria-label="Abstract AXY symbol"
          >
            {/* Light blue shard */}
            <path d="M9 100 62 14h29L38 100H9Z" fill="#8CB0FF" />
            {/* White center facet */}
            <path d="m57 100 34-52 35 52H97L90 88l-8 12H57Z" fill="#fff" />
            {/* Deep blue shard */}
            <path d="m94 14 78 86h-36L58 14h36Z" fill="#3563F5" />
            {/* Orange energetic accent shard */}
            <path d="m26 100 18-28h26L52 100H26Z" fill="#f18b68" />
          </svg>
        </div>

        {/* Floating Service Badge 1 - Top Left */}
        <div className="float-tag tag-one">
          <span className="tag-icon" aria-hidden="true">⌘</span>
          <span>
            <b>Web development</b>Built to perform
          </span>
        </div>

        {/* Floating Service Badge 2 - Top Right */}
        <div className="float-tag tag-two">
          <span className="tag-icon" aria-hidden="true">↗</span>
          <span>
            <b>Digital marketing</b>Made to connect
          </span>
        </div>

        {/* Floating Service Badge 3 - Bottom Left */}
        <div className="float-tag tag-three">
          <span className="tag-icon" aria-hidden="true">⌕</span>
          <span>
            <b>SEO strategy</b>Ready to be found
          </span>
        </div>

        {/* Floating Service Badge 4 - Bottom Right */}
        <div className="float-tag tag-four">
          <span className="tag-icon" aria-hidden="true">✳</span>
          <span>
            <b>Creative design</b>Made to stand out
          </span>
        </div>
      </motion.div>
    </div>
  );
};
