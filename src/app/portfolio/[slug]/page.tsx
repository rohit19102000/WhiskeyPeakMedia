import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PORTFOLIO_PROJECTS[projectIndex];
  
  // Calculate next project in a loop
  const nextProjectIndex = (projectIndex + 1) % PORTFOLIO_PROJECTS.length;
  const nextProject = PORTFOLIO_PROJECTS[nextProjectIndex];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-foreground py-24 md:py-32 px-6 flex flex-col items-center overflow-x-hidden">
      {/* ─── Back Navigation bar ─── */}
      <div className="w-full max-w-6xl flex justify-start mb-12 md:mb-16">
        <Link
          href="/#portfolio"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-medium transition-all duration-300 hover:text-foreground group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to selected works
        </Link>
      </div>

      {/* ─── Hero Header Layout ─── */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mb-16 md:mb-24">
        {/* Left Column: Metadata */}
        <div className="md:col-span-4 flex flex-col gap-6 md:sticky md:top-28">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-medium block mb-2">
              Client
            </span>
            <span className="text-foreground text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-gold/60" />
              {project.client}
            </span>
          </div>

          <div className="h-px bg-white/5 w-full" />

          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-medium block mb-2">
              Year
            </span>
            <span className="text-foreground text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold/60" />
              {project.year}
            </span>
          </div>

          <div className="h-px bg-white/5 w-full" />

          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-medium block mb-2">
              Services
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="text-xs font-medium text-gold/95 px-3 py-1 rounded-full border border-gold/15 bg-[#161616]/40"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Title and Category */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            {project.category}
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-body font-light leading-relaxed max-w-2xl mt-4">
            {project.description}
          </p>
        </div>
      </div>

      {/* ─── Hero Image Showcase ─── */}
      <div className="w-full max-w-6xl h-[45vh] md:h-[65vh] relative rounded-[32px] overflow-hidden shadow-2xl border border-white/5 mb-16 md:mb-28">
        <Image
          src={project.image}
          alt={`${project.title} Showcase Banner`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 via-transparent to-black/20" />
      </div>

      {/* ─── Narrative Content ─── */}
      <div className="w-full max-w-4xl flex flex-col gap-16 md:gap-24 mb-16 md:mb-28">
        {/* Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium flex items-center gap-2">
              <span className="text-gold/50 font-serif italic text-base">01 /</span> Challenge
            </span>
          </div>
          <div className="md:col-span-8">
            <p className="text-base md:text-lg text-body leading-relaxed font-light">
              {project.challenge}
            </p>
          </div>
        </div>

        <div className="h-px bg-white/5 w-full" />

        {/* Solution */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium flex items-center gap-2">
              <span className="text-gold/50 font-serif italic text-base">02 /</span> Solution
            </span>
          </div>
          <div className="md:col-span-8">
            <p className="text-base md:text-lg text-body leading-relaxed font-light">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="h-px bg-white/5 w-full" />

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium flex items-center gap-2">
              <span className="text-gold/50 font-serif italic text-base">03 /</span> Results
            </span>
          </div>
          <div className="md:col-span-8">
            <p className="text-base md:text-lg text-body leading-relaxed font-light">
              {project.results}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Gallery Showcase ─── */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 md:mb-32">
          {project.gallery.map((imgUrl, index) => (
            <div
              key={index}
              className="relative h-[35vh] md:h-[50vh] rounded-[32px] overflow-hidden shadow-2xl border border-white/5"
            >
              <Image
                src={imgUrl}
                alt={`${project.title} Gallery Showcase ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}

      {/* ─── CTA Footer Navigation (Next Project) ─── */}
      <div className="w-full max-w-6xl border-t border-white/5 pt-16 md:pt-24 pb-12 flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">
          Up Next
        </span>
        <Link
          href={`/portfolio/${nextProject.slug}`}
          className="group text-center flex flex-col items-center"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-none transition-colors duration-300 group-hover:text-gold"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {nextProject.title}
          </h2>
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-dim font-medium mt-6 transition-all duration-300 group-hover:text-foreground">
            View Case Study
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </main>
  );
}
