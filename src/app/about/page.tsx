// src/app/about/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — no "use client" needed.
// Style: Luxury / Art Deco — amber + stone palette, serif headings,
// geometric diamond ornaments, wide tracking, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About Us | Wanderlust — Central Asia Tour Experts",
  description:
    "Meet the team behind Wanderlust. Local guides and international travel experts crafting authentic small-group journeys through Kazakhstan, Kyrgyzstan, and Uzbekistan since 2018.",
  openGraph: {
    title: "About Wanderlust — Central Asia Tour Experts",
    description:
      "Local guides and international travel experts crafting authentic small-group journeys through Central Asia since 2018.",
    type: "website",
    siteName: "Wanderlust",
  },
};

// ─── Diamond Divider — Art Deco ornament ─────────────────────────────────────
function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <div className="h-px w-12 md:w-20 bg-amber-500/50" />
      <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
      <div className="w-2.5 h-2.5 rotate-45 border border-amber-500" />
      <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
      <div className="h-px w-12 md:w-20 bg-amber-500/50" />
    </div>
  );
}

// ─── Corner Accents — 4 corners on a card ────────────────────────────────────
function CornerAccents() {
  return (
    <>
      <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
      <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
      <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
      <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      aria-label="About Wanderlust"
      className="relative text-center text-white overflow-hidden"
    >
      <Image
        src="/images/hero/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      {/* Art Deco geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="about-hero-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="3" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#about-hero-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <div className="flex items-center justify-center gap-4 mb-2" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
          <span className="text-amber-400/80 text-xs tracking-[0.3em] uppercase">Since 2018</span>
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
        </div>

        <p className="text-amber-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          Our Story
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif">
          About <span className="text-amber-400">Wanderlust</span>
        </h1>

        <p className="text-base md:text-lg text-stone-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          We&apos;re passionate travelers dedicated to sharing the hidden gems
          of Central Asia with the world.
        </p>

        <DiamondDivider />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 2 — STORY
// ═════════════════════════════════════════════════════════════════════════════
function StorySection() {
  return (
    <section
      aria-labelledby="story-heading"
      className="py-16 md:py-20 px-4 bg-amber-50 dark:bg-stone-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Image */}
          <div className="group relative h-80 lg:h-[450px] overflow-hidden">
            <Image
              src="/images/hero/hero.jpg"
              alt="Central Asian landscape"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <CornerAccents />
            {/* Decorative monogram */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-24 h-24 border-2 border-amber-500/40 rotate-45 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <span className="text-amber-400 text-3xl font-serif -rotate-45">W</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
              Our Journey
            </p>
            <h2
              id="story-heading"
              className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-5 font-serif"
            >
              Our Story
            </h2>
            <div className="flex items-center gap-2 mb-6" aria-hidden="true">
              <div className="h-px w-16 bg-amber-500/50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
              <div className="w-2 h-2 rotate-45 border border-amber-500" />
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
              <div className="h-px w-16 bg-amber-500/50" />
            </div>
            <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
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

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 3 — MISSION
// ═════════════════════════════════════════════════════════════════════════════
function MissionSection() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="py-16 md:py-20 px-4 bg-stone-100 dark:bg-stone-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="group relative bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-10 md:p-14 text-center">
          <CornerAccents />

          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
            Our Purpose
          </p>
          <h2
            id="mission-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-5 font-serif"
          >
            Our Mission
          </h2>
          <DiamondDivider className="mb-6" />
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-serif italic">
            To connect travelers with the authentic soul of Central Asia through
            responsible, meaningful experiences that benefit local communities
            and preserve cultural heritage for future generations.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 4 — TEAM
// ═════════════════════════════════════════════════════════════════════════════
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

function TeamSection() {
  return (
    <section
      aria-labelledby="team-heading"
      className="py-16 md:py-20 px-4 bg-amber-50 dark:bg-stone-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
            The People
          </p>
          <h2
            id="team-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Meet Our Team
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            Local experts and global adventurers united by a love for Central
            Asia.
          </p>
          <DiamondDivider className="mt-5" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <article
              key={member.name}
              className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <CornerAccents />

              {/* Team member photo */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              <div className="p-6 text-center flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 mb-1 font-serif group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  {member.role}
                </p>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 5 — VALUES
// ═════════════════════════════════════════════════════════════════════════════
const values = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    title: "Authentic Experiences",
    description:
      "We go beyond tourist traps to connect you with real people, traditions, and hidden places.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
    title: "Sustainable Travel",
    description:
      "We minimize environmental impact and ensure tourism benefits local communities directly.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    title: "Safety First",
    description:
      "Experienced guides, vetted partners, and 24/7 support ensure your peace of mind.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
    title: "Small Groups",
    description:
      "Intimate group sizes mean personalized attention and deeper connections.",
  },
];

function ValuesSection() {
  return (
    <section
      aria-labelledby="values-heading"
      className="relative py-16 md:py-20 px-4 bg-stone-900 dark:bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="values-deco" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#values-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
            What We Stand For
          </p>
          <h2
            id="values-heading"
            className="text-3xl md:text-4xl font-bold mb-3 font-serif"
          >
            Our Values
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto">
            The principles that guide every journey we create.
          </p>
          <DiamondDivider className="mt-5" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="group relative bg-white/5 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/60 transition-all duration-300 p-6 text-center"
            >
              <CornerAccents />

              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4 group-hover:bg-amber-500/20 transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {value.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif">{value.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 6 — CTA
// ═════════════════════════════════════════════════════════════════════════════
function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-16 md:py-20 px-4 bg-amber-50 dark:bg-stone-950"
    >
      <div className="max-w-4xl mx-auto">
        <div className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-10 md:p-14 text-center">
          <CornerAccents />

          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
            Begin Your Journey
          </p>
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-4 font-serif"
          >
            Ready to Explore With Us?
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s plan your Central Asian adventure together. Our team is
            here to answer your questions and craft your perfect trip.
          </p>

          <DiamondDivider className="mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:from-amber-700 active:to-amber-800 text-white px-8 py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
            >
              Contact Us
            </Link>
            <Link
              href="/tours"
              className="border-2 border-amber-500/50 hover:bg-amber-500 hover:text-white text-amber-700 dark:text-amber-400 px-8 py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
      <HeroSection />
      <StorySection />
      <MissionSection />
      <TeamSection />
      <ValuesSection />
      <CTASection />
    </div>
  );
}
