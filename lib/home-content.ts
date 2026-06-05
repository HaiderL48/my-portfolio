export const homeHero = {
  badge: "IT services · Design to launch",
  headline: "We design and build",
  headlineSuffix: "digital products for growing brands.",
  rotatingServices: [
    "Web development",
    "Mobile apps",
    "UI/UX design",
    "E-commerce stores",
    "WordPress & CMS",
    "Cloud integrations",
  ],
  subheadline:
    "One team from Figma to production — apps, websites, and online stores.",
  valuePoints: [
    "Figma to production — design and code in one workflow",
    "Staging previews at every milestone",
    "Flutter · Next.js · Shopify · WordPress · Figma",
  ],
  stats: [
    { end: 20, suffix: "+", label: "Case studies" },
    { end: 6, suffix: "", label: "Service areas" },
    { end: 4, suffix: "+", label: "Years building" },
  ],
};

export const homeServicePills = [
  "Web & React",
  "Flutter",
  "Figma / UI",
  "Shopify",
];

/** Two differentiators after the work reel — not repeated in hero trust bar or services. */
export const homeWhyPoints = [
  {
    title: "Scalable code",
    description:
      "Clean, maintainable builds that grow with your product — no spaghetti, no shortcuts.",
  },
  {
    title: "Ongoing support",
    description:
      "I do not disappear after launch. Quick responses when you need them.",
  },
] as const;
