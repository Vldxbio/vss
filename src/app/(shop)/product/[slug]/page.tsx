import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/data/products";
import { ProductPageClient } from "./ProductPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found — VSS" };
  return {
    title: `${product.name.uk} — VSS`,
    description: product.description.uk,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id);

  return <ProductPageClient product={product} related={related} />;
}