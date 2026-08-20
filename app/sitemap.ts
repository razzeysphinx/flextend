import type { MetadataRoute } from "next";
import { conditionPages } from "@/lib/content/conditions";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/conditions`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...conditionPages.map((condition) => ({
      url: `${siteUrl}/conditions/${condition.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
