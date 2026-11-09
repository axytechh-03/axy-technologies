import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { CapabilityTicker } from "@/components/sections/CapabilityTicker";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BusinessOpportunitySection } from "@/components/sections/BusinessOpportunitySection";
import { InteractiveCapabilitiesSection } from "@/components/sections/InteractiveCapabilitiesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CapabilityTicker />
        <ServicesSection />
        <BusinessOpportunitySection />
        <InteractiveCapabilitiesSection />
        <ProcessSection />
        <PortfolioSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
