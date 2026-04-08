"use client";

import { categories, Category } from "@/lib/portfolio-data";

interface FilterBarProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  const allFilters = [
    { value: "all" as Category, label: "All Work" },
    ...categories,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
      <div className="flex flex-wrap gap-2 items-center justify-center min-h-[50px]">
        {allFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onCategoryChange(filter.value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
              selectedCategory === filter.value
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
