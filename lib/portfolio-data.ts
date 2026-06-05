export type Category =
  | "web"
  | "app"
  | "uiux"
  | "wordpress"
  | "shopify"
  | "wix"
  | "nextjs"
  | "nodejs"
  | "all";

export type MockupType = "browser" | "phone" | "tablet" | "desktop";

export type ProjectDiscipline =
  | "figma"
  | "flutter"
  | "web"
  | "react"
  | "nextjs"
  | "nodejs"
  | "shopify"
  | "wordpress"
  | "wix"
  | "laravel"
  | "admin"
  | "gsap";

export const disciplineLabels: Record<ProjectDiscipline, string> = {
  figma: "Figma UI/UX",
  flutter: "Flutter App",
  web: "Web Development",
  react: "React / TypeScript",
  nextjs: "Next.js",
  nodejs: "Node.js",
  shopify: "Shopify",
  wordpress: "WordPress",
  wix: "Wix",
  laravel: "Laravel",
  admin: "Admin Panel",
  gsap: "GSAP & React",
};

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  image?: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  groupId: string;
  groupTitle: string;
  discipline: ProjectDiscipline;
  title: string;
  description: string;
  category: Category[];
  image: string;
  webImage?: string;
  mobileImage?: string;
  tags: string[];
  link?: string;
  mockupType: MockupType;
  accentColor: string;
  testimonial?: Testimonial;
  featured?: boolean;
}

export const categories: {
  value: Exclude<Category, "all">;
  label: string;
  color: string;
}[] = [
  { value: "web", label: "Web Development", color: "from-blue-600 to-blue-800" },
  { value: "app", label: "App Development", color: "from-purple-600 to-purple-800" },
  { value: "uiux", label: "UI/UX Design", color: "from-pink-600 to-pink-800" },
  { value: "wordpress", label: "WordPress", color: "from-cyan-600 to-cyan-800" },
  { value: "shopify", label: "Shopify", color: "from-green-600 to-green-800" },
  { value: "wix", label: "Wix", color: "from-orange-600 to-orange-800" },
  { value: "nextjs", label: "Next.js", color: "from-green-600 to-green-800" },
  { value: "nodejs", label: "Node.js", color: "from-yellow-600 to-yellow-800" },
];

export const getCategoryColor = (category: Exclude<Category, "all">): string => {
  const cat = categories.find((c) => c.value === category);
  return cat ? cat.color : "from-slate-600 to-slate-800";
};

