import React from "react";
import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CAPABILITIES } from "@/data/siteData";

export const ServicesSection: React.FC = () => {
  return (
    <section className="section capabilities" id="services">
      <div className="wrap">
        <SectionHead
          eyebrow="Our capabilities"
          title="Everything you need to move forward."
          description="From your first digital impression to the campaigns that bring people back, we connect the pieces that help your business grow."
        />

        <div className="cap-grid">
          {CAPABILITIES.map((cap) => (
            <article key={cap.id} className="cap-card group">
              <div className="cap-icon">{cap.icon}</div>
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
              <Link className="cap-link" href={cap.linkHref}>
                {cap.linkText} <span>↗</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="cap-foot">
          <p>
            <strong>One team. Connected thinking.</strong> From strategy and design to launch
            and ongoing growth.
          </p>
          <Button variant="primary" href="#contact">
            Tell us what you need
          </Button>
        </div>
      </div>
    </section>
  );
};
