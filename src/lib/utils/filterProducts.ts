import type { Product } from "@/types";
import type { CatalogFilters, SortOption } from "@/lib/hooks/useCatalogFilters";

export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.sizes.length > 0) {
    result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
  }

  if (filters.badges.length > 0) {
    result = result.filter((p) => p.badges.some((b) => filters.badges.includes(b)));
  }

  if (filters.inStock) {
    result = result.filter((p) => p.stock > 0 && !p.badges.includes("soldout"));
  }

  if (filters.priceMin !== undefined) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }

  if (filters.priceMax !== undefined) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }

  // Sort
  result = sortProducts(result, filters.sort);

  return result;
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "limited":
      return sorted.sort((a, b) => {
        const aLim = a.badges.includes("limited") ? 1 : 0;
        const bLim = b.badges.includes("limited") ? 1 : 0;
        return bLim - aLim;
      });
    case "popular":
      return sorted.sort((a, b) => b.stock - a.stock);
    case "newest":
    default:
      return sorted.sort((a, b) => {
        const aNew = a.badges.includes("new") ? 1 : 0;
        const bNew = b.badges.includes("new") ? 1 : 0;
        return bNew - aNew;
      });
  }
}