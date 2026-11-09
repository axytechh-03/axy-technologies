"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BrandLogo } from "@/components/visuals/BrandLogo";

export const SiteFooter: React.FC = () => {
  const [year, setYear] = useState<number>(2025);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setYear(new Date().getFullYear());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <BrandLogo />

        <small>
          © {year} AXY Technologies. Built with intention.
        </small>

        <div className="footer-links">
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#process">Process</Link>
          <Link href="#work">Our Work</Link>
          <Link href="#contact">Contact</Link>
          <a
            href="mailto:axy.techh@gmail.com"
            className="hover:text-white transition-colors"
          >
            axy.techh@gmail.com
          </a>
          <a
            href="https://www.instagram.com/axy_technologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            aria-label="AXY Technologies on Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>@axy_technologies</span>
          </a>
          <Link href="#home">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
};
