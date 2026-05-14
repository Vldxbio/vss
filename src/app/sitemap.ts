import { MetadataRoute } from "next";
import { products } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vss.ua"; // замени на свой домен

  const staticRoutes = [
    "",
    "/catalog",
    "/about",
    "/delivery",
    "/faq",
    "/cart",
    "/favorites",
    "/account",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}