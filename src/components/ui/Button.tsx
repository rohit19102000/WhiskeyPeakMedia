"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-[#C8A97E] text-[#0A0A0A] hover:bg-[#D4B88F] border border-transparent",
    outline: "bg-transparent text-[#C8A97E] border border-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#0A0A0A]",
    ghost: "bg-transparent text-[#F0EDE8] hover:bg-white/5 border border-transparent",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative uppercase tracking-widest font-medium transition-colors duration-300 rounded-sm overflow-hidden cursor-pointer",
        "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
