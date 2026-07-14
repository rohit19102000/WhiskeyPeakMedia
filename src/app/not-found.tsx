import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Subtle gold glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-md">
        <span className="text-gold uppercase tracking-[0.25em] text-xs font-semibold">
          404 Error
        </span>
        <h1
          className="text-5xl md:text-6xl font-bold leading-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Page Not Found
        </h1>
        <p className="text-body text-sm md:text-base max-w-sm mx-auto leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gold text-background text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-gold-hover transition-colors duration-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
