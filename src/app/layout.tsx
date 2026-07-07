import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Whiskey Peak Media | Premium Web Design Agency",
  description:
    "We craft digital experiences that convert. Premium website design, development, and branding for ambitious businesses. Motion-driven, performance-obsessed.",
  keywords: [
    "web design agency",
    "premium website development",
    "motion design",
    "scroll animations",
    "Next.js development",
    "brand identity",
    "UI/UX design",
    "whiskey peak media",
  ],
  openGraph: {
    title: "Whiskey Peak Media | Premium Web Design Agency",
    description:
      "Premium website design & development with cutting-edge scroll animations.",
    url: "https://whiskeypeak.in",
    siteName: "Whiskey Peak Media",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whiskey Peak Media | Premium Web Design Agency",
    description:
      "Premium website design & development with cutting-edge scroll animations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Whiskey Peak Media",
    url: "https://whiskeypeak.in",
    description:
      "Premium web design agency specializing in motion-driven digital experiences.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@whiskeypeak.in",
      contactType: "customer service",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Preloader />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
