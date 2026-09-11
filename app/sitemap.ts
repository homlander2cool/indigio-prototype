import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projectSectors } from "@/lib/projects";
import { getDeals } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["/", "/about", "/projects", "/deals", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
  const projects = projectSectors.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const deals = (await getDeals()).map((deal) => ({
    url: `${site.url}/deals/${deal.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticRoutes, ...projects, ...deals];
}
