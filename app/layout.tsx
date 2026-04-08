import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const BASE_URL = "https://haiderlimdiwala.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Haider Limdiwala — Web & App Developer",
    template: "%s | Haider Limdiwala",
  },
  description:
    "Freelance web and app developer specializing in Shopify, WordPress, Wix, Flutter, and Next.js. I build fast, conversion-focused digital experiences for brands worldwide.",
  keywords: [
    "web developer",
    "app developer",
    "Shopify developer",
    "WordPress developer",
    "Wix developer",
    "Flutter developer",
    "Next.js developer",
    "UI/UX design",
    "freelance developer",
    "mobile app development",
    "react native developer",
  ],
  authors: [{ name: "Haider Limdiwala", url: BASE_URL }],
  creator: "Haider Limdiwala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Haider Limdiwala",
    title: "Haider Limdiwala — Web & App Developer",
    description:
      "Freelance web and app developer specializing in Shopify, WordPress, Wix, Flutter, and Next.js.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Haider Limdiwala — Web & App Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haider Limdiwala — Web & App Developer",
    description:
      "Freelance web and app developer specializing in Shopify, WordPress, Wix, Flutter, and Next.js.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll />
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
          {process.env.NODE_ENV === "production" && <SpeedInsights />}
        </ThemeProvider>
      </body>
    </html>
  );
}
