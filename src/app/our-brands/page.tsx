import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Ship Bottom Brewery operates multiple brands including our core lineup, blendery program, and seasonal offerings.",
};

const brands = [
  {
    name: "Ship Bottom Brewery",
    tagline: "Brewed at the Beach for the Beach",
    description:
      "Our flagship brand, built on the beaches of Long Beach Island. The Ship Bottom Brewery lineup spans styles from easy-drinking lagers to bold double IPAs — all with a coastal soul. Core beers are available year-round at all taproom locations.",
    beers: ["LBI Lager", "Mermaid Blonde Ale", "Double Overhead IPA", "Shoobie Pale Ale"],
  },
  {
    name: "The Blendery",
    tagline: "Wild & Barrel-Aged Ales",
    description:
      "Our experimental program focused on wild fermentation, barrel aging, and mixed-culture ales. The Blendery produces small-batch, often one-off releases that push the limits of what a beach brewery can be. Available exclusively at the Ship Bottom Blendery & Barrel House.",
    beers: ["Rough Seas Imperial Stout", "Off Season Sour", "Barrel-Aged Seasonals"],
  },
  {
    name: "Hard Cider & Seltzer",
    tagline: "Beyond the Barley",
    description:
      "Ship Bottom Brewery's cider and hard seltzer lines bring the same beach-forward philosophy to non-beer drinkers. Crisp, refreshing, and perfect for a day on the water.",
    beers: ["Flannel Bikini Hard Cider", "Mango Hard Seltzer", "Passion Fruit Hard Seltzer"],
  },
];

export default function OurBrandsPage() {
  return (
    <>
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            The Family
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Brands</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            We brew our beers at the beach to be tough as the people raised on
            our barrier island — beers crafted to handle the harshest winter and
            every wild summer.
          </p>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white rounded-2xl border border-sand-dark p-8"
            >
              <h2 className="text-2xl font-bold text-navy-dark mb-1">
                {brand.name}
              </h2>
              <p className="text-amber text-sm font-semibold mb-4">
                {brand.tagline}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {brand.description}
              </p>
              <div>
                <p className="text-xs font-semibold text-navy-dark uppercase tracking-wider mb-3">
                  Example Beers
                </p>
                <div className="flex flex-wrap gap-2">
                  {brand.beers.map((beer) => (
                    <span
                      key={beer}
                      className="text-sm bg-sand border border-sand-dark text-navy-dark px-3 py-1 rounded-full"
                    >
                      {beer}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center pt-4">
            <Link href="/our-beers" className="btn-primary">
              See the Full Beer Lineup
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
