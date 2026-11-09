"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { FAQ_ITEMS } from "@/data/siteData";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="wrap">
        <SectionHead
          eyebrow="Frequently Asked Questions"
          title="Common questions, clear answers."
          description="Everything you need to know about partnering with AXY Technologies for your digital growth."
        />

        <div className="max-w-[760px] space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`faq-card ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.75, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="faq-content">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
