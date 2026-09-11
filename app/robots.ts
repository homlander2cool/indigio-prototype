import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: ["/", "/projects", "/deals", "/about", "/contact"], disallow: ["/admin", "/dashboard", "/wallet", "/api", "/login", "/kyc"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
