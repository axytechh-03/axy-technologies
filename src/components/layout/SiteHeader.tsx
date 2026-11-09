"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/visuals/BrandLogo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/siteData";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

export const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionIds = ["home", "about", "services", "process", "work", "contact"];
  const { activeId, isScrolled } = useScrollSpy(sectionIds, 80);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className={cn("site-header", isScrolled && "scrolled")} id="header">
      <div className="wrap nav">
        <BrandLogo onClick={closeMobileMenu} />

        {/* Desktop Navigation */}
        <nav
          className="nav-links hidden md:flex items-center gap-7 text-[14.5px] font-medium"
          id="navLinks"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const targetId = link.href.replace("#", "");
            const isActive = activeId === targetId;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn("nav-item-link", isActive && "active")}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block nav-cta-wrapper">
          <Button
            variant="primary"
            href="#contact"
            className="nav-cta"
            onClick={closeMobileMenu}
          >
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="menu-toggle md:hidden"
          id="menuToggle"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobileMenu"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobileMenu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu-pane md:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const targetId = link.href.replace("#", "");
                const isActive = activeId === targetId;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn("mobile-nav-link", isActive && "active")}
                    onClick={closeMobileMenu}
                  >
                    <span>{link.label}</span>
                    <span className="arrow text-xs text-[#6e9aff]">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 mt-2 border-t border-[#ffffff15] flex flex-col gap-3">
              <Button
                variant="primary"
                href="#contact"
                className="w-full justify-center py-3 text-sm font-semibold"
                onClick={closeMobileMenu}
              >
                Let&apos;s Talk
              </Button>
              <div className="text-center text-[11px] text-[#8994aa]">
                <a
                  href="mailto:axy.techh@gmail.com"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  axy.techh@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
