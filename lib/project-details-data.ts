import type { ScreenVariant } from "@/lib/mockup-assets";

export type { ScreenVariant };

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

const BASE = "/mockups";

function screens(
  pages: { image: string; title: string; description: string }[],
  variant: ScreenVariant = "browser",
): ProjectScreen[] {
  return pages.map((page) => ({
    title: page.title,
    description: page.description,
    image: page.image,
    variant,
  }));
}

export const projectDetails: Record<string, ProjectDetailContent> = {
  "fmb-app-flutter": {
    headline:
      "Community management mobile app — thaali orders, events, and member workflows in Flutter.",
    meta: { timeline: "6–8 weeks", platform: "Flutter / Android", industry: "Community" },
    overview: [
      "FMB App helps community members browse menus, place thaali orders, and stay updated on events from one mobile experience.",
      "Built in Flutter with reusable widgets, theme tokens, and navigation patterns tuned for daily repeat use.",
    ],
    objectives: [
      "Fast menu and order flows",
      "Clear event and announcement surfaces",
      "Maintainable Flutter architecture",
    ],
    challenge:
      "Members needed a single app for ordering and community updates — replacing scattered WhatsApp links and paper lists.",
    solution:
      "Flutter screens with shared components, Firebase-backed data hooks, and a navigation model that scales as features grow.",
    results: [
      "Unified mobile experience for members",
      "Reusable widget library for future screens",
      "Design-aligned Flutter implementation",
    ],
    deliverables: ["Flutter app", "Core flows", "Theme system", "Navigation"],
    role: "Flutter developer",
    techStack: ["Flutter", "Dart", "Android", "Firebase"],
    featureScreens: screens(
      [
        {
          image: `${BASE}/fmb/main-mokup-app.webp`,
          title: "Home & browse",
          description: "Entry point with quick access to menus and community updates.",
        },
      ],
      "mobile",
    ),
    processSteps: [
      { step: "Discovery", description: "Flows for orders, events, and roles." },
      { step: "Build", description: "Flutter screens and shared widgets." },
      { step: "Launch", description: "Device QA and store-ready build." },
    ],
  },
  "fmb-app-web": {
    headline:
      "Admin panel for community operators — orders, members, and content in React.",
    meta: { timeline: "5–7 weeks", platform: "React web app", industry: "Community" },
    overview: [
      "Web dashboard for admins to manage thaali orders, member records, and operational settings.",
      "React + TypeScript front end with Firebase integration for real-time updates.",
    ],
    objectives: [
      "Efficient order triage",
      "Role-safe admin access",
      "Responsive desk-to-tablet use",
    ],
    challenge:
      "Volunteer admins needed a fast web tool during peak order windows without a steep learning curve.",
    solution:
      "Table-first order views, filterable lists, and form patterns that mirror how operators already work.",
    results: [
      "Centralized admin workflow",
      "Reduced manual coordination",
      "Scalable React module structure",
    ],
    deliverables: ["Admin UI", "Order management", "Member views", "Auth"],
    role: "Full-stack developer",
    techStack: ["React", "TypeScript", "Node.js", "Firebase"],
    featureScreens: screens(
      [
        {
          image: `${BASE}/fmb/main-mockup-web.webp`,
          title: "Dashboard",
          description: "Overview of live orders and community activity.",
        },
      ],
      "browser",
    ),
    processSteps: [
      { step: "Scope", description: "Admin roles and data model." },
      { step: "Develop", description: "React UI + Firebase wiring." },
      { step: "Handoff", description: "Training and deploy." },
    ],
  },
  "fmb-app-product-website": {
    headline:
      "Marketing site for FMB App — positioning, features, and download CTAs on Next.js.",
    meta: { timeline: "3–4 weeks", platform: "Next.js", industry: "Community" },
    overview: [
      "Product landing site explaining the app value proposition with feature sections and clear download paths.",
      "Built with Next.js for performance, SEO, and easy content updates.",
    ],
    objectives: [
      "Clear product story",
      "Mobile-first marketing layout",
      "Fast load and SEO basics",
    ],
    challenge:
      "Prospective members and admins needed a credible web presence before installing the app.",
    solution:
      "Modular landing sections, strong hero messaging, and CTAs aligned with app store and contact flows.",
    results: [
      "Published marketing site",
      "Responsive feature storytelling",
      "SEO-ready structure",
    ],
    deliverables: ["Landing pages", "Feature sections", "CTA flows", "SEO setup"],
    role: "Front-end developer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    featureScreens: screens([
      {
        image: `${BASE}/fmb/main-mokup-landing.webp`,
        title: "Product landing",
        description: "Hero, features, and conversion-focused layout.",
      },
    ]),
    processSteps: [
      { step: "Content", description: "Messaging and section map." },
      { step: "Build", description: "Next.js pages and components." },
      { step: "Launch", description: "Analytics and go-live." },
    ],
  },
  "food-app-flutter": {
    headline: "Food delivery app — menu browse, cart, and checkout in Flutter.",
    meta: { timeline: "4–6 weeks", platform: "Flutter / Android", industry: "Food delivery" },
    overview: [
      "My Taste consumer app: category browse, item customization, cart, and order confirmation.",
      "Flutter build aligned with the product design system and reusable widget patterns.",
    ],
    objectives: ["Design parity", "Smooth cart flow", "Stable navigation"],
    challenge: "Peak-hour clarity for hungry users on mid-range Android devices.",
    solution: "Token-based theme, persistent cart state, and screen-by-screen design reviews.",
    results: [
      "Complete order journey on mobile",
      "Shared widget library",
      "Production-oriented structure",
    ],
    deliverables: ["Flutter screens", "Theme tokens", "Navigation", "Assets"],
    role: "Flutter developer",
    techStack: ["Flutter", "Dart", "Android"],
    featureScreens: screens(
      [
        {
          image: `${BASE}/food app/start-screen.webp`,
          title: "Start screen",
          description: "Brand entry and sign-in path.",
        },
        {
          image: `${BASE}/food app/set-your-taste.webp`,
          title: "Preferences",
          description: "Taste profile and personalization.",
        },
        {
          image: `${BASE}/food app/single-dish.webp`,
          title: "Item detail",
          description: "Modifiers, quantity, and add-to-cart.",
        },
        {
          image: `${BASE}/food app/order-status.webp`,
          title: "Order status",
          description: "Confirmation and tracking view.",
        },
      ],
      "mobile",
    ),
    processSteps: [
      { step: "Setup", description: "Theme and routing." },
      { step: "Screens", description: "Implement core flows." },
      { step: "QA", description: "Design parity on devices." },
    ],
  },
  "chef-app-flutter": {
    headline: "Chef-side Flutter app — kitchen queue, prep status, and order handoff.",
    meta: { timeline: "4–5 weeks", platform: "Flutter / Android", industry: "Food delivery" },
    overview: [
      "My Chef gives kitchen staff a focused mobile view of incoming orders, prep steps, and ready-for-pickup status.",
      "Paired with the My Taste consumer app as the operational counterpart in the same product family.",
    ],
    objectives: [
      "Fast order scanning in kitchen",
      "Clear status updates",
      "Minimal taps during service",
    ],
    challenge:
      "Chefs work with wet hands, noise, and time pressure — the UI had to be scannable at a glance.",
    solution:
      "Large touch targets, high-contrast status chips, and a queue-first layout with swipe-friendly actions.",
    results: [
      "Dedicated chef workflow on mobile",
      "Reduced order confusion at peak",
      "Consistent design with consumer app",
    ],
    deliverables: ["Chef Flutter app", "Order queue UI", "Status actions", "Handoff docs"],
    role: "Flutter developer",
    techStack: ["Flutter", "Dart", "Android"],
    featureScreens: screens(
      [
        {
          image: `${BASE}/food app/chef/page-1.jpg`,
          title: "Order queue",
          description: "Live incoming orders sorted by priority.",
        },
        {
          image: `${BASE}/food app/chef/page-2.jpg`,
          title: "Prep detail",
          description: "Line items, modifiers, and notes.",
        },
        {
          image: `${BASE}/food app/chef/page-3.jpg`,
          title: "In progress",
          description: "Status update during preparation.",
        },
        {
          image: `${BASE}/food app/chef/page-4.jpg`,
          title: "Ready",
          description: "Handoff and completion confirmation.",
        },
      ],
      "mobile",
    ),
    processSteps: [
      { step: "Workflow", description: "Kitchen steps mapped with stakeholders." },
      { step: "Build", description: "Flutter screens for chef roles." },
      { step: "Pilot", description: "On-device testing during service." },
    ],
  },
  "my-taste-admin": {
    headline: "Restaurant admin — menus, orders, and daily ops dashboard.",
    meta: { timeline: "3–5 weeks", platform: "Web admin", industry: "Food delivery" },
    overview: [
      "Web dashboard for restaurant partners: live orders, menu edits, and summary widgets tied to the consumer app.",
    ],
    objectives: ["Fast order triage", "Simple menu edits", "Role-safe access"],
    challenge: "Operators need speed during busy service hours.",
    solution: "Table-based order views, menu forms, and clear status actions.",
    results: [
      "Operational dashboard",
      "Reduced manual coordination",
      "Scalable admin patterns",
    ],
    deliverables: ["Admin UI", "Order views", "Menu management", "Auth roles"],
    role: "Web developer",
    techStack: ["Admin Panel", "Web App", "Dashboard", "REST API"],
    featureScreens: screens([
      {
        image: `${BASE}/food app/main-mockup-admin.webp`,
        title: "Operations hub",
        description: "Orders, menu tools, and daily summary in one view.",
      },
    ]),
    processSteps: [
      { step: "Requirements", description: "Roles and workflows." },
      { step: "Build", description: "Admin modules." },
      { step: "Launch", description: "Training and deploy." },
    ],
  },
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
    featureScreens: screens([
      {
        image: `${BASE}/alliancebaygroup/main-mockup.webp`,
        title: "Listings & detail",
        description: "Property grid, gallery, specs, and enquiry CTA.",
      },
    ]),
    processSteps: [
      { step: "Scope", description: "Listing fields and lead flows." },
      { step: "Build", description: "Theme and WordPress setup." },
      { step: "Launch", description: "Training and go-live." },
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
    featureScreens: screens(
      [
        {
          image: `${BASE}/dating app/main-mockup.webp`,
          title: "Discovery flow",
          description: "Onboarding, profiles, and card-based browse.",
        },
        {
          image: `${BASE}/dating app/mockups/dating-1.png`,
          title: "Profile & match",
          description: "Editable profile and match interaction patterns.",
        },
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
    featureScreens: screens([
      {
        image: `${BASE}/sacp/main-mockup.webp`,
        title: "Analytics overview",
        description: "KPI cards, charts, and filterable reports.",
      },
    ]),
    processSteps: [
      { step: "Data map", description: "Metrics and roles." },
      { step: "Build", description: "UI + APIs." },
      { step: "Harden", description: "Permissions and QA." },
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
    featureScreens: screens([
      {
        image: `${BASE}/european/main-mockup.webp`,
        title: "Tour catalog",
        description: "Package archive, detail pages, and booking checkout.",
      },
    ]),
    processSteps: [
      { step: "Model", description: "Tour content structure." },
      { step: "Build", description: "Theme + shop." },
      { step: "Launch", description: "Content migration." },
    ],
  },
  "ecommerce-chatbot": {
    headline: "AI-assisted ecommerce chatbot — product help and checkout guidance on Next.js.",
    meta: { timeline: "4–6 weeks", platform: "Next.js", industry: "E-commerce" },
    overview: [
      "Next.js web app with conversational UI for product discovery, FAQs, and guided purchase steps.",
      "Firebase-backed session handling with a modern, animation-friendly front end.",
    ],
    objectives: [
      "Natural product Q&A",
      "Smooth handoff to checkout",
      "Performant chat UI",
    ],
    challenge:
      "Shoppers abandon when they cannot find answers quickly — the bot had to feel helpful, not gimmicky.",
    solution:
      "Structured prompt flows, product card embeds in chat, and fallback to human contact when needed.",
    results: [
      "Interactive product assistant",
      "Reduced support friction",
      "Scalable Next.js architecture",
    ],
    deliverables: ["Chat UI", "Product cards", "Admin config", "Deploy"],
    role: "Full-stack developer",
    techStack: ["Next.js", "TypeScript", "Node.js", "Firebase"],
    featureScreens: screens([
      {
        image: `${BASE}/ecommerce-chatbot/main-mockup.webp`,
        title: "Chat experience",
        description: "Conversational product browse and guided checkout.",
      },
    ]),
    processSteps: [
      { step: "Design", description: "Chat flows and edge cases." },
      { step: "Build", description: "Next.js UI + backend hooks." },
      { step: "Tune", description: "Response quality and UX polish." },
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
    featureScreens: screens(
      [
        {
          image: `${BASE}/raj it/main-mockup.webp`,
          title: "Marketing home",
          description: "Hero, services grid, and trust sections.",
        },
      ],
      "figma",
    ),
    processSteps: [
      { step: "Structure", description: "Sitemap and sections." },
      { step: "Visual", description: "Desktop + mobile." },
      { step: "Handoff", description: "For Wix or dev." },
    ],
  },
  "print-on-demand-website": {
    headline: "Print-on-demand storefront UI — catalog, customization, and checkout in Figma.",
    meta: { timeline: "3–4 weeks", platform: "Figma", industry: "E-commerce" },
    overview: [
      "End-to-end UI for a print-on-demand brand: product catalog, design upload, preview, and checkout.",
      "Modular Figma components built for a fast handoff to development or no-code build.",
    ],
    objectives: [
      "Clear product customization",
      "Trustworthy checkout flow",
      "Reusable ecommerce components",
    ],
    challenge:
      "Users need to understand print specs and pricing before committing — dense info on clean layouts.",
    solution:
      "Step-based customization sheets, live preview frames, and a checkout summary that surfaces all fees upfront.",
    results: [
      "Complete storefront journey in Figma",
      "Documented component library",
      "Dev-ready redlines",
    ],
    deliverables: ["Catalog UI", "Customizer flows", "Checkout screens", "UI kit"],
    role: "UI/UX designer",
    techStack: ["Figma", "UI/UX", "Design system"],
    featureScreens: screens(
      [
        {
          image: `${BASE}/print-on-click/main-mockup.webp`,
          title: "Storefront",
          description: "Catalog browse and product customization entry.",
        },
      ],
      "figma",
    ),
    processSteps: [
      { step: "Research", description: "POD user expectations and flows." },
      { step: "Design", description: "Screens and component variants." },
      { step: "Handoff", description: "Specs for build team." },
    ],
  },
  "household-products-wix": {
    headline: "Constance & Danny — Wix store with custom sections and mobile checkout.",
    meta: { timeline: "3–5 weeks", platform: "Wix", industry: "Retail" },
    overview: [
      "Household products ecommerce on Wix with custom section layouts, product storytelling, and mobile-first checkout.",
    ],
    objectives: [
      "Brand-forward product pages",
      "Easy merchant edits",
      "Mobile conversion",
    ],
    challenge: "Balancing Wix editor flexibility with a bespoke brand look.",
    solution: "Custom Wix sections, spacing tokens, and product templates the client can update.",
    results: [
      "Live Wix storefront",
      "Editable campaign sections",
      "Tuned mobile checkout",
    ],
    deliverables: ["Wix build", "Custom sections", "Product templates", "Editor guide"],
    role: "Wix developer",
    techStack: ["Wix", "Custom sections", "SEO"],
    featureScreens: screens([
      {
        image: `${BASE}/constance-danny/main-mockup.webp`,
        title: "Store home",
        description: "Featured products and category entry.",
      },
    ]),
    processSteps: [
      { step: "Design match", description: "Layout and brand alignment." },
      { step: "Build", description: "Wix sections and products." },
      { step: "Launch", description: "SEO and merchant training." },
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
    techStack: ["Figma", "UX mapping", "Flutter"],
    featureScreens: screens(
      [
        {
          image: `${BASE}/aqa rent/main-mockup.webp`,
          title: "Search",
          description: "Filters and results grid.",
        },
        {
          image: `${BASE}/aqa rent/startscreen.webp`,
          title: "Onboarding",
          description: "Account setup and preferences.",
        },
        {
          image: `${BASE}/aqa rent/setting.webp`,
          title: "Settings",
          description: "Profile and notification controls.",
        },
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
    techStack: ["React", "TypeScript", "SaaS"],
    featureScreens: screens([
      {
        image: `${BASE}/aqa rent/main-mockup.webp`,
        title: "Listings",
        description: "Search results and property detail from Figma specs.",
      },
    ]),
    processSteps: [
      { step: "Foundation", description: "Theme and routing." },
      { step: "Features", description: "Listings and detail." },
      { step: "Polish", description: "Responsive QA." },
    ],
  },
  "it-website-wix": {
    headline: "Serour Designs — Wix agency site from concept to launch",
    meta: { timeline: "3–4 weeks", platform: "Wix", industry: "Creative agency" },
    overview: [
      "Agency marketing site on Wix showcasing web design and development services with portfolio entry points.",
    ],
    objectives: ["Credible agency presence", "Lead capture", "Mobile polish"],
    challenge: "Standing out among template-heavy agency sites on Wix.",
    solution: "Custom sections, typography hierarchy, and case-study CTAs wired to contact flows.",
    results: ["Live agency site", "Client-editable blocks", "Mobile-optimized layout"],
    deliverables: ["Wix build", "Custom CSS", "Portfolio links", "SEO"],
    role: "Wix developer",
    techStack: ["Wix", "Web Design", "Web Development"],
    featureScreens: screens(
      [
        {
          image: `${BASE}/serourdesign/main-mockup.webp`,
          title: "Agency home",
          description: "Services, work highlights, and contact.",
        },
      ],
      "mobile",
    ),
    processSteps: [
      { step: "Structure", description: "Sitemap and content." },
      { step: "Build", description: "Custom Wix sections." },
      { step: "Launch", description: "SEO and analytics." },
    ],
  },
  "shopaarel-shopify": {
    headline: "Shopaarel — Shopify apparel store with custom theme sections",
    meta: { timeline: "4–6 weeks", platform: "Shopify", industry: "Fashion" },
    overview: ["Collection browsing, product storytelling, and mobile checkout on Shopify."],
    objectives: ["Strong product pages", "Fast variant pick", "Merchant-friendly sections"],
    challenge: "Generic theme limits for fashion storytelling.",
    solution: "Custom Liquid sections and cart UX improvements.",
    results: ["Brand-forward store", "Better mobile browse", "Editable campaigns"],
    deliverables: ["Theme sections", "Product templates", "Cart UX"],
    role: "Shopify developer",
    techStack: ["Shopify", "Liquid", "E-Commerce"],
    featureScreens: screens([
      {
        image: `${BASE}/shopaarel/main-mockup.webp`,
        title: "Collections",
        description: "Editorial headers, product grid, and mobile checkout.",
      },
    ]),
    processSteps: [
      { step: "Plan", description: "Sections and apps." },
      { step: "Build", description: "Liquid + products." },
      { step: "Launch", description: "Merchant training." },
    ],
  },
  "shoes-store-shopify": {
    headline: "Knickgasm — Shopify footwear store with conversion-focused product pages",
    meta: { timeline: "4–5 weeks", platform: "Shopify", industry: "Fashion" },
    overview: [
      "Footwear ecommerce on Shopify with size/variant clarity, collection filters, and mobile-first checkout.",
    ],
    objectives: [
      "Clear size and variant selection",
      "Strong collection browse",
      "Fast mobile purchase path",
    ],
    challenge: "Shoe buyers need size confidence and quick comparison across styles.",
    solution: "Variant-first product templates, size guide modals, and sticky add-to-cart on mobile.",
    results: [
      "Polished Shopify storefront",
      "Improved product page clarity",
      "Merchant-ready theme sections",
    ],
    deliverables: ["Theme customization", "Product templates", "Collection pages", "Cart UX"],
    role: "Shopify developer",
    techStack: ["Shopify", "Liquid", "E-Commerce"],
    featureScreens: screens([
      {
        image: `${BASE}/knick/main-mockup.webp`,
        title: "Product browse",
        description: "Collections, variants, and checkout flow.",
      },
    ]),
    processSteps: [
      { step: "Audit", description: "Catalog and variant model." },
      { step: "Theme", description: "Liquid sections and PDP." },
      { step: "Launch", description: "QA and merchant handoff." },
    ],
  },
  "hedges-shopify": {
    headline: "Balcony Hedges — ecommerce UI design for a specialty retail brand",
    meta: { timeline: "2–3 weeks", platform: "Figma", industry: "Home & garden" },
    overview: [
      "Marketing and product UI for a balcony hedges brand — hero storytelling, product grids, and trust sections.",
    ],
    objectives: [
      "Premium product presentation",
      "Clear sizing and care info",
      "Mobile shopping layout",
    ],
    challenge: "Niche product needs education before purchase — not just a grid of SKUs.",
    solution: "Content-led product pages with benefit blocks, gallery patterns, and FAQ sections.",
    results: [
      "Complete Figma storefront UI",
      "Reusable section library",
      "Ready for Shopify build",
    ],
    deliverables: ["Home & catalog UI", "Product page frames", "Mobile layouts"],
    role: "UI/UX designer",
    techStack: ["Figma", "UI/UX", "E-Commerce"],
    featureScreens: screens(
      [
        {
          image: `${BASE}/hedges-mockup/main-mockup.webp`,
          title: "Storefront",
          description: "Hero, product grid, and conversion sections.",
        },
      ],
      "figma",
    ),
    processSteps: [
      { step: "Brand", description: "Visual direction and tone." },
      { step: "UI", description: "Pages and components." },
      { step: "Handoff", description: "Specs for Shopify dev." },
    ],
  },
  "faiz-e-husaini": {
    headline: "Faiz e Husaini — community tour and event web platform on React.",
    meta: { timeline: "5–7 weeks", platform: "React", industry: "Community / travel" },
    overview: [
      "React web app for tour packages, event listings, and member-facing content with a modern animated UI.",
      "Firebase-backed data with responsive layouts for mobile-first browsing.",
    ],
    objectives: [
      "Clear tour and event discovery",
      "Engaging visual storytelling",
      "Reliable content updates",
    ],
    challenge:
      "Community members needed one place for tours, events, and updates — replacing fragmented links.",
    solution:
      "Modular React pages, scroll-friendly sections, and admin-friendly content hooks via Firebase.",
    results: [
      "Unified community web hub",
      "Smooth animated interactions",
      "Scalable React architecture",
    ],
    deliverables: ["React app", "Tour pages", "Event modules", "CMS hooks"],
    role: "Front-end developer",
    techStack: ["React", "TypeScript", "Node.js", "Firebase"],
    featureScreens: screens([
      {
        image: `${BASE}/faiz/main-mockup.webp`,
        title: "Tour hub",
        description: "Packages, events, and community content.",
      },
    ]),
    processSteps: [
      { step: "Plan", description: "Content model and journeys." },
      { step: "Build", description: "React UI + Firebase." },
      { step: "Launch", description: "Content migration and QA." },
    ],
  },
  "refynai": {
    headline: "Refynai — AI-powered web product with modern React UI",
    meta: { timeline: "6–10 weeks", platform: "React", industry: "AI / SaaS" },
    overview: [
      "React application for an AI-focused product — dashboard views, onboarding, and data-rich panels with polished motion.",
      "Built for clarity under information density with TypeScript and Firebase integration.",
    ],
    objectives: [
      "Trustworthy AI product UI",
      "Scannable data panels",
      "Performance on long sessions",
    ],
    challenge:
      "AI products easily feel opaque — the interface had to explain state, actions, and results clearly.",
    solution:
      "Progressive disclosure in panels, consistent status language, and animation used only to guide attention.",
    results: [
      "Production-ready React UI",
      "Cohesive design system usage",
      "Maintainable typed codebase",
    ],
    deliverables: ["React app", "Dashboard UI", "Onboarding", "API integration"],
    role: "Front-end developer",
    techStack: ["React", "TypeScript", "Node.js", "Firebase"],
    featureScreens: screens([
      {
        image: `${BASE}/refyn-ai/main-mockup.webp`,
        title: "Product dashboard",
        description: "AI workflows, data views, and primary actions.",
      },
    ]),
    processSteps: [
      { step: "Discovery", description: "User jobs and data model." },
      { step: "Build", description: "React modules and APIs." },
      { step: "Refine", description: "UX polish and performance." },
    ],
  },
};

export function getProjectDetail(slug: string): ProjectDetailContent | undefined {
  return projectDetails[slug];
}
