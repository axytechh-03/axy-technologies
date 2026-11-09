import React from "react";
import { TRUST_WORDS } from "@/data/siteData";

export const CapabilityTicker: React.FC = () => {
  return (
    <div className="trust-strip overflow-hidden w-full" aria-label="AXY Technologies Core Capabilities">
      <div className="wrap flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
        <div className="trust-label shrink-0">
          One connected digital partner
        </div>

        {/* Continuous ticker marquee with min-w-0 to prevent flex blowout */}
        <div className="overflow-hidden min-w-0 w-full md:flex-1 relative py-1">
          <div className="ticker-track flex items-center gap-10">
            {/* First sequence */}
            {TRUST_WORDS.map((word, idx) => (
              <span key={`w1-${idx}`} className="trust-word tracking-wider">
                {word}
              </span>
            ))}
            <span className="text-[#3563f555] text-xs">◆</span>
            {/* Second sequence for seamless loop */}
            {TRUST_WORDS.map((word, idx) => (
              <span key={`w2-${idx}`} className="trust-word tracking-wider">
                {word}
              </span>
            ))}
            <span className="text-[#3563f555] text-xs">◆</span>
            {/* Third sequence for wide screens */}
            {TRUST_WORDS.map((word, idx) => (
              <span key={`w3-${idx}`} className="trust-word tracking-wider">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
