import type { Metadata } from "next";
import { fetchProducts } from "@/lib/products";
import ProductGrid from "./ProductGrid";

export const metadata: Metadata = {
  title: "Our Shop",
  description:
    "Shop Ship Bottom Brewery merchandise, canned beers, and gift packs online.",
};

export default async function OurShopPage() {
  const products = await fetchProducts();

  return (
    <>
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Take It With You
          </p>
          <h1 className="text-5xl sm:text-6xl tracking-wide mb-4">Our Shop</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Pick up SBB merch, canned 4-packs, and gift sets to enjoy the beach
            life wherever you are.
          </p>
        </div>
      </section>

      <section className="py-16 bg-sand min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
