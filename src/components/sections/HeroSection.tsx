import React from "react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export const HeroSection: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span aria-hidden="true" /> TECHNOLOGY &nbsp;·&nbsp; CREATIVITY &nbsp;·&nbsp; GROWTH
          </div>

          <h1>
            Build.
            <br />
            Market.
            <br />
            <span className="blue">Grow.</span>
          </h1>

          <div id="about" className="scroll-mt-28">
            <div className="hero-sub">Your digital growth partner.</div>

            <p className="hero-desc">
              We turn ambitious ideas into meaningful digital experiences — through
              thoughtful design, reliable technology and performance-led marketing.
            </p>
          </div>

          <div className="hero-actions">
            <Button variant="primary" href="#contact">
              Start your project
            </Button>
            <Button variant="ghost" href="#work">
              Explore our work
            </Button>
          </div>

          <div className="hero-note">
            <i className="pulse" aria-hidden="true" /> Thoughtful digital solutions. Built
            around your business.
          </div>
        </div>

        <HeroVisual />
      </div>

      <div className="scroll-cue" aria-hidden="true">
        Scroll to explore
      </div>
    </section>
  );
};
