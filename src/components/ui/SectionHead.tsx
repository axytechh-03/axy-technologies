import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({
  eyebrow,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={cn("section-head", className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};
