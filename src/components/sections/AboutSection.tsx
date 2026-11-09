import React from "react";
import { Button } from "@/components/ui/Button";

export const AboutSection: React.FC = () => {
  return (
    <section className="section manifesto" id="about">
      <div className="wrap manifesto-grid">
        <div>
          <span className="eyebrow">A different kind of digital partner</span>
          <h2>Good work should do more than look good.</h2>
          <p className="manifesto-copy">
            We believe every digital touchpoint should have a purpose. It should make
            your business clearer, your customer journey easier and your next step more
            effective. That&apos;s the thinking we bring to every project.
          </p>
          <Button variant="ghost" href="#process">
            How we work
          </Button>
        </div>

        <div className="manifesto-visual">
          <div className="manifesto-word">
            Think clearly.
            <span>Build boldly.</span>
          </div>
          <div className="manifesto-caption">Strategy × Creativity × Technology</div>
        </div>
      </div>
    </section>
  );
};
