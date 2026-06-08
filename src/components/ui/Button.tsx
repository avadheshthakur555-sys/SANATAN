"use client";

import React, { memo } from "react";
import { useSacredSound } from "@/lib/sacred-audio";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = memo<ButtonProps>(({
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  children,
  ...props
}) => {
  const { playClick } = useSacredSound();

  const handlePress = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-382 ease-divine cursor-pointer select-none outline-none ag-float ag-om-ripple active:scale-97";
  
  const variantStyles = {
    primary: "bg-[var(--accent-saffron)] text-white hover:bg-orange-600 border border-transparent shadow-[0_4px_10px_rgba(249,115,22,0.2)]",
    secondary: "bg-[var(--accent-maroon)] text-white hover:bg-red-950 border border-transparent shadow-[0_4px_10px_rgba(127,29,29,0.2)]",
    ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[rgba(212,160,23,0.06)] border border-transparent",
    gold: "bg-transparent text-[var(--accent-gold)] border border-[var(--accent-gold)] hover:bg-[rgba(212,160,23,0.08)]",
  };

  const sizeStyles = {
    sm: "px-phi-sm py-phi-xs text-phi-sm rounded-phi-sm",
    md: "px-phi-lg py-phi-md text-phi-base rounded-phi-md",
    lg: "px-phi-xl py-phi-lg text-phi-lg rounded-phi-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={handlePress}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
