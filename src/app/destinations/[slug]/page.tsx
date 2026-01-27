import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDestinationBySlug,
  getAllDestinations,
  type Destination,
} from "@/lib/data/destinations";
import { getToursByDestination, type Tour } from "@/lib/data/tours";

// Generate static params for all destinations
export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination Not Found" };
  }

  return {
    title: `${destination.name}, ${destination.country} | Wanderlust`,
    description: destination.description,
  };
}

// Hero Section
function DestinationHero({ destination }: { destination: Destination }) {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-end">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950">
        {/* Uncomment when you have images:
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
            {destination.country}
          </span>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
            {destination.tourCount} tours available
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          {destination.name}
        </h1>

        <p className="text-xl text-gray-200 max-w-3xl">
          {destination.description}
        </p>
      </div>
    </section>
  );
}

// Quick Facts Card
function QuickFactsCard({ destination }: { destination: Destination }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>

      <div className="space-y-4 mb-6">
        {destination.quickFacts.map((fact, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-500">{fact.label}</span>
            <span className="font-medium text-gray-900">{fact.value}</span>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
          <div>
            <span className="font-medium text-gray-900">Languages: </span>
            <span className="text-gray-600">
              {destination.languages.join(", ")}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <span className="font-medium text-gray-900">Currency: </span>
            <span className="text-gray-600">{destination.currency}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
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
          <div>
            <span className="font-medium text-gray-900">Timezone: </span>
            <span className="text-gray-600">{destination.timezone}</span>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <Link
        href="/contact"
        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
      >
        Plan Your Visit
      </Link>
    </div>
  );
}

// Overview Section
function OverviewSection({ destination }: { destination: Destination }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        About {destination.name}
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        {destination.longDescription}
      </p>

      {/* Highlights */}
      <div className="bg-emerald-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Highlights</h3>
        <ul className="grid md:grid-cols-2 gap-3">
          {destination.highlights.map((highlight, index) => (
            <li key={index} className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-emerald-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Best Time & Weather Section
function WeatherSection({ destination }: { destination: Destination }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Best Time to Visit
      </h2>
      <p className="text-gray-600 mb-6">{destination.bestTimeToVisit}</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-orange-50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-6 h-6 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="font-semibold text-gray-900">Summer</h3>
          </div>
          <p className="text-gray-600">{destination.weather.summer}</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <h3 className="font-semibold text-gray-900">Winter</h3>
          </div>
          <p className="text-gray-600">{destination.weather.winter}</p>
        </div>
      </div>
    </section>
  );
}

// Things to Do Section
function ThingsToDoSection({ destination }: { destination: Destination }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Things to Do</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {destination.thingsToDo.map((activity, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-emerald-200 to-emerald-400">
              {/* Uncomment when you have images:
              <Image
                src={activity.image}
                alt={activity.title}
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
              */}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-600 text-sm">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Related Tours Section
function RelatedToursSection({ tours }: { tours: Tour[] }) {
  if (tours.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tours in This Destination
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.slice(0, 3).map((tour) => (
          <Link key={tour.id} href={`/tours/${tour.slug}`} className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-40 bg-gradient-to-br from-emerald-200 to-emerald-400">
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-emerald-700">
                  ${tour.price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {tour.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{tour.duration}</span>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{tour.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {tours.length > 3 && (
        <div className="text-center mt-8">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
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
      )}
    </section>
  );
}

// Main Destination Detail Page
export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  // Get related tours for this destination
  const relatedTours = getToursByDestination(destination.country.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationHero destination={destination} />

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <OverviewSection destination={destination} />
              <WeatherSection destination={destination} />
              <ThingsToDoSection destination={destination} />
              <RelatedToursSection tours={relatedTours} />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0">
              <QuickFactsCard destination={destination} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}