export interface ClientDeliverable {
  title: string;
  description: string;
  badge?: string;
  url?: string;
}

export interface ClientMetric {
  value: string;
  label: string;
}

export interface ClientReview {
  clientName: string;
  clientRole: string;
  companyName: string;
  location: string;
  rating: number;
  verified: boolean;
  date: string;
  text: string;
  highlightText: string;
}

export interface ClientProject {
  id: string;
  name: string;
  badge: string;
  category: string;
  liveUrl: string;
  tagline: string;
  overview: string;
  businessImpact: string;
  brandColors: {
    primary: string;
    accent: string;
    bgBadge: string;
    border: string;
    gradient: string;
  };
  metrics: ClientMetric[];
  deliverables: ClientDeliverable[];
  techStack: string[];
  review: ClientReview;
}

export const clientProjects: ClientProject[] = [
  {
    id: "fine-burger",
    name: "Fine Burger & Fast Food",
    badge: "Food & Hospitality SaaS",
    category: "Full-Stack Web & Multi-Portal Ecosystem",
    liveUrl: "https://www.fineburger.pk/",
    tagline: "Custom 3-Portal Direct Ordering, Kitchen KDS & Courier Dispatch Ecosystem",
    overview:
      "Fine Burger & Fast Food (Est. 1981, Lahore) needed to escape exorbitant 25–30% aggregator platform commissions (Foodpanda). I designed, engineered, and delivered a 100% owned, real-time 3-portal restaurant operating ecosystem—unifying consumer ordering, live kitchen operations, and dedicated courier logistics.",
    businessImpact:
      "Eliminated 3rd-party commission leakage on direct orders, streamlined kitchen preparation time down to under 12 minutes, and automated dispatch across in-house delivery couriers with real-time GPS coordinate pinning.",
    brandColors: {
      primary: "#D97706",
      accent: "#FFB400",
      bgBadge: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.35)",
      gradient: "from-[#FFB400]/20 via-[#D97706]/10 to-transparent",
    },
    metrics: [
      { value: "0%", label: "Aggregator Commission (100% Owned)" },
      { value: "3-in-1", label: "Synced Portals (Customer, KDS, Courier)" },
      { value: "< 100ms", label: "Live Order Synchronization" },
      { value: "30 Min", label: "Average Delivery Turnaround" },
    ],
    deliverables: [
      {
        title: "Customer PWA Ordering Platform",
        badge: "Live on fineburger.pk",
        description:
          "Progressive Web App with fast menu catalog, dynamic combo customization, interactive Lahore map address pinning, cart state persistence, and real-time live order progress.",
        url: "https://www.fineburger.pk/",
      },
      {
        title: "Kitchen Display & Admin Console (KDS)",
        badge: "Internal Operational Console",
        description:
          "Live kitchen order queue with audio buzzer alerts on new incoming orders, 1-click inventory/item toggles, courier assignment, manual order entry, and daily sales/expense analytics.",
        url: "https://fineburger-admin.vercel.app/",
      },
      {
        title: "Rider Delivery Fleet Web App",
        badge: "Mobile Dispatch Tool",
        description:
          "Mobile-first courier portal featuring shift toggles, live dispatch alerts, 1-tap WhatsApp and direct phone calls, turn-by-turn navigation, and cash-on-delivery collection reconciliation.",
        url: "https://finerider.vercel.app/",
      },
    ],
    techStack: [
      "React 19",
      "Vite",
      "Firebase Firestore",
      "Cloud Functions",
      "Tailwind CSS",
      "PWA",
      "Google Maps API",
      "Web Audio API",
    ],
    review: {
      clientName: "Muhammad Aneeb",
      clientRole: "Owner & Managing Director",
      companyName: "Fine Burger & Fast Food (Since 1981)",
      location: "Baghbanpura, Lahore",
      rating: 5,
      verified: true,
      date: "October 2026",
      highlightText: "We eliminated third-party commission cuts entirely and gained full control over our kitchen and delivery operations.",
      text: "Ammar completely transformed how we run Fine Burger. Previously, we were losing 25% to 30% on every single order to delivery aggregators. Ammar built us our own direct system from scratch: the customer website is blazing fast, the kitchen buzzer never misses an order, and our delivery boys have their own app with maps and call buttons. Order accuracy is at 100% and our customer retention has surged. Highly recommended engineer who understands real business needs.",
    },
  },
  {
    id: "grab-torque",
    name: "Grab Torque",
    badge: "Enterprise AI & Freight Logistics",
    category: "High-Performance Web Platform & 3D Interactive Design",
    liveUrl: "https://grabtorque.com/",
    tagline: "Autonomous AI Software Engineering & Elite Freight Logistics Digital Presence",
    overview:
      "Engineered the complete, ultra-luxury digital platform for Grab Torque (Dallas, TX / International)—a dual-division enterprise delivering custom autonomous AI agents and software engineering alongside nationwide freight dispatching and wholesale broker load board subscriptions.",
    businessImpact:
      "Crafted an Awwwards-tier visual language that elevated enterprise conversion, featuring an interactive 4-stage autonomous AI processing pipeline, dynamic weekly freight gross revenue tickers, real-time corridor telemetry, and responsive 3D WebGL scenes.",
    brandColors: {
      primary: "#D4AF37",
      accent: "#00F0FF",
      bgBadge: "rgba(212, 175, 55, 0.12)",
      border: "rgba(212, 175, 55, 0.35)",
      gradient: "from-[#D4AF37]/20 via-[#00F0FF]/10 to-transparent",
    },
    metrics: [
      { value: "60 FPS", label: "Butter-Smooth WebGL & Canvas" },
      { value: "Dual-Division", label: "Integrated AI & Freight Architecture" },
      { value: "< 0.05", label: "CLS (Zero Layout Shift)" },
      { value: "100%", label: "Custom Component Engineering" },
    ],
    deliverables: [
      {
        title: "Autonomous AI Software Pipeline Showcase",
        badge: "Division 1: AI & Tech",
        description:
          "Interactive 4-stage document ingestion simulation (OCR, multi-agent reasoning core, database mutations), live JSON-LD payload inspector, and 3D sentinel construction visualizer.",
        url: "https://grabtorque.com/",
      },
      {
        title: "Elite Freight Logistics & Telemetry Hub",
        badge: "Division 2: Logistics",
        description:
          "Interactive nationwide GPS freight corridors (Chicago, Dallas, Atlanta, Houston), dynamic weekly gross revenue projection slider (scaling to $12,450/wk), and trailer capacity visualizers.",
        url: "https://grabtorque.com/",
      },
      {
        title: "Carrier Subscription & Integration Portal",
        badge: "SaaS Workflow",
        description:
          "Comprehensive subscription portal integrating DAT One, Truckstop, 123Loadboard, and Sylectus wholesale feeds with automated lead qualification flows.",
        url: "https://grabtorque.com/",
      },
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Three.js",
      "GSAP ScrollTrigger",
      "Lenis Smooth Scroll",
      "Tailwind CSS",
      "Vite",
      "Lucide Icons",
    ],
    review: {
      clientName: "Awaiz & Aneeb",
      clientRole: "Co-Founders (CEO & CTO)",
      companyName: "Grab Torque",
      location: "Dallas, TX / Logistics & AI",
      rating: 5,
      verified: true,
      date: "October 2026",
      highlightText: "Ammar delivered an Awwwards-caliber digital experience that immediately established our credibility with tech clients and freight carriers.",
      text: "Working with Ammar was an absolute masterclass in frontend engineering and creative design. We needed our website to represent two distinct, complex businesses—Autonomous AI software on one hand, and high-stakes freight dispatch on the other—without confusing visitors. Ammar designed and built a breathtaking, ultra-smooth platform with custom 3D elements, interactive pipeline inspectors, and real-time calculators. He took complete ownership of the technical implementation and delivered ahead of schedule.",
    },
  },
];
