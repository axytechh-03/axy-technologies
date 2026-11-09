import React from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { PROJECTS } from "@/data/siteData";

export const PortfolioSection: React.FC = () => {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <SectionHead
          eyebrow="Our Work"
          title="Ideas, brought to life."
          description="A curated preview of dedicated client platforms and creative digital concepts developed by AXY Technologies."
        />

        <div className="work-grid">
          {PROJECTS.map((project) => (
            <article key={project.id} className="project group flex flex-col justify-between">
              <div>
                <ProjectArt project={project} />
                <div className="project-info">
                  <div className="flex items-center justify-between gap-2">
                    <span className="project-type">{project.category}</span>
                    {project.isConcept && (
                      <span className="text-[8px] uppercase tracking-wider font-bold text-[#8290ac] bg-[#f0f3f9] px-2 py-0.5 rounded-full border border-[#d8e0f0]">
                        Concept
                      </span>
                    )}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="font-medium text-[#4b5563] text-[11px] mb-2">{project.tags}</p>
                  <p className="text-[11.5px] leading-relaxed text-[#687184]">{project.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="project-disclaimer">
          Client engagements represent dedicated platforms developed by AXY Technologies.
          Concept projects are labeled accordingly to showcase exploratory design direction.
        </p>
      </div>
    </section>
  );
};
