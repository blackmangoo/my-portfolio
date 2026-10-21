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
  location?: string;
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
      "Fine Burger & Fast Food (Est. 1981, Lahore) needed to eliminate high aggregator platform commissions (Foodpanda). I designed, engineered, and delivered a complete direct ordering ecosystem: customer web ordering, a real-time kitchen display system (KDS), and an in-house courier dispatch application.",
    businessImpact:
      "Eliminated 3rd-party commissions on direct orders, reduced kitchen prep time to under 12 minutes, and automated dispatch across in-house couriers with interactive address map pinning.",
    brandColors: {
      primary: "#D97706",
      accent: "#FFB400",
      bgBadge: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.35)",
      gradient: "from-[#FFB400]/20 via-[#D97706]/10 to-transparent",
    },
    metrics: [
      { value: "0%", label: "Third-Party Aggregator Cut" },
      { value: "3 Apps", label: "Customer, Kitchen KDS, Courier Fleet" },
      { value: "< 100ms", label: "Live Order Synchronization" },
      { value: "30 Min", label: "Average Delivery Turnaround" },
    ],
    deliverables: [
      {
        title: "Customer Web Ordering App",
        badge: "Live on fineburger.pk",
        description:
          "Progressive web application with dynamic combo selection, address map pinning with reverse geocoding, cart state persistence, and live order tracking.",
        url: "https://www.fineburger.pk/",
      },
      {
        title: "Kitchen Display & Admin Console (KDS)",
        badge: "Internal Operational Console",
        description:
          "Live order queue with audio buzzer alerts on incoming tickets, 1-click stock toggles, courier assignment, and daily sales/expense reporting.",
        url: "https://fineburger-admin.vercel.app/",
      },
      {
        title: "Courier Delivery Fleet App",
        badge: "Mobile Dispatch Tool",
        description:
          "Mobile-first courier portal featuring shift toggles, live order assignment alerts, 1-tap WhatsApp/calling, turn-by-turn navigation, and cash-on-delivery tracking.",
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
      clientName: "Momin",
      clientRole: "Owner & Operator",
      companyName: "Fine Burger & Fast Food (Since 1981)",
      location: "Lahore",
      rating: 5,
      verified: true,
      date: "October 2026",
      highlightText: "We gained full control over our kitchen and delivery operations, and our repeat customers love ordering directly from us.",
      text: "Ammar built our entire direct ordering platform from the ground up. Before this, third-party delivery apps were eating 25% to 30% of every order. With our own customer ordering site, kitchen display, and rider app, we have full control over our orders, delivery timing is faster, and our repeat customers love ordering directly from us. He delivered exactly what our business needed.",
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
      "Engineered the production digital platform for Grab Torque — an enterprise operating two core divisions: custom autonomous AI software development and nationwide freight logistics with wholesale broker load board subscriptions.",
    businessImpact:
      "Built a clear, high-performance web experience that communicates both technical AI capabilities and freight dispatch operations to prospective enterprise clients and carrier partners.",
    brandColors: {
      primary: "#D4AF37",
      accent: "#00F0FF",
      bgBadge: "rgba(212, 175, 55, 0.12)",
      border: "rgba(212, 175, 55, 0.35)",
      gradient: "from-[#D4AF37]/20 via-[#00F0FF]/10 to-transparent",
    },
    metrics: [
      { value: "60 FPS", label: "Three.js WebGL & Canvas Engine" },
      { value: "Dual-Division", label: "AI Software & Freight Logistics" },
      { value: "< 0.05", label: "CLS (Zero Layout Shift)" },
      { value: "100%", label: "Custom Component Architecture" },
    ],
    deliverables: [
      {
        title: "Autonomous AI Software Showcase",
        badge: "Division 1: AI & Tech",
        description:
          "Interactive 4-stage document ingestion simulation (OCR, multi-agent reasoning, database updates), live JSON payload inspector, and 3D visualizer.",
        url: "https://grabtorque.com/",
      },
      {
        title: "Freight Logistics & Telemetry Hub",
        badge: "Division 2: Logistics",
        description:
          "Interactive nationwide GPS freight corridors (Chicago, Dallas, Atlanta, Houston), dynamic weekly gross revenue calculator, and trailer capacity visualizers.",
        url: "https://grabtorque.com/",
      },
      {
        title: "Carrier Subscription Portal",
        badge: "SaaS Workflow",
        description:
          "Carrier subscription portal integrating DAT One, Truckstop, 123Loadboard, and Sylectus wholesale feeds with automated onboarding flows.",
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
      rating: 5,
      verified: true,
      date: "October 2026",
      highlightText: "Ammar delivered a fast, ultra-smooth 3D platform ahead of schedule and solved complex frontend challenges without needing hand-holding.",
      text: "Ammar took complete ownership of our web platform from day one. We needed our site to clearly separate our autonomous AI software services from our freight dispatch business without confusing visitors. Ammar delivered a fast, ultra-smooth 3D experience with custom interactive pipelines ahead of schedule. He's proactive, technical, and solved complex frontend challenges without needing hand-holding.",
    },
  },
];
