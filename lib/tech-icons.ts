import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGsap,
  SiLaravel,
  SiVercel,
  SiPhp,
  SiShopify,
  SiWoo,
  SiStripe,
  SiPaypal,
  SiKlarna,
  SiFlutter,
  SiDart,
  SiFigma,
  SiFirebase,
  SiGooglecloud,
  SiZoho,
  SiNodedotjs,
  SiMysql,
  SiAndroid,
  SiJson,
  SiGoogleanalytics,
  SiSupabase,
} from "react-icons/si";
import { FaWordpress, FaShopify, FaWix } from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { IoLogoFigma } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";
import {
  Code2,
  LayoutDashboard,
  Palette,
  Smartphone,
  Globe,
  Layers,
  Search,
  ShoppingCart,
  Briefcase,
  Cloud,
  Webhook,
  Shield,
  Map,
  Monitor,
  type LucideIcon,
} from "lucide-react";

export type TechIconComponent = IconType | LucideIcon;

export interface TechIconEntry {
  icon: TechIconComponent;
  /** Tailwind text color class for brand tint */
  colorClass?: string;
}

export function normalizeTechKey(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s*\/\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const TECH_ICON_MAP: Record<string, TechIconEntry> = {
  react: { icon: SiReact, colorClass: "text-[#61DAFB]" },
  "next.js": { icon: RiNextjsFill },
  nextjs: { icon: RiNextjsFill },
  typescript: { icon: SiTypescript, colorClass: "text-[#3178C6]" },
  "tailwind css": { icon: SiTailwindcss, colorClass: "text-[#06B6D4]" },
  tailwind: { icon: SiTailwindcss, colorClass: "text-[#06B6D4]" },
  gsap: { icon: SiGsap, colorClass: "text-[#88CE02]" },
  laravel: { icon: SiLaravel, colorClass: "text-[#FF2D20]" },
  vercel: { icon: SiVercel },
  wordpress: { icon: FaWordpress, colorClass: "text-[#21759B]" },
  php: { icon: SiPhp, colorClass: "text-[#777BB4]" },
  shopify: { icon: FaShopify, colorClass: "text-[#96BF48]" },
  liquid: { icon: SiShopify, colorClass: "text-[#96BF48]" },
  woocommerce: { icon: SiWoo, colorClass: "text-[#96588A]" },
  stripe: { icon: SiStripe, colorClass: "text-[#635BFF]" },
  paypal: { icon: SiPaypal, colorClass: "text-[#003087]" },
  klarna: { icon: SiKlarna, colorClass: "text-[#FFB3C7]" },
  flutter: { icon: FaFlutter, colorClass: "text-[#02569B]" },
  dart: { icon: SiDart, colorClass: "text-[#0175C2]" },
  android: { icon: SiAndroid, colorClass: "text-[#3DDC84]" },
  firebase: { icon: SiFirebase, colorClass: "text-[#FFCA28]" },
  figma: { icon: IoLogoFigma, colorClass: "text-[#F24E1E]" },
  figjam: { icon: SiFigma, colorClass: "text-[#F24E1E]" },
  "google cloud": { icon: SiGooglecloud, colorClass: "text-[#4285F4]" },
  zoho: { icon: SiZoho, colorClass: "text-[#E42527]" },
  "node.js": { icon: SiNodedotjs, colorClass: "text-[#339933]" },
  nodejs: { icon: SiNodedotjs, colorClass: "text-[#339933]" },
  mysql: { icon: SiMysql, colorClass: "text-[#4479A1]" },
  wix: { icon: FaWix },
  seo: { icon: Search },
  acf: { icon: FaWordpress, colorClass: "text-[#21759B]" },
  prototyping: { icon: IoLogoFigma, colorClass: "text-[#F24E1E]" },
  "design system": { icon: Layers },
  "design tokens": { icon: Layers },
  "auto-layout": { icon: IoLogoFigma, colorClass: "text-[#F24E1E]" },
  variants: { icon: IoLogoFigma, colorClass: "text-[#F24E1E]" },
  "ux mapping": { icon: Map },
  "responsive design": { icon: Monitor },
  "json templates": { icon: SiJson },
  supabase: { icon: SiSupabase, colorClass: "text-[#3FCF8E]" },
  analytics: { icon: SiGoogleanalytics },
  "ui/ux": { icon: Palette },
  "web design": { icon: Palette },
  mobile: { icon: Smartphone },
  "mobile ui": { icon: Smartphone },
  "admin panel": { icon: LayoutDashboard },
  dashboard: { icon: LayoutDashboard },
  "dashboard ui": { icon: LayoutDashboard },
  "web app": { icon: Globe },
  "web application": { icon: Globe },
  charts: { icon: LayoutDashboard },
  listings: { icon: Globe },
  "e-commerce": { icon: ShoppingCart },
  b2b: { icon: Briefcase },
  saas: { icon: Cloud },
  implementation: { icon: Code2 },
  "custom sections": { icon: Layers },
  "rest api": { icon: Webhook },
  "rest apis": { icon: Webhook },
  "rest / webhooks": { icon: Webhook },
  webhooks: { icon: Webhook },
  "firestore security rules": { icon: Shield },
  hospitality: { icon: Briefcase },
  "accessibility (wcag basics)": { icon: Shield },
  "accessibility wcag basics": { icon: Shield },
};

const PARTIAL_MATCHES: [needle: string, mapKey: string][] = [
  ["next.js", "next.js"],
  ["nextjs", "next.js"],
  ["headless", "next.js"],
  ["klarna", "klarna"],
  ["paypal", "paypal"],
  ["acf", "acf"],
  ["woocommerce", "woocommerce"],
  ["wordpress", "wordpress"],
  ["figma", "figma"],
  ["firebase", "firebase"],
  ["google cloud", "google cloud"],
  ["rest", "rest api"],
  ["webhook", "webhooks"],
  ["dashboard", "dashboard"],
  ["design", "design system"],
  ["shopify", "shopify"],
  ["liquid", "liquid"],
  ["stripe", "stripe"],
  ["flutter", "flutter"],
  ["laravel", "laravel"],
  ["react", "react"],
  ["gsap", "gsap"],
  ["wix", "wix"],
  ["zoho", "zoho"],
  ["php", "php"],
  ["seo", "seo"],
  ["dart", "dart"],
  ["android", "android"],
];

const DEFAULT_ENTRY: TechIconEntry = {
  icon: Code2,
  colorClass: "text-foreground/70",
};

export function getTechIconEntry(label: string): TechIconEntry {
  const key = normalizeTechKey(label);
  const direct = TECH_ICON_MAP[key];
  if (direct) return direct;

  for (const [needle, mapKey] of PARTIAL_MATCHES) {
    if (key.includes(needle)) {
      const match = TECH_ICON_MAP[mapKey];
      if (match) return match;
    }
  }

  return DEFAULT_ENTRY;
}
