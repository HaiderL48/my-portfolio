export type Category =
  | "web"
  | "app"
  | "uiux"
  | "wordpress"
  | "shopify"
  | "wix"
  | "all";

export type MockupType = "browser" | "phone" | "tablet" | "desktop";

export type ProjectDiscipline =
  | "figma"
  | "flutter"
  | "web"
  | "react"
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
];

export const getCategoryColor = (category: Exclude<Category, "all">): string => {
  const cat = categories.find((c) => c.value === category);
  return cat ? cat.color : "from-slate-600 to-slate-800";
};

const BASE = "/mockups";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "0",
    slug: "real-estate-wordpress",
    groupId: "real-estate",
    groupTitle: "Real Estate",
    discipline: "wordpress",
    title: "Real Estate — WordPress",
    description:
      "Property listing website on WordPress with enquiry flows, mobile-friendly listings, and an admin the client team can update daily.",
    category: ["wordpress"],
    image: `${BASE}/alliancebayrealtygroup.webp`,
    tags: ["WordPress", "PHP", "Listings"],
    mockupType: "browser",
    accentColor: "#2563eb",
    featured: true,
  },
  {
    id: "1",
    slug: "animated-website",
    groupId: "animated-website",
    groupTitle: "Animated Website",
    discipline: "gsap",
    title: "Animated Website — React & GSAP",
    description:
      "Cinematic anime-inspired one-pager with scroll-driven GSAP animation, React, and Tailwind CSS.",
    category: ["web"],
    image: `${BASE}/gojo-vs-sukuna.webp`,
    tags: ["React", "GSAP", "Tailwind CSS"],
    mockupType: "browser",
    accentColor: "#2563eb",
    featured: true,
  },
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
    image: `${BASE}/dating.webp`,
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
    image: `${BASE}/dashboard.webp`,
    tags: ["Laravel", "PHP", "Dashboard"],
    mockupType: "browser",
    accentColor: "#ec4899",
    featured: true,
  },
  {
    id: "4a",
    slug: "food-app-figma",
    groupId: "food-app",
    groupTitle: "Food App",
    discipline: "figma",
    title: "Food App — Figma Design",
    description:
      "Food delivery app UI in Figma: menu browse, item modifiers, cart, and checkout flows for mobile.",
    category: ["uiux"],
    image: `${BASE}/food.webp`,
    tags: ["Figma", "UI/UX", "Mobile"],
    mockupType: "phone",
    accentColor: "#06b6d4",
  },
  {
    id: "4b",
    slug: "food-app-flutter",
    groupId: "food-app",
    groupTitle: "Food App",
    discipline: "flutter",
    title: "Food App — Flutter",
    description:
      "Flutter implementation of the food ordering experience — screens, navigation, and UI parity with design.",
    category: ["app"],
    image: `${BASE}/food.webp`,
    tags: ["Flutter", "Dart", "Android"],
    mockupType: "phone",
    accentColor: "#06b6d4",
    featured: true,
  },
  {
    id: "4c",
    slug: "food-app-admin",
    groupId: "food-app",
    groupTitle: "Food App",
    discipline: "admin",
    title: "Food App — Admin Panel",
    description:
      "Web admin for restaurants and orders: menu management, order status, and operational dashboards.",
    category: ["web"],
    image: `${BASE}/food.webp`,
    tags: ["Admin Panel", "Web App", "Dashboard"],
    mockupType: "browser",
    accentColor: "#06b6d4",
  },
  {
    id: "5",
    slug: "tour-website-wordpress",
    groupId: "tour-website",
    groupTitle: "Tour Website",
    discipline: "wordpress",
    title: "Tour Website — WordPress",
    description:
      "European tours site with WooCommerce booking, package pages, and editor-friendly WordPress setup.",
    category: ["wordpress"],
    image: `${BASE}/eauropeantours.webp`,
    tags: ["WordPress", "WooCommerce"],
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
    image: `${BASE}/RajIt.webp`,
    tags: ["Figma", "Web Design", "B2B"],
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
    image: `${BASE}/rent.webp`,
    tags: ["Figma", "UX", "SaaS"],
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
    id: "8",
    slug: "restaurant-app-figma",
    groupId: "restaurant-app",
    groupTitle: "Restaurant App",
    discipline: "figma",
    title: "Restaurant App — Figma UI",
    description:
      "Restaurant ordering UI: menu categories, modifiers, cart bar, and checkout on mobile.",
    category: ["uiux"],
    image: `${BASE}/restaurant.webp`,
    tags: ["Figma", "Mobile UI", "Hospitality"],
    mockupType: "phone",
    accentColor: "#9333ea",
  },
  {
    id: "9a",
    slug: "it-website-figma",
    groupId: "it-website",
    groupTitle: "IT Website",
    discipline: "figma",
    title: "IT Website — Figma Design",
    description:
      "Marketing site designs in Figma for an IT brand — desktop and mobile frames.",
    category: ["uiux"],
    image: `${BASE}/serourdesigns.webp`,
    tags: ["Figma", "Web Design"],
    mockupType: "browser",
    accentColor: "#ec4899",
  },
  {
    id: "9b",
    slug: "it-website-wix",
    groupId: "it-website",
    groupTitle: "IT Website",
    discipline: "wix",
    title: "IT Website — Wix Build",
    description:
      "Figma designs implemented on Wix with custom sections and responsive tuning.",
    category: ["wix", "web"],
    image: `${BASE}/serourdesigns.webp`,
    tags: ["Wix", "Implementation"],
    mockupType: "phone",
    accentColor: "#ec4899",
  },
  {
    id: "10",
    slug: "mackup-shopify",
    groupId: "mackup-website",
    groupTitle: "Mackup Website",
    discipline: "shopify",
    title: "Mackup Website — Shopify",
    description:
      "Shopify apparel store with custom sections, product templates, and mobile checkout UX.",
    category: ["shopify", "web"],
    image: `${BASE}/shopaarel.webp`,
    tags: ["Shopify", "Liquid", "E-Commerce"],
    mockupType: "browser",
    accentColor: "#06b6d4",
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
