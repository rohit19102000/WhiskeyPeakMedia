"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STUDIO_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
];

const CONNECT_LINKS = [
  { label: "Instagram", href: "https://instagram.com/whiskeypeakmedia", external: true },
  { label: "Twitter", href: "https://twitter.com/whiskeypeakmedia", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/company/whiskeypeakmedia", external: true },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          y: 40,
          opacity: 0,
          filter: "blur(12px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.06)]"
    >
      <div ref={contentRef} className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 pb-16 border-b border-[rgba(255,255,255,0.06)]">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex flex-col leading-none mb-6">
              <span
                className="text-[15px] font-bold uppercase tracking-[0.15em] text-white/80"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                WHISKEY PEAK
              </span>
              <span
                className="text-[10px] italic tracking-[0.08em] mt-[2px] text-[#C8A97E]/70"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Media
              </span>
            </div>
            <p
              className="text-[#C8C4BC] text-[14px] leading-[1.8] max-w-sm"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              We craft digital experiences that elevate brands beyond the
              ordinary. Strategy, design, and technology — distilled to
              perfection.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Studio Links */}
          <div className="md:col-span-2">
            <h4
              className="text-[11px] uppercase tracking-[0.2em] text-[#C8A97E] font-medium mb-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Studio
            </h4>
            <ul className="flex flex-col gap-4">
              {STUDIO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-[#C8C4BC] text-[14px] hover:text-[#F0EDE8] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div className="md:col-span-2">
            <h4
              className="text-[11px] uppercase tracking-[0.2em] text-[#C8A97E] font-medium mb-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Connect
            </h4>
            <ul className="flex flex-col gap-4">
              {CONNECT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8C4BC] text-[14px] hover:text-[#F0EDE8] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-2">
            <h4
              className="text-[11px] uppercase tracking-[0.2em] text-[#C8A97E] font-medium mb-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Direct
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+919876543210"
                  className="text-[#C8C4BC] text-[14px] hover:text-[#F0EDE8] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@whiskeypeak.in"
                  className="text-[#C8C4BC] text-[14px] hover:text-[#F0EDE8] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  hello@whiskeypeak.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p
            className="text-[#C8C4BC]/50 text-[12px] tracking-[0.05em]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            © {currentYear} Whiskey Peak Media. All rights reserved.
          </p>
          <p
            className="text-[#C8C4BC]/40 text-[12px] tracking-[0.1em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Design · Develop · Deploy
          </p>
          <p
            className="text-[#C8C4BC]/40 text-[12px] tracking-[0.05em]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Site by{" "}
            <span className="text-[#C8A97E]/60 hover:text-[#C8A97E] transition-colors duration-300">
              Saurabh Kedar
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
