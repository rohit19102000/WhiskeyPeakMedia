export interface PortfolioProject {
  title: string;
  category: string;
  image: string;
  description: string;
  
  // Expanded fields for case studies
  slug: string;
  client: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string;
  gallery: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Welkin Tattoos",
    category: "Web Design & Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "Premium tattoo studio website with scroll-synced animations.",
    slug: "welkin-tattoos",
    client: "Welkin Tattoos Inc.",
    year: "2026",
    services: ["Web Design", "GSAP Animations", "TailwindCSS", "Next.js"],
    challenge: "Welkin Tattoos needed a digital presence that mirrored the high-end artistry of their physical studio. Their existing site was static, failed to showcase their artists' portfolios dynamically, and didn't align with their premium branding.",
    solution: "We designed a dark-themed, immersive web experience built on Next.js. We integrated custom scroll-driven GSAP animations to reveal portfolio items, built high-performance artist gallery pages, and streamlined their booking process.",
    results: "A 40% increase in online appointment inquiries within the first month of launch. Bounce rate decreased by 25%, and mobile engagement grew significantly due to responsive performance optimization.",
    gallery: [
      "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Urban Eats",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    description: "Farm-to-table restaurant ordering platform.",
    slug: "urban-eats",
    client: "Urban Eats Hospitality Group",
    year: "2025",
    services: ["UX/UI Design", "E-Commerce Platform", "API Integrations", "Next.js Development"],
    challenge: "With multiple restaurant locations, Urban Eats struggled to manage online ordering, delivery, and pickup sequences through disjointed third-party platforms. They required a unified, fast e-commerce platform.",
    solution: "We engineered a custom Next.js e-commerce platform with a streamlined single-page checkout flow. We integrated local POS systems, implemented a real-time order tracking dashboard, and optimized dynamic menus.",
    results: "Online sales increased by 35% year-over-year. Native ordering reduced reliance on third-party aggregators, saving over 15% in platform commissions per transaction.",
    gallery: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Apex Fitness",
    category: "Brand Identity & Web",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    description: "Complete brand overhaul and membership portal.",
    slug: "apex-fitness",
    client: "Apex Fitness Club",
    year: "2025",
    services: ["Brand Strategy", "Logo Design", "Membership Portal", "React Web Application"],
    challenge: "Apex Fitness was launching a premium club model but lacked a digital interface to manage memberships, personal trainer schedules, and class registrations. Their brand representation felt outdated.",
    solution: "We carried out a complete visual rebranding, establishing a sleek, minimalist identity. We then developed a progressive web application containing a custom dashboard, membership registration flow, and trainer booking calendar.",
    results: "Successfully registered 1,200 new members within the first week of portal launch. Internal staff administration hours spent on class schedules dropped by 50%.",
    gallery: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Horizon Real Estate",
    category: "UI/UX & Development",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    description: "Property listing platform with virtual tours.",
    slug: "horizon-real-estate",
    client: "Horizon Realty Group",
    year: "2026",
    services: ["UI/UX Design", "3D Virtual Tour Integration", "Map API Integration", "Custom Property CMS"],
    challenge: "Horizon Real Estate needed a high-performance property discovery portal to showcase luxury listings. Their old site was slow, not responsive, and could not handle high-resolution visual tours.",
    solution: "We built a customized, fast real estate platform. We integrated Mapbox and dynamic search queries, embedded WebGL-based virtual tour capabilities, and built an optimized serverless backend API to manage listing updates.",
    results: "Avg. visitor time on site increased by 180%. Luxury property viewings and direct broker connection clicks rose by 42% over the initial quarter.",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Nova SaaS",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    description: "Analytics dashboard for modern startups.",
    slug: "nova-saas",
    client: "Nova Analytics Corp",
    year: "2025",
    services: ["SaaS Product Design", "Frontend Engineering", "Data Visualization", "Component Design System"],
    challenge: "Nova Analytics had powerful backend analytics engines but their user interface was complex, cluttered, and had poor user retention rates due to usability friction.",
    solution: "We redesigned the interface using a modular Bento-grid design language. We engineered interactive charts and real-time visualization widgets, and established a responsive dashboard navigation system.",
    results: "Daily Active User (DAU) retention grew by 33%. Interface tasks and data query completion times dropped by over 45%, reducing customer onboarding support tickets.",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Bloom Botanics",
    category: "E-Commerce & Branding",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&q=80&w=800",
    description: "Organic skincare brand with subscription model.",
    slug: "bloom-botanics",
    client: "Bloom Botanics Wellness",
    year: "2026",
    services: ["Brand Positioning", "Packaging Mockups", "Subscription E-Commerce", "Next.js & Shopify Integration"],
    challenge: "Bloom Botanics wanted to launch a direct-to-consumer organic skincare subscription service, requiring an aesthetic brand presence and a robust subscription billing workflow.",
    solution: "We crafted an organic, warm design language with custom iconography. We then developed a headless Shopify e-commerce frontend in Next.js, integrating Recharge API payments and user account dashboards.",
    results: "Achieved over 3,000 active monthly subscribers within the initial 90 days. Checkout conversion rate exceeded 4.5% (industry benchmark average is 2.0%).",
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Whiskey Peak Studio",
    category: "Agency Identity",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    description: "Our own brand — built with the same care we give every client.",
    slug: "whiskey-peak-studio",
    client: "Whiskey Peak Media",
    year: "2026",
    services: ["Creative Direction", "Motion Design", "Full Stack Development", "SEO & Performance Hardening"],
    challenge: "As a premier creative agency, we needed a portfolio site that didn't just tell clients what we do, but actively demonstrated our capabilities in motion, speed, and premium craftsmanship.",
    solution: "We designed and engineered a custom web experience featuring complex GSAP scroll-jacking timelines, WebGL-driven details, client-side caching integrations, and structured JSON-LD SEO schema.",
    results: "Achieved a 100/100 Lighthouse performance rating. The dynamic transition animations and case studies became our highest-converting marketing asset for incoming leads.",
    gallery: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
