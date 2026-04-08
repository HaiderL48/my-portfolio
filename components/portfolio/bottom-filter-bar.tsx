"use client";

import { forwardRef } from "react";
import { Category } from "@/lib/portfolio-data";
import {
  Globe,
  Smartphone,
  Palette,
  BookOpen,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaShopify, FaWix, FaWordpress } from "react-icons/fa";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";


interface BottomFilterBarProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const filterItems = [
  { value: "all" as Category, label: "Featured", icon: () => <Sparkles size={18} strokeWidth={2} /> },
  { value: "web" as Category, label: "Web Development", icon: () => <Globe size={18} strokeWidth={2} /> },
  { value: "app" as Category, label: "App Development", icon: () => <HiOutlineDevicePhoneMobile  size={18} /> },
  { value: "uiux" as Category, label: "UI/UX Design", icon: () => <Palette size={18} strokeWidth={2} /> },
  { value: "wordpress" as Category, label: "WordPress", icon: () => <FaWordpress size={18} /> },
  { value: "shopify" as Category, label: "Shopify", icon: () => <FaShopify size={18} /> },
  { value: "wix" as Category, label: "Wix", icon: () => <FaWix size={18} /> },
];

const BottomFilterBar = forwardRef<HTMLDivElement, BottomFilterBarProps>(
  function BottomFilterBar({ selectedCategory, onCategoryChange }, ref) {

    return (
      <div
        ref={ref}
        className="fixed bottom-2 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 bg-background/65 dark:bg-background/65 backdrop-blur-md border border-forground rounded-4xl opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-2">
          <div className="flex items-center justify-center gap-2 md:gap-4 py-4 md:py-3 overflow-x-auto px-2">
            {filterItems.map((item) => {
              const isSelected = selectedCategory === item.value;

              return (
                <Tooltip key={item.value}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onCategoryChange(item.value)}
                      className={`cursor-pointer relative p-3 rounded-full transition-all duration-300  ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-forground hover:bg-accent/10 dark:hover:bg-white/20"
                      }`}
                      aria-label={item.label}
                    >
                      {item.icon()}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

export default BottomFilterBar;
