"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CAPABILITIES } from "@/data/siteData";

export const InteractiveCapabilitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(CAPABILITIES[0].id);

  const currentCapability =
    CAPABILITIES.find((c) => c.id === activeTab) || CAPABILITIES[0];

  return (
    <section className="section interactive-cap" id="interactive-capabilities">
      <div className="wrap">
        <SectionHead
          eyebrow="Interactive Deep-Dive"
          title="Engineered for impact at every layer."
          description="Explore how our integrated capabilities fit together to power measurable business growth."
          className="text-center mx-auto"
        />

        {/* Capability Tabs */}
        <div className="cap-tabs" role="tablist" aria-label="AXY Capabilities Explorer">
          {CAPABILITIES.map((cap) => {
            const isActive = cap.id === activeTab;
            return (
              <button
                key={cap.id}
                role="tab"
                aria-selected={isActive}
                className={`cap-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(cap.id)}
              >
                <span>{cap.icon}</span>
                <span>{cap.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Panel Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCapability.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.2, 0.75, 0.25, 1] }}
            className="interactive-panel"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-xl bg-[#edf2ff] text-[#3563f5] font-bold grid place-items-center text-lg">
                  {currentCapability.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3563f5]">
                  Architecture & Execution
                </span>
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-[#101522]">
                {currentCapability.title}
              </h3>

              <p className="text-sm leading-relaxed text-[#687184] mb-6">
                {currentCapability.description}
              </p>

              <div className="space-y-2.5 mb-8">
                {currentCapability.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-[#1e293b]">
                    <span className="w-4 h-4 rounded-full bg-[#3563f518] text-[#3563f5] text-[10px] font-bold flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Button variant="primary" href="#contact">
                  Consult our team
                </Button>
                {currentCapability.metrics && (
                  <span className="text-xs font-semibold text-[#3563f5] bg-[#3563f512] px-3.5 py-2 rounded-full border border-[#3563f524]">
                    Benchmark: {currentCapability.metrics}
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Preview Mockup Window */}
            <div className="interactive-screen">
              <div className="flex items-center justify-between pb-3 border-b border-[#233766]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[11px] font-mono text-[#8eb4ff]">
                  axy://{currentCapability.id}.engine
                </div>
                <div className="text-[10px] text-[#607bb0]">v2.4</div>
              </div>

              <div className="py-6 font-mono text-xs">
                {currentCapability.id === "web-development" && (
                  <div className="space-y-2">
                    <p className="text-[#8eb4ff]">{"// Next.js App Router Architecture"}</p>
                    <p className="text-[#cbd5e1]">
                      export async function <span className="text-[#60a5fa]">GenerateSite</span>() &#123;
                    </p>
                    <p className="pl-4 text-[#94a3b8]">
                      performanceScore: <span className="text-[#34d399]">99/100</span>,
                    </p>
                    <p className="pl-4 text-[#94a3b8]">
                      responsiveBreakpoints: [&apos;mobile&apos;, &apos;tablet&apos;, &apos;desktop&apos;],
                    </p>
                    <p className="pl-4 text-[#94a3b8]">
                      hydration: <span className="text-[#f59e0b]">&quot;instant-selective&quot;</span>
                    </p>
                    <p className="text-[#cbd5e1]">&#125;</p>
                  </div>
                )}

                {currentCapability.id === "digital-marketing" && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[11px] text-[#94a3b8]">
                      <span>Live Channel Blend</span>
                      <span className="text-[#34d399]">Active Optimization</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1 text-[#cbd5e1]">
                          <span>Google Search Intent</span>
                          <span>4.2x ROAS</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#1e293b] overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#3563f5] to-[#76a1ff] w-[88%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-1 text-[#cbd5e1]">
                          <span>Meta Retargeting</span>
                          <span>3.8x ROAS</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#1e293b] overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#3563f5] to-[#76a1ff] w-[76%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentCapability.id === "seo-optimization" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-[#14234b] border border-[#274488]">
                      <div className="text-[10px] text-[#8cb0ff] uppercase tracking-wider mb-1">
                        Core Web Vitals Status
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        <div>
                          <div className="text-[#34d399] font-bold text-sm">0.7s</div>
                          <div className="text-[9px] text-[#94a3b8]">LCP</div>
                        </div>
                        <div>
                          <div className="text-[#34d399] font-bold text-sm">18ms</div>
                          <div className="text-[9px] text-[#94a3b8]">INP</div>
                        </div>
                        <div>
                          <div className="text-[#34d399] font-bold text-sm">0.001</div>
                          <div className="text-[9px] text-[#94a3b8]">CLS</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      ✓ Rich Snippets &bull; Local Citations &bull; High-Intent Keywords
                    </div>
                  </div>
                )}

                {currentCapability.id === "brand-creative" && (
                  <div className="space-y-3">
                    <div className="text-[11px] text-[#94a3b8] mb-2">Design Tokens & Identity Assets</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#3563f5]" title="Primary Blue" />
                      <div className="w-8 h-8 rounded-lg bg-[#76a1ff]" title="Accent Blue" />
                      <div className="w-8 h-8 rounded-lg bg-[#080d1b] border border-[#233766]" title="Night Navy" />
                      <div className="w-8 h-8 rounded-lg bg-[#f18b68]" title="Warm Accent" />
                    </div>
                    <div className="text-[11px] text-[#e2e8f0] font-heading font-bold pt-1">
                      Space Grotesk + DM Sans System
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#233766] text-[10px] text-[#8299cc]">
                <span>Status: Optimized</span>
                <span>Latency: 12ms</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
