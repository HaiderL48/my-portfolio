"use client";

import { Globe, Smartphone, Palette, ShoppingCart, Layers, Cloud } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites built with Next.js, WordPress, and Wix — fast, responsive, and SEO-ready.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Shopify stores and WooCommerce setups optimized for conversions and seamless checkout.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Cross-platform Flutter apps and native Android development for iOS and Android.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Clean, intuitive interfaces designed in Figma with a focus on user experience.",
  },
  {
    icon: Layers,
    title: "CMS Integration",
    description: "Headless CMS setups, content migrations, and custom plugin development.",
  },
  {
    icon: Cloud,
    title: "Cloud & Backend",
    description: "Firebase, Google Cloud, and Zoho integrations to power your app's backend.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            What I do</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Turning Ideas into Digital Reality
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl border border-border bg-card hover:bg-accent/10 transition-colors duration-300 dark:hover:bg-white/10" 
            >
              <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