const BASE = "/mockups";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "8",
    slug: "fmb-app-flutter",
    groupId: "fmb-app",
    groupTitle: "FMB App",
    discipline: "flutter",
    title: "FMB App — Flutter",
    description:
      "FMB App is a Community management app UI in Flutter: menu browse, item modifiers, cart, and checkout flows for mobile.",
    category: ["app"],
    image: `${BASE}/fmb/main-mokup-app.webp`,
    tags: ["Flutter", "Dart", "Android"],
    mockupType: "phone",
    accentColor: "#9333ea",
    featured: true,
  },
  {
    id: "8",
    slug: "fmb-app-web",
    groupId: "fmb-admin-panel",
    groupTitle: "FMB App",
    discipline: "react",
    title: "FMB Admin Panel — React Web",
    description:
      "FMB Admin Panel is a Community management app UI in React: menu browse, item modifiers, cart, and checkout flows for web.",
    category: ["app"],
    image: `${BASE}/fmb/main-mockup-web.webp`,
    tags: ["React", "TypeScript", "Web","Node.js", "Firebase"],
    mockupType: "phone",
    accentColor: "#9333ea",
  },
  {
    id: "8",
    slug: "fmb-app-product-website",
    groupId: "fmb-product-website",
    groupTitle: "FMB App",
    discipline: "react",
    title: "FMB Product Website — Next.js Web",
    description:
      "FMB Product Website is a Community management app UI in Next.js: menu browse, item modifiers, cart, and checkout flows for web.",
    category: ["web"],
    image: `${BASE}/fmb/main-mokup-landing.webp`,
    tags: ["Next.js", "TypeScript", "Web","Node.js", "Firebase"],
    mockupType: "phone",
    accentColor: "#9333ea",
  },
  {
    id: "4a",
    slug: "food-app-flutter",
    groupId: "food-app",
    groupTitle: "My Taste",
    discipline: "flutter",
    title: "My Taste — Flutter",
    description:
      "My Taste is a food delivery app UI in Flutter: menu browse, item modifiers, cart, and checkout flows for mobile.",
    category: ["uiux"],
    image: `${BASE}/food app/main-mockup.webp`,
    tags: ["Flutter", "Dart", "Android"],
    mockupType: "phone",
    accentColor: "#06b6d4",

  },
  {
    id: "4b",
    slug: "chef-app-flutter",
    groupId: "food-app",
    groupTitle: "My Chef",
    discipline: "flutter",
    title: "My Chef — Flutter",
    description:
      "My Chef is a food delivery app UI in Flutter: menu browse, item modifiers, cart, and checkout flows for mobile.",
    category: ["app"],
    image: `${BASE}/food app/main-mockup-chef.webp`,
    tags: ["Flutter", "Dart", "Android"],
    mockupType: "phone",
    accentColor: "#06b6d4",
    featured: false,
  },
  {
    id: "4c",
    slug: "my-taste-admin",
    groupId: "food-app",
    groupTitle: "My Taste",
    discipline: "admin",
    title: "My Taste — Admin Panel",
    description:
      "Web admin for restaurants and orders: menu management, order status, and operational dashboards.",
    category: ["web"],
    image: `${BASE}/food app/main-mockup-admin.webp`,
    tags: ["Admin Panel", "Web App", "Dashboard"],
    mockupType: "browser",
    accentColor: "#06b6d4",
  },
  {
    id: "0",
    slug: "real-estate-wordpress",
    groupId: "real-estate",
    groupTitle: "Real Estate",
    discipline: "wordpress",
    title: "Alliance Bay Realty Group — WordPress",
    description:
      "Property listing website on WordPress with enquiry flows, mobile-friendly listings, and an admin the client team can update daily.",
    category: ["wordpress"],
    image: `${BASE}/alliancebaygroup/main-mockup.webp`,
    tags: ["WordPress", "PHP", "Listings"],
    mockupType: "browser",
    accentColor: "#2563eb",
    featured: true,
  },
  // {
  //   id: "1",
  //   slug: "animated-website",
  //   groupId: "animated-website",
  //   groupTitle: "Animated Website",
  //   discipline: "gsap",
  //   title: "Animated Website — React & GSAP",
  //   description:
  //     "Cinematic anime-inspired one-pager with scroll-driven GSAP animation, React, and Tailwind CSS.",
  //   category: ["web"],
  //   image: `${BASE}/gojo-vs-sukuna.webp`,
  //   tags: ["React", "GSAP", "Tailwind CSS"],
  //   mockupType: "browser",
  //   accentColor: "#2563eb",
  //   featured: true,
  // },
  {
    id: "2",
    slug: "dating-app-figma",
    groupId: "dating-app",
    groupTitle: "Dating App",
    discipline: "figma",
    title: "Dating App — Figma UI",
    description:
      "Mobile UI/UX in Figma: onboarding, profiles, discovery, and chat entry — focused on trust and clarity.",
    category: ["uiux"],
    image: `${BASE}/dating app/main-mockup.webp`,
    tags: ["Figma", "UI/UX", "Mobile"],
    mockupType: "phone",
    accentColor: "#9333ea",
    featured: true,
  },
  {
    id: "3",
    slug: "laravel-dashboard",
    groupId: "laravel-dashboard",
    groupTitle: "Laravel Dashboard",
    discipline: "laravel",
    title: "Laravel Dashboard — Web App",
    description:
      "Analytics dashboard with real-time charts, filterable tables, and reusable UI modules on Laravel.",
    category: ["web"],
    image: `${BASE}/sacp/main-mockup.webp`,
    tags: ["Laravel", "PHP", "Dashboard"],
    mockupType: "browser",
    accentColor: "#ec4899",
    featured: true,
  },
  
  {
    id: "5",
    slug: "tour-website-wordpress",
    groupId: "tour-website",
    groupTitle: "European Tours",
    discipline: "wordpress",
    title: "European Tours — WordPress",
    description:
      "European tours site on WordPress with WooCommerce booking, package pages, and editor-friendly WordPress setup.",
    category: ["wordpress"],
    image: `${BASE}/european/main-mockup.webp`,
    tags: ["WordPress", "WooCommerce", "Tour Packages"],
    mockupType: "browser",
    accentColor: "#16a34a",
  },
  {
    id: "5",
    slug: "ecommerce-chatbot",
    groupId: "ecommerce-chatbot",
    groupTitle: "Ecommerce Chatbot",
    discipline: "react",
    title: "Ecommerce Chatbot — Next.js Web",
    description:
      "Ecommerce chatbot is a Next.js web application for managing and analyzing data with a modern UI and smooth animations.",
    category: ["web"],
    image: `${BASE}/ecommerce-chatbot/main-mockup.webp`,
    tags: ["Next.js", "TypeScript", "Web","Node.js", "Firebase"],
    mockupType: "browser",
    accentColor: "#16a34a",
  },
  {
    id: "6",
    slug: "it-solution-figma",
    groupId: "it-solution",
    groupTitle: "IT Solution Design",
    discipline: "figma",
    title: "IT Solution — Figma UI",
    description:
      "B2B IT services marketing UI in Figma — services, trust sections, and lead-capture layouts.",
    category: ["uiux"],
    image: `${BASE}/raj it/main-mockup.webp`,
    tags: ["Figma", "Web Design", "B2B"],
    mockupType: "browser",
    accentColor: "#ea580c",
  },
  {
    id: "6",
    slug: "print-on-demand-website",
    groupId: "print-on-demand-website",
    groupTitle: "Print On Click",
    discipline: "figma",
    title: "Print On Click — Figma UI",
    description:
      "Print on demand website is a Figma UI for managing and analyzing data with a modern UI and smooth animations.",
    category: ["uiux"],
    image: `${BASE}/print-on-click/main-mockup.webp`,
    tags: ["Figma", "UI/UX", "Print On Demand"],
    mockupType: "browser",
    accentColor: "#ea580c",
  },
  {
    id: "6",
    slug: "household-products-wix",
    groupId: "household-products",
    groupTitle: "Household Products",
    discipline: "wix",
    title: "Constance & Danny — Wix Store",
    description:
      "Constance & Danny is a Wix store with custom sections, product templates, and mobile checkout UX.",
    category: ["wix", "web"],
    image: `${BASE}/constance-danny/main-mockup.webp`,
    tags: ["Wix", "Implementation", "Web Design", "Web Development"],
    mockupType: "browser",
    accentColor: "#ea580c",
  },
  {
    id: "7a",
    slug: "rent-app-figma",
    groupId: "rent-app",
    groupTitle: "Rent App",
    discipline: "figma",
    title: "Rent App — Figma UX",
    description:
      "Rental marketplace UX in Figma: search, listings, property detail, and renter/host dashboards.",
    category: ["uiux"],
    image: `${BASE}/aqa rent/main-mockup.webp`,
    tags: ["Figma", "UX", "SaaS","Flutter"],
    mockupType: "browser",
    accentColor: "#2563eb",
  },
  {
    id: "7b",
    slug: "rent-app-web",
    groupId: "rent-app",
    groupTitle: "Rent App",
    discipline: "react",
    title: "Rent App — React Web",
    description:
      "React + TypeScript front end for listings, filters, and account areas aligned with Figma specs.",
    category: ["web"],
    image: `${BASE}/rent.webp`,
    tags: ["React", "TypeScript", "SaaS"],
    mockupType: "browser",
    accentColor: "#2563eb",
  },
  
  {
    id: "9b",
    slug: "it-website-wix",
    groupId: "it-website",
    groupTitle: "IT Website",
    discipline: "wix",
    title: "Serour Designs — Wix Build",
    description:
      "Serour Designs is a web design and development agency that provides custom website design and development services.",
    category: ["wix", "web"],
    image: `${BASE}/serourdesign/main-mockup.webp`,
    tags: ["Wix", "Implementation", "Web Design", "Web Development"],
    mockupType: "phone",
    accentColor: "#ec4899",
  },
  {
    id: "10",
    slug: "shopaarel-shopify",
    groupId: "shopaarel-website",
    groupTitle: "Shopaarel",
    discipline: "shopify",
    title: "Shopaarel — Shopify",
    description:
      "Shopaarel is a Shopify apparel store with custom sections, product templates, and mobile checkout UX.",
    category: ["shopify", "web"],
    image: `${BASE}/shopaarel/main-mockup.webp`,
    tags: ["Shopify", "Liquid", "E-Commerce"],
    mockupType: "browser",
    accentColor: "#06b6d4",
  },
  {
    id: "10",
    slug: "shoes-store-shopify",
    groupId: "shopaarel-website",
    groupTitle: "Knickgasm",
    discipline: "shopify",
    title: "Knickgasm — Shopify",
    description:
      "Knickgasm is a Shopify shoes store with custom sections, product templates, and mobile checkout UX.",
    category: ["shopify", "web"],
    image: `${BASE}/knick/main-mockup.webp`,
    tags: ["Shopify", "Liquid", "E-Commerce"],
    mockupType: "browser",
    accentColor: "#06b6d4",
  },
  {
    id: "10",
    slug: "hedges-shopify",
    groupId: "hedges-website",
    groupTitle: "Balcony Hedges",
    discipline: "figma",
    title: "Balcony Hedges — Figma UI",
    description:
      "Balcony Hedges website with custom sections, product templates, and mobile checkout UX.",
    category: ["uiux"],
    image: `${BASE}/hedges-mockup/main-mockup.webp`,
    tags: ["Figma", "UI/UX", "E-Commerce"],
    mockupType: "browser",
    accentColor: "#9333ea",
  },
  {
    id: "10",
    slug: "faiz-e-husaini",
    groupId: "tour-website",
    groupTitle: "Faiz e Husaini",
    discipline: "react",
    title: "Faiz e Husaini — React Web",
    description:
      "Faiz e Husaini is a React web application for managing and analyzing data with a modern UI and smooth animations.",
    category: ["web"],
    image: `${BASE}/faiz/main-mockup.webp`,
    tags: ["React", "TypeScript", "Web","Node.js", "Firebase"],
    mockupType: "browser",
    accentColor: "#9333ea",
  },
  {
    id: "10",
    slug: "refynai",
    groupId: "refynai-website",
    groupTitle: "Refynai",
    discipline: "react",
    title: "Refynai — React Web",
    description:
      "Refynai is a React web application for managing and analyzing data with a modern UI and smooth animations.",
    category: ["web"],
    image: `${BASE}/refyn-ai/main-mockup.webp`,
    tags: ["React", "TypeScript", "Web","Node.js", "Firebase"],
    mockupType: "browser",
    accentColor: "#9333ea",
  },
];

