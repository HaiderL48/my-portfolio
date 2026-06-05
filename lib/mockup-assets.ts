import type { MockupType } from "@/lib/portfolio-data";
import type { ProjectScreen, ScreenVariant } from "@/lib/project-details-data";

/** Drop your device bezels here (PNG with transparent screen area). */
export const MOCKUP_FRAMES = {
  phone: {
    src: "/mockups/frames/phone.png",
    width: 280,
    screenInset: {
      top: "2.8%",
      left: "5.5%",
      right: "5.5%",
      bottom: "2.8%",
    },
    borderRadius: "10%",
  },
  desktop: {
    src: "/mockups/frames/desktop.png",
    maxWidth: 640,
    screenInset: {
      top: "5%",
      left: "9%",
      right: "9%",
      bottom: "11%",
    },
    borderRadius: "6px",
  },
} as const;

export type MockupDevice = keyof typeof MOCKUP_FRAMES;

export function getMockupDevice(mockupType: MockupType): MockupDevice {
  return mockupType === "phone" ? "phone" : "desktop";
}

/** Optional per-project frame: /mockups/screens/{slug}/frame.png */
export function getProjectFramePath(slug: string): string {
  return `/mockups/screens/${slug}/frame.png`;
}

/** Screen screenshot path: /mockups/screens/{slug}/{filename} */
export function screenImage(slug: string, filename: string): string {
  return `/mockups/screens/${slug}/${filename}`;
}

export function projectScreens(
  slug: string,
  pages: { file: string; title: string; description: string }[],
  variant: ScreenVariant = "browser",
): ProjectScreen[] {
  return pages.map((page) => ({
    title: page.title,
    description: page.description,
    image: screenImage(slug, page.file),
    variant,
  }));
}
