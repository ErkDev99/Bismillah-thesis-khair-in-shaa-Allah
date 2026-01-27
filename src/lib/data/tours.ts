// src/lib/data/tours.ts
// Centralized tour data - replace with CMS or database later

export interface Tour {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  location: string;
  destination: string;
  duration: string;
  durationDays: number;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  difficulty: "Easy" | "Moderate" | "Challenging";
  groupSize: string;
  category: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  featured: boolean;
}

export const tours: Tour[] = [
  {
    id: 1,
    slug: "silk-road-adventure",
    title: "Silk Road Adventure",
    description:
      "Trace the ancient trade routes through stunning landscapes and historic cities.",
    longDescription:
      "Embark on an unforgettable journey along the legendary Silk Road, where ancient civilizations once traded precious goods, ideas, and cultures. This comprehensive tour takes you through breathtaking mountain passes, ancient caravanserais, and vibrant bazaars that have remained virtually unchanged for centuries.",
    location: "Central Asia",
    destination: "kazakhstan",
    duration: "10 Days",
    durationDays: 10,
    price: 2499,
    rating: 4.9,
    reviewCount: 127,
    image: "/images/tours/silk-road.jpg",
    gallery: [
      "/images/tours/silk-road-1.jpg",
      "/images/tours/silk-road-2.jpg",
      "/images/tours/silk-road-3.jpg",
    ],
    difficulty: "Moderate",
    groupSize: "4-12 people",
    category: "cultural",
    highlights: [
      "Visit ancient Silk Road cities",
      "Explore traditional bazaars",
      "Stay in authentic caravanserais",
      "Experience local hospitality",
      "Photograph stunning mountain scenery",
    ],
    included: [
      "Airport transfers",
      "9 nights accommodation",
      "Daily breakfast and dinner",
      "English-speaking guide",
      "All entrance fees",
      "Transportation in comfortable vehicle",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Lunch meals",
      "Tips for guides and drivers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Almaty",
        description:
          "Welcome to Kazakhstan! Transfer to your hotel and evening welcome dinner.",
      },
      {
        day: 2,
        title: "Almaty City Tour",
        description:
          "Explore the cultural capital with visits to museums, parks, and the famous Green Bazaar.",
      },
      {
        day: 3,
        title: "Charyn Canyon",
        description:
          "Day trip to the spectacular Charyn Canyon, often compared to the Grand Canyon.",
      },
      {
        day: 4,
        title: "Journey to Kolsai Lakes",
        description:
          "Drive through beautiful mountain scenery to the pristine Kolsai Lakes.",
      },
      {
        day: 5,
        title: "Kolsai Lakes Hiking",
        description:
          "Full day of hiking around the stunning alpine lakes surrounded by spruce forests.",
      },
      {
        day: 6,
        title: "Transfer to Kaindy Lake",
        description:
          "Visit the mysterious sunken forest of Kaindy Lake before continuing east.",
      },
      {
        day: 7,
        title: "Border Crossing & Karakol",
        description:
          "Cross into Kyrgyzstan and arrive at the charming town of Karakol.",
      },
      {
        day: 8,
        title: "Issyk-Kul Lake",
        description:
          "Explore the shores of the world's second-largest alpine lake.",
      },
      {
        day: 9,
        title: "Return to Almaty",
        description:
          "Scenic drive back through the mountains with stops at viewpoints.",
      },
      {
        day: 10,
        title: "Departure",
        description:
          "Transfer to airport for your onward journey. Farewell!",
      },
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "mountain-expedition",
    title: "Mountain Expedition",
    description:
      "Challenge yourself with breathtaking hikes through the majestic Tian Shan mountains.",
    longDescription:
      "For adventure seekers and nature lovers, this expedition takes you deep into the heart of the Tian Shan mountain range. Experience pristine wilderness, encounter nomadic herders, and witness some of the most spectacular mountain scenery on Earth.",
    location: "Tian Shan Mountains",
    destination: "kyrgyzstan",
    duration: "7 Days",
    durationDays: 7,
    price: 1899,
    rating: 4.8,
    reviewCount: 89,
    image: "/images/tours/mountains.jpg",
    gallery: [
      "/images/tours/mountains-1.jpg",
      "/images/tours/mountains-2.jpg",
      "/images/tours/mountains-3.jpg",
    ],
    difficulty: "Challenging",
    groupSize: "4-8 people",
    category: "adventure",
    highlights: [
      "Trek through pristine wilderness",
      "Camp under star-filled skies",
      "Meet nomadic herders",
      "Summit a 4000m peak",
      "Visit high-altitude lakes",
    ],
    included: [
      "All camping equipment",
      "Professional mountain guide",
      "All meals during trek",
      "Permits and fees",
      "Emergency satellite phone",
      "First aid kit",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance (required)",
      "Personal trekking gear",
      "Tips",
      "Pre/post tour accommodation",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Briefing",
        description:
          "Arrive in Bishkek, equipment check, and detailed expedition briefing.",
      },
      {
        day: 2,
        title: "Transfer to Base Camp",
        description:
          "Drive to the mountains and establish our first camp at 2,800m.",
      },
      {
        day: 3,
        title: "Acclimatization Hike",
        description:
          "Moderate hike to help acclimatize, reaching 3,500m before returning to camp.",
      },
      {
        day: 4,
        title: "High Camp",
        description:
          "Trek to high camp at 3,800m with stunning views of surrounding peaks.",
      },
      {
        day: 5,
        title: "Summit Day",
        description:
          "Early start for summit attempt, reaching 4,200m before descending.",
      },
      {
        day: 6,
        title: "Descent & Celebration",
        description:
          "Trek back to base camp, celebration dinner under the stars.",
      },
      {
        day: 7,
        title: "Return & Departure",
        description:
          "Drive back to Bishkek, farewell lunch, and airport transfer.",
      },
    ],
    featured: true,
  },
  {
    id: 3,
    slug: "cultural-heritage-tour",
    title: "Cultural Heritage Tour",
    description:
      "Immerse yourself in the rich history and traditions of Central Asian civilizations.",
    longDescription:
      "Discover the architectural wonders and living traditions of Central Asia on this cultural immersion. From UNESCO World Heritage sites to intimate encounters with local artisans, this tour reveals the depth and beauty of one of the world's oldest cultural crossroads.",
    location: "Historic Cities",
    destination: "uzbekistan",
    duration: "5 Days",
    durationDays: 5,
    price: 1299,
    rating: 4.7,
    reviewCount: 156,
    image: "/images/tours/culture.jpg",
    gallery: [
      "/images/tours/culture-1.jpg",
      "/images/tours/culture-2.jpg",
      "/images/tours/culture-3.jpg",
    ],
    difficulty: "Easy",
    groupSize: "6-16 people",
    category: "cultural",
    highlights: [
      "Visit UNESCO World Heritage sites",
      "Learn traditional crafts from masters",
      "Enjoy authentic home-cooked meals",
      "Explore ancient madrasas and mosques",
      "Shop in historic bazaars",
    ],
    included: [
      "4 nights boutique accommodation",
      "Daily breakfast",
      "2 traditional dinners",
      "Expert local guides",
      "All entrance fees",
      "Intercity transfers",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Meals not specified",
      "Personal shopping",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Samarkand",
        description:
          "Arrival, hotel check-in, and evening stroll through the old city.",
      },
      {
        day: 2,
        title: "Samarkand Treasures",
        description:
          "Full day exploring Registan Square, Shah-i-Zinda, and Gur-e-Amir.",
      },
      {
        day: 3,
        title: "Artisan Workshops",
        description:
          "Morning with silk weavers and ceramicists, afternoon at Bibi-Khanym Mosque.",
      },
      {
        day: 4,
        title: "Journey to Bukhara",
        description:
          "Scenic drive to Bukhara with stops at ancient caravanserais.",
      },
      {
        day: 5,
        title: "Bukhara & Departure",
        description:
          "Morning tour of Bukhara's highlights before airport transfer.",
      },
    ],
    featured: true,
  },
  {
    id: 4,
    slug: "nomadic-life-experience",
    title: "Nomadic Life Experience",
    description:
      "Live like a nomad in traditional yurts and learn ancient pastoral traditions.",
    longDescription:
      "Step back in time and experience the authentic lifestyle of Central Asian nomads. Stay in traditional yurts, learn to make kumis (fermented mare's milk), try your hand at eagle hunting, and ride horses across endless grasslands.",
    location: "Kyrgyz Highlands",
    destination: "kyrgyzstan",
    duration: "6 Days",
    durationDays: 6,
    price: 1599,
    rating: 4.9,
    reviewCount: 73,
    image: "/images/tours/nomadic.jpg",
    gallery: [
      "/images/tours/nomadic-1.jpg",
      "/images/tours/nomadic-2.jpg",
      "/images/tours/nomadic-3.jpg",
    ],
    difficulty: "Easy",
    groupSize: "4-10 people",
    category: "cultural",
    highlights: [
      "Stay in authentic yurt camps",
      "Learn traditional horsemanship",
      "Meet eagle hunters",
      "Milk mares and make kumis",
      "Attend traditional music performances",
    ],
    included: [
      "5 nights yurt accommodation",
      "All meals (traditional cuisine)",
      "Horse rental",
      "Local family hosts",
      "Cultural activities",
      "Transportation",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal items",
      "Alcoholic beverages",
      "Tips for hosts",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bishkek",
        description:
          "Welcome dinner and introduction to Kyrgyz culture and traditions.",
      },
      {
        day: 2,
        title: "Journey to Song Kul",
        description:
          "Drive to the high-altitude lake of Song Kul, arriving at yurt camp.",
      },
      {
        day: 3,
        title: "Nomadic Activities",
        description:
          "Horse riding lessons, helping with livestock, learning traditional crafts.",
      },
      {
        day: 4,
        title: "Eagle Hunters",
        description:
          "Visit eagle hunters and witness this ancient tradition firsthand.",
      },
      {
        day: 5,
        title: "Lake Exploration",
        description:
          "Hike around Song Kul, photography, evening music and storytelling.",
      },
      {
        day: 6,
        title: "Return & Farewell",
        description:
          "Morning departure, scenic drive back, farewell lunch in Bishkek.",
      },
    ],
    featured: false,
  },
  {
    id: 5,
    slug: "photography-expedition",
    title: "Photography Expedition",
    description:
      "Capture stunning landscapes and authentic moments with expert guidance.",
    longDescription:
      "Designed for photographers of all levels, this expedition combines the best landscapes and cultural moments Central Asia has to offer. With a professional photography guide, you'll learn techniques while capturing images in some of the world's most photogenic locations.",
    location: "Multiple Locations",
    destination: "kazakhstan",
    duration: "8 Days",
    durationDays: 8,
    price: 2199,
    rating: 4.8,
    reviewCount: 45,
    image: "/images/tours/photography.jpg",
    gallery: [
      "/images/tours/photography-1.jpg",
      "/images/tours/photography-2.jpg",
      "/images/tours/photography-3.jpg",
    ],
    difficulty: "Moderate",
    groupSize: "4-8 people",
    category: "adventure",
    highlights: [
      "Professional photography guidance",
      "Golden hour shoots at iconic locations",
      "Portrait sessions with locals",
      "Night sky photography",
      "Post-processing workshops",
    ],
    included: [
      "7 nights accommodation",
      "Professional photography guide",
      "All transportation",
      "Breakfast daily",
      "Model releases for portraits",
      "Post-processing sessions",
    ],
    notIncluded: [
      "Camera equipment",
      "International flights",
      "Travel insurance",
      "Meals not specified",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description:
          "Arrive in Almaty, equipment check, evening cityscape shoot.",
      },
      {
        day: 2,
        title: "Big Almaty Lake",
        description:
          "Sunrise shoot at the stunning turquoise mountain lake.",
      },
      {
        day: 3,
        title: "Charyn Canyon",
        description:
          "Full day at the canyon, capturing golden hour light on red rocks.",
      },
      {
        day: 4,
        title: "Altyn Emel",
        description:
          "Singing Dunes and surreal desert landscapes.",
      },
      {
        day: 5,
        title: "Kolsai Lakes",
        description:
          "Alpine lake reflections and forest photography.",
      },
      {
        day: 6,
        title: "Nomad Portraits",
        description:
          "Visit local communities for authentic portrait sessions.",
      },
      {
        day: 7,
        title: "Night Sky",
        description:
          "Astrophotography session under pristine dark skies.",
      },
      {
        day: 8,
        title: "Review & Departure",
        description:
          "Morning post-processing workshop, afternoon departure.",
      },
    ],
    featured: false,
  },
  {
    id: 6,
    slug: "winter-wonderland",
    title: "Winter Wonderland",
    description:
      "Experience the magic of Central Asia in winter with skiing and cultural experiences.",
    longDescription:
      "Discover a different side of Central Asia when snow blankets the mountains and frozen lakes create otherworldly landscapes. This winter tour combines skiing at world-class resorts with unique cultural experiences only possible in the cold season.",
    location: "Almaty Region",
    destination: "kazakhstan",
    duration: "7 Days",
    durationDays: 7,
    price: 1799,
    rating: 4.6,
    reviewCount: 34,
    image: "/images/tours/winter.jpg",
    gallery: [
      "/images/tours/winter-1.jpg",
      "/images/tours/winter-2.jpg",
      "/images/tours/winter-3.jpg",
    ],
    difficulty: "Moderate",
    groupSize: "6-12 people",
    category: "adventure",
    highlights: [
      "Ski at Shymbulak Resort",
      "Ice skating on frozen lakes",
      "Traditional banya experience",
      "Winter wildlife spotting",
      "Cozy mountain lodge stays",
    ],
    included: [
      "6 nights accommodation",
      "Ski passes (2 days)",
      "Equipment rental",
      "Daily breakfast",
      "Transportation",
      "Winter activities",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Ski lessons",
      "Meals not specified",
      "Personal winter gear",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Almaty",
        description:
          "Welcome to winter wonderland! Evening city lights tour.",
      },
      {
        day: 2,
        title: "Shymbulak Skiing",
        description:
          "Full day skiing at the premier Central Asian ski resort.",
      },
      {
        day: 3,
        title: "More Skiing",
        description:
          "Second day on the slopes with optional lessons available.",
      },
      {
        day: 4,
        title: "Medeu & Ice Skating",
        description:
          "Visit the famous Medeu skating rink, the world's highest.",
      },
      {
        day: 5,
        title: "Mountain Lodge",
        description:
          "Transfer to cozy mountain lodge, afternoon snowshoeing, evening banya.",
      },
      {
        day: 6,
        title: "Frozen Lakes",
        description:
          "Explore frozen Kolsai Lakes, photography and nature walk.",
      },
      {
        day: 7,
        title: "Departure",
        description:
          "Morning at leisure, transfer to airport for departure.",
      },
    ],
    featured: false,
  },
];

// Helper functions
export function getAllTours(): Tour[] {
  return tours;
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((tour) => tour.featured);
}

export function getToursByDestination(destination: string): Tour[] {
  return tours.filter(
    (tour) => tour.destination.toLowerCase() === destination.toLowerCase()
  );
}

export function getToursByCategory(category: string): Tour[] {
  return tours.filter(
    (tour) => tour.category.toLowerCase() === category.toLowerCase()
  );
}

export function getUniqueDestinations(): string[] {
  return [...new Set(tours.map((tour) => tour.destination))];
}

export function getUniqueCategories(): string[] {
  return [...new Set(tours.map((tour) => tour.category))];
}

export function getUniqueDifficulties(): string[] {
  return [...new Set(tours.map((tour) => tour.difficulty))];
}