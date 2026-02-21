import type { Metadata } from "next";
import { beers, categories } from "@/data/beers";
import BeerGrid from "./BeerGrid";

export const metadata: Metadata = {
  title: "Our Beers",
  description:
    "Explore Ship Bottom Brewery's full lineup of award-winning craft beers — from crisp lagers and hazy IPAs to sours, stouts, and hard ciders.",
};

export default function OurBeersPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            The Lineup
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Beers</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Over 60 beers brewed at the beach for the beach. From session
            lagers to barrel-aged stouts, there&apos;s a Ship Bottom beer for
            every moment.
          </p>
        </div>
      </section>

      {/* Beer grid with filters */}
      <section className="py-16 bg-sand min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BeerGrid beers={beers} categories={categories} />
        </div>
      </section>
    </>
  );
}
