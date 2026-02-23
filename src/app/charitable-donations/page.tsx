import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Charitable Donations",
  description:
    "Ship Bottom Brewery is proud to support local organizations and causes. Learn how to request a charitable donation.",
};

export default function CharitableDonationsPage() {
  return (
    <>
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Giving Back
          </p>
          <h1 className="text-5xl sm:text-6xl tracking-wide mb-4">
            Charitable Donations
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Ship Bottom Brewery is proud to support the communities that support
            us. We regularly donate to local nonprofits, schools, and causes.
          </p>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-sand-dark p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-navy-dark mb-4">
              Request a Donation
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We receive many donation requests throughout the year. To be
              considered, your organization must be a registered 501(c)(3)
              nonprofit serving the Long Beach Island area or surrounding
              communities in New Jersey or Pennsylvania.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Please submit your request at least 4 weeks before your event
              date. We do our best to respond to all requests.
            </p>
            <Link href="/contact?inquiry=Charitable+Donation+Request" className="btn-primary">
              Submit a Donation Request
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
