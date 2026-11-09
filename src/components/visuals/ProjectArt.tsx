import React from "react";
import Image from "next/image";
import { ProjectConcept } from "@/types";

interface ProjectArtProps {
  project: ProjectConcept;
}

export const ProjectArt: React.FC<ProjectArtProps> = ({ project }) => {
  return (
    <div className={`project-art ${project.theme}`}>
      <div className="browser">
        <div className="browser-top">
          <i />
          <i />
          <i />
          <span className="text-[8px] font-mono text-[#8a94a6] ml-2 truncate opacity-80 select-none">
            {project.browserTitle.toLowerCase().replace(/\s+/g, "")}.com
          </span>
        </div>

        <div className="browser-body">
          {/* PROJECT 1: Bhavatarini Catering Service */}
          {project.theme === "bhavatarini" && (
            <div className="w-full h-full flex flex-col justify-between bg-gradient-to-br from-[#0c2217] via-[#102e21] to-[#153a2a] text-white p-3.5 select-none">
              <div className="flex items-center justify-between border-b border-[#c4a36533] pb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 relative rounded-full bg-[#c4a365] p-0.5 overflow-hidden">
                    <Image
                      src="/images/bhavatarini-chef-logo.png"
                      alt="Bhavatarini Logo"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[9px] font-heading font-bold tracking-tight text-[#dfc58e]">
                    Bhavatarini Catering Service
                  </span>
                </div>
                <span className="text-[7px] text-[#c4a365] uppercase tracking-widest font-semibold border border-[#c4a36544] px-1.5 py-0.5 rounded-full">
                  Catering
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 my-auto items-center">
                <div>
                  <div className="text-[7px] text-[#c4a365] uppercase tracking-wider font-semibold">
                    Coimbatore, TN
                  </div>
                  <div className="text-[12px] font-heading font-bold leading-tight text-white mt-0.5">
                    Traditional Taste.<br />
                    <span className="text-[#dfc58e]">Every Occasion.</span>
                  </div>
                  <p className="text-[7.5px] text-[#b3c7bc] mt-1 leading-snug line-clamp-2">
                    Homely, hygienic South Indian catering for corporate offices & events.
                  </p>
                </div>

                <div className="relative w-full h-[76px] rounded-lg overflow-hidden border border-[#c4a36533] shadow-inner">
                  <Image
                    src="/images/traditional-meals.jpg"
                    alt="Traditional Meals Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2217cc] to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[6.5px] font-semibold text-[#dfc58e] tracking-wider uppercase">
                    Traditional Feast
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[7px] text-[#8fa89b] pt-1 border-t border-[#ffffff0f]">
                <span>✓ Corporate Buffets</span>
                <span>✓ Banana Leaf Virundhu</span>
                <span className="text-[#dfc58e] font-semibold">Book Enquiry →</span>
              </div>
            </div>
          )}

          {/* PROJECT 2: Velavan Catering Service - Noticeably different full banquet feast photography presentation */}
          {project.theme === "velavan" && (
            <div className="w-full h-full relative bg-[#091a12] overflow-hidden select-none flex flex-col justify-between">
              {/* Actual Banquet Wedding Setup Screenshot Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/velavan-preview.png"
                  alt="Velavan Catering Banquet Hall Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Top brand header overlay */}
              <div className="relative z-10 bg-gradient-to-b from-[#06140ee6] to-transparent p-2.5 px-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#153d2d] border border-[#c4a365] text-[#dfc58e] text-[7.5px] font-serif font-bold flex items-center justify-center">
                    V
                  </div>
                  <span className="text-[8.5px] font-heading font-bold text-white tracking-wide">
                    Velavan Catering Service
                  </span>
                </div>
                <span className="bg-[#c4a365] text-[#0a1f16] font-bold text-[6.5px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Weddings & Feasts
                </span>
              </div>

              {/* Bottom banquet feast label & CTA overlay */}
              <div className="relative z-10 bg-gradient-to-t from-[#06140ef8] via-[#081a12d9] to-transparent p-3 pt-6 text-white">
                <div className="text-[7px] tracking-widest text-[#dfc58e] uppercase font-semibold">
                  Grand Hospitality & Banquet Virundhu
                </div>
                <div className="text-[11.5px] font-serif font-bold text-white mt-0.5 leading-tight">
                  Every Celebration Deserves a Grand Feast.
                </div>
                <div className="flex items-center justify-between text-[7px] text-[#a9c2b4] mt-1.5 pt-1 border-t border-[#ffffff15]">
                  <span>Wedding Banquets · Traditional Feasts</span>
                  <span className="text-[#dfc58e] font-semibold">View Story →</span>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT 3: Personal Portfolio Website */}
          {project.theme === "portfolio" && (
            <div className="w-full h-full flex flex-col justify-between bg-gradient-to-br from-[#090d16] via-[#0d1322] to-[#121b30] text-white p-3.5 select-none font-sans">
              <div className="flex items-center justify-between border-b border-[#ffffff12] pb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#3563f524] border border-[#3563f588] text-[#82a5ff] text-[7.5px] font-bold flex items-center justify-center">
                    KR
                  </div>
                  <span className="font-heading font-bold tracking-tight text-[9px] uppercase text-white">
                    Kaelen Ross
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] ml-1 shadow-[0_0_6px_#34d399]" title="Available for projects" />
                </div>
                <span className="text-[6.5px] font-mono tracking-wider text-[#82a5ff] uppercase bg-[#3563f518] px-1.5 py-0.5 rounded border border-[#3563f533]">
                  Concept Project
                </span>
              </div>

              <div className="my-auto py-1">
                <div className="text-[6.5px] uppercase tracking-widest text-[#8299cc] font-medium">
                  Principal Product Designer
                </div>
                <div className="text-[12.5px] font-heading font-medium tracking-tight text-white mt-0.5">
                  Designing scalable systems & <span className="text-[#82a5ff]">refined interfaces.</span>
                </div>

                {/* Case studies preview grid */}
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <div className="p-1.5 rounded bg-[#162038] border border-[#2a3a60] flex flex-col justify-between">
                    <span className="text-[7.5px] font-bold text-white leading-tight">Atlas OS</span>
                    <span className="text-[6px] text-[#76a1ff] mt-0.5">Spatial Interface</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#162038] border border-[#2a3a60] flex flex-col justify-between">
                    <span className="text-[7.5px] font-bold text-white leading-tight">Apex Core</span>
                    <span className="text-[6px] text-[#76a1ff] mt-0.5">Design System</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[7px] text-[#7b8ea8] pt-1 border-t border-[#ffffff0f]">
                <span>Selected Works (2024–2026)</span>
                <span className="text-[#82a5ff] font-medium">View Portfolio →</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
