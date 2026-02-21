import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Find upcoming events at Ship Bottom Brewery — live music, trivia nights, seasonal beer releases, and more.",
};

// Placeholder events — in production these would come from an API or CMS
const events = [
  {
    id: 1,
    title: "Friday Night Live Music",
    date: "Every Friday",
    time: "7:00 PM – 10:00 PM",
    location: "Ship Bottom Taproom",
    description:
      "Join us every Friday evening for live acoustic music. Relax with a cold pint and enjoy local artists in a laid-back beach atmosphere.",
    category: "Music",
  },
  {
    id: 2,
    title: "Trivia Night",
    date: "Every Wednesday",
    time: "7:00 PM – 9:00 PM",
    location: "Ship Bottom Taproom",
    description:
      "Put your knowledge to the test at our weekly trivia night. Teams of up to 6. Prizes for top teams and great beer specials all night.",
    category: "Trivia",
  },
  {
    id: 3,
    title: "Spring Beer Release",
    date: "March 22, 2025",
    time: "12:00 PM – Close",
    location: "All Locations",
    description:
      "Celebrate the arrival of spring with our newest seasonal releases. New hazy IPAs, sours, and a special limited edition barrel-aged ale.",
    category: "Release",
  },
  {
    id: 4,
    title: "Community Charity Night",
    date: "April 5, 2025",
    time: "5:00 PM – 9:00 PM",
    location: "Beach Haven Tasting Room",
    description:
      "A portion of all tap sales goes directly to a local LBI charity. Come out, drink great beer, and give back to the community.",
    category: "Charity",
  },
  {
    id: 5,
    title: "Linvilla Opening Weekend",
    date: "May 10–11, 2025",
    time: "12:00 PM – 8:00 PM",
    location: "Linvilla Orchards Beer Garden",
    description:
      "The beer garden at Linvilla Orchards opens for the season! Join us for our grand opening weekend with special pours, live music, and farm activities.",
    category: "Special Event",
  },
  {
    id: 6,
    title: "Summer Kickoff Party",
    date: "May 24, 2025",
    time: "11:00 AM – Close",
    location: "Ship Bottom Taproom",
    description:
      "Kick off the summer season right! Beach games, live music, food trucks, and the debut of our summer seasonal lineup.",
    category: "Special Event",
  },
];

const categoryColors: Record<string, string> = {
  Music: "bg-purple-100 text-purple-800",
  Trivia: "bg-blue-100 text-blue-800",
  Release: "bg-amber-100 text-amber-800",
  Charity: "bg-green-100 text-green-800",
  "Special Event": "bg-orange-100 text-orange-800",
};

export default function EventsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            What&apos;s Happening
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Events</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            From live music to beer releases, there&apos;s always something going
            on at Ship Bottom Brewery.
          </p>
        </div>
      </section>

      {/* Events list */}
      <section className="py-16 bg-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl border border-sand-dark p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[event.category] ?? "bg-gray-100 text-gray-700"}`}
                      >
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-navy-dark mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
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
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Private events CTA */}
          <div className="mt-12 bg-navy-dark rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Planning a Private Event?
            </h3>
            <p className="text-gray-300 mb-6">
              Ship Bottom Brewery is available for private events, corporate
              gatherings, and special celebrations. Contact us to learn more.
            </p>
            <Link href="/contact" className="btn-outline">
              Inquire About Private Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
