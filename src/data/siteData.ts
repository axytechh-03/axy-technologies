import { NavLink, CapabilityItem, ProcessStep, ProjectConcept, ImpactPillar, FaqItem } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const TRUST_WORDS = [
  "DESIGN",
  "DEVELOPMENT",
  "MARKETING",
  "OPTIMIZATION",
  "GROWTH",
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "web-development",
    icon: "⌘",
    title: "Website development",
    description: "Fast, responsive and thoughtfully designed websites that make your business easier to discover, trust and choose.",
    linkText: "Build your website",
    linkHref: "#contact",
    features: [
      "Custom responsive architecture",
      "Next.js & modern frontend stack",
      "Core Web Vitals optimization",
      "Conversion-focused user flows"
    ],
    metrics: "< 1s page load times"
  },
  {
    id: "digital-marketing",
    icon: "↗",
    title: "Digital marketing",
    description: "Purposeful campaigns across Meta and Google that put your offer in front of the right people.",
    linkText: "Reach your audience",
    linkHref: "#contact",
    features: [
      "Meta Ads (Facebook & Instagram)",
      "Google Search & Performance Max",
      "Full-funnel audience retargeting",
      "A/B creative testing & analytics"
    ],
    metrics: "Targeted qualified ROAS"
  },
  {
    id: "seo-optimization",
    icon: "⌕",
    title: "SEO optimization",
    description: "Technical, on-page and local SEO foundations that help customers find you when it matters.",
    linkText: "Improve visibility",
    linkHref: "#contact",
    features: [
      "Technical site audit & structured data",
      "High-intent keyword architecture",
      "Local Google Business Profile optimization",
      "Semantic content recommendations"
    ],
    metrics: "Organic search momentum"
  },
  {
    id: "brand-creative",
    icon: "✳",
    title: "Brand & creative",
    description: "Consistent visual identities and social content that give your business a distinctive voice.",
    linkText: "Shape your brand",
    linkHref: "#contact",
    features: [
      "Visual identity & design systems",
      "Brand messaging & positioning",
      "High-converting ad creative",
      "Social media assets & guidelines"
    ],
    metrics: "Distinct brand presence"
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "We learn about your business, audience and goals.",
  },
  {
    step: "02",
    title: "Plan",
    description: "We shape the right strategy, scope and direction.",
  },
  {
    step: "03",
    title: "Create",
    description: "We design and develop with care and purpose.",
  },
  {
    step: "04",
    title: "Launch",
    description: "We test, refine and prepare your solution to go live.",
  },
  {
    step: "05",
    title: "Improve",
    description: "We learn from performance and identify what's next.",
  },
];

export const PROJECTS: ProjectConcept[] = [
  {
    id: "bhavatarini-catering",
    category: "Catering Website / Business Website",
    title: "Bhavatarini Catering Service",
    description:
      "A responsive catering business website designed and developed for Bhavatarini Catering Service. Built with a signature royal-green and warm gold visual identity, showcasing traditional South Indian culinary menus, corporate catering packages, and a streamlined enquiry flow.",
    tags: "Royal-green & gold identity · Menu presentation · Enquiry flows",
    theme: "bhavatarini",
    browserTitle: "Bhavatarini Catering",
    browserSubtitle: "Good Food. Beautifully Served.",
    isConcept: false,
    previewImage: "/images/traditional-meals.jpg",
  },
  {
    id: "velavan-catering",
    category: "Catering Website / Brand Experience",
    title: "Velavan Catering Service",
    description:
      "A dedicated digital brand experience created for Velavan Catering Service. Highlights grand wedding celebration feasts, South Indian banana leaf virundhu traditions, and an intuitive banquet reservation journey.",
    tags: "Brand storytelling · Grand feast presentation · Luxury hospitality UI",
    theme: "velavan",
    browserTitle: "Velavan Catering",
    browserSubtitle: "Grand Feasts, Timeless Hospitality",
    isConcept: false,
    previewImage: "/images/velavan-preview.png",
  },
  {
    id: "personal-portfolio",
    category: "Personal Portfolio / Creative Website",
    title: "Kaelen Ross — Personal Portfolio",
    description:
      "A contemporary personal portfolio concept designed for an independent product designer and creative director. Demonstrates editorial dark-mode aesthetics, interactive case study showcases, spatial typography, and refined interaction design.",
    tags: "Interaction design · Creative engineering · Personal brand",
    theme: "portfolio",
    browserTitle: "Kaelen Ross Studio",
    browserSubtitle: "Principal Product Designer & Technologist",
    isConcept: true,
  },
];

export const IMPACT_PILLARS: ImpactPillar[] = [
  {
    number: "01",
    title: "Clear communication and project visibility",
    description: "Transparent roadmaps, scheduled updates, and direct access to the team working on your product.",
  },
  {
    number: "02",
    title: "Responsive experiences across devices",
    description: "Engineered pixel-perfect on mobile, tablet, and widescreen desktops for flawless retention.",
  },
  {
    number: "03",
    title: "Search-friendly technical foundations",
    description: "Clean HTML semantics, schema markup, and speed metrics built from line one.",
  },
  {
    number: "04",
    title: "Performance-aware campaign thinking",
    description: "Every dollar and visual designed to convert attention into qualified pipeline inquiries.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does AXY Technologies approach new client partnerships?",
    answer:
      "We begin with a discovery dialogue to understand your current positioning, revenue goals, and target demographic. Rather than offering one-size-fits-all packages, we assemble a focused roadmap combining engineering, creative, and performance marketing tailored specifically to your stage of growth.",
  },
  {
    question: "Can we combine website development with marketing and SEO?",
    answer:
      "Yes, that is our primary strength as a connected digital partner. When your website architecture is designed from day one to align with your paid campaigns and organic search strategy, you avoid conversion leaks and achieve significantly higher return on investment.",
  },
  {
    question: "What is the typical timeline for a complete digital project?",
    answer:
      "Most core web and digital launch projects run between 3 to 6 weeks, structured across our five-stage framework: Discover, Plan, Create, Launch, and Improve. We operate in transparent weekly sprints so you see tangible progress at every milestone.",
  },
  {
    question: "How do you track, optimize, and report campaign performance?",
    answer:
      "We implement comprehensive event telemetry across Google Analytics 4, Meta Conversions API, and custom conversion tracking dashboards. You receive transparent weekly and monthly reporting highlighting tangible business metrics — lead inquiries, conversion rates, and acquisition costs.",
  },
  {
    question: "Do you offer ongoing post-launch maintenance and support?",
    answer:
      "Yes. Once your solution goes live, we provide continuous monitoring, hosting optimization, technical maintenance, security patching, and iterative feature enhancements to ensure your platform keeps pacing your business growth.",
  },
];
