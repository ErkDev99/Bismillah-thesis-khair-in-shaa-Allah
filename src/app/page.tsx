import Image from "next/image";
import Link from "next/link";

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
      {/* Background Image Placeholder - Replace with actual image */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
        {/* When you have an image, uncomment this:
        <Image
          src="/images/hero-bg.jpg"
          alt="Beautiful landscape"
          fill
          className="object-cover"
          priority
        />
        */}
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Discover Your Next
          <span className="text-emerald-400"> Adventure</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Explore breathtaking destinations, curated tours, and unforgettable
          experiences. Let us guide you to the world&apos;s most amazing places.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tours"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Explore Tours
          </Link>
          <Link
            href="/contact"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border border-white/30"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

// Featured Tours Data (placeholder - replace with real data later)
const featuredTours = [
  {
    id: 1,
    slug: "silk-road-adventure",
    title: "Silk Road Adventure",
    location: "Central Asia",
    duration: "10 Days",
    price: 2499,
    image: "/images/tours/silk-road.jpg",
    rating: 4.9,
  },
  {
    id: 2,
    slug: "mountain-expedition",
    title: "Mountain Expedition",
    location: "Tian Shan Mountains",
    duration: "7 Days",
    price: 1899,
    image: "/images/tours/mountains.jpg",
    rating: 4.8,
  },
  {
    id: 3,
    slug: "cultural-heritage-tour",
    title: "Cultural Heritage Tour",
    location: "Historic Cities",
    duration: "5 Days",
    price: 1299,
    image: "/images/tours/culture.jpg",
    rating: 4.7,
  },
];

// Tour Card Component
function TourCard({ tour }: { tour: (typeof featuredTours)[0] }) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        {/* Image Placeholder */}
        <div className="relative h-56 bg-gradient-to-br from-emerald-200 to-emerald-400">
          {/* When you have images, uncomment:
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-emerald-700">
            ${tour.price}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {tour.location}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {tour.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{tour.duration}</span>
            <div className="flex items-center gap-1">
              <svg
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{tour.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Featured Tours Section
function FeaturedToursSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Tours
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked experiences that showcase the best of what we offer.
            Every journey is crafted with care and attention to detail.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-lg"
          >
            View All Tours
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Destinations Data (placeholder)
const destinations = [
  {
    id: 1,
    slug: "almaty",
    name: "Almaty",
    country: "Kazakhstan",
    tourCount: 12,
  },
  {
    id: 2,
    slug: "samarkand",
    name: "Samarkand",
    country: "Uzbekistan",
    tourCount: 8,
  },
  {
    id: 3,
    slug: "bishkek",
    name: "Bishkek",
    country: "Kyrgyzstan",
    tourCount: 6,
  },
  {
    id: 4,
    slug: "astana",
    name: "Astana",
    country: "Kazakhstan",
    tourCount: 5,
  },
];

// Destinations Preview Section
function DestinationsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From ancient cities to stunning natural landscapes, discover places
            that will take your breath away.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group relative h-64 md:h-80 rounded-xl overflow-hidden"
            >
              {/* Background Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {dest.name}
                </h3>
                <p className="text-sm text-gray-300">{dest.country}</p>
                <p className="text-sm text-emerald-400 mt-2">
                  {dest.tourCount} tours available
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-lg"
          >
            Explore All Destinations
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Testimonials Data (placeholder)
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "An absolutely incredible experience! The guides were knowledgeable, the itinerary was perfect, and every detail was taken care of. Can't wait to book another trip!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    text: "Wanderlust made our dream vacation a reality. The personalized service and attention to detail exceeded our expectations. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "London, UK",
    text: "From the moment we landed to the farewell dinner, everything was seamless. The local experiences they arranged were truly authentic and memorable.",
    rating: 5,
  },
];

// Testimonials Section
function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Travelers Say
          </h2>
          <p className="text-emerald-200 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our happy
            travelers have to say about their experiences.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-100 mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-emerald-300 text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter/CTA Section
function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive deals, travel tips, and
          inspiration delivered straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}

// Main Home Page Component
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedToursSection />
      <DestinationsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}