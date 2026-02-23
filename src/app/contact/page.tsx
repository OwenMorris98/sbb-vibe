import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ship Bottom Brewery — inquiries, private events, wholesale, and more.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Get in Touch
          </p>
          <h1 className="text-5xl sm:text-6xl tracking-wide mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            For inquiries, please fill out the form below and we&apos;ll get
            back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-navy-dark mb-4">
                  General Info
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-amber"
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
                    <div>
                      <p className="text-sm font-semibold text-navy-dark">
                        Main Location
                      </p>
                      <p className="text-sm text-gray-600">
                        1261 Long Beach Blvd
                        <br />
                        Ship Bottom, NJ 08008
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-navy-dark mb-4">
                  Quick Links
                </h2>
                <ul className="space-y-2">
                  {[
                    { href: "/locations", label: "All Taproom Locations" },
                    { href: "/events", label: "Upcoming Events" },
                    { href: "/our-beers", label: "Our Beer Lineup" },
                    { href: "/carry-our-products", label: "Wholesale / Distribution" },
                    { href: "/employment-opportunities", label: "Employment" },
                    { href: "/charitable-donations", label: "Charitable Donations" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-ocean hover:text-navy-dark transition-colors flex items-center gap-1"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-navy-dark mb-4">
                  Follow Us
                </h2>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/shipbottombrewery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ocean hover:text-navy-dark transition-colors"
                  >
                    Instagram
                  </a>
                  <span className="text-gray-300">·</span>
                  <a
                    href="https://www.facebook.com/shipbottombrewery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ocean hover:text-navy-dark transition-colors"
                  >
                    Facebook
                  </a>
                  <span className="text-gray-300">·</span>
                  <a
                    href="https://www.untappd.com/ShipBottomBrewery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ocean hover:text-navy-dark transition-colors"
                  >
                    Untappd
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-sand-dark p-8">
                <h2 className="text-xl font-bold text-navy-dark mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
