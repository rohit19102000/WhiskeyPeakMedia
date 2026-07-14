"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Subtle gold glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-md">
        <span className="text-warm uppercase tracking-[0.25em] text-xs font-semibold">
          Runtime Error
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Something Went Wrong
        </h1>
        <p className="text-body text-sm md:text-base max-w-sm mx-auto leading-relaxed">
          An unexpected error occurred during rendering. We apologize for the inconvenience.
        </p>
        <div className="pt-6">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="md"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
