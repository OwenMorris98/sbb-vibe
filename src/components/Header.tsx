"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/our-beers", label: "Our Beers" },
  { href: "/locations", label: "Locations" },
  { href: "/events", label: "Events" },
  { href: "/our-shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1001] bg-navy-dark/95 backdrop-blur-sm border-b border-navy-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-amber rounded-full flex items-center justify-center font-bold text-white text-sm group-hover:bg-amber/90 transition-colors">
              SBB
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">
                Ship Bottom
              </div>
              <div className="text-amber text-xs leading-tight tracking-widest uppercase">
                Brewery
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  pathname === link.href
                    ? "text-amber"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA button */}
          <div className="hidden md:block">
            <Link
              href="/our-beers"
              className="bg-amber hover:bg-amber/90 text-white text-sm font-semibold px-5 py-2 rounded transition-colors"
            >
              Find Our Beer
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-navy-light/30">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-amber"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-3">
              <Link
                href="/our-beers"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-amber hover:bg-amber/90 text-white text-sm font-semibold px-5 py-2 rounded transition-colors"
              >
                Find Our Beer
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
