import { MetadataRoute } from "next";

const BASE_URL = "https://my-portfolio-taupe-psi-16.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
