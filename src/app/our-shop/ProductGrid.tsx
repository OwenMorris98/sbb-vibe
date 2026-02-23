"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/components/CartProvider";

interface ProductGridProps {
  products: Product[];
}

const ALL_LABEL = "All";
// Stock at or below this number shows a "X left" warning label
const LOW_STOCK_THRESHOLD = 5;
// Sentinel value used for unlimited / untracked stock (legacy inStock=TRUE rows)
const UNLIMITED = 9999;

export default function ProductGrid({ products }: ProductGridProps) {
  const { addItem, items } = useCart();

  const categories = [
    ALL_LABEL,
    ...Array.from(new Set(products.map((p) => p.category))).sort(),
  ];

  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered =
    activeCategory === ALL_LABEL
      ? products
      : products.filter((p) => p.category === activeCategory);

  function cartQtyFor(productId: string): number {
    return items.find((i) => i.product.id === productId)?.quantity ?? 0;
  }

  function handleAdd(product: Product) {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg mb-2">Products are on their way!</p>
        <p className="text-sm">Check back soon or visit one of our taprooms.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Category filter tabs */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                activeCategory === cat
                  ? "bg-amber text-white"
                  : "bg-white text-navy border border-gray-200 hover:border-amber hover:text-amber"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => {
          const inCart = cartQtyFor(product.id);
          const outOfStock = product.stock <= 0;
          const atLimit = inCart >= product.stock && product.stock < UNLIMITED;
          const isLowStock =
            product.stock > 0 &&
            product.stock <= LOW_STOCK_THRESHOLD &&
            product.stock < UNLIMITED;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
            >
              {/* Product image */}
              <div className="relative h-52 bg-gray-50 flex items-center justify-center">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <svg
                    className="w-16 h-16 text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}

                {outOfStock && (
                  <span className="absolute top-3 right-3 bg-gray-800/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Sold Out
                  </span>
                )}
                {isLowStock && (
                  <span className="absolute top-3 right-3 bg-amber/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {product.stock} left
                  </span>
                )}
                {product.category && (
                  <span className="absolute top-3 left-3 bg-navy/80 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Product info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-navy-dark text-base leading-snug mb-1">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-navy-dark font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAdd(product)}
                    disabled={outOfStock || atLimit}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      outOfStock || atLimit
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : addedId === product.id
                        ? "bg-green-500 text-white"
                        : "bg-amber text-white hover:bg-amber/90"
                    }`}
                  >
                    {outOfStock
                      ? "Sold Out"
                      : atLimit
                      ? "Max in cart"
                      : addedId === product.id
                      ? "Added!"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          No products in this category yet.
        </p>
      )}
    </div>
  );
}
