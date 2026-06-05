import { projectScreens } from "@/lib/mockup-assets";

export type ScreenVariant = "browser" | "mobile" | "figma";

export interface ProjectScreen {
  title: string;
  description: string;
  image: string;
  variant?: ScreenVariant;
}

export interface ProjectDetailContent {
  headline: string;
  meta: {
    timeline: string;
    platform: string;
    industry?: string;
  };
  overview: string[];
  challenge: string;
  solution: string;
  results: string[];
  deliverables: string[];
  role: string;
  techStack: string[];
  objectives: string[];
  featureScreens: ProjectScreen[];
  processSteps: { step: string; description: string }[];
}

export const projectDetails: Record<string, ProjectDetailContent> = {
  "real-estate-wordpress": {
    headline: "WordPress site for property listings and lead capture",
    meta: { timeline: "4–6 weeks", platform: "WordPress", industry: "Real estate" },
    overview: [
      "Custom WordPress build for a realty group — listing archives, detail pages, and enquiry CTAs.",
      "Focused on mobile browsing and an admin workflow the client team owns after launch.",
    ],
    objectives: ["Clear listing discovery", "Strong enquiry conversion", "Easy CMS updates"],
    challenge: "Outdated site and hard-to-update listings on mobile.",
    solution: "Custom theme, listing templates, optimized images, and SEO structure.",
    results: ["Modern agency presence", "Simpler content updates", "Mobile-ready listings"],
    deliverables: ["Custom theme", "Listing templates", "Enquiry forms", "SEO setup"],
    role: "WordPress developer",
    techStack: ["WordPress", "PHP", "ACF", "SEO"],
    featureScreens: projectScreens("real-estate-wordpress", [
      { file: "01.webp", title: "Homepage", description: "Brand entry and featured properties." },
      { file: "02.webp", title: "Listings", description: "Filterable property grid." },
      { file: "03.webp", title: "Detail & enquiry", description: "Gallery, specs, and contact CTA." },
    ]),
    processSteps: [
      { step: "Scope", description: "Listing fields and lead flows." },
      { step: "Build", description: "Theme and WordPress setup." },
      { step: "Launch", description: "Training and go-live." },
    ],
  },
  "animated-website": {
    headline: "Scroll-driven React experience with GSAP",
    meta: { timeline: "3–4 weeks", platform: "React SPA", industry: "Entertainment" },
    overview: [
      "One-page promotional site with cinematic scroll animation and React + Tailwind structure.",
    ],
    objectives: ["Impactful motion", "Stable mobile performance", "Maintainable timelines"],
    challenge: "Heavy animation without jank on mid-tier devices.",
    solution: "GSAP ScrollTrigger with scoped timelines and optimized assets.",
    results: ["Memorable visual story", "Smooth scroll sequences", "Responsive layout"],
    deliverables: ["React UI", "GSAP system", "Production deploy"],
    role: "Front-end developer",
    techStack: ["React", "GSAP", "Tailwind CSS"],
    featureScreens: projectScreens("animated-website", [
      { file: "01.webp", title: "Intro sequence", description: "Full-viewport opening beat." },
      { file: "02.webp", title: "Scroll showcase", description: "Scrubbed visual chapter." },
      { file: "03.webp", title: "Finale", description: "Closing CTA and credits." },
    ]),
    processSteps: [
      { step: "Motion plan", description: "Beat sheet and assets." },
      { step: "Develop", description: "React + GSAP wiring." },
      { step: "Polish", description: "Performance QA." },
    ],
  },
  "dating-app-figma": {
    headline: "Dating app UI — flows and component library in Figma",
    meta: { timeline: "2–3 weeks", platform: "Mobile UI", industry: "Social" },
    overview: [
      "Figma-only delivery: onboarding, profiles, discovery, and match UI with documented components.",
    ],
    objectives: ["Low-friction onboarding", "Scannable discovery", "Dev-ready handoff"],
    challenge: "Trust and clarity on dense mobile layouts.",
    solution: "Flows in FigJam, hi-fi Figma, variants, and annotated specs.",
    results: ["Cohesive UI system", "Prototype-ready flows", "Component documentation"],
    deliverables: ["Wireframes", "Hi-fi UI", "Components", "Handoff"],
    role: "UI/UX designer",
    techStack: ["Figma", "FigJam", "Prototyping"],
    featureScreens: projectScreens(
      "dating-app-figma",
      [
        { file: "01.webp", title: "Onboarding", description: "Account setup steps." },
        { file: "02.webp", title: "Profile", description: "Editable profile layout." },
        { file: "03.webp", title: "Discovery", description: "Card-based browse pattern." },
      ],
      "figma",
    ),
    processSteps: [
      { step: "Flows", description: "Core journeys mapped." },
      { step: "UI", description: "Visual system and screens." },
      { step: "Handoff", description: "Specs for developers." },
    ],
  },
  "laravel-dashboard": {
    headline: "Laravel analytics dashboard UI and modules",
    meta: { timeline: "5–8 weeks", platform: "Web app", industry: "SaaS" },
    overview: ["Internal dashboard with charts, tables, and role-aware layouts on Laravel."],
    objectives: ["Readable KPIs", "Consistent widgets", "API-backed views"],
    challenge: "Growing metrics without UI chaos.",
    solution: "Reusable chart modules and Laravel APIs for live data.",
    results: ["Unified dashboard", "Extensible widgets", "Faster insights"],
    deliverables: ["Laravel app", "Dashboard UI", "Chart modules", "APIs"],
    role: "Full-stack developer",
    techStack: ["Laravel", "PHP", "Charts", "MySQL"],
    featureScreens: projectScreens("laravel-dashboard", [
      { file: "01.webp", title: "Overview", description: "Summary KPI cards." },
      { file: "02.webp", title: "Reports", description: "Filtered tables." },
      { file: "03.webp", title: "Drill-down", description: "Single-metric view." },
    ]),
    processSteps: [
      { step: "Data map", description: "Metrics and roles." },
      { step: "Build", description: "UI + APIs." },
      { step: "Harden", description: "Permissions and QA." },
    ],
  },
  "food-app-figma": {
    headline: "Food delivery app — mobile UI designed in Figma",
    meta: { timeline: "2–3 weeks", platform: "Figma", industry: "Food delivery" },
    overview: [
      "Menu, item detail, cart, and checkout designed for mobile — the source file for Flutter implementation.",
    ],
    objectives: ["Fast menu scan", "Clear modifiers", "Checkout clarity"],
    challenge: "Peak-hour clarity for hungry users.",
    solution: "Component library with cart persistence and modifier sheets.",
    results: ["Complete order journey in Figma", "Documented components", "Ready for Flutter build"],
    deliverables: ["User flows", "Hi-fi screens", "UI kit", "Redlines"],
    role: "UI/UX designer",
    techStack: ["Figma", "Auto-layout", "Variants"],
    featureScreens: projectScreens(
      "food-app-figma",
      [
        { file: "01.webp", title: "Home", description: "Categories and featured items." },
        { file: "02.webp", title: "Item sheet", description: "Modifiers and quantity." },
        { file: "03.webp", title: "Checkout", description: "Summary and payment steps." },
      ],
      "figma",
    ),
    processSteps: [
      { step: "Flows", description: "Order journey mapped." },
      { step: "Design", description: "Screens and components." },
      { step: "Handoff", description: "Specs for Flutter dev." },
    ],
  },
  "food-app-flutter": {
    headline: "Food delivery app — Flutter mobile build",
    meta: { timeline: "4–6 weeks", platform: "Flutter / Android", industry: "Food delivery" },
    overview: [
      "Flutter screens built from the Food App Figma file — navigation, theme tokens, and core order flows.",
    ],
    objectives: ["Design parity", "Reusable widgets", "Stable navigation"],
    challenge: "Keeping UI aligned with evolving Figma during build.",
    solution: "Token-based theme and screen-by-screen parity reviews.",
    results: ["Production-oriented screen set", "Shared widget library", "Documented structure"],
    deliverables: ["Flutter screens", "Theme tokens", "Navigation", "Assets"],
    role: "Flutter developer",
    techStack: ["Flutter", "Dart", "Android"],
    featureScreens: projectScreens(
      "food-app-flutter",
      [
        { file: "01.webp", title: "Menu browse", description: "Category lists and search." },
        { file: "02.webp", title: "Cart", description: "Line items and totals." },
        { file: "03.webp", title: "Order status", description: "Confirmation and tracking placeholder." },
      ],
      "mobile",
    ),
    processSteps: [
      { step: "Setup", description: "Theme and routing." },
      { step: "Screens", description: "Implement core flows." },
      { step: "QA", description: "Design parity on devices." },
    ],
  },
  "food-app-admin": {
    headline: "Food app — restaurant & order admin panel",
    meta: { timeline: "3–5 weeks", platform: "Web admin", industry: "Food delivery" },
    overview: [
      "Web dashboard for restaurant partners: menus, orders, and status updates tied to the consumer app.",
    ],
    objectives: ["Fast order triage", "Simple menu edits", "Role-safe access"],
    challenge: "Operators need speed during busy service hours.",
    solution: "Table-based order views, menu forms, and clear status actions.",
    results: ["Operational dashboard", "Reduced manual coordination", "Scalable admin patterns"],
    deliverables: ["Admin UI", "Order views", "Menu management", "Auth roles"],
    role: "Web developer",
    techStack: ["Web app", "Dashboard UI", "REST API"],
    featureScreens: projectScreens("food-app-admin", [
      { file: "01.webp", title: "Orders queue", description: "Live order list and filters." },
      { file: "02.webp", title: "Menu editor", description: "Items, prices, availability." },
      { file: "03.webp", title: "Analytics", description: "Daily summary widgets." },
    ]),
    processSteps: [
      { step: "Requirements", description: "Roles and workflows." },
      { step: "Build", description: "Admin modules." },
      { step: "Launch", description: "Training and deploy." },
    ],
  },
  "tour-website-wordpress": {
    headline: "Tour operator site — WordPress + WooCommerce",
    meta: { timeline: "5–7 weeks", platform: "WordPress", industry: "Travel" },
    overview: ["Tour packages, WooCommerce booking, and mobile-friendly content."],
    objectives: ["Easy tour comparison", "Smooth booking", "Editor-friendly CMS"],
    challenge: "Complex packages with dates and media.",
    solution: "Custom templates and WooCommerce product setup.",
    results: ["Structured catalog", "Clear booking path", "Editable content"],
    deliverables: ["Theme", "WooCommerce setup", "Tour templates", "Checkout"],
    role: "WordPress developer",
    techStack: ["WordPress", "WooCommerce", "PHP"],
    featureScreens: projectScreens("tour-website-wordpress", [
      { file: "01.webp", title: "Tour archive", description: "Filters and cards." },
      { file: "02.webp", title: "Package page", description: "Itinerary and gallery." },
      { file: "03.webp", title: "Booking", description: "Cart and checkout." },
    ]),
    processSteps: [
      { step: "Model", description: "Tour content structure." },
      { step: "Build", description: "Theme + shop." },
      { step: "Launch", description: "Content migration." },
    ],
  },
  "it-solution-figma": {
    headline: "IT services marketing UI in Figma",
    meta: { timeline: "2–4 weeks", platform: "Figma", industry: "IT services" },
    overview: ["B2B marketing pages with modular sections for services and credibility."],
    objectives: ["Enterprise-appropriate look", "Reusable sections", "Clear CTAs"],
    challenge: "Generic IT service visual language.",
    solution: "Figma page system with service grids and contact flows.",
    results: ["Distinct brand layout", "Reusable blocks", "Responsive specs"],
    deliverables: ["Page designs", "Components", "Documentation"],
    role: "UI/UX designer",
    techStack: ["Figma", "Design system"],
    featureScreens: projectScreens(
      "it-solution-figma",
      [
        { file: "01.webp", title: "Home", description: "Hero and service entry." },
        { file: "02.webp", title: "Services", description: "Offering grid." },
        { file: "03.webp", title: "Contact", description: "Lead capture layout." },
      ],
      "figma",
    ),
    processSteps: [
      { step: "Structure", description: "Sitemap and sections." },
      { step: "Visual", description: "Desktop + mobile." },
      { step: "Handoff", description: "For Wix or dev." },
    ],
  },
  "rent-app-figma": {
    headline: "Rental marketplace — UX & UI in Figma",
    meta: { timeline: "3–4 weeks", platform: "Figma", industry: "PropTech" },
    overview: ["Renter and host journeys: search, listing detail, and dashboards."],
    objectives: ["Dual-audience clarity", "Filterable search UX", "Dashboard patterns"],
    challenge: "Two user types, one visual system.",
    solution: "Separate flows with shared components in Figma.",
    results: ["Documented journeys", "Hi-fi listing UI", "Dashboard frames"],
    deliverables: ["Flows", "UI screens", "Components"],
    role: "UI/UX designer",
    techStack: ["Figma", "UX mapping"],
    featureScreens: projectScreens(
      "rent-app-figma",
      [
        { file: "01.webp", title: "Search", description: "Filters and results." },
        { file: "02.webp", title: "Listing", description: "Detail and gallery." },
        { file: "03.webp", title: "Dashboard", description: "Account overview." },
      ],
      "figma",
    ),
    processSteps: [
      { step: "UX", description: "Renter vs host flows." },
      { step: "UI", description: "Visual design." },
      { step: "Handoff", description: "For React build." },
    ],
  },
  "rent-app-web": {
    headline: "Rental platform — React + TypeScript front end",
    meta: { timeline: "6–8 weeks", platform: "React", industry: "PropTech" },
    overview: ["Implemented listing search, detail, and account views from Figma specs."],
    objectives: ["Typed components", "Filter UX", "Design parity"],
    challenge: "Data-heavy listings on responsive layouts.",
    solution: "React structure with reusable cards and filter state.",
    results: ["Scalable UI codebase", "Consistent SaaS look", "Aligned with Figma"],
    deliverables: ["React app", "Listing components", "Dashboard views"],
    role: "Front-end developer",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    featureScreens: projectScreens("rent-app-web", [
      { file: "01.webp", title: "Results", description: "Card grid with filters." },
      { file: "02.webp", title: "Detail", description: "Specs and booking CTA." },
      { file: "03.webp", title: "Account", description: "Saved and messages." },
    ]),
    processSteps: [
      { step: "Foundation", description: "Theme and routing." },
      { step: "Features", description: "Listings and detail." },
      { step: "Polish", description: "Responsive QA." },
    ],
  },
  "restaurant-app-figma": {
    headline: "Restaurant ordering — mobile Figma UI",
    meta: { timeline: "2–3 weeks", platform: "Figma", industry: "Hospitality" },
    overview: ["Menu, modifiers, cart, and checkout for in-venue and delivery orders."],
    objectives: ["Fast category browse", "Modifier clarity", "Sticky cart pattern"],
    challenge: "Large menus under time pressure.",
    solution: "Category chips, item sheets, and persistent cart bar.",
    results: ["Full order flow designed", "Component specs", "Click-through prototype"],
    deliverables: ["Menu UI", "Cart flow", "Checkout screens"],
    role: "UI/UX designer",
    techStack: ["Figma", "Prototyping"],
    featureScreens: projectScreens(
      "restaurant-app-figma",
      [
        { file: "01.webp", title: "Menu", description: "Categories and search." },
        { file: "02.webp", title: "Customize", description: "Modifiers and notes." },
        { file: "03.webp", title: "Pay", description: "Summary and payment." },
      ],
      "figma",
    ),
    processSteps: [
      { step: "Flows", description: "Order paths." },
      { step: "UI", description: "Visual design." },
      { step: "Prototype", description: "Stakeholder review." },
    ],
  },
  "it-website-figma": {
    headline: "IT brand marketing — Figma web & mobile frames",
    meta: { timeline: "2–3 weeks", platform: "Figma", industry: "IT services" },
    overview: ["Desktop and mobile marketing designs before Wix implementation."],
    objectives: ["Credible B2B layout", "Mobile companion frames", "Section library"],
    challenge: "Brand consistency across breakpoints.",
    solution: "Auto-layout sections with tokenized type and color.",
    results: ["Complete Figma library", "Responsive frames", "Ready for Wix build"],
    deliverables: ["Desktop pages", "Mobile frames", "Style guide"],
    role: "UI/UX designer",
    techStack: ["Figma", "Responsive design"],
    featureScreens: projectScreens(
      "it-website-figma",
      [
        { file: "01.webp", title: "Desktop home", description: "Positioning and services." },
        { file: "02.webp", title: "Service page", description: "Long-form layout." },
        { file: "03.webp", title: "Mobile", description: "Stacked marketing view." },
      ],
      "figma",
    ),
    processSteps: [
      { step: "Design", description: "Pages in Figma." },
      { step: "Review", description: "Client feedback rounds." },
      { step: "Handoff", description: "Wix implementation brief." },
    ],
  },
  "it-website-wix": {
    headline: "IT brand site — built on Wix from Figma",
    meta: { timeline: "3–4 weeks", platform: "Wix", industry: "IT services" },
    overview: ["Implemented Figma marketing designs as custom Wix sections with responsive rules."],
    objectives: ["Match Figma layouts", "Editable sections", "Fast launch"],
    challenge: "Wix constraints vs free-form design.",
    solution: "Custom sections, spacing tokens, and pragmatic compromises.",
    results: ["Live marketing site", "Client-editable blocks", "Mobile tuning"],
    deliverables: ["Wix build", "Custom CSS", "Editor guide"],
    role: "Wix developer",
    techStack: ["Wix", "Custom sections", "SEO"],
    featureScreens: projectScreens("it-website-wix", [
      { file: "01.webp", title: "Live home", description: "Published homepage." },
      { file: "02.webp", title: "Inner page", description: "Service detail." },
      { file: "03.webp", title: "Mobile", description: "Phone layout." },
    ]),
    processSteps: [
      { step: "Import design", description: "Match Figma spacing." },
      { step: "Build", description: "Sections in Wix." },
      { step: "Launch", description: "SEO and handoff." },
    ],
  },
  "mackup-shopify": {
    headline: "Apparel store — Shopify theme customization",
    meta: { timeline: "4–6 weeks", platform: "Shopify", industry: "Fashion" },
    overview: ["Collection browsing, product storytelling, and mobile checkout on Shopify."],
    objectives: ["Strong product pages", "Fast variant pick", "Merchant-friendly sections"],
    challenge: "Generic theme limits for fashion storytelling.",
    solution: "Custom Liquid sections and cart UX improvements.",
    results: ["Brand-forward store", "Better mobile browse", "Editable campaigns"],
    deliverables: ["Theme sections", "Product templates", "Cart UX"],
    role: "Shopify developer",
    techStack: ["Shopify", "Liquid", "JSON templates"],
    featureScreens: projectScreens("mackup-shopify", [
      { file: "01.webp", title: "Collections", description: "Editorial headers." },
      { file: "02.webp", title: "Product", description: "Gallery and variants." },
      { file: "03.webp", title: "Checkout", description: "Mobile cart flow." },
    ]),
    processSteps: [
      { step: "Plan", description: "Sections and apps." },
      { step: "Build", description: "Liquid + products." },
      { step: "Launch", description: "Merchant training." },
    ],
  },
};

export function getProjectDetail(slug: string): ProjectDetailContent | undefined {
  return projectDetails[slug];
}
