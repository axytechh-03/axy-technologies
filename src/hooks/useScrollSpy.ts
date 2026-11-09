"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 80) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Header scrolled state
      setIsScrolled(window.scrollY > 20);

      // Check if at the very top of the page
      if (window.scrollY < 120) {
        setActiveId(sectionIds[0] || "home");
        return;
      }

      // Check if near the very bottom of the page
      const docHeight = document.documentElement.scrollHeight;
      const scrollBottom = window.innerHeight + window.scrollY;
      if (scrollBottom >= docHeight - 80) {
        if (sectionIds.includes("contact")) {
          setActiveId("contact");
          return;
        }
      }

      // Find all matching elements in DOM and calculate their absolute document top
      const elements = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const docTop = rect.top + window.scrollY;
          return { id, el, docTop };
        })
        .filter((item): item is { id: string; el: HTMLElement; docTop: number } => item !== null)
        .sort((a, b) => a.docTop - b.docTop);

      if (elements.length === 0) return;

      // Current scroll line
      const scrollPosition = window.scrollY + offset + 120;

      let current = elements[0].id;
      for (const item of elements) {
        if (item.docTop <= scrollPosition) {
          current = item.id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return { activeId, isScrolled };
}
