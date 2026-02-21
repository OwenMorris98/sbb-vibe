import Link from "next/link";

const footerLinks = {
  Brewery: [
    { href: "/our-beers", label: "Our Beers" },
    { href: "/our-brands", label: "Our Brands" },
    { href: "/beer-finder", label: "Beer Finder" },
    { href: "/our-shop", label: "Shop" },
  ],
  Visit: [
    { href: "/locations", label: "All Locations" },
    { href: "/events", label: "Events" },
    { href: "/beer-food-pairing-recipes", label: "Food Pairings" },
  ],
  Company: [
    { href: "/contact", label: "Contact Us" },
    { href: "/employment-opportunities", label: "Careers" },
    { href: "/charitable-donations", label: "Charitable Donations" },
    { href: "/carry-our-products", label: "Carry Our Products" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber rounded-full flex items-center justify-center font-bold text-white text-sm">
                SBB
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">
                  Ship Bottom Brewery
                </div>
                <div className="text-amber text-xs tracking-widest uppercase">
                  Est. 2016
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Brewed at the Beach for the Beach. Award-winning craft beers made
              for watermen, surfers, and everyone who calls the coast home.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/shipbottombrewery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-light rounded-full flex items-center justify-center hover:bg-amber transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/shipbottombrewery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-light rounded-full flex items-center justify-center hover:bg-amber transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.untappd.com/ShipBottomBrewery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-light rounded-full flex items-center justify-center hover:bg-amber transition-colors"
                aria-label="Untappd"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64 9.55c-.24-.8-.96-1.34-1.79-1.34h-.4l-.36-1.22c-.18-.61-.73-1.02-1.36-1.02-.08 0-.17.01-.25.02l-1.32.23-2.63-3.8c-.43-.62-1.14-.99-1.9-.99-.5 0-.99.17-1.38.47L9.2 3.07 7.85 1.69C7.47 1.26 6.93 1 6.36 1c-.54 0-1.06.22-1.44.61L3.3 3.3c-.38.38-.6.9-.6 1.44 0 .57.26 1.11.69 1.49l1.38 1.35-1.17 1.15C3.22 9.11 3 9.62 3 10.15c0 .5.17.99.47 1.38l.94 1.16-.23 1.32c-.01.08-.02.17-.02.25 0 .63.41 1.18 1.02 1.36l1.22.36v.4c0 .83.54 1.55 1.34 1.79l1.58.47 1.27 3.49c.27.75 1.01 1.27 1.8 1.27h.04c.12-.01.23-.02.34-.05l3.78-.79c.78-.16 1.38-.8 1.47-1.59l.13-1.12 1.31-.85c.69-.45 1.01-1.28.79-2.08l-.34-1.29.68-.95c.3-.42.43-.93.36-1.43l-.21-1.45 1.09-1.27c.42-.49.58-1.14.41-1.77zm-10.01 8.67c-2.52.53-5.02-1.09-5.55-3.61-.53-2.52 1.09-5.02 3.61-5.55 2.52-.53 5.02 1.09 5.55 3.61.53 2.52-1.09 5.02-3.61 5.55z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-navy-light/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ship Bottom Brewery. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-500 italic">
            Please drink responsibly. Must be 21+ to purchase alcohol.
          </p>
          <Link
            href="/privacy-policy"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
