# AXY Technologies — Next.js Application

A high-performance Next.js production frontend for **AXY Technologies** ("Build. Market. Grow."), reconstructed faithfully from the original AXY design specification.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & CSS3 Keyframes
- **Icons**: SVG & Lucide React
- **Typography**: Google Fonts (`DM Sans` & `Space Grotesk`)

---

## Website Sections Implemented

1. **Navigation (`SiteHeader`)**:
   - Fixed navbar with dynamic scroll-blur backdrop (`#080d1be8`, 18px blur).
   - Custom SVG brand mark with facet polygons and dual-tier typography.
   - Active scroll-spy state mapping for desktop navigation.
   - Responsive mobile navigation drawer with hamburger / close toggle.

2. **Hero (`HeroSection`)**:
   - Radial blue atmospheric background glows & masked 72px grid overlay.
   - Dual-tier kicker: `TECHNOLOGY · CREATIVITY · GROWTH`.
   - Typographic hierarchy: `Build. Market. Grow.` with blue gradient clipping.
   - Live status indicator with emerald pulsing halo.
   - **Hero Visual Stage**:
     - 3D perspective stage with mouse-responsive tilt tracking.
     - Dual continuous orbital rings (22s and 32s reverse rotation) with glowing nodes.
     - Central glassmorphic card (42px radius, dual inner borders, levitation keyframe float).
     - Multi-faceted geometric AXY logo (Light blue, white, deep blue, energetic orange).
     - 4 Floating service badges (`Web development`, `Digital marketing`, `SEO strategy`, `Creative design`).
     - Ambient orbital shadow rings & scroll cue indicator.

3. **Capability Ticker (`CapabilityTicker`)**:
   - Continuous horizontal capability marquee seamlessly cycling `DESIGN`, `DEVELOPMENT`, `MARKETING`, `OPTIMIZATION`, `GROWTH`.

4. **Services (`ServicesSection`)**:
   - 4 Interactive capability cards with corner radial expanding glow circles on hover.
   - Bottom conversion banner (`cap-foot`) with primary CTA.

5. **Business Opportunity (`BusinessOpportunitySection`)**:
   - 4 Strategic impact pillars highlighting communication, responsiveness, technical SEO, and performance campaigns.

6. **About / Manifesto (`AboutSection`)**:
   - "Good work should do more than look good." narrative.
   - Glowing manifesto visual badge (`Think clearly. Build boldly.`) with concentric orbital rings.

7. **Interactive Capabilities (`InteractiveCapabilitiesSection`)**:
   - Tabbed capability explorer across the 4 key service pillars.
   - Live interactive preview screen with simulated architecture code, live ROAS telemetry, Core Web Vitals gauges, and design tokens.

8. **Process (`ProcessSection`)**:
   - 5-step horizontal connected progression (`01 Discover`, `02 Plan`, `03 Create`, `04 Launch`, `05 Improve`).
   - Connected gradient trajectory line adapting to vertical track on mobile devices.

9. **Portfolio / Concepts (`PortfolioSection`)**:
   - 3 Curated digital concepts with interactive browser mockups and un-tilt hover transitions:
     1. Food & hospitality experience
     2. Campaign insights dashboard with 7 animated vertical metric bars
     3. Modern furniture storefront with minimalist furniture asset

10. **FAQ (`FaqSection`)**:
    - Animated accordion with smooth height transitions and accessible expand/collapse triggers.

11. **Contact (`ContactSection`)**:
    - Night navy container with concentric background ambient rings.
    - Official contact points (email, location in Coimbatore, capabilities).
    - Interactive form with pre-filled `mailto:` generator and status feedback.

12. **Footer (`SiteFooter`)**:
    - Dark bottom strip, brand mark, dynamic copyright year, and smooth scroll-to-top handler.

---

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v22.20.0)
- npm 9+

### Installation

```bash
cd axy-technologies
npm install
```

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build and verify the optimized production bundle:

```bash
npm run build
npm run start
```

### Linting & Type Checking

```bash
npm run lint
npx tsc --noEmit
```
