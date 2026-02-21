export interface Location {
  slug: string;
  name: string;
  subtitle: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: DayHours[];
  description: string;
  features: string[];
  mapUrl: string;
}

export interface DayHours {
  days: string;
  hours: string;
}

export const locations: Location[] = [
  {
    slug: "ship-bottom",
    name: "Ship Bottom Brewery",
    subtitle: "Blendery & Barrel House",
    address: "1261 Long Beach Blvd",
    city: "Ship Bottom",
    state: "NJ",
    zip: "08008",
    hours: [
      { days: "Monday – Thursday", hours: "12pm – 8pm" },
      { days: "Friday", hours: "12pm – 9pm" },
      { days: "Saturday", hours: "11am – 9pm" },
      { days: "Sunday", hours: "11am – 7pm" },
    ],
    description:
      "Our original home on Long Beach Island. The Ship Bottom taproom is where it all started — a gathering spot for locals, watermen, and anyone who loves great beer and beach culture. The Blendery & Barrel House features our experimental and barrel-aged programs.",
    features: [
      "Full taproom with 20+ taps",
      "Blendery & barrel-aged program",
      "Outdoor seating",
      "Dog friendly",
      "Growler fills",
      "Merchandise available",
    ],
    mapUrl:
      "https://maps.google.com/?q=1261+Long+Beach+Blvd,+Ship+Bottom,+NJ+08008",
  },
  {
    slug: "beach-haven",
    name: "Beach Haven Tasting Room",
    subtitle: "South End of LBI",
    address: "300 N. Bay Ave",
    city: "Beach Haven",
    state: "NJ",
    zip: "08008",
    hours: [
      { days: "Monday – Thursday", hours: "12pm – 8pm" },
      { days: "Friday", hours: "12pm – 9pm" },
      { days: "Saturday", hours: "11am – 9pm" },
      { days: "Sunday", hours: "11am – 7pm" },
    ],
    description:
      "Located at the southern end of Long Beach Island in beautiful Beach Haven, our tasting room brings the Ship Bottom Brewery experience to the heart of the island's dining and entertainment district.",
    features: [
      "Full tap selection",
      "Food-friendly menu",
      "Indoor & outdoor seating",
      "Waterfront views",
      "Live music events",
      "Retail bottles & cans",
    ],
    mapUrl:
      "https://maps.google.com/?q=300+N+Bay+Ave,+Beach+Haven,+NJ+08008",
  },
  {
    slug: "linvilla-orchards",
    name: "Beer Garden at Linvilla Orchards",
    subtitle: "Media, Pennsylvania",
    address: "137 W Knowlton Rd",
    city: "Media",
    state: "PA",
    zip: "19063",
    hours: [
      { days: "Friday", hours: "4pm – 8pm" },
      { days: "Saturday", hours: "12pm – 8pm" },
      { days: "Sunday", hours: "12pm – 6pm" },
    ],
    description:
      "Nestled within the historic Linvilla Orchards farm, our seasonal beer garden brings the Ship Bottom experience to the Philadelphia suburbs. Enjoy our craft beers surrounded by apple orchards, pick-your-own produce, and all the charm of a working family farm.",
    features: [
      "Seasonal outdoor beer garden",
      "On-site food options",
      "Family & pet friendly",
      "Farm setting & activities",
      "Limited tap selection",
      "Seasonal hours vary",
    ],
    mapUrl:
      "https://maps.google.com/?q=137+W+Knowlton+Rd,+Media,+PA+19063",
  },
];
