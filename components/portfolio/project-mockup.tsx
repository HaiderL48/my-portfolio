"use client";

import Image from "next/image";
import { MockupType } from "@/lib/portfolio-data";

interface ProjectMockupProps {
  image: string;
  title: string;
  type: MockupType;
  delay?: string;
}

export default function ProjectMockup({
  image,
  title,
  type,
  delay = "0s",
}: ProjectMockupProps) {
  return (
    <div
      className="flex justify-center animate-scale-up w-full"
      style={{ animationDelay: delay }}
    >
      {type === "phone" && (
        <div className="relative w-64 h-auto">
          {/* Phone Frame */}
          <div
            className="relative rounded-[40px] border-[14px] border-black shadow-2xl bg-black overflow-hidden"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10" />
            {/* Screen */}
            <div className="relative w-full h-full bg-black">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {type === "browser" && (
        <div className="relative w-full max-w-2xl shadow-2xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 ">
          {/* Browser Header */}
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <input
              type="text"
              disabled
              value="https://example.com"
              className="flex-1 ml-4 px-3 py-1 bg-white dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300"
            />
          </div>
          {/* Content */}
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {type === "tablet" && (
        <div className="relative w-96 shadow-2xl rounded-2xl overflow-hidden border-8 border-gray-900 bg-gray-900">
          {/* Tablet Frame */}
          <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {type === "desktop" && (
        <div className="relative w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-900">
          {/* Desktop Monitor Frame */}
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Monitor Stand */}
          <div className="h-6 bg-gray-900 flex items-center justify-center">
            <div className="w-32 h-4 bg-gray-700 rounded-b-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
