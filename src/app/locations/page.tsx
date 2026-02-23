import type { Metadata } from "next";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Visit Ship Bottom Brewery at our taproom in Ship Bottom NJ, tasting room in Beach Haven NJ, or our beer garden at Linvilla Orchards in Media PA.",
};

export default function LocationsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Come See Us
          </p>
          <h1 className="text-5xl sm:text-6xl tracking-wide mb-4">Our Locations</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Three locations to enjoy Ship Bottom Brewery beer — two on Long
            Beach Island and one in the heart of Pennsylvania orchard country.
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {locations.map((loc, idx) => (
            <div
              key={loc.slug}
              className={`bg-white rounded-2xl overflow-hidden border border-sand-dark shadow-sm grid md:grid-cols-2 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Map placeholder */}
              <div
                className={`bg-navy-dark flex items-center justify-center min-h-[300px] relative ${
                  idx % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-amber"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-white font-semibold mb-1">{loc.address}</p>
                  <p className="text-gray-400 text-sm mb-6">
                    {loc.city}, {loc.state} {loc.zip}
                  </p>
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className={`p-8 lg:p-10 ${idx % 2 === 1 ? "md:order-1" : ""}`}>
                <p className="text-amber text-xs font-semibold uppercase tracking-widest mb-2">
                  {loc.subtitle}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-dark mb-4">
                  {loc.name}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {loc.description}
                </p>

                {/* Hours */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-navy-dark uppercase tracking-wider mb-3">
                    Hours
                  </h3>
                  <div className="space-y-1">
                    {loc.hours.map((h, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-500">{h.days}</span>
                        <span className="text-navy-dark font-medium">
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-sm font-semibold text-navy-dark uppercase tracking-wider mb-3">
                    Features
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {loc.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
