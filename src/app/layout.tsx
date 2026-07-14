import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { PRIMARY_EMAIL, PRIMARY_PHONE, SITE_URL } from "@/data/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
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
    url: SITE_URL,
    siteName: "Whiskey Peak Media",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/hero-bg.png`,
        width: 1200,
        height: 630,
        alt: "Whiskey Peak Media Hero Background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whiskey Peak Media | Premium Web Design Agency",
    description:
      "Premium website design & development with cutting-edge scroll animations.",
    images: [`${SITE_URL}/images/hero-bg.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Whiskey Peak Media",
    image: `${SITE_URL}/images/hero-bg.png`,
    url: SITE_URL,
    telephone: PRIMARY_PHONE,
    email: PRIMARY_EMAIL,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Andheri West",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400053",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.1363,
      longitude: 72.8277,
    },
    sameAs: [
      "https://instagram.com/whiskeypeakmedia",
      "https://twitter.com/whiskeypeakmedia",
      "https://linkedin.com/company/whiskeypeakmedia",
    ],
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
