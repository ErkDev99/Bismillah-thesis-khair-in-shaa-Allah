// src/lib/data/blog.ts
// Centralized blog data - replace with CMS or database later

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "ultimate-guide-silk-road-travel",
    title: "The Ultimate Guide to Silk Road Travel in 2024",
    excerpt:
      "Everything you need to know about traveling the ancient Silk Road routes through Central Asia, from visa requirements to must-see destinations.",
    content: `
The Silk Road conjures images of camel caravans, ancient bazaars, and the exchange of precious goods between East and West. Today, this legendary network of trade routes offers modern travelers an unforgettable journey through some of the world's most fascinating landscapes and cultures.

## Why Travel the Silk Road?

Central Asia remains one of the last frontiers of travel. Unlike overcrowded European destinations, here you'll find authentic experiences, warm hospitality, and UNESCO World Heritage sites without the masses. The region is safe, affordable, and increasingly accessible.

## Best Time to Visit

The ideal months are **May to June** and **September to October**. You'll enjoy pleasant temperatures (20-28°C), clear skies, and fewer tourists. Summer (July-August) can be extremely hot in Uzbekistan (40°C+), while winters are cold but magical if you enjoy snow-capped mountains.

## Must-See Destinations

### Samarkand, Uzbekistan
The crown jewel of the Silk Road. The Registan Square, with its three magnificent madrasas, is arguably the most impressive sight in Central Asia. Don't miss Shah-i-Zinda, a stunning avenue of mausoleums with intricate blue tilework.

### Bukhara, Uzbekistan
A living museum of medieval Islamic architecture. Walk through covered bazaars where merchants have traded for centuries, and watch the sunset from the Kalon Minaret.

### Almaty, Kazakhstan
The cultural capital of Kazakhstan offers a perfect blend of Soviet history, modern development, and easy access to stunning mountain scenery. The Big Almaty Lake and Charyn Canyon are must-visits.

### Issyk-Kul, Kyrgyzstan
The world's second-largest alpine lake, surrounded by snow-capped peaks. Stay in a yurt, meet eagle hunters, and experience genuine nomadic hospitality.

## Practical Tips

1. **Visas**: Most Western countries enjoy visa-free access to Kazakhstan, Kyrgyzstan, and Uzbekistan (30-60 days)
2. **Money**: Carry clean US dollars for exchange. Cards are increasingly accepted in cities
3. **Language**: Russian is widely understood. Download offline translation apps
4. **Dress**: Modest clothing is appreciated, especially at religious sites

## How Wanderlust Can Help

We've spent years building relationships with local guides, families, and artisans across Central Asia. Our tours go beyond tourist sites to offer authentic, immersive experiences that independent travelers rarely access.

Ready to walk in the footsteps of ancient traders? [Explore our Silk Road tours](/tours) or [contact us](/contact) to plan your custom journey.
    `,
    author: {
      name: "Aibek Nurzhanov",
      role: "Founder & Lead Guide",
      image: "/images/team/aibek.jpg",
    },
    category: "Travel Guide",
    tags: ["Silk Road", "Uzbekistan", "Kazakhstan", "Kyrgyzstan", "Travel Tips"],
    image: "/images/blog/silk-road-guide.jpg",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "nomadic-life-kyrgyzstan",
    title: "Experiencing Authentic Nomadic Life in Kyrgyzstan",
    excerpt:
      "Discover what it's really like to stay with nomadic families, sleep in yurts, and learn ancient traditions that have survived for millennia.",
    content: `
When we tell travelers they'll be staying with nomadic families in Kyrgyzstan, we often see a mix of excitement and apprehension. What will it be like? Is it comfortable? What do we eat? Having guided dozens of these experiences, let me share what you can truly expect.

## The Yurt Experience

A yurt (called "boz üy" in Kyrgyz) is far more comfortable than you might imagine. These ingenious structures have kept nomads warm through harsh winters and cool during hot summers for over 3,000 years.

Inside, you'll find colorful felt carpets called "shyrdaks," hand-embroidered wall hangings, and surprisingly cozy bedding. Yes, you'll sleep on the floor—but on thick mattresses with warm blankets. Most guests tell us they sleep better in yurts than in city hotels!

## A Day in Nomadic Life

**Morning** begins early. You'll wake to the sounds of livestock and the smell of fresh bread baking. Breakfast typically includes:
- Fresh bread (nan) baked in a tandoor oven
- Clotted cream (kaymak) and honey
- Kymyz (fermented mare's milk) — try it!
- Strong tea with milk

**Daytime** activities vary by season. You might help:
- Herd sheep and horses across alpine meadows
- Learn to milk mares (it's harder than it looks!)
- Make traditional felt crafts with the women
- Ride horses to nearby lakes and viewpoints

**Evening** is magical. As the sun sets over the mountains, families gather for dinner. Expect hearty dishes like beshbarmak (boiled meat with noodles) or plov (rice pilaf). After dinner, there's often music—the haunting sounds of the komuz (three-stringed lute) under star-filled skies.

## The Eagle Hunters

One of the most extraordinary traditions we share is eagle hunting (berkutchi). These skilled hunters, mostly found in the Issyk-Kul region, train golden eagles to hunt foxes and rabbits—a practice dating back over 4,000 years.

Meeting an eagle hunter and watching them work with their magnificent birds is genuinely life-changing. The bond between hunter and eagle is remarkable.

## Tips for Your Stay

1. **Bring small gifts**: Chocolates, souvenirs from your country, or photos of your family are appreciated
2. **Learn basic phrases**: "Rahmat" (thank you) and "Jakshy" (good) go a long way
3. **Be flexible**: Nomadic life follows nature, not schedules
4. **Try everything**: Kymyz may taste strange at first, but it's nutritious and culturally important
5. **Disconnect**: There's usually no WiFi—embrace it!

## Why It Matters

Tourism provides vital income for nomadic families, helping preserve traditions that modernity threatens. When you stay with a family, you're not just having an experience—you're supporting a way of life.

[Join our Nomadic Life Experience tour](/tours/nomadic-life-experience) and discover why travelers call it "the highlight of their trip."
    `,
    author: {
      name: "Bekzat Omarov",
      role: "Cultural Expert",
      image: "/images/team/bekzat.jpg",
    },
    category: "Culture",
    tags: ["Kyrgyzstan", "Nomads", "Yurt", "Culture", "Eagle Hunting"],
    image: "/images/blog/nomadic-life.jpg",
    publishedAt: "2024-02-20",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 3,
    slug: "photography-tips-central-asia",
    title: "10 Photography Tips for Capturing Central Asia",
    excerpt:
      "Pro tips from our photography expedition guides on capturing the stunning landscapes, architecture, and people of the Silk Road region.",
    content: `
Central Asia is a photographer's paradise. From the turquoise domes of Samarkand to the rugged peaks of the Tian Shan, the region offers endless opportunities for stunning images. Here are our top tips for capturing it all.

## 1. Golden Hour is Everything

The light in Central Asia is exceptional, especially during golden hour. The low sun illuminates the blue tiles of Uzbekistan's mosques with an otherworldly glow. Plan your visits to major sites for the first and last hours of daylight.

**Pro tip**: The Registan in Samarkand faces west—evening light is spectacular.

## 2. Wake Up Early

The best photography happens when most tourists are still asleep. Arrive at monuments as they open to capture them without crowds. In Bukhara, we've had the Kalon Minaret entirely to ourselves at 6 AM.

## 3. Embrace the Blue

Uzbekistan's signature blue tilework can be tricky to photograph. To avoid oversaturation:
- Shoot during overcast days or in shade
- Underexpose slightly and recover in post
- Use a polarizing filter to reduce glare

## 4. Photograph People (Respectfully)

Central Asians are generally welcoming to photography, but always ask first. Learn to say "Photo?" with a questioning gesture. Most people will smile and agree.

For portraits:
- Engage with your subject first—buy something, have tea
- Show them the photo afterward
- Consider bringing a portable printer for instant gifts

## 5. Capture the Details

Don't just photograph the whole mosque—zoom in on the intricate details:
- Geometric tile patterns
- Carved wooden doors
- Calligraphy
- Weathered textures

These detail shots tell stories that wide angles miss.

## 6. Night Photography

The monuments of Uzbekistan are beautifully lit at night. Bring a tripod and experiment with long exposures. The Registan at night, with its illuminated facades against a deep blue sky, is unforgettable.

## 7. Mountain Photography

For Kyrgyzstan and Kazakhstan's mountains:
- Use a wide-angle lens to capture scale
- Include foreground elements (flowers, rocks, yurts)
- Shoot during blue hour for dramatic alpenglow
- Consider altitude—your camera battery drains faster in cold

## 8. Drone Considerations

Drones are generally allowed in Kyrgyzstan and Kazakhstan (check current regulations). In Uzbekistan, they're restricted near historic sites. The aerial perspectives of mountain lakes and vast steppes are worth the effort.

## 9. Protect Your Gear

Central Asia can be dusty, especially in summer. Bring:
- Lens cleaning supplies
- Weather-sealed bags
- Silica gel packets for humidity control
- A dust blower for sensor cleaning

## 10. Tell a Story

The best travel photography goes beyond pretty pictures. Document:
- The journey (buses, horses, yurts)
- Daily life (markets, craftsmen, families)
- Food (plov being made, tea ceremonies)
- Emotions (laughter, contemplation, prayer)

## Join Our Photography Expedition

Want to photograph Central Asia with expert guidance? Our [Photography Expedition](/tours/photography-expedition) is designed specifically for photographers, with optimal timing at every location and instruction from professional photographers.

[View the Photography Expedition →](/tours/photography-expedition)
    `,
    author: {
      name: "Sarah Mitchell",
      role: "Operations Director",
      image: "/images/team/sarah.jpg",
    },
    category: "Photography",
    tags: ["Photography", "Tips", "Uzbekistan", "Landscapes", "Travel"],
    image: "/images/blog/photography-tips.jpg",
    publishedAt: "2024-03-10",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 4,
    slug: "best-food-central-asia",
    title: "A Food Lover's Guide to Central Asian Cuisine",
    excerpt:
      "From sizzling kebabs to hand-pulled noodles, discover the delicious and hearty cuisine of the Silk Road region.",
    content: `
Central Asian cuisine is one of the region's best-kept secrets. Hearty, flavorful, and deeply connected to nomadic traditions, the food here will surprise and delight you. Here's your guide to eating your way along the Silk Road.

## The Essential Dishes

### Plov (Pilaf)
The undisputed king of Central Asian cuisine. This rice dish, cooked with lamb, carrots, onions, and a blend of spices, varies by region but is always delicious. In Uzbekistan, it's traditionally cooked in a massive kazan (cauldron) over an open flame.

**Where to try it**: Any local "oshxona" (plov house) in Uzbekistan, especially in Samarkand.

### Lagman
Hand-pulled noodles in a savory lamb and vegetable soup. Watching a lagman master stretch the dough into perfect noodles is mesmerizing. It can be served as soup or fried.

**Where to try it**: Dungan restaurants in Karakol, Kyrgyzstan are famous for their lagman.

### Shashlik
Skewered and grilled meat, usually lamb or beef. The secret is in the marinade and the charcoal cooking. You'll find shashlik vendors on almost every corner.

**Where to try it**: Anywhere! But the street vendors in Almaty's Green Bazaar are legendary.

### Manti
Large steamed dumplings filled with spiced lamb and onion. Similar to Turkish manti but bigger and juicier. Often served with sour cream and a sprinkle of herbs.

### Samsa
Flaky pastries filled with meat and onions, baked in a tandoor oven. The crust is crispy, the filling savory—perfect for breakfast or a snack.

### Beshbarmak
Meaning "five fingers" (traditionally eaten by hand), this is the national dish of Kazakhstan and Kyrgyzstan. Boiled meat (usually horse or lamb) served on flat noodles with onion sauce.

## Drinks

### Tea
Tea culture is central to hospitality. Green tea dominates in Uzbekistan, while black tea is preferred in Kazakhstan. Never refuse an offer of tea—it's considered rude.

### Kymyz
Fermented mare's milk, mildly alcoholic and slightly sour. It's an acquired taste but highly nutritious. Nomads have drunk it for thousands of years.

### Shubat
Fermented camel's milk. Stronger and sourer than kymyz. A true Central Asian experience!

## Vegetarian Options

Central Asian cuisine is heavily meat-focused, but vegetarians can enjoy:
- Vegetable plov (ask for "sabzi plov")
- Lagman with just vegetables
- Fresh salads (tomato, cucumber, onion)
- Fresh bread with honey and cream
- Dried fruits and nuts from bazaars

Always communicate your dietary needs clearly, as "vegetarian" is not widely understood.

## Food Markets

The bazaars are the heart of Central Asian food culture:

**Green Bazaar, Almaty**: Mountains of spices, dried fruits, and fresh produce. The colors and smells are intoxicating.

**Siab Bazaar, Samarkand**: Famous for the best bread in Central Asia—enormous, decorated, and delicious.

**Osh Bazaar, Bishkek**: The largest market in Kyrgyzstan. Get lost among the stalls selling everything from horse meat to honey.

## Our Food Experiences

On all Wanderlust tours, we prioritize authentic local food:
- Home-cooked meals with families
- Market tours with local guides
- Cooking classes where you make plov or manti
- Tea ceremonies in traditional chaikhanas

[Explore tours with incredible food experiences →](/tours)
    `,
    author: {
      name: "Elena Petrova",
      role: "Customer Experience",
      image: "/images/team/elena.jpg",
    },
    category: "Food & Culture",
    tags: ["Food", "Cuisine", "Plov", "Culture", "Travel Tips"],
    image: "/images/blog/central-asian-food.jpg",
    publishedAt: "2024-03-25",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 5,
    slug: "trekking-tian-shan-beginners",
    title: "Trekking in the Tian Shan: A Beginner's Guide",
    excerpt:
      "Everything first-time trekkers need to know about hiking in Kyrgyzstan's spectacular Celestial Mountains.",
    content: `
The Tian Shan—"Celestial Mountains" in Chinese—are among the world's most spectacular yet accessible mountain ranges. If you've dreamed of trekking but thought it required expert skills, Kyrgyzstan might change your mind.

## Why Tian Shan for Beginners?

Unlike the Himalayas or Andes, the Tian Shan offer:
- **Well-established trails** with yurt camps for accommodation
- **Moderate altitudes** (most treks stay between 2,500-3,800m)
- **Flexible difficulty** from gentle walks to challenging expeditions
- **Affordable costs** compared to other mountain destinations
- **Stunning scenery** without the crowds

## Best Treks for Beginners

### Ala-Kul Lake Trek (3-4 days)
A classic introduction to Tian Shan trekking. You'll cross a 3,800m pass to reach the stunning turquoise Ala-Kul Lake. Challenging but achievable for anyone in reasonable fitness.

### Jyrgalan Valley (2-3 days)
A gentler option with beautiful alpine meadows, fewer crowds, and community-based tourism that directly benefits local families.

### Song-Kul Lake (2 days)
More of a cultural experience than a hardcore trek. Ride horses to a high-altitude lake surrounded by yurt camps and grazing herds.

## Physical Preparation

You don't need to be an athlete, but some preparation helps:

**2-3 months before**:
- Start walking regularly (aim for 10km hikes)
- Include stairs and hills in your training
- Build to carrying a daypack (5-8kg)

**Fitness level needed**: If you can hike 15km with 500m elevation gain without exhaustion, you're ready for beginner treks.

## Altitude Considerations

Most treks reach 3,000-4,000m. Key tips:
- Ascend gradually (our itineraries are designed for this)
- Stay hydrated (3-4 liters per day)
- Avoid alcohol at altitude
- Know the symptoms of altitude sickness
- Descend if symptoms worsen

## What to Pack

**Essentials**:
- Broken-in hiking boots (waterproof)
- Layered clothing (weather changes fast)
- Rain jacket and warm fleece
- Sun protection (UV is intense at altitude)
- Headlamp
- Water bottle and purification tablets

**We provide**: Tents, sleeping bags, meals, horses for luggage

## Accommodation on Trek

Forget roughing it—trekking in Kyrgyzstan often means:
- **Yurt stays** with nomadic families (meals included)
- **Tent camps** at scenic locations
- **Guesthouses** in villages

You'll sleep in comfort and eat hearty meals.

## When to Go

**Best months**: July to September
- July: Wildflowers, some snow at passes
- August: Warmest, driest, most crowded
- September: Autumn colors, fewer people, cooler nights

## Guided vs. Independent

While independent trekking is possible, we recommend guided treks for beginners:
- Navigation can be tricky (trails aren't always marked)
- Weather changes rapidly
- Local knowledge enhances the experience
- Logistics (permits, horses, camps) are handled for you

## Our Mountain Expedition

Our [7-day Mountain Expedition](/tours/mountain-expedition) is designed for adventurous beginners. We include acclimatization days, professional guides, all equipment, and the chance to summit a 4,000m+ peak.

[View the Mountain Expedition →](/tours/mountain-expedition)
    `,
    author: {
      name: "Aibek Nurzhanov",
      role: "Founder & Lead Guide",
      image: "/images/team/aibek.jpg",
    },
    category: "Adventure",
    tags: ["Trekking", "Kyrgyzstan", "Mountains", "Hiking", "Adventure"],
    image: "/images/blog/tian-shan-trekking.jpg",
    publishedAt: "2024-04-05",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 6,
    slug: "visiting-uzbekistan-2024",
    title: "Why 2024 is the Perfect Year to Visit Uzbekistan",
    excerpt:
      "New flight routes, visa-free access, and improved infrastructure make this the golden age of Uzbekistan tourism.",
    content: `
Uzbekistan has transformed dramatically over the past few years. What was once a difficult-to-reach destination with bureaucratic hurdles is now one of the most welcoming countries for travelers. Here's why 2024 is the time to go.

## Visa-Free Access

Since 2018, citizens of over 90 countries can visit Uzbekistan visa-free for up to 30 days. This includes the USA, UK, EU, Canada, Australia, Japan, and many more. Simply arrive and get stamped in—no applications, no fees, no hassle.

## New Flight Connections

Getting to Uzbekistan has never been easier:
- **Direct flights** from major European hubs (London, Paris, Frankfurt)
- **Improved connections** via Istanbul, Dubai, and Moscow
- **New domestic flights** between Uzbek cities
- Budget airline options emerging

## Infrastructure Improvements

The government has invested heavily in tourism infrastructure:
- **High-speed train** connects Tashkent, Samarkand, and Bukhara in comfort
- **Renovated hotels** ranging from budget to luxury
- **Restored monuments** with better facilities for visitors
- **Improved roads** for overland travel

## Still Authentic

Despite growing tourism, Uzbekistan retains its authenticity:
- Locals in Bukhara still trade in ancient bazaars
- Craftsmen continue centuries-old traditions
- Home-hosted meals remain genuine
- Tourist crowds are manageable (unlike Venice or Barcelona)

## Best Experiences in Uzbekistan

### Samarkand (2-3 days)
- Registan Square at sunset
- Shah-i-Zinda necropolis
- Bibi-Khanym Mosque
- Afrosiyob Museum

### Bukhara (2-3 days)
- Ark Fortress
- Kalon Minaret and Mosque
- Lyab-i-Hauz plaza
- Traditional hammam experience

### Khiva (1-2 days)
- Walled inner city (Ichan-Kala)
- Islam Khoja Minaret
- Sunset from the city walls

### Tashkent (1-2 days)
- Chorsu Bazaar
- Soviet architecture
- Modern cafes and nightlife
- Amir Timur Museum

## Costs

Uzbekistan offers exceptional value:
- Budget: $30-50/day (hostels, local food, shared transport)
- Mid-range: $80-120/day (boutique hotels, guided tours, nice restaurants)
- Luxury: $200+/day (top hotels, private guides, premium experiences)

## Best Time to Visit

- **Spring (April-May)**: Perfect weather, blooming landscapes
- **Fall (September-October)**: Mild temperatures, harvest season
- **Avoid**: July-August (extreme heat, 40°C+)

## Why Go Now?

Tourism is growing rapidly. In 5-10 years, Uzbekistan may face overtourism like other historic destinations. Right now, you can:
- Have the Registan nearly to yourself at sunrise
- Interact with locals who are genuinely excited to meet foreigners
- Experience authentic culture before it becomes commercialized

## Our Uzbekistan Tours

Our [Cultural Heritage Tour](/tours/cultural-heritage-tour) is the perfect introduction to Uzbekistan's wonders. We also offer custom itineraries for those wanting to explore deeper.

[View all Uzbekistan tours →](/tours?destination=uzbekistan)
    `,
    author: {
      name: "Sarah Mitchell",
      role: "Operations Director",
      image: "/images/team/sarah.jpg",
    },
    category: "Destinations",
    tags: ["Uzbekistan", "Samarkand", "Bukhara", "Silk Road", "2024"],
    image: "/images/blog/uzbekistan-2024.jpg",
    publishedAt: "2024-04-20",
    readTime: "6 min read",
    featured: false,
  },
];

// Helper functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getUniqueCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter(
      (post) =>
        post.category === currentPost.category ||
        post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}