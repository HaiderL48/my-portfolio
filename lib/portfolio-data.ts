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
  category: Category;
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
  {
    value: "web",
    label: "Web Development",
    color: "from-blue-600 to-blue-800",
  },
  {
    value: "app",
    label: "App Development",
    color: "from-purple-600 to-purple-800",
  },
  { value: "uiux", label: "UI/UX Design", color: "from-pink-600 to-pink-800" },
  {
    value: "wordpress",
    label: "WordPress",
    color: "from-cyan-600 to-cyan-800",
  },
  { value: "shopify", label: "Shopify", color: "from-green-600 to-green-800" },
  { value: "wix", label: "Wix", color: "from-orange-600 to-orange-800" },
];

export const getCategoryColor = (
  category: Exclude<Category, "all">,
): string => {
  const cat = categories.find((c) => c.value === category);
  return cat ? cat.color : "from-slate-600 to-slate-800";
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Modern online shopping experience with seamless checkout flow, advanced filtering, and real-time inventory management. Built with React and Node.js for optimal performance.",
    category: "web",
    image: "/mockup-ecommerce.jpg",
    webImage: "/mockup-ecommerce.jpg",
    mobileImage: "/mockup-ecommerce.jpg",
    tags: ["React", "Node.js", "Stripe"],
    mockupType: "browser",
    accentColor: "#2563eb",
    featured: true,
    testimonial: {
      text: "The platform increased our sales by 40% in the first month. Exceptional work!",
      author: "Sarah Johnson",
      role: "E-Commerce Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
  },
  {
    id: "2",
    title: "Fitness Tracking App",
    description:
      "Comprehensive mobile app to track workouts, monitor calories, and visualize progress with AI-powered insights. Real-time syncing across all devices.",
    category: "app",
    image: "/mockup-fitness-app.jpg",
    webImage: "/mockup-fitness-app.jpg",
    mobileImage: "/mockup-fitness-app.jpg",
    tags: ["React Native", "Firebase", "Health"],
    mockupType: "phone",
    accentColor: "#9333ea",
    featured: true,
    testimonial: {
      text: "Amazing app design and functionality. My team loves using it for fitness tracking.",
      author: "Mike Chen",
      role: "Fitness Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
  },
  {
    id: "3",
    title: "Dashboard UI Design System",
    description:
      "Analytics dashboard with real-time data visualization, custom charts, and interactive insights. Complete design system with 100+ components.",
    category: "uiux",
    image: "/mockup-dashboard.jpg",
    webImage: "/mockup-dashboard.jpg",
    mobileImage: "/mockup-dashboard.jpg",
    tags: ["Figma", "Design System", "Analytics"],
    mockupType: "desktop",
    accentColor: "#ec4899",
    featured: true,
    testimonial: {
      text: "The design system transformed our entire product. Clean, intuitive, and scalable.",
      author: "Emma Williams",
      role: "Product Lead",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
  },
  {
    id: "4",
    title: "Business Blog",
    description:
      "WordPress blog with custom theme, advanced SEO optimization, and integrated newsletter subscription. Built for content creators and marketers.",
    category: "wordpress",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    tags: ["WordPress", "SEO", "Content"],
    mockupType: "browser",
    accentColor: "#06b6d4",
    testimonial: {
      text: "Perfect for our blogging needs. Great SEO and easy to manage content.",
      author: "David Park",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
  },
  {
    id: "5",
    title: "Online Store",
    description:
      "Feature-rich Shopify store with custom product pages, advanced filtering, and seamless checkout integration. Optimized for conversions.",
    category: "shopify",
    image:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop",
    tags: ["Shopify", "Liquid", "E-Commerce"],
    mockupType: "browser",
    accentColor: "#16a34a",
    testimonial: {
      text: "Our Shopify store looks incredible and sells great. Best investment ever!",
      author: "Lisa Anderson",
      role: "Store Owner",
      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=150&h=150&fit=crop",
    },
  },
  {
    id: "6",
    title: "Portfolio Website",
    description:
      "Creative portfolio website built on Wix with custom elements, smooth animations, and showcase of latest projects. Professional and eye-catching.",
    category: "wix",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    tags: ["Wix", "Design", "Portfolio"],
    mockupType: "browser",
    accentColor: "#ea580c",
    testimonial: {
      text: "My Wix portfolio helped me land three major clients. Highly recommended!",
      author: "James Rodriguez",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
  },
  {
    id: "7",
    title: "SaaS Dashboard",
    description:
      "Enterprise dashboard for team collaboration, project management, and real-time communication. Built with TypeScript for type safety.",
    category: "web",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    tags: ["React", "TypeScript", "SaaS"],
    mockupType: "desktop",
    accentColor: "#2563eb",
  },
  {
    id: "8",
    title: "Mobile Banking App",
    description:
      "Secure banking application with transaction management, biometric authentication, and detailed financial analytics.",
    category: "app",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop",
    tags: ["React Native", "Security", "Finance"],
    mockupType: "phone",
    accentColor: "#9333ea",
  },
  {
    id: "9",
    title: "Mobile App Design System",
    description:
      "Complete UI/UX design system for mobile platform with 150+ components, comprehensive documentation, and design tokens.",
    category: "uiux",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    tags: ["Figma", "Mobile", "Design System"],
    mockupType: "phone",
    accentColor: "#ec4899",
  },
  {
    id: "10",
    title: "News Portal",
    description:
      "WordPress news site with custom post types, advanced filtering, and integrated breaking news alerts. SEO-optimized.",
    category: "wordpress",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    tags: ["WordPress", "Publishing", "Custom Post Types"],
    mockupType: "browser",
    accentColor: "#06b6d4",
  },
  {
    id: "11",
    title: "Fashion Store",
    description:
      "High-end Shopify store with advanced filtering, AR product previews, and luxury checkout experience.",
    category: "shopify",
    image:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop",
    tags: ["Shopify", "Fashion", "E-Commerce"],
    mockupType: "browser",
    accentColor: "#16a34a",
  },
  {
    id: "12",
    title: "Creative Agency Site",
    description:
      "Wix agency site with stunning portfolio showcase, client testimonials, and easy booking system.",
    category: "wix",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    webImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    tags: ["Wix", "Agency", "Creative"],
    mockupType: "browser",
    accentColor: "#ea580c",
  },
];
