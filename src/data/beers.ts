export type BeerCategory =
  | "Lager & Pilsner"
  | "IPA"
  | "Pale Ale & Wheat"
  | "Blonde & Amber"
  | "Sour & Specialty"
  | "Stout & Dark"
  | "Cider & Seltzer";

export interface Beer {
  slug: string;
  name: string;
  style: string;
  abv: string;
  category: BeerCategory;
  description: string;
  seasonal?: boolean;
  featured?: boolean;
}

export const beers: Beer[] = [
  // Lager & Pilsner
  {
    slug: "lbi-lager",
    name: "LBI Lager",
    style: "American Lager",
    abv: "4.8%",
    category: "Lager & Pilsner",
    description:
      "Crisp and clean, this easy-drinking lager was made for long days on Long Beach Island. Light-bodied with a refreshing finish perfect for the shore.",
    featured: true,
  },
  {
    slug: "barnegat-lager",
    name: "Barnegat Lager",
    style: "American Lager",
    abv: "4.5%",
    category: "Lager & Pilsner",
    description:
      "Named after the Barnegat Bay, this smooth lager is as easy-going as a day on the water. Light malt sweetness with a clean, dry finish.",
  },
  {
    slug: "grazie-italian-pilsner",
    name: "Grazie Italian Pilsner",
    style: "Italian Pilsner",
    abv: "5.2%",
    category: "Lager & Pilsner",
    description:
      "Brewed in the Italian style with a dry-hopped floral character. Crisp, refreshing, and highly sessionable with a subtle bitterness.",
  },
  {
    slug: "czech-pilsner",
    name: "Czech Pilsner",
    style: "Czech-Style Pilsner",
    abv: "4.6%",
    category: "Lager & Pilsner",
    description:
      "Traditional Czech-style pilsner with Saaz hops delivering a spicy, herbal aroma and a clean, crisp finish. A proper European import experience.",
  },
  {
    slug: "mexican-cerveza",
    name: "Mexican Cerveza",
    style: "Mexican-Style Lager",
    abv: "4.4%",
    category: "Lager & Pilsner",
    description:
      "Light and refreshing with a hint of corn sweetness. Best enjoyed ice cold on a hot beach day. Goes great with a squeeze of lime.",
  },
  // IPA
  {
    slug: "double-overhead-ipa",
    name: "Double Overhead IPA",
    style: "Double IPA",
    abv: "8.5%",
    category: "IPA",
    description:
      "Like the waves that inspired it, this DIPA hits hard with a massive hop punch of citrus and tropical fruit. Dangerously smooth for its strength.",
    featured: true,
  },
  {
    slug: "sunny-haze-ahead-ipa",
    name: "Sunny Haze Ahead IPA",
    style: "Hazy IPA",
    abv: "6.8%",
    category: "IPA",
    description:
      "Hazy and juicy with massive tropical fruit character — mango, pineapple, and citrus zest. Soft bitterness and a pillowy mouthfeel.",
    featured: true,
  },
  {
    slug: "orange-sunset-double-ipa",
    name: "Orange Sunset Double IPA",
    style: "Double IPA",
    abv: "9.0%",
    category: "IPA",
    description:
      "Inspired by those fiery LBI sunsets, this double IPA bursts with orange peel and citrus hops. Bold, beautiful, and unforgettable.",
  },
  {
    slug: "shack-ipa",
    name: "Shack IPA",
    style: "American IPA",
    abv: "6.5%",
    category: "IPA",
    description:
      "A classic American IPA with piney, resinous hops balanced by a solid malt backbone. Exactly what you want after a day at the beach shack.",
  },
  {
    slug: "long-peach-island-ipa",
    name: "Long Peach Island IPA",
    style: "Fruit IPA",
    abv: "6.2%",
    category: "IPA",
    description:
      "A play on Long Beach Island, this IPA is brewed with real peach for a bright, fruity aroma that pairs perfectly with the hop character.",
  },
  {
    slug: "hop-hazy-ipa",
    name: "Hop Hazy IPA",
    style: "Hazy IPA",
    abv: "7.0%",
    category: "IPA",
    description:
      "Unfiltered and abundantly hopped, this hazy showcases stone fruit and floral notes with a creamy, pillowy mouthfeel.",
  },
  // Pale Ale & Wheat
  {
    slug: "shoobie-pale-ale",
    name: "Shoobie Pale Ale",
    style: "American Pale Ale",
    abv: "5.2%",
    category: "Pale Ale & Wheat",
    description:
      "For the summer visitors who love the beach — a balanced, approachable pale ale with citrus hops and a clean malt backbone. Welcome to the island.",
    featured: true,
  },
  {
    slug: "blueberry-wheat-ale",
    name: "Blueberry Wheat Ale",
    style: "Fruit Wheat Ale",
    abv: "5.0%",
    category: "Pale Ale & Wheat",
    description:
      "Brewed with real blueberries, this smooth wheat ale delivers a light berry sweetness and aroma. Light-bodied and incredibly refreshing.",
  },
  {
    slug: "beach-patrol",
    name: "Beach Patrol",
    style: "American Pale Ale",
    abv: "5.4%",
    category: "Pale Ale & Wheat",
    description:
      "Crisp, hop-forward, and ready for duty. This pale ale keeps watch over your weekend with clean citrus hops and an easy-drinking character.",
  },
  // Blonde & Amber
  {
    slug: "mermaid-blonde-ale",
    name: "Mermaid Blonde Ale",
    style: "Blonde Ale",
    abv: "4.9%",
    category: "Blonde & Amber",
    description:
      "Smooth, golden, and effortlessly beautiful — just like its namesake. This blonde ale is light, slightly sweet, and perfect for any occasion.",
    featured: true,
  },
  {
    slug: "coastal-living",
    name: "Coastal Living",
    style: "Amber Ale",
    abv: "5.5%",
    category: "Blonde & Amber",
    description:
      "Warm amber hues and a toasty caramel malt character reflect the easy coastal lifestyle. A satisfying middle ground between light and full-bodied.",
  },
  {
    slug: "shore-shandy-ale",
    name: "Shore Shandy Ale",
    style: "Shandy",
    abv: "4.2%",
    category: "Blonde & Amber",
    description:
      "Half ale, half citrus refreshment — this shandy is the ultimate beach drink. Light, lemony, and designed for hot summer afternoons.",
  },
  // Sour & Specialty
  {
    slug: "off-season-sour",
    name: "Off Season Sour",
    style: "Sour Ale",
    abv: "5.8%",
    category: "Sour & Specialty",
    description:
      "A tart and funky sour brewed to honor the quiet, rugged off-season. Complex, acidic, and endlessly interesting — not for the faint of heart.",
  },
  {
    slug: "bomb-pop-sour-ale",
    name: "Bomb Pop Sour Ale",
    style: "Fruited Sour",
    abv: "5.5%",
    category: "Sour & Specialty",
    description:
      "Inspired by the classic summer popsicle, this sour explodes with cherry, lemon, and blue raspberry. Bright, tart, and pure nostalgia in a glass.",
  },
  {
    slug: "do-not-pass-gose",
    name: "Do Not Pass Gose",
    style: "Gose",
    abv: "4.8%",
    category: "Sour & Specialty",
    description:
      "A traditional German-style gose with a refreshing tartness and a hint of sea salt that makes this sessionable sour uniquely beachy.",
  },
  {
    slug: "mango-tart",
    name: "Mango Tart",
    style: "Fruited Sour",
    abv: "5.0%",
    category: "Sour & Specialty",
    description:
      "Lusciously tart with generous mango additions, this sour strikes the perfect balance between sweet tropical fruit and sharp acidity.",
  },
  // Stout & Dark
  {
    slug: "local-stout",
    name: "Local Stout",
    style: "American Stout",
    abv: "6.2%",
    category: "Stout & Dark",
    description:
      "Rich and roasty, this stout is brewed tough for the locals who ride out every winter season. Dark chocolate and coffee notes with a smooth finish.",
  },
  {
    slug: "rough-seas",
    name: "Rough Seas",
    style: "Imperial Stout",
    abv: "9.5%",
    category: "Stout & Dark",
    description:
      "As intense as a nor'easter, this imperial stout is deep, dark, and complex. Bold roasted malt, dark fruit, and a warming boozy character.",
    seasonal: true,
  },
  // Cider & Seltzer
  {
    slug: "flannel-bikini-hard-cider",
    name: "Flannel Bikini Hard Cider",
    style: "Hard Cider",
    abv: "5.5%",
    category: "Cider & Seltzer",
    description:
      "The bridge between seasons — crisp apple cider with a slight tartness. Named for that moment when summer ends but you're not quite ready to let go.",
  },
  {
    slug: "mango-hard-seltzer",
    name: "Mango Hard Seltzer",
    style: "Hard Seltzer",
    abv: "4.5%",
    category: "Cider & Seltzer",
    description:
      "Light, bubbly, and bursting with natural mango flavor. Clean and low-calorie, perfect for an active day on the island.",
  },
  {
    slug: "passion-fruit-hard-seltzer",
    name: "Passion Fruit Hard Seltzer",
    style: "Hard Seltzer",
    abv: "4.5%",
    category: "Cider & Seltzer",
    description:
      "Exotic passion fruit flavor in a sparkling, refreshing package. A tropical escape in every sip.",
  },
];

export const categories: BeerCategory[] = [
  "Lager & Pilsner",
  "IPA",
  "Pale Ale & Wheat",
  "Blonde & Amber",
  "Sour & Specialty",
  "Stout & Dark",
  "Cider & Seltzer",
];

export const featuredBeers = beers.filter((b) => b.featured);
