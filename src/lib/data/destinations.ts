// src/lib/data/destinations.ts
// Centralized destination data - replace with CMS or database later

export interface Destination {
  id: number;
  slug: string;
  name: string;
  country: string;
  region: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  tourCount: number;
  highlights: string[];
  bestTimeToVisit: string;
  weather: {
    summer: string;
    winter: string;
  };
  languages: string[];
  currency: string;
  timezone: string;
  quickFacts: {
    label: string;
    value: string;
  }[];
  thingsToDo: {
    title: string;
    description: string;
    image: string;
  }[];
  featured: boolean;
}

export const destinations: Destination[] = [
  {
    id: 1,
    slug: "almaty",
    name: "Almaty",
    country: "Kazakhstan",
    region: "Central Asia",
    description:
      "Kazakhstan's largest city, nestled at the foot of the majestic Tian Shan mountains.",
    longDescription:
      "Almaty, the former capital of Kazakhstan, is a vibrant metropolis that perfectly blends Soviet-era architecture with modern skyscrapers, all set against the stunning backdrop of the snow-capped Tian Shan mountains. Known as the 'City of Apples' (the name literally means 'Father of Apples'), Almaty is believed to be the ancestral home of all apples. Today, it serves as the cultural and economic heart of Kazakhstan, offering world-class museums, bustling bazaars, excellent cuisine, and easy access to incredible mountain adventures.",
    image: "/images/destinations/almaty.jpg",
    gallery: [
      "/images/destinations/almaty-1.jpg",
      "/images/destinations/almaty-2.jpg",
      "/images/destinations/almaty-3.jpg",
      "/images/destinations/almaty-4.jpg",
    ],
    tourCount: 12,
    highlights: [
      "Stunning Tian Shan mountain views",
      "World-class skiing at Shymbulak",
      "Historic Green Bazaar",
      "Soviet-era architecture",
      "Gateway to natural wonders",
    ],
    bestTimeToVisit: "May to September for hiking; December to March for skiing",
    weather: {
      summer: "Warm and pleasant, 25-30°C (77-86°F)",
      winter: "Cold with snow, -5 to -15°C (23 to 5°F)",
    },
    languages: ["Kazakh", "Russian"],
    currency: "Kazakhstani Tenge (KZT)",
    timezone: "UTC+6",
    quickFacts: [
      { label: "Population", value: "2 million" },
      { label: "Elevation", value: "700-900m" },
      { label: "Founded", value: "1854" },
      { label: "Airport", value: "ALA" },
    ],
    thingsToDo: [
      {
        title: "Big Almaty Lake",
        description:
          "A stunning turquoise alpine lake at 2,511m elevation, surrounded by snow-capped peaks.",
        image: "/images/destinations/almaty-lake.jpg",
      },
      {
        title: "Medeu & Shymbulak",
        description:
          "Visit the world's highest skating rink and ski at the premier Central Asian resort.",
        image: "/images/destinations/almaty-shymbulak.jpg",
      },
      {
        title: "Green Bazaar",
        description:
          "Experience the vibrant colors, sounds, and flavors of this historic Central Asian market.",
        image: "/images/destinations/almaty-bazaar.jpg",
      },
      {
        title: "Charyn Canyon",
        description:
          "Often called the 'Grand Canyon's little brother,' featuring stunning red rock formations.",
        image: "/images/destinations/almaty-charyn.jpg",
      },
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "samarkand",
    name: "Samarkand",
    country: "Uzbekistan",
    region: "Central Asia",
    description:
      "One of the oldest cities in the world, featuring stunning Islamic architecture and Silk Road history.",
    longDescription:
      "Samarkand is a city that seems to have sprung from the pages of One Thousand and One Nights. As one of the oldest continuously inhabited cities in Central Asia, it has witnessed the passage of Alexander the Great, Genghis Khan, and Tamerlane, who made it his magnificent capital. The city's UNESCO-listed historic center showcases some of the finest examples of Islamic architecture in the world, with azure-tiled mosques, madrasas, and mausoleums that have captivated travelers for centuries.",
    image: "/images/destinations/samarkand.jpg",
    gallery: [
      "/images/destinations/samarkand-1.jpg",
      "/images/destinations/samarkand-2.jpg",
      "/images/destinations/samarkand-3.jpg",
      "/images/destinations/samarkand-4.jpg",
    ],
    tourCount: 8,
    highlights: [
      "UNESCO World Heritage Registan Square",
      "Ancient Silk Road history",
      "Stunning blue-tiled architecture",
      "Traditional craft workshops",
      "Legendary hospitality",
    ],
    bestTimeToVisit: "April to June and September to November",
    weather: {
      summer: "Hot and dry, 35-40°C (95-104°F)",
      winter: "Mild, 0-10°C (32-50°F)",
    },
    languages: ["Uzbek", "Russian", "Tajik"],
    currency: "Uzbekistani Som (UZS)",
    timezone: "UTC+5",
    quickFacts: [
      { label: "Population", value: "500,000" },
      { label: "Elevation", value: "702m" },
      { label: "Founded", value: "700 BCE" },
      { label: "UNESCO Site", value: "2001" },
    ],
    thingsToDo: [
      {
        title: "Registan Square",
        description:
          "The heart of ancient Samarkand, featuring three magnificent madrasas with intricate tilework.",
        image: "/images/destinations/samarkand-registan.jpg",
      },
      {
        title: "Shah-i-Zinda",
        description:
          "A stunning avenue of mausoleums, considered one of the most beautiful necropolis in the Islamic world.",
        image: "/images/destinations/samarkand-shahizinda.jpg",
      },
      {
        title: "Bibi-Khanym Mosque",
        description:
          "Once one of the largest mosques in the Islamic world, built by Tamerlane in the 15th century.",
        image: "/images/destinations/samarkand-bibikhanym.jpg",
      },
      {
        title: "Siab Bazaar",
        description:
          "A traditional market where you can find the famous Samarkand bread, spices, and dried fruits.",
        image: "/images/destinations/samarkand-bazaar.jpg",
      },
    ],
    featured: true,
  },
  {
    id: 3,
    slug: "bishkek",
    name: "Bishkek",
    country: "Kyrgyzstan",
    region: "Central Asia",
    description:
      "A leafy, laid-back capital city serving as the perfect gateway to Kyrgyzstan's mountain wilderness.",
    longDescription:
      "Bishkek surprises visitors with its tree-lined boulevards, vibrant café culture, and relaxed atmosphere. While it may lack the ancient monuments of its neighbors, this young capital offers a unique blend of Soviet heritage, nomadic traditions, and modern Central Asian life. More importantly, Bishkek serves as the launching point for adventures into Kyrgyzstan's spectacular mountain landscapes, from the celestial peaks of the Tian Shan to the shores of pristine alpine lakes.",
    image: "/images/destinations/bishkek.jpg",
    gallery: [
      "/images/destinations/bishkek-1.jpg",
      "/images/destinations/bishkek-2.jpg",
      "/images/destinations/bishkek-3.jpg",
      "/images/destinations/bishkek-4.jpg",
    ],
    tourCount: 6,
    highlights: [
      "Gateway to mountain adventures",
      "Vibrant café and nightlife scene",
      "Fascinating Osh Bazaar",
      "Soviet-era monuments",
      "Warm and welcoming locals",
    ],
    bestTimeToVisit: "June to September for trekking; year-round for city visits",
    weather: {
      summer: "Warm, 25-35°C (77-95°F)",
      winter: "Cold, -5 to -10°C (23-14°F)",
    },
    languages: ["Kyrgyz", "Russian"],
    currency: "Kyrgyzstani Som (KGS)",
    timezone: "UTC+6",
    quickFacts: [
      { label: "Population", value: "1 million" },
      { label: "Elevation", value: "800m" },
      { label: "Founded", value: "1878" },
      { label: "Airport", value: "FRU" },
    ],
    thingsToDo: [
      {
        title: "Ala-Archa National Park",
        description:
          "Just 40km from the city, this alpine park offers stunning hiking among glaciers and peaks.",
        image: "/images/destinations/bishkek-alaarcha.jpg",
      },
      {
        title: "Osh Bazaar",
        description:
          "The largest and most colorful bazaar in Bishkek, perfect for experiencing local life.",
        image: "/images/destinations/bishkek-osh-bazaar.jpg",
      },
      {
        title: "State Historical Museum",
        description:
          "Learn about Kyrgyz nomadic culture and history in this Soviet-era building.",
        image: "/images/destinations/bishkek-museum.jpg",
      },
      {
        title: "Victory Square",
        description:
          "A moving WWII memorial featuring an eternal flame and the iconic yurt-shaped monument.",
        image: "/images/destinations/bishkek-victory.jpg",
      },
    ],
    featured: true,
  },
  {
    id: 4,
    slug: "astana",
    name: "Astana",
    country: "Kazakhstan",
    region: "Central Asia",
    description:
      "Kazakhstan's futuristic capital city, rising from the steppe with bold modern architecture.",
    longDescription:
      "Astana (also known as Nur-Sultan) is one of the world's most ambitious urban projects. Since becoming Kazakhstan's capital in 1997, this once-sleepy provincial town has transformed into a showcase of futuristic architecture designed by world-renowned architects. The city's skyline features bold structures like the Bayterek Tower, the Palace of Peace and Reconciliation, and the Khan Shatyr entertainment center, creating a surreal cityscape that rises dramatically from the endless Kazakh steppe.",
    image: "/images/destinations/astana.jpg",
    gallery: [
      "/images/destinations/astana-1.jpg",
      "/images/destinations/astana-2.jpg",
      "/images/destinations/astana-3.jpg",
      "/images/destinations/astana-4.jpg",
    ],
    tourCount: 5,
    highlights: [
      "Stunning futuristic architecture",
      "World-class museums",
      "Bayterek Tower panoramic views",
      "Khan Shatyr entertainment complex",
      "Palace of Peace and Reconciliation",
    ],
    bestTimeToVisit: "May to September (winters are extremely cold)",
    weather: {
      summer: "Warm, 25-30°C (77-86°F)",
      winter: "Extremely cold, -20 to -35°C (-4 to -31°F)",
    },
    languages: ["Kazakh", "Russian"],
    currency: "Kazakhstani Tenge (KZT)",
    timezone: "UTC+6",
    quickFacts: [
      { label: "Population", value: "1.2 million" },
      { label: "Elevation", value: "347m" },
      { label: "Capital since", value: "1997" },
      { label: "Airport", value: "NQZ" },
    ],
    thingsToDo: [
      {
        title: "Bayterek Tower",
        description:
          "The 97-meter symbol of the city, offering panoramic views from its golden orb.",
        image: "/images/destinations/astana-bayterek.jpg",
      },
      {
        title: "Khan Shatyr",
        description:
          "The world's largest tent, housing a shopping center, park, and even a beach resort.",
        image: "/images/destinations/astana-khanshatyr.jpg",
      },
      {
        title: "Palace of Peace",
        description:
          "A stunning pyramid designed by Norman Foster, hosting religious and cultural events.",
        image: "/images/destinations/astana-palace.jpg",
      },
      {
        title: "National Museum",
        description:
          "Kazakhstan's largest museum, showcasing the nation's history from ancient to modern times.",
        image: "/images/destinations/astana-museum.jpg",
      },
    ],
    featured: true,
  },
  {
    id: 5,
    slug: "bukhara",
    name: "Bukhara",
    country: "Uzbekistan",
    region: "Central Asia",
    description:
      "A living museum of medieval Islamic architecture and one of the holiest cities in Central Asia.",
    longDescription:
      "Bukhara is the most complete example of a medieval city in Central Asia, with an urban fabric that has remained largely intact for centuries. Once a major center of Islamic learning and culture, the city was home to hundreds of mosques, madrasas, and caravanserais. Walking through its narrow streets and covered bazaars, past ancient hammams and towering minarets, is like stepping back in time to the golden age of the Silk Road.",
    image: "/images/destinations/bukhara.jpg",
    gallery: [
      "/images/destinations/bukhara-1.jpg",
      "/images/destinations/bukhara-2.jpg",
      "/images/destinations/bukhara-3.jpg",
      "/images/destinations/bukhara-4.jpg",
    ],
    tourCount: 7,
    highlights: [
      "UNESCO World Heritage old town",
      "Ancient Ark Fortress",
      "Iconic Kalon Minaret",
      "Traditional covered bazaars",
      "Historic Jewish quarter",
    ],
    bestTimeToVisit: "April to June and September to October",
    weather: {
      summer: "Very hot, 35-42°C (95-108°F)",
      winter: "Cold, -2 to 5°C (28-41°F)",
    },
    languages: ["Uzbek", "Russian", "Tajik"],
    currency: "Uzbekistani Som (UZS)",
    timezone: "UTC+5",
    quickFacts: [
      { label: "Population", value: "280,000" },
      { label: "Elevation", value: "225m" },
      { label: "Founded", value: "500 BCE" },
      { label: "UNESCO Site", value: "1993" },
    ],
    thingsToDo: [
      {
        title: "Ark Fortress",
        description:
          "The ancient royal citadel of Bukhara, home to rulers for over a millennium.",
        image: "/images/destinations/bukhara-ark.jpg",
      },
      {
        title: "Kalon Minaret",
        description:
          "The 'Tower of Death' - a stunning 47m minaret that even Genghis Khan spared from destruction.",
        image: "/images/destinations/bukhara-kalon.jpg",
      },
      {
        title: "Lyab-i-Hauz",
        description:
          "A charming plaza centered around a 17th-century pool, perfect for evening relaxation.",
        image: "/images/destinations/bukhara-lyabihauz.jpg",
      },
      {
        title: "Trading Domes",
        description:
          "Explore the covered bazaars where silk, carpets, and spices have been traded for centuries.",
        image: "/images/destinations/bukhara-bazaar.jpg",
      },
    ],
    featured: false,
  },
  {
    id: 6,
    slug: "issyk-kul",
    name: "Issyk-Kul",
    country: "Kyrgyzstan",
    region: "Central Asia",
    description:
      "The world's second-largest alpine lake, a stunning natural wonder surrounded by snow-capped peaks.",
    longDescription:
      "Issyk-Kul, meaning 'Warm Lake' in Kyrgyz, is one of Central Asia's most precious natural treasures. Despite being surrounded by snow-capped mountains at an elevation of 1,607 meters, the lake never freezes, thanks to its slight salinity and thermal activity. The lake's shores offer a diverse array of experiences, from beach resorts and Soviet-era sanatoriums to remote yurt camps and ancient petroglyphs. It's a place where you can swim in crystal-clear waters while gazing at 5,000-meter peaks.",
    image: "/images/destinations/issyk-kul.jpg",
    gallery: [
      "/images/destinations/issyk-kul-1.jpg",
      "/images/destinations/issyk-kul-2.jpg",
      "/images/destinations/issyk-kul-3.jpg",
      "/images/destinations/issyk-kul-4.jpg",
    ],
    tourCount: 9,
    highlights: [
      "Crystal-clear alpine waters",
      "Stunning mountain backdrop",
      "Ancient petroglyphs",
      "Traditional yurt stays",
      "Diverse outdoor activities",
    ],
    bestTimeToVisit: "June to September for swimming and hiking",
    weather: {
      summer: "Pleasant, 20-28°C (68-82°F)",
      winter: "Cold but lake doesn't freeze, -5 to 5°C (23-41°F)",
    },
    languages: ["Kyrgyz", "Russian"],
    currency: "Kyrgyzstani Som (KGS)",
    timezone: "UTC+6",
    quickFacts: [
      { label: "Lake Area", value: "6,236 km²" },
      { label: "Max Depth", value: "668m" },
      { label: "Elevation", value: "1,607m" },
      { label: "Salinity", value: "0.6%" },
    ],
    thingsToDo: [
      {
        title: "Beach & Swimming",
        description:
          "Enjoy the surprisingly warm waters and sandy beaches along the northern shore.",
        image: "/images/destinations/issyk-kul-beach.jpg",
      },
      {
        title: "Jeti-Oguz Rocks",
        description:
          "Marvel at the dramatic red sandstone formations known as 'Seven Bulls.'",
        image: "/images/destinations/issyk-kul-jetioguz.jpg",
      },
      {
        title: "Karakol Town",
        description:
          "Explore this charming town with its wooden Orthodox church and Dungan mosque.",
        image: "/images/destinations/issyk-kul-karakol.jpg",
      },
      {
        title: "Eagle Hunting",
        description:
          "Witness the ancient Kyrgyz tradition of hunting with golden eagles.",
        image: "/images/destinations/issyk-kul-eagle.jpg",
      },
    ],
    featured: false,
  },
];

// Helper functions
export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((dest) => dest.slug === slug);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((dest) => dest.featured);
}

export function getDestinationsByCountry(country: string): Destination[] {
  return destinations.filter(
    (dest) => dest.country.toLowerCase() === country.toLowerCase()
  );
}

export function getUniqueCountries(): string[] {
  return [...new Set(destinations.map((dest) => dest.country))];
}

export function getUniqueRegions(): string[] {
  return [...new Set(destinations.map((dest) => dest.region))];
}