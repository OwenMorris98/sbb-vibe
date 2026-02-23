import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carry Our Products",
  description:
    "Interested in carrying Ship Bottom Brewery products at your bar, restaurant, or retail shop? Get in touch with our distribution team.",
};

export default function CarryOurProductsPage() {
  return (
    <>
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Wholesale & Distribution
          </p>
          <h1 className="text-5xl sm:text-6xl tracking-wide mb-4">
            Carry Our Products
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Bring the taste of LBI to your establishment. We work with bars,
            restaurants, and retail shops throughout New Jersey and Pennsylvania.
          </p>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-sand-dark p-8 lg:p-12 text-center">
            <h2 className="text-2xl font-bold text-navy-dark mb-4">
              Interested in Stocking SBB?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We&apos;re always looking to grow our distribution network. Fill
              out our contact form with details about your business and
              we&apos;ll be in touch with information on our wholesale program.
            </p>
            <Link href="/contact?inquiry=Wholesale" className="btn-primary">
              Contact Our Distribution Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
