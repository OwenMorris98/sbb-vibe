import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Shop",
  description:
    "Shop Ship Bottom Brewery merchandise, canned beers, and gift packs online.",
};

export default function OurShopPage() {
  return (
    <>
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            Take It With You
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Shop</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Pick up SBB merch, canned 4-packs, and gift sets to enjoy the beach
            life wherever you are.
          </p>
        </div>
      </section>

      <section className="py-24 bg-sand min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-20 h-20 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-amber"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy-dark mb-3">
              Shop Coming Soon
            </h2>
            <p className="text-gray-600 mb-8">
              We&apos;re building our online shop. In the meantime, pick up
              merchandise and canned beer at any of our taproom locations.
            </p>
            <Link href="/locations" className="btn-primary">
              Find a Location Near You
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
