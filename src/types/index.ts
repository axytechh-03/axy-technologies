export interface NavLink {
  label: string;
  href: string;
}

export interface CapabilityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  features?: string[];
  metrics?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ProjectConcept {
  id: string;
  category: string;
  title: string;
  tags: string;
  description: string;
  isConcept?: boolean;
  theme: "bhavatarini" | "velavan" | "portfolio";
  browserTitle: string;
  browserSubtitle: string;
  previewImage?: string;
}

export interface ImpactPillar {
  number: string;
  title: string;
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
