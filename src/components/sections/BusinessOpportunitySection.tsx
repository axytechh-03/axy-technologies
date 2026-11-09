import React from "react";
import { IMPACT_PILLARS } from "@/data/siteData";

export const BusinessOpportunitySection: React.FC = () => {
  return (
    <section className="section impact" id="focus">
      <div className="wrap impact-grid">
        <div>
          <span className="eyebrow">What we focus on</span>
          <h2>Built around what matters to your business.</h2>
          <p>
            We don&apos;t believe in impressive-looking numbers without context. We
            focus on the foundations that make digital work valuable: clarity,
            usability, visibility and measurable performance.
          </p>
        </div>

        <div className="impact-items">
          {IMPACT_PILLARS.map((item) => (
            <div key={item.number} className="impact-item">
              <strong>{item.number}</strong>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
