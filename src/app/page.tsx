import Link from "next/link";
import { featuredBeers } from "@/data/beers";
import { locations } from "@/data/locations";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] bg-navy-dark flex items-center overflow-hidden">
        {/* Background wave pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.266 24.394 4.701 7.559 2.91 12.786 3.442 17.606 1.299L100 19.11V.001H0v19.11c4.495 2.035 8.897 2.08 14.409.038l.401-.149 6.374-2.38zm0 0'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-5">
              Long Beach Island, New Jersey
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl text-white leading-none mb-6 tracking-wide">
              Brewed at the Beach
              <span className="block text-amber">for the Beach.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              Award-winning craft beers made for watermen, surfers, and everyone
              who calls the coast home. Tough as the people raised on our
              barrier island.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/our-beers" className="btn-primary">
                Explore Our Beers
              </Link>
              <Link href="/locations" className="btn-outline">
                Find a Taproom
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-4">
                Our Story
              </p>
              <h2 className="section-heading mb-6">
                Proud to Call the Beach Our Home
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ship Bottom Brewery was born from a love of craft beer and a
                deep connection to Long Beach Island. We brew our beers at the
                beach to be as tough as the people raised on our barrier island
                — beers crafted to handle the harshest winter and the most
                relentless summer crowd.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every beer we make celebrates the watermen, the surfers, the
                year-rounders, and the shoobie visitors who make LBI what it is.
                From our flagship taproom in Ship Bottom to our locations in
                Beach Haven and beyond, we&apos;re here to serve the community
                we love.
              </p>
              <Link href="/our-brands" className="btn-primary">
                Our Brands
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-navy-dark rounded-lg p-8 text-center text-white">
                <div className="text-5xl font-display text-amber mb-2 leading-none">60+</div>
                <div className="text-xs text-gray-300 uppercase tracking-widest mt-2">
                  Beers Brewed
                </div>
              </div>
              <div className="bg-ocean rounded-lg p-8 text-center text-white">
                <div className="text-5xl font-display text-white mb-2 leading-none">3</div>
                <div className="text-xs text-white/70 uppercase tracking-widest mt-2">
                  Locations
                </div>
              </div>
              <div className="bg-amber rounded-lg p-8 text-center text-white">
                <div className="text-5xl font-display mb-2 leading-none">LBI</div>
                <div className="text-xs text-white/70 uppercase tracking-widest mt-2">
                  Homebase
                </div>
              </div>
              <div className="bg-navy-light rounded-lg p-8 text-center text-white">
                <div className="text-5xl font-display text-amber mb-2 leading-none">∞</div>
                <div className="text-xs text-gray-300 uppercase tracking-widest mt-2">
                  Good Vibes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured beers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-2">
                On Tap
              </p>
              <h2 className="section-heading">Featured Beers</h2>
            </div>
            <Link
              href="/our-beers"
              className="text-xs font-bold uppercase tracking-widest text-navy-dark hover:text-amber transition-colors flex items-center gap-1 shrink-0"
            >
              View All Beers
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBeers.map((beer) => (
              <div
                key={beer.slug}
                className="bg-sand rounded-xl p-6 border border-sand-dark hover:shadow-lg transition-shadow group"
              >
                {/* Style badge */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-amber" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {beer.style}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-navy-dark mb-2 group-hover:text-ocean transition-colors">
                  {beer.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {beer.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber">
                    {beer.abv} ABV
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gray-400">{beer.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-navy-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-3">
              Where to Find Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-display mb-4">
              Our Locations
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Visit us on Long Beach Island or check out our beer garden at
              Linvilla Orchards in Pennsylvania.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.slug}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber/40 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-1">
                  {loc.name}
                </h3>
                <p className="text-amber text-xs font-bold uppercase tracking-widest mb-4">{loc.subtitle}</p>
                <p className="text-gray-400 text-sm mb-1">{loc.address}</p>
                <p className="text-gray-400 text-sm mb-4">
                  {loc.city}, {loc.state} {loc.zip}
                </p>
                <div className="border-t border-white/10 pt-4 mb-4">
                  {loc.hours.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">{h.days}</span>
                      <span className="text-white">{h.hours}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-amber hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Get Directions
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/locations" className="btn-outline">
              View All Location Details
            </Link>
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-24 bg-ocean text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.35em] mb-4">
            Always Something Going On
          </p>
          <h2 className="text-4xl sm:text-5xl font-display mb-6">
            Events &amp; Happenings
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            From live music and trivia nights to seasonal beer releases and
            community fundraisers — there&apos;s always something to celebrate
            at Ship Bottom Brewery.
          </p>
          <Link href="/events" className="btn-outline">
            See Upcoming Events
          </Link>
        </div>
      </section>
    </>
  );
}
