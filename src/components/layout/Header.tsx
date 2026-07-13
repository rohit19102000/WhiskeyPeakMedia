"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const handleCtaClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/5 backdrop-blur-md py-4 border-b border-white/5"
            : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3.5 leading-none select-none"
          >
            {/* Custom Monogram Monolith Logo (W & M Crossed) */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <rect
                x="15"
                y="15"
                width="70"
                height="70"
                rx="8"
                fill="none"
                stroke="var(--accent-gold)"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                transform="rotate(45 50 50)"
              />
              <path
                d="M 24 67 L 37 28 L 50 63 L 63 28 L 76 67"
                fill="none"
                stroke="var(--text-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: scrolled ? 1 : 0.85, transition: "opacity 0.5s" }}
              />
              <path
                d="M 24 33 L 37 72 L 50 37 L 63 72 L 76 33"
                fill="none"
                stroke="var(--accent-gold)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex flex-col">
              <span
                className={cn(
                  "text-[15px] font-bold uppercase tracking-[0.15em] transition-colors duration-500",
                  scrolled ? "text-white" : "text-white/80"
                )}
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                WHISKEY PEAK
              </span>
              <span
                className={cn(
                  "text-[10px] italic tracking-[0.08em] mt-[2px] transition-colors duration-500",
                  scrolled ? "text-gold" : "text-gold/70"
                )}
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Media
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={cn(
                  "relative text-[13px] uppercase tracking-[0.1em] font-medium transition-colors duration-300 group",
                  scrolled
                    ? "text-white/70 hover:text-white"
                    : "text-white/60 hover:text-white/90"
                )}
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] bg-gold transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={handleCtaClick}
            className="hidden lg:block px-7 py-2.5 bg-gold text-background text-[12px] uppercase tracking-[0.15em] font-semibold rounded-sm hover:bg-gold-hover transition-colors duration-300 cursor-pointer"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Start Project
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden relative z-50 p-2 transition-colors duration-300 cursor-pointer",
              mobileOpen ? "text-white" : scrolled ? "text-white" : "text-white/80"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-white/80 hover:text-white text-2xl uppercase tracking-[0.15em] font-medium transition-colors duration-300"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: NAV_ITEMS.length * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={handleCtaClick}
                className="mt-4 px-10 py-3.5 bg-gold text-background text-sm uppercase tracking-[0.15em] font-semibold rounded-sm hover:bg-gold-hover transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Start Project
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
