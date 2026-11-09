import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", onClick }) => {
  return (
    <Link href="#home" className={`brand ${className}`} onClick={onClick} aria-label="AXY Technologies home">
      <svg className="brand-mark" viewBox="0 0 90 60" fill="none" aria-hidden="true">
        <path d="M4 49 31 8h17L21 49H4Z" fill="#6E9AFF" />
        <path d="m28 49 19-29 19 29H48L39 35l-7 14H28Z" fill="#fff" />
        <path d="m49 8 37 41H68L31 8h18Z" fill="#3563F5" />
      </svg>
      <span className="brand-name">
        AXY
        <small>TECHNOLOGIES</small>
      </span>
    </Link>
  );
};
