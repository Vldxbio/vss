"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { Category, Size, ProductBadge } from "@/types";

export type SortOption = "newest" | "popular" | "price-asc" | "price-desc" | "limited";

export interface CatalogFilters {
  category?: Category | null;
  sizes: Size[];
  badges: ProductBadge[];
  inStock: boolean;
  priceMin?: number;
  priceMax?: number;
  sort: SortOption;
}

export function useCatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: CatalogFilters = useMemo(() => ({
    category: (searchParams.get("category") as Category) || null,
    sizes: (searchParams.get("sizes")?.split(",").filter(Boolean) as Size[]) || [],
    badges: (searchParams.get("badges")?.split(",").filter(Boolean) as ProductBadge[]) || [],
    inStock: searchParams.get("inStock") === "true",
    priceMin: searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : undefined,
    priceMax: searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : undefined,
    sort: (searchParams.get("sort") as SortOption) || "newest",
  }), [searchParams]);

  const updateFilter = useCallback(<K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => {
  const params = new URLSearchParams(searchParams.toString());

  if (value === null || value === undefined || value === false) {
    params.delete(key);
  } else if (Array.isArray(value)) {
    if (value.length === 0) params.delete(key);
    else params.set(key, value.join(","));
  } else if (typeof value === "string" && value === "") {
    params.delete(key);
  } else {
    params.set(key, String(value));
  }

  router.push(`${pathname}?${params.toString()}`, { scroll: false });
}, [router, pathname, searchParams]);

  const toggleArrayFilter = useCallback(<K extends "sizes" | "badges">(key: K, value: string) => {
    const current = filters[key] as string[];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, next as any);
  }, [filters, updateFilter]);

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const activeCount = useMemo(() => {
    let n = 0;
    if (filters.category) n++;
    n += filters.sizes.length;
    n += filters.badges.length;
    if (filters.inStock) n++;
    if (filters.priceMin) n++;
    if (filters.priceMax) n++;
    return n;
  }, [filters]);

  return { filters, updateFilter, toggleArrayFilter, clearFilters, activeCount };
}