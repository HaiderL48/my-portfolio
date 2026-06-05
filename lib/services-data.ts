import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Smartphone,
  Palette,
  ShoppingCart,
  Layers,
  Cloud,
} from "lucide-react";
import { Category, portfolioItems, type PortfolioItem } from "@/lib/portfolio-data";

export type ServiceSlug =
  | "web-development"
  | "e-commerce"
  | "mobile-apps"
  | "ui-ux-design"
  | "cms-integration"
  | "cloud-backend";

export interface ServiceDefinition {
  slug: ServiceSlug;
  icon: LucideIcon;
  title: string;
  tagline: string;
  summary: string;
  overview: string[];
  offerings: string[];
  technologies: string[];
  process: { step: string; description: string }[];
  relatedCategories: Category[];
  relatedProjectSlugs?: string[];
}

export const services: ServiceDefinition[] = [
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Development",
    tagline: "Fast, scalable websites that turn visitors into customers.",
    summary:
      "Custom websites built with Next.js, React, and modern tooling — optimized for speed, SEO, and long-term maintainability.",
    overview: [
      "I build production-ready websites from marketing landing pages to complex web applications. Every project starts with clear goals: who visits, what they should do, and how the site supports your business.",
      "Performance is non-negotiable. I use Next.js for server rendering and static generation where it matters, lazy-load media, and keep Core Web Vitals in the green so Google and real users both benefit.",
      "Whether you need a brand-new build or a redesign of an existing site, you get responsive layouts, accessible components, and clean code your team can extend later.",
    ],
    offerings: [
      "Custom marketing and corporate websites",
      "Next.js & React application development",
      "Landing pages with conversion-focused UX",
      "GSAP and scroll-driven animations",
      "SEO setup, metadata, and sitemap configuration",
      "Performance audits and optimization",
      "Deployment on Vercel or your preferred host",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Laravel",
      "Vercel",
    ],
    process: [
      {
        step: "Discover",
        description:
          "We align on audience, pages, features, and success metrics before any design or code.",
      },
      {
        step: "Design & build",
        description:
          "Layouts are prototyped, then implemented with reusable components and your brand system.",
      },
      {
        step: "Launch & support",
        description:
          "Testing across devices, analytics hookup, deployment, and handoff documentation.",
      },
    ],
    relatedCategories: ["web"],
    relatedProjectSlugs: [
      "animated-website",
      "laravel-dashboard",
      "rent-app-web",
      "food-app-admin",
      "mackup-shopify",
    ],
  },
  {
    slug: "e-commerce",
    icon: ShoppingCart,
    title: "E-Commerce",
    tagline: "Online stores engineered to sell — not just look good.",
    summary:
      "Shopify stores and WooCommerce setups with smooth checkout, clear product presentation, and conversion-focused flows.",
    overview: [
      "E-commerce is where design meets revenue. I focus on product discovery, trust signals, and checkout paths that reduce friction so more carts complete.",
      "For Shopify, I customize themes, build sections with Liquid, and integrate apps for reviews, subscriptions, or shipping. For WordPress, I deliver WooCommerce stores with custom product templates and payment gateways.",
      "From catalog structure to mobile shopping experience, every decision supports higher conversion and easier day-to-day management for your team.",
    ],
    offerings: [
      "Shopify theme customization and section development",
      "WooCommerce store setup and custom themes",
      "Product page and collection templates",
      "Cart, checkout, and payment flow optimization",
      "App integrations (reviews, email, inventory)",
      "Migration from other platforms",
      "Speed and mobile commerce improvements",
    ],
    technologies: [
      "Shopify",
      "Liquid",
      "WooCommerce",
      "WordPress",
      "Stripe",
      "Klarna / PayPal integrations",
    ],
    process: [
      {
        step: "Store strategy",
        description:
          "Catalog structure, customer journey, and platform choice (Shopify vs WooCommerce).",
      },
      {
        step: "Build & integrate",
        description:
          "Theme work, product imports, payments, shipping, and essential apps.",
      },
      {
        step: "Optimize & grow",
        description:
          "Launch checklist, analytics, and iteration on product pages and checkout.",
      },
    ],
    relatedCategories: ["shopify", "wordpress"],
    relatedProjectSlugs: [
      "real-estate-wordpress",
      "tour-website-wordpress",
      "mackup-shopify",
    ],
  },
  {
    slug: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    tagline: "Native-feel apps for iOS and Android from a single codebase.",
    summary:
      "Cross-platform Flutter apps and Android builds with polished UI, reliable performance, and backend connectivity.",
    overview: [
      "Mobile users expect speed, clarity, and offline-friendly experiences. I develop Flutter apps that share one codebase across iOS and Android while still feeling native on each platform.",
      "Projects range from consumer apps (food delivery, rentals, social) to business tools with dashboards and real-time data. UI is implemented from Figma specs with attention to gestures, loading states, and empty screens.",
      "I integrate Firebase, REST APIs, and third-party SDKs for auth, push notifications, maps, and payments so your app is ready for real users—not just demo builds.",
    ],
    offerings: [
      "Flutter cross-platform app development",
      "Android native features and store submission support",
      "UI implementation from Figma designs",
      "API and Firebase backend integration",
      "Authentication, push notifications, and deep linking",
      "App performance profiling and bug fixing",
      "Maintenance and feature releases",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Android",
      "Firebase",
      "REST APIs",
      "Figma",
    ],
    process: [
      {
        step: "Scope & UX",
        description:
          "User flows, screens, and MVP feature list defined with wireframes or Figma.",
      },
      {
        step: "Develop & test",
        description:
          "Iterative builds on iOS/Android simulators and physical devices.",
      },
      {
        step: "Ship",
        description:
          "Store assets, release builds, and post-launch monitoring setup.",
      },
    ],
    relatedCategories: ["app"],
    relatedProjectSlugs: ["food-app-flutter", "restaurant-app-figma"],
  },
  {
    slug: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    tagline: "Interfaces people understand on the first tap or click.",
    summary:
      "Research-informed UI/UX in Figma — from wireframes to high-fidelity screens and developer-ready handoff.",
    overview: [
      "Great products start with clarity. I map user journeys, reduce cognitive load, and design interfaces that guide people toward their goals without confusion.",
      "In Figma I deliver wireframes, design systems, component libraries, and responsive layouts for web and mobile. Typography, spacing, and color follow accessible contrast rules and your brand voice.",
      "Designs are structured for smooth developer handoff: auto-layout, variants, and documentation so implementation matches the vision pixel-close.",
    ],
    offerings: [
      "User flow and wireframe creation",
      "High-fidelity UI design for web and mobile",
      "Design systems and component libraries",
      "Prototyping and interaction specs",
      "Usability-focused layout and typography",
      "Design-to-development handoff in Figma",
      "Landing page and dashboard UI",
    ],
    technologies: [
      "Figma",
      "FigJam",
      "Design tokens",
      "Prototyping",
      "Accessibility (WCAG basics)",
    ],
    process: [
      {
        step: "Research",
        description:
          "Understand users, competitors, and constraints before opening Figma.",
      },
      {
        step: "Design",
        description:
          "Wireframes → visual design → prototype for key flows.",
      },
      {
        step: "Handoff",
        description:
          "Specs, assets, and walkthrough with developers or stakeholders.",
      },
    ],
    relatedCategories: ["uiux"],
    relatedProjectSlugs: [
      "dating-app-figma",
      "food-app-figma",
      "it-solution-figma",
      "rent-app-figma",
      "restaurant-app-figma",
      "it-website-figma",
    ],
  },
  {
    slug: "cms-integration",
    icon: Layers,
    title: "CMS Integration",
    tagline: "Content you control — without fighting your website.",
    summary:
      "WordPress, Wix, and headless CMS setups so your team can publish and update content confidently.",
    overview: [
      "Not every project needs a custom admin. I integrate CMS platforms that match your team's skills and budget—WordPress for flexibility, Wix for speed, or headless setups when you need content APIs for a modern front end.",
      "Custom themes, plugins, and migrations are handled end-to-end: hosting guidance, SEO-friendly URLs, custom post types, and editor training so non-technical users stay independent.",
      "Whether you're launching a blog, agency site, or tour operator portal, the CMS is configured for your real content structure—not a generic demo.",
    ],
    offerings: [
      "WordPress custom themes and plugins",
      "Wix site builds and advanced customization",
      "WooCommerce and content-type setup",
      "Content migration from old sites",
      "Editor workflows and role permissions",
      "SEO-friendly URL and schema setup",
      "Headless CMS integration with Next.js",
    ],
    technologies: [
      "WordPress",
      "Wix",
      "WooCommerce",
      "PHP",
      "Next.js (headless)",
      "ACF / custom fields",
    ],
    process: [
      {
        step: "Audit",
        description:
          "Review existing content, platform limits, and team editing needs.",
      },
      {
        step: "Build",
        description:
          "Theme or site structure, migrations, and plugin configuration.",
      },
      {
        step: "Train & launch",
        description:
          "Documentation and walkthrough so your team owns updates day one.",
      },
    ],
    relatedCategories: ["wordpress", "wix"],
    relatedProjectSlugs: [
      "real-estate-wordpress",
      "tour-website-wordpress",
      "it-website-wix",
    ],
  },
  {
    slug: "cloud-backend",
    icon: Cloud,
    title: "Cloud & Backend",
    tagline: "Reliable infrastructure behind your app or site.",
    summary:
      "Firebase, Google Cloud, and API integrations that keep data secure, synced, and scalable.",
    overview: [
      "Front ends need dependable backends. I set up Firebase Authentication, Firestore, Cloud Functions, and storage for mobile and web apps that need real-time data or user accounts.",
      "Google Cloud and Zoho integrations connect your product to email, CRM, analytics, and business workflows. APIs are documented and error-handled so client apps behave predictably under load.",
      "From MVP backends to production hardening—security rules, environment separation, and monitoring—you get infrastructure that grows with usage instead of breaking at launch.",
    ],
    offerings: [
      "Firebase Auth, Firestore, and Cloud Functions",
      "REST API design and integration",
      "Google Cloud service setup",
      "Zoho CRM and automation hooks",
      "Real-time sync for mobile and web clients",
      "Security rules and environment configuration",
      "Third-party API integrations (maps, payments, email)",
    ],
    technologies: [
      "Firebase",
      "Google Cloud",
      "Zoho",
      "Node.js",
      "REST / webhooks",
      "Firestore security rules",
    ],
    process: [
      {
        step: "Architecture",
        description:
          "Data model, auth model, and integration map before implementation.",
      },
      {
        step: "Implement",
        description:
          "Backend services, client SDK wiring, and staging environment tests.",
      },
      {
        step: "Harden",
        description:
          "Security review, monitoring, and deployment runbooks.",
      },
    ],
    relatedCategories: ["app", "web"],
    relatedProjectSlugs: ["food-app-flutter", "food-app-admin", "laravel-dashboard"],
  },
];

export const serviceSlugs: ServiceSlug[] = services.map((s) => s.slug);

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return serviceSlugs.includes(slug as ServiceSlug);
}

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}

export function getProjectsForService(service: ServiceDefinition): PortfolioItem[] {
  if (service.relatedProjectSlugs?.length) {
    const bySlug = new Map(portfolioItems.map((p) => [p.slug, p]));
    return service.relatedProjectSlugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is PortfolioItem => Boolean(p));
  }

  return portfolioItems.filter((item) =>
    service.relatedCategories.some((cat) => item.category.includes(cat)),
  );
}