export const projectSlugs = portfolioItems.map((p) => p.slug);

export function getProjectBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev?: PortfolioItem;
  next?: PortfolioItem;
} {
  const index = portfolioItems.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? portfolioItems[index - 1] : undefined,
    next:
      index < portfolioItems.length - 1
        ? portfolioItems[index + 1]
        : undefined,
  };
}

export function getConnectedProjects(project: PortfolioItem): PortfolioItem[] {
  return portfolioItems.filter(
    (p) => p.groupId === project.groupId && p.slug !== project.slug,
  );
}

export function getProjectsByGroup(groupId: string): PortfolioItem[] {
  return portfolioItems.filter((p) => p.groupId === groupId);
}

export function getRelatedProjects(
  project: PortfolioItem,
  limit = 3,
): PortfolioItem[] {
  return portfolioItems
    .filter(
      (p) =>
        p.slug !== project.slug &&
        p.groupId !== project.groupId &&
        p.category.some((cat) => project.category.includes(cat)),
    )
    .slice(0, limit);
}

export type DetailRelatedSource = "connected" | "category";

/** Connected siblings first; same-category projects when none exist. */
export function getDetailRelatedProjects(
  project: PortfolioItem,
  limit = 3,
): { projects: PortfolioItem[]; source: DetailRelatedSource } {
  const connected = getConnectedProjects(project);
  if (connected.length > 0) {
    return { projects: connected.slice(0, limit), source: "connected" };
  }

  return {
    projects: getRelatedProjects(project, limit),
    source: "category",
  };
}

