"use client";

import { useState } from "react";
import type { Beer, BeerCategory } from "@/data/beers";

interface BeerGridProps {
  beers: Beer[];
  categories: BeerCategory[];
}

const categoryColors: Record<BeerCategory, string> = {
  "Lager & Pilsner": "bg-yellow-100 text-yellow-800",
  IPA: "bg-orange-100 text-orange-800",
  "Pale Ale & Wheat": "bg-lime-100 text-lime-800",
  "Blonde & Amber": "bg-amber-100 text-amber-800",
  "Sour & Specialty": "bg-pink-100 text-pink-800",
  "Stout & Dark": "bg-gray-200 text-gray-800",
  "Cider & Seltzer": "bg-teal-100 text-teal-800",
};

export default function BeerGrid({ beers, categories }: BeerGridProps) {
  const [activeCategory, setActiveCategory] = useState<BeerCategory | "All">(
    "All"
  );

  const filtered =
    activeCategory === "All"
      ? beers
      : beers.filter((b) => b.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "All"
              ? "bg-navy-dark text-white"
              : "bg-white text-gray-600 hover:bg-sand-dark border border-sand-dark"
          }`}
        >
          All Beers ({beers.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-navy-dark text-white"
                : "bg-white text-gray-600 hover:bg-sand-dark border border-sand-dark"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Beer grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((beer) => (
          <div
            key={beer.slug}
            className="bg-white rounded-xl p-5 border border-sand-dark hover:shadow-md transition-shadow"
          >
            {/* Top row: ABV + seasonal badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber uppercase tracking-wider">
                {beer.abv} ABV
              </span>
              {beer.seasonal && (
                <span className="text-xs bg-ocean/10 text-ocean font-medium px-2 py-0.5 rounded-full">
                  Seasonal
                </span>
              )}
              {beer.featured && (
                <span className="text-xs bg-amber/10 text-amber font-medium px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-navy-dark mb-1 leading-tight">
              {beer.name}
            </h3>
            <p className="text-xs text-gray-500 mb-3">{beer.style}</p>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
              {beer.description}
            </p>

            {/* Category pill */}
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[beer.category]}`}
            >
              {beer.category}
            </span>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-16">
          No beers found in this category.
        </p>
      )}
    </>
  );
}
