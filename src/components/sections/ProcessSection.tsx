import React from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { PROCESS_STEPS } from "@/data/siteData";

export const ProcessSection: React.FC = () => {
  return (
    <section className="section process" id="process">
      <div className="wrap">
        <SectionHead
          eyebrow="The AXY approach"
          title="Clear thinking. Thoughtful execution."
          description="A collaborative process designed to keep every project focused, transparent and moving in the right direction."
        />

        <div className="process-grid">
          {PROCESS_STEPS.map((step) => (
            <div key={step.step} className="step group">
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
