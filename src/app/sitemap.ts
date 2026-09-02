import type { MetadataRoute } from "next";
import { impactItems } from "@/content/impact";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/who-am-i/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/experiences/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Impact stays out of the sitemap while it is empty, matching the noindex on
  // the page itself. Both flip in the commit that adds the entries.
  if (impactItems.length > 0) {
    routes.push({
      url: `${site.url}/impact/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return routes;
}
