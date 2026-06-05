export const homeProcessSteps = [
  {
    step: "Discover",
    description: "Goals, scope, and success metrics before design or code.",
  },
  {
    step: "Design",
    description: "Figma UI/UX, wireframes, and prototypes when the product needs it.",
  },
  {
    step: "Develop",
    description: "Build in Flutter, React, WordPress, Shopify, or your chosen stack.",
  },
  {
    step: "Launch",
    description: "QA, deploy, handoff, and support so you stay in control.",
  },
] as const;

export const homeTestimonials = [
  {
    text: "Haider delivered our app on schedule with clear communication throughout. The handoff was smooth and the product matched what we approved in Figma.",
    author: "Client name",
    role: "Founder · Product company",
  },
] as const;

export const aboutContent = {
  headline: "I turn ideas into apps and websites.",
  story: [
    "I'm Haider Limdiwala — a full-stack developer and designer who works from first sketch to production launch. I like projects where design and engineering stay in one workflow, whether that's a Flutter app, a Shopify store, or a React site with scroll-driven motion.",
    "Clients come to me when they need someone who can own Figma, the build, integrations (Zoho, Firebase, APIs), and deployment without juggling multiple vendors.",
    "I'm based in India and work remotely with founders, agencies, and small teams worldwide.",
  ],
  stats: [
    { value: "15+", label: "Projects shipped" },
    { value: "6", label: "Service areas" },
    { value: "4+", label: "Years building" },
    { value: "Remote", label: "Worldwide clients" },
  ],
  values: [
    {
      title: "Ship fast, iterate",
      description: "Milestones and staging previews so you see progress early — not a big reveal at the end.",
    },
    {
      title: "Communication first",
      description: "Clear updates, documented decisions, and honest timelines.",
    },
    {
      title: "Design matters",
      description: "UI/UX isn't an afterthought — it's part of how the product wins users.",
    },
  ],
  expertiseGroups: [
    {
      title: "Mobile",
      items: ["Flutter", "Dart", "Android", "REST APIs"],
    },
    {
      title: "Web",
      items: ["React", "Next.js", "TypeScript", "GSAP", "Laravel"],
    },
    {
      title: "Design & platforms",
      items: ["Figma", "WordPress", "Shopify", "Wix", "Zoho"],
    },
  ],
  timeline: [
    { year: "2021", label: "Started freelancing — web & WordPress" },
    { year: "2022", label: "Shopify, Wix, and Zoho integrations" },
    { year: "2023", label: "Flutter apps & Figma-first product work" },
    { year: "2024+", label: "Full product stacks — design to deployment" },
  ],
};

export const contactContent = {
  headline: "Let's build something",
  subheadline:
    "Tell me about your project — typical response within 24 hours on business days.",
  responseSla: "I usually reply within 24 hours.",
  projectTypes: [
    "Mobile app (Flutter)",
    "Web / React / Next.js",
    "E-commerce (Shopify / WooCommerce)",
    "UI/UX design (Figma)",
    "WordPress / Wix / CMS",
    "Automation / integrations",
    "Not sure yet",
  ],
  budgetRanges: [
    "Under $2k",
    "$2k – $5k",
    "$5k – $15k",
    "$15k+",
    "Prefer to discuss",
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "GitHub", href: "https://github.com", external: true },
  ],
  email: "haidelimdi@gmail.com",
};
