import Link from "next/link";
import { notFound } from "next/navigation";
import { getTourBySlug, getAllTours, type Tour } from "@/lib/data/tours";

// Generate static params for all tours (for static generation)
export async function generateStaticParams() {
  const tours = getAllTours();
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return { title: "Tour Not Found" };
  }

  return {
    title: `${tour.title} | Wanderlust Tours`,
    description: tour.description,
  };
}

// Tour Header Component
function TourHeader({ tour }: { tour: Tour }) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-end">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950">
        {/* Uncomment when you have images:
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12">
        <Link
          href="/tours"
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
          Back to Tours
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              tour.difficulty === "Easy"
                ? "bg-green-500/20 text-green-300"
                : tour.difficulty === "Moderate"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {tour.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
            {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {tour.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {tour.duration}
          </div>
          <div className="flex items-center gap-2">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {tour.groupSize}
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-white/70">({tour.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Price Card Component (Sticky Sidebar)
function PriceCard({ tour }: { tour: Tour }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="mb-6">
        <span className="text-sm text-gray-500">From</span>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-gray-900">${tour.price}</span>
          <span className="text-gray-500">/ person</span>
        </div>
      </div>

      <Link
        href="/contact"
        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-4 rounded-lg font-semibold transition-colors mb-4"
      >
        Book This Tour
      </Link>

      <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Save to Wishlist
      </button>

      <hr className="my-6" />

      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Free cancellation up to 30 days</span>
        </div>
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Reserve now, pay later</span>
        </div>
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Small group experience</span>
        </div>
      </div>
    </div>
  );
}

// Tour Content Sections
function TourOverview({ tour }: { tour: Tour }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
      <p className="text-gray-600 leading-relaxed">{tour.longDescription}</p>
    </section>
  );
}

function TourHighlights({ tour }: { tour: Tour }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
      <ul className="grid md:grid-cols-2 gap-3">
        {tour.highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-3">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-600">{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TourItinerary({ tour }: { tour: Tour }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
      <div className="space-y-4">
        {tour.itinerary.map((day) => (
          <details
            key={day.day}
            className="group bg-gray-50 rounded-lg overflow-hidden"
          >
            <summary className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                {day.day}
              </span>
              <span className="font-semibold text-gray-900 flex-1">
                {day.title}
              </span>
              <svg
                className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
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
            </summary>
            <div className="px-4 pb-4 pl-18">
              <p className="text-gray-600 ml-14">{day.description}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function TourInclusions({ tour }: { tour: Tour }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        What&apos;s Included
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Included */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-emerald-600"
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
            Included
          </h3>
          <ul className="space-y-2">
            {tour.included.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600">
                <svg
                  className="w-4 h-4 text-emerald-500 shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Not Included
          </h3>
          <ul className="space-y-2">
            {tour.notIncluded.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600">
                <svg
                  className="w-4 h-4 text-red-400 shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Main Tour Detail Page
export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TourHeader tour={tour} />

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <TourOverview tour={tour} />
              <TourHighlights tour={tour} />
              <TourItinerary tour={tour} />
              <TourInclusions tour={tour} />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0">
              <PriceCard tour={tour} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}