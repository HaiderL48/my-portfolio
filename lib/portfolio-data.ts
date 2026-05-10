export type Category =
  | "web"
  | "app"
  | "uiux"
  | "wordpress"
  | "shopify"
  | "wix"
  | "all";
export type MockupType = "browser" | "phone" | "tablet" | "desktop";

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  image: string;
}

export interface PortfolioItem {
  id: string;
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
    title: "Real Estate",
    description: "Modern online shopping experience with seamless checkout flow, advanced filtering, and real-time inventory management. Built with React and Node.js for optimal performance.",
    category: ["wordpress"],
    image: `${BASE}/alliancebayrealtygroup.webp`,
    tags: ["Wordpress"],
    mockupType: "browser",
    accentColor: "#2563eb",
    featured: true,
    testimonial: {
      text: "The platform increased our sales by 40% in the first month. Exceptional work!",
      author: "Sarah Johnson",
      role: "E-Commerce Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
  },
  {
    id: "1",
    title: "Animated Website",
    description: "Modern Animated Website based on popular Anime Jujutsu Kaisen. Made with stuning Animations and Music.",
    category: ["web"],
    image: `${BASE}/gojo-vs-sukuna.webp`,
    tags: ["React","GSAP","Tailwind CSS"],
    mockupType: "browser",
    accentColor: "#2563eb",
    featured: true,
    testimonial: {
      text: "The platform increased our sales by 40% in the first month. Exceptional work!",
      author: "Sarah Johnson",
      role: "E-Commerce Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
  },
  {
    id: "2",
    title: "Dating App",
    description: "Comprehensive mobile app to track workouts, monitor calories, and visualize progress with AI-powered insights. Real-time syncing across all devices.",
    category: ["uiux"],
    image: `${BASE}/dating.webp`,
    tags: ["Figma", "UI/UX", "Web Designing"],
    mockupType: "phone",
    accentColor: "#9333ea",
    featured: true,
    testimonial: {
      text: "Amazing app design and functionality. My team loves using it for fitness tracking.",
      author: "Mike Chen",
      role: "Fitness Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
  },
  {
    id: "3",
    title: "Laravel Dashboard",
    description: "Analytics dashboard with real-time data visualization, custom charts, and interactive insights. Complete design system with 100+ components.",
    category: ["web"],
    image: `${BASE}/dashboard.webp`,
    tags: ["Laravel", "PHP", "HTML/CSS"],
    mockupType: "browser",
    accentColor: "#ec4899",
    featured: true,
    testimonial: {
      text: "The design system transformed our entire product. Clean, intuitive, and scalable.",
      author: "Emma Williams",
      role: "Product Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
  },
  {
    id: "4",
    title: "Food App",
    description: "WordPress blog with custom theme, advanced SEO optimization, and integrated newsletter subscription. Built for content creators and marketers.",
    category: ["app", "uiux"],
    image: `${BASE}/food.webp`,
    tags: ["Android", "Flutter", "Figma"],
    mockupType: "phone",
    accentColor: "#06b6d4",
    featured: true,
    testimonial: {
      text: "Perfect for our blogging needs. Great SEO and easy to manage content.",
      author: "David Park",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
  },
  {
    id: "5",
    title: "Tour Website",
    description: "Feature-rich Shopify store with custom product pages, advanced filtering, and seamless checkout integration. Optimized for conversions.",
    category: ["wordpress"],
    image: `${BASE}/eauropeantours.webp`,
    tags: ["Wordpress", "Woocommerce"],
    mockupType: "browser",
    accentColor: "#16a34a",
    testimonial: {
      text: "Our Shopify store looks incredible and sells great. Best investment ever!",
      author: "Lisa Anderson",
      role: "Store Owner",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=150&h=150&fit=crop",
    },
  },
  {
    id: "6",
    title: "IT Solution Design",
    description: "Creative portfolio website built on Wix with custom elements, smooth animations, and showcase of latest projects. Professional and eye-catching.",
    category: ["uiux"],
    image: `${BASE}/RajIt.webp`,
    tags: ["Figma", "Web Design", "UI/UX"],
    mockupType: "browser",
    accentColor: "#ea580c",
    testimonial: {
      text: "My Wix portfolio helped me land three major clients. Highly recommended!",
      author: "James Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
  },
  {
    id: "7",
    title: "Rent App",
    description: "Enterprise dashboard for team collaboration, project management, and real-time communication. Built with TypeScript for type safety.",
    category: ["uiux"],
    image: `${BASE}/rent.webp`,
    tags: ["React", "TypeScript", "SaaS"],
    mockupType: "browser",
    accentColor: "#2563eb",
  },
  {
    id: "8",
    title: "Restaurant App",
    description: "Secure banking application with transaction management, biometric authentication, and detailed financial analytics.",
    category: ["app", "uiux"],
    image: `${BASE}/restaurant.webp`,
    tags: ["React Native", "Security", "Finance"],
    mockupType: "phone",
    accentColor: "#9333ea",
  },
  {
    id: "9",
    title: "IT Website",
    description: "Complete UI/UX design system for mobile platform with 150+ components, comprehensive documentation, and design tokens.",
    category: ["uiux", "wix", "web"],
    image: `${BASE}/serourdesigns.webp`,
    tags: ["Figma", "Wix", "Web Design"],
    mockupType: "phone",
    accentColor: "#ec4899",
  },
  {
    id: "10",
    title: "Mackup Website",
    description: "WordPress news site with custom post types, advanced filtering, and integrated breaking news alerts. SEO-optimized.",
    category: ["shopify", "web"],
    image: `${BASE}/shopaarel.webp`,
    tags: ["Shopify", "E-Commerce", "Liquid"],
    mockupType: "browser",
    accentColor: "#06b6d4",
  },
];
