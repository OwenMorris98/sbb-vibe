import type { Metadata } from "next";
import BeerFinder from "./BeerFinder";

export const metadata: Metadata = {
  title: "Beer Finder",
  description:
    "Find Ship Bottom Brewery beer near you at bars, restaurants, and retail stores across New Jersey and Pennsylvania.",
};

export default function BeerFinderPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy-dark text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <h1 className="text-xl font-bold">Beer Finder</h1>
          <span className="text-gray-500 hidden sm:block">·</span>
          <p className="text-gray-400 text-sm hidden sm:block">
            Search by zip code to find bars, restaurants, and retailers near you.
          </p>
        </div>
      </section>

      {/* Finder */}
      <section className="bg-sand">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-none overflow-hidden border-y border-sand-dark shadow-sm">
            <BeerFinder />
          </div>
        </div>
      </section>

      {/* Attribution required by OpenStreetMap */}
      <div className="bg-sand py-4 text-center">
        <p className="text-xs text-gray-400">
          Map data © <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors · Geocoding by <a href="https://nominatim.org" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">Nominatim</a>
        </p>
      </div>

      {/* CTA for retailers */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-navy-dark mb-3">
            Don&apos;t See Your Favorite Spot?
          </h2>
          <p className="text-gray-600 mb-6">
            Ask your local bar or bottle shop to carry Ship Bottom Brewery, or
            contact us about our wholesale program.
          </p>
          <a
            href="/carry-our-products"
            className="btn-primary"
          >
            Carry Our Products
          </a>
        </div>
      </section>
    </>
  );
}
