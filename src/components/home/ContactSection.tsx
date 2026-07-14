"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { PRIMARY_EMAIL, PRIMARY_PHONE } from "@/data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // 1. Honeypot check
    if (formData.website) {
      // Quietly succeed to fool bots
      setStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
      return;
    }

    // 2. Client-side validation
    if (formData.name.trim().length < 2) {
      setValidationError("Please enter a valid name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setValidationError("Please enter a project description (at least 10 characters).");
      return;
    }

    setStatus("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    // Check if EmailJS environment variables are configured.
    // This is intentional and will auto-activate once real EmailJS credentials are added in .env.local
    if (!serviceId || !templateId || !publicKey) {
      setStatus("idle");
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, publicKey);
      setStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setValidationError(null);
    setFormData({ name: "", email: "", message: "", website: "" });
  };

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !leftColRef.current || !rightColRef.current)
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "center center",
          scrub: 1.5,
        },
      });

      tl.fromTo(
        leftColRef.current,
        { x: -600, opacity: 0, filter: "blur(20px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1 }
      ).fromTo(
        rightColRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputClasses =
    "w-full bg-[#0A0A0A] border border-[rgba(200,169,126,0.15)] rounded-xl px-6 py-4 text-[#F0EDE8] placeholder-[#555] outline-none transition-colors duration-300 focus:border-[#C8A97E]/40";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-40 bg-[#0A0A0A] text-[#F0EDE8] overflow-hidden relative"
    >
      {/* Subtle gold glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A97E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div ref={leftColRef}>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8A97E]/60 mb-6">
              Get In Touch
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold mb-16"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Start Your
              <br />
              Project
            </h2>

            {/* Info Cards */}
            <div className="space-y-8">
              {/* Studio Location */}
              <div className="p-6 bg-[#161616] rounded-2xl border border-[rgba(200,169,126,0.1)]">
                <h3 className="text-sm uppercase tracking-[0.2em] text-[#C8A97E] mb-3">
                  Studio Location
                </h3>
                <p className="text-[#C8C4BC] font-light leading-relaxed">
                  Whiskey Peak Media Studio
                  <br />
                  Andheri West, Mumbai
                  <br />
                  Maharashtra 400053, India
                </p>
              </div>

              {/* Direct Contact */}
              <div className="p-6 bg-[#161616] rounded-2xl border border-[rgba(200,169,126,0.1)]">
                <h3 className="text-sm uppercase tracking-[0.2em] text-[#C8A97E] mb-3">
                  Direct Contact
                </h3>
                <div className="space-y-2">
                  <a
                    href={`tel:${PRIMARY_PHONE.replace(/\s+/g, "")}`}
                    className="block text-[#C8C4BC] font-light hover:text-[#F0EDE8] transition-colors duration-300"
                  >
                    {PRIMARY_PHONE}
                  </a>
                  <a
                    href={`mailto:${PRIMARY_EMAIL}`}
                    className="block text-[#C8C4BC] font-light hover:text-[#F0EDE8] transition-colors duration-300"
                  >
                    {PRIMARY_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Form Card */}
          <div ref={rightColRef}>
            <div className="relative bg-[#161616] rounded-3xl shadow-2xl border border-[rgba(200,169,126,0.1)] p-8 md:p-12 overflow-hidden group">
              {/* Sheen hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#C8A97E] flex items-center justify-center mb-8">
                      <Check size={36} className="text-[#0A0A0A]" />
                    </div>
                    <h3
                      className="text-3xl font-bold mb-4"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      Inquiry Sent Successfully
                    </h3>
                    <p className="text-[#C8C4BC] font-light mb-10 max-w-sm">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                    <Button variant="outline" onClick={resetForm}>
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Honeypot field (hidden from screen readers and visual layouts) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm uppercase tracking-[0.15em] text-[#C8C4BC] mb-3"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm uppercase tracking-[0.15em] text-[#C8C4BC] mb-3"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm uppercase tracking-[0.15em] text-[#C8C4BC] mb-3"
                      >
                        Project Description
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your project..."
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    {validationError && (
                      <p className="text-[#E8653A] text-sm">
                        {validationError}
                      </p>
                    )}

                    {status === "error" && (
                      <p className="text-[#E8653A] text-sm">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Sending..." : "Send Inquiry"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
