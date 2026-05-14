import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/account", "/success"],
    },
    sitemap: "https://vss.ua/sitemap.xml",
  };
}