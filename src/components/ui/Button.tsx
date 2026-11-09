import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "dark";
  href?: string;
  showArrow?: boolean;
  arrowChar?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  showArrow = true,
  arrowChar = "↗",
  className = "",
  children,
  ...props
}) => {
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "ghost"
      ? "btn-ghost"
      : "btn-dark";

  const content = (
    <>
      {children}
      {showArrow && <span className="arrow">{arrowChar}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("btn", variantClass, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn("btn", variantClass, className)} {...props}>
      {content}
    </button>
  );
};
