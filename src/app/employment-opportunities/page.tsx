import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Employment Opportunities",
  description:
    "Join the Ship Bottom Brewery team. View open positions at our taprooms in Ship Bottom, Beach Haven, and Linvilla Orchards.",
};

export default function EmploymentPage() {
  return (
    <>
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Join the Crew
          </p>
          <h1 className="text-5xl sm:text-6xl tracking-wide mb-4">
            Employment Opportunities
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Work where you love to be — at the beach. We&apos;re always looking
            for passionate people to join the Ship Bottom Brewery family.
          </p>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-sand-dark p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-navy-dark mb-4">
              Current Openings
            </h2>
            <p className="text-gray-600 mb-8">
              We don&apos;t have any specific openings listed at the moment, but
              we&apos;re always interested in meeting talented individuals who
              are passionate about craft beer and hospitality. Send us your
              resume and we&apos;ll keep it on file.
            </p>

            <h3 className="text-lg font-bold text-navy-dark mb-4">
              Positions We Commonly Hire For
            </h3>
            <ul className="space-y-3 mb-8">
              {[
                "Taproom Server / Bartender",
                "Taproom Manager",
                "Brewer / Brewing Assistant",
                "Merchandise & Retail",
                "Events Coordinator",
                "Social Media & Marketing",
              ].map((position) => (
                <li
                  key={position}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="w-2 h-2 rounded-full bg-amber shrink-0" />
                  {position}
                </li>
              ))}
            </ul>

            <Link href="/contact?inquiry=Employment" className="btn-primary">
              Send Us Your Resume
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
