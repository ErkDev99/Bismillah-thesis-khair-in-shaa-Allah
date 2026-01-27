// src/app/about/page.tsx

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Wanderlust",
  description:
    "Learn about Wanderlust - our story, mission, and the passionate team behind your Central Asian adventures.",
};

// Hero Section
function HeroSection() {
  return (
    <section className="relative bg-emerald-900 text-white py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-90" />
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About Wanderlust</h1>
        <p className="text-emerald-200 max-w-3xl mx-auto text-lg md:text-xl">
          We&apos;re passionate travelers dedicated to sharing the hidden gems
          of Central Asia with the world.
        </p>
      </div>
    </section>
  );
}

// Story Section
function StorySection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <div className="h-80 lg:h-[450px] bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-2xl">
            {/* Replace with actual image */}
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Wanderlust was born from a simple belief: Central Asia is one of
                the world&apos;s most underrated travel destinations, and it
                deserves to be shared with curious explorers everywhere.
              </p>
              <p>
                Founded in 2018 by a group of local guides and international
                travel enthusiasts, we set out to create authentic, immersive
                experiences that go beyond typical tourism. We wanted travelers
                to feel the warmth of nomadic hospitality, taste home-cooked
                meals in remote villages, and witness landscapes that few
                outsiders ever see.
              </p>
              <p>
                Today, we&apos;ve helped over 1,000 travelers discover the magic
                of the Silk Road, from the turquoise domes of Samarkand to the
                wild peaks of the Tian Shan. Every trip we design reflects our
                commitment to sustainable travel, cultural respect, and
                unforgettable adventure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mission Section
function MissionSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Our Mission
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          To connect travelers with the authentic soul of Central Asia through
          responsible, meaningful experiences that benefit local communities and
          preserve cultural heritage for future generations.
        </p>
      </div>
    </section>
  );
}

// Team Data
const teamMembers = [
  {
    name: "Aibek Nurzhanov",
    role: "Founder & Lead Guide",
    bio: "Born in the Tian Shan foothills, Aibek has 15+ years of guiding experience across Central Asia.",
    image: "/images/team/aibek.jpg",
  },
  {
    name: "Sarah Mitchell",
    role: "Operations Director",
    bio: "Former travel journalist who fell in love with the region and never left. Manages logistics and partnerships.",
    image: "/images/team/sarah.jpg",
  },
  {
    name: "Bekzat Omarov",
    role: "Cultural Expert",
    bio: "Historian and storyteller specializing in Silk Road history and nomadic traditions.",
    image: "/images/team/bekzat.jpg",
  },
  {
    name: "Elena Petrova",
    role: "Customer Experience",
    bio: "Ensures every traveler feels supported from first inquiry to final farewell.",
    image: "/images/team/elena.jpg",
  },
];

// Team Section
function TeamSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Local experts and global adventurers united by a love for Central
            Asia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow text-center"
            >
              {/* Avatar Placeholder */}
              <div className="h-56 bg-gradient-to-br from-emerald-300 to-emerald-500">
                {/* Replace with actual image */}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-emerald-600 text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Values Data
const values = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Authentic Experiences",
    description:
      "We go beyond tourist traps to connect you with real people, traditions, and hidden places.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
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
    ),
    title: "Sustainable Travel",
    description:
      "We minimize environmental impact and ensure tourism benefits local communities directly.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Safety First",
    description:
      "Experienced guides, vetted partners, and 24/7 support ensure your peace of mind.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
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
    ),
    title: "Small Groups",
    description:
      "Intimate group sizes mean personalized attention and deeper connections.",
  },
];

// Values Section
function ValuesSection() {
  return (
    <section className="py-20 px-4 bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-emerald-200 max-w-2xl mx-auto">
            The principles that guide every journey we create.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/20 rounded-full text-emerald-300 mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{value.title}</h3>
              <p className="text-emerald-200 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Explore With Us?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Let&apos;s plan your Central Asian adventure together. Our team is
          here to answer your questions and craft your perfect trip.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/tours"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Browse Tours
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main About Page
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StorySection />
      <MissionSection />
      <TeamSection />
      <ValuesSection />
      <CTASection />
    </div>
  );
}