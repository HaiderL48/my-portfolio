import type { ServiceSlug } from "@/lib/services-data";

export interface ServiceLandingContent {
  headline: string;
  subheadline: string;
  heroHighlights: string[];
  benefits: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const serviceLandingContent: Record<ServiceSlug, ServiceLandingContent> = {
  "web-development": {
    headline: "Custom websites that load fast and convert visitors",
    subheadline:
      "I design and build modern web experiences with Next.js and React — from landing pages to full applications, tuned for SEO, speed, and your business goals.",
    heroHighlights: [
      "Mobile-first & responsive",
      "SEO & performance built in",
      "Clear timelines & communication",
    ],
    benefits: [
      {
        title: "Built for speed",
        description:
          "Optimized images, smart caching, and Core Web Vitals in mind so your site ranks better and feels instant.",
      },
      {
        title: "Conversion-focused UX",
        description:
          "Layouts and CTAs structured around what you want visitors to do — enquire, buy, or book.",
      },
      {
        title: "Easy to grow",
        description:
          "Clean, documented code and scalable architecture so you can add pages and features without rebuilding.",
      },
    ],
    faqs: [
      {
        question: "How long does a typical website take?",
        answer:
          "A focused marketing site often takes 3–6 weeks depending on scope, content readiness, and revisions. Larger apps are scoped separately with a clear milestone plan.",
      },
      {
        question: "Do you work with existing designs or brands?",
        answer:
          "Yes. I can implement from your Figma files, brand guidelines, or collaborate on UI as part of the project.",
      },
      {
        question: "Will my site be easy to update?",
        answer:
          "You can choose a CMS (WordPress, headless, or Wix) or a content workflow that fits your team. I set things up so non-developers can manage day-to-day updates.",
      },
      {
        question: "Do you handle hosting and deployment?",
        answer:
          "I deploy to Vercel or your preferred host, configure domains, SSL, and basic analytics so launch is smooth.",
      },
    ],
  },
  "e-commerce": {
    headline: "E-commerce stores that turn browsers into buyers",
    subheadline:
      "Shopify and WooCommerce builds with polished product pages, trustworthy checkout, and workflows your team can run without developer help every day.",
    heroHighlights: [
      "Shopify & WooCommerce",
      "Checkout optimization",
      "Mobile shopping ready",
    ],
    benefits: [
      {
        title: "Higher conversion paths",
        description:
          "Product discovery, trust elements, and checkout flows designed to reduce drop-off and cart abandonment.",
      },
      {
        title: "Platform-fit builds",
        description:
          "The right stack for your catalog size, budget, and team — Shopify for speed to market, WooCommerce for WordPress ecosystems.",
      },
      {
        title: "Operations that scale",
        description:
          "Inventory, payments, shipping, and email integrations configured so daily store management stays simple.",
      },
    ],
    faqs: [
      {
        question: "Shopify or WooCommerce — which do you recommend?",
        answer:
          "Shopify is ideal when you want hosted infrastructure and fast launch. WooCommerce fits when you already use WordPress or need deeper custom PHP/plugin work. We choose based on your catalog, budget, and team skills.",
      },
      {
        question: "Can you migrate my existing store?",
        answer:
          "Yes. I handle product, customer, and content migration planning with minimal downtime and SEO redirects where needed.",
      },
      {
        question: "Do you customize themes or build from scratch?",
        answer:
          "Both. Theme customization is faster for MVPs; custom sections and templates give more control for brand-heavy stores.",
      },
      {
        question: "Will you optimize for mobile shoppers?",
        answer:
          "Mobile commerce is standard in every build — thumb-friendly navigation, fast product pages, and simplified checkout on small screens.",
      },
    ],
  },
  "mobile-apps": {
    headline: "Mobile apps your users will actually keep installed",
    subheadline:
      "Flutter and Android development with smooth UI, reliable backends, and store-ready releases for iOS and Google Play.",
    heroHighlights: [
      "iOS & Android from one codebase",
      "Firebase & API integration",
      "Store submission support",
    ],
    benefits: [
      {
        title: "Cross-platform efficiency",
        description:
          "Flutter lets one codebase power both platforms, cutting cost and time while keeping a native feel.",
      },
      {
        title: "Polished product UX",
        description:
          "Screens, loading states, and gestures implemented from Figma with attention to real-world usage, not just demos.",
      },
      {
        title: "Production-ready backend",
        description:
          "Auth, databases, push notifications, and APIs wired up so your app works for real users on day one.",
      },
    ],
    faqs: [
      {
        question: "Flutter or native — what do you use?",
        answer:
          "Flutter is my default for most consumer and business apps. Native Android work is available when platform-specific features require it.",
      },
      {
        question: "Can you work from my UI designs?",
        answer:
          "Yes. I implement from Figma with pixel-close layouts, or can partner with you on UI/UX if designs are not ready yet.",
      },
      {
        question: "Do you help with App Store and Play Store submission?",
        answer:
          "I prepare release builds, assets, and checklist items. You retain store accounts; I guide you through submission or assist directly.",
      },
      {
        question: "What about updates after launch?",
        answer:
          "Ongoing maintenance, bug fixes, and feature releases can be arranged on a retainer or per-sprint basis.",
      },
    ],
  },
  "ui-ux-design": {
    headline: "UI/UX design that makes complex products feel simple",
    subheadline:
      "Figma-based design from research and wireframes to high-fidelity screens — with developer-ready handoff so build matches the vision.",
    heroHighlights: [
      "User-centered flows",
      "Design systems & components",
      "Developer-ready Figma handoff",
    ],
    benefits: [
      {
        title: "Clarity before pixels",
        description:
          "User journeys and wireframes align stakeholders early, so visual design solves the right problems.",
      },
      {
        title: "Consistent design systems",
        description:
          "Reusable components, tokens, and documentation keep web and mobile experiences cohesive as you grow.",
      },
      {
        title: "Smooth handoff to dev",
        description:
          "Auto-layout, variants, and specs reduce back-and-forth so implementation stays on schedule.",
      },
    ],
    faqs: [
      {
        question: "Do you only design, or also develop?",
        answer:
          "Both. You can hire me for design-only with handoff to your team, or full design-to-build delivery on web and mobile.",
      },
      {
        question: "What deliverables do I get in Figma?",
        answer:
          "Wireframes, high-fidelity screens, prototypes for key flows, and a component library depending on project scope.",
      },
      {
        question: "How do you handle accessibility?",
        answer:
          "Contrast, typography, touch targets, and focus states follow WCAG-oriented practices so interfaces work for more users.",
      },
      {
        question: "Can you redesign an existing product?",
        answer:
          "Yes. I audit current UX pain points, propose improvements, and roll out changes in phases when needed.",
      },
    ],
  },
  "cms-integration": {
    headline: "A CMS your team can run — without breaking the site",
    subheadline:
      "WordPress, Wix, and headless CMS setups with custom themes, migrations, and editor training so content updates stay in your hands.",
    heroHighlights: [
      "WordPress & Wix expertise",
      "Content migration",
      "Editor training included",
    ],
    benefits: [
      {
        title: "Right platform choice",
        description:
          "WordPress for flexibility, Wix for speed, or headless when you need a modern front end with structured content APIs.",
      },
      {
        title: "Structured for your content",
        description:
          "Custom post types, fields, and workflows match how you actually publish — not a generic blog template.",
      },
      {
        title: "SEO-safe migrations",
        description:
          "Redirects, metadata, and URL structure preserved when moving from an old site so rankings do not tank.",
      },
    ],
    faqs: [
      {
        question: "Can non-technical staff update the site?",
        answer:
          "That is the goal. I configure the editor, roles, and training so your team can publish without touching code.",
      },
      {
        question: "Do you build custom WordPress plugins?",
        answer:
          "Yes, when off-the-shelf plugins do not fit. I also integrate WooCommerce and common marketing tools.",
      },
      {
        question: "What about Wix — is it limited?",
        answer:
          "Wix works well for many marketing and small business sites. I push customization where needed and advise when a different stack is better.",
      },
      {
        question: "Can you connect a CMS to Next.js?",
        answer:
          "Yes. Headless setups with WordPress or other APIs feeding a Next.js front end are a common pattern I implement.",
      },
    ],
  },
  "cloud-backend": {
    headline: "Backends and cloud setup that scale with your product",
    subheadline:
      "Firebase, Google Cloud, and API integrations for auth, real-time data, and business tools — secure, documented, and ready for production traffic.",
    heroHighlights: [
      "Firebase & Google Cloud",
      "Secure auth & data rules",
      "API design & integration",
    ],
    benefits: [
      {
        title: "Solid foundations",
        description:
          "Data models, auth, and environment separation planned before code so you avoid costly rewrites later.",
      },
      {
        title: "Real-time when you need it",
        description:
          "Firestore, websockets, or polling strategies chosen for your actual sync requirements — not over-engineered.",
      },
      {
        title: "Integrations that work",
        description:
          "CRM, email, maps, and payments connected with error handling and logging your team can trust.",
      },
    ],
    faqs: [
      {
        question: "Is Firebase enough for production?",
        answer:
          "For many MVPs and mid-size apps, yes — with proper security rules, indexing, and monitoring. I advise when you should move to additional services.",
      },
      {
        question: "Can you build custom REST APIs?",
        answer:
          "Yes. I design endpoints, authentication, and documentation for web and mobile clients.",
      },
      {
        question: "How do you handle security?",
        answer:
          "Role-based access, environment secrets, Firestore/Storage rules, and review of third-party scopes before go-live.",
      },
      {
        question: "Do you work with existing backends?",
        answer:
          "I can extend, debug, or integrate with APIs and cloud projects you already run.",
      },
    ],
  },
};

export function getServiceLandingContent(slug: ServiceSlug): ServiceLandingContent {
  return serviceLandingContent[slug];
}
