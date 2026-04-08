"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling down and past 50px, hide header
        gsap.to(headerRef.current, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up, show header
        gsap.to(headerRef.current, {
          y: "0%",
          duration: 0.3,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/65 backdrop-blur-sm"
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="w-12  rounded-full flex items-center justify-center">
             <img src="haider-avatar.webp" alt="" />
            </div> */}
            <span className="font-semibold text-lg tracking-tight">
              Haider Limdiwala
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#work"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Work
            </a>
            <a
              href="#services"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Service
            </a>
            <a
              href="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