/** Category matches for the bottom “explore more” block — excludes already featured slugs. */
export function getExploreMoreProjects(
  project: PortfolioItem,
  excludeSlugs: string[] = [],
  limit = 3,
): PortfolioItem[] {
  const excluded = new Set([project.slug, ...excludeSlugs]);

  return portfolioItems
    .filter(
      (p) =>
        !excluded.has(p.slug) &&
        p.groupId !== project.groupId &&
        p.category.some((cat) => project.category.includes(cat)),
    )
    .slice(0, limit);
}

const categoryServiceMap: Partial<
  Record<Exclude<Category, "all">, string>
> = {
  web: "web-development",
  app: "mobile-apps",
  uiux: "ui-ux-design",
  wordpress: "cms-integration",
  shopify: "e-commerce",
  wix: "cms-integration",
};

const disciplineServiceMap: Partial<Record<ProjectDiscipline, string>> = {
  figma: "ui-ux-design",
  flutter: "mobile-apps",
  web: "web-development",
  react: "web-development",
  shopify: "e-commerce",
  wordpress: "cms-integration",
  wix: "cms-integration",
  laravel: "web-development",
  admin: "web-development",
  gsap: "web-development",
};

export function getServiceSlugForCategory(
  category: Exclude<Category, "all">,
): string | undefined {
  return categoryServiceMap[category];
}

export function getServiceSlugForDiscipline(
  discipline: ProjectDiscipline,
): string | undefined {
  return disciplineServiceMap[discipline];
}
