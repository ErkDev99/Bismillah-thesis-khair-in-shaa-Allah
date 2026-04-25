const en = {
  header: {
    home: "Home",
    tours: "Tours",
    destinations: "Destinations",
    about: "About",
    practicalInfo: "Practical Info",
    blog: "Blog",
    contact: "Contact",
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchToEnglish: "Switch to English",
    switchToRussian: "Переключить на русский",
  },
  footer: {
    tagline: "Discover amazing destinations and create unforgettable memories with our expertly crafted tours.",
    quickLinks: "Quick Links",
    tours: "Tours",
    destinations: "Destinations",
    aboutUs: "About Us",
    contact: "Contact",
    support: "Support",
    practicalInfo: "Practical Info",
    faq: "FAQ",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contactUs: "Contact Us",
    rights: "All rights reserved.",
  },
  chat: {
    assistantName: "Wanderlust Assistant",
    online: "Online",
    typing: "Typing...",
    welcomeMessage:
      "Hello! I'm your Wanderlust travel assistant. How can I help you plan your Central Asian adventure today?",
    promptTitle: "Need help planning your trip?",
    promptSubtitle: "Click to chat with our travel assistant!",
    promptOpenAriaLabel: "Open chat with travel assistant",
    promptDismissAriaLabel: "Dismiss chat prompt",
    openChat: "Open chat",
    closeChat: "Close chat",
    voiceModeTitle: "Voice mode",
    voiceModeAriaLabel: "Open immersive voice mode",
    messagesAriaLabel: "Chat messages",
    assistantTyping: "Assistant is typing",
    userSaidPrefix: "You said: ",
    assistantSaidPrefix: "Assistant said: ",
    inputLabel: "Message",
    inputPlaceholder: "Ask about tours, destinations...",
    dictateAriaLabel: "Dictate — click to record voice",
    dictateTitle: "Dictate",
    sendAriaLabel: "Send message",
    recordingAriaLabel: "Recording audio",
    cancelRecordingAriaLabel: "Cancel recording",
    confirmRecordingAriaLabel: "Confirm and transcribe recording",
    transcribingAriaLabel: "Transcribing audio",
    transcribing: "Transcribing...",
    errorMicDenied: "Microphone access denied.",
    errorNoSpeech: "No speech detected. Try again.",
    errorTranscribe: "Could not transcribe. Is the voice service running?",
    errorConnection:
      "Sorry, I'm having trouble connecting right now. Please try again or contact us directly at info@wanderlust.com",
  },
  home: {
    hero: {
      ariaLabel: "Welcome to Wanderlust Central Asia Tours",
      eyebrow: "Kazakhstan · Kyrgyzstan · Uzbekistan",
      headlinePrefix: "Discover the Heart of",
      countries: ["Kazakhstan", "Kyrgyzstan", "Uzbekistan"] as [string, string, string],
      subtitle:
        "Expert-led small-group tours through ancient Silk Road cities, soaring mountain ranges, and nomadic landscapes unlike anywhere else on Earth.",
      browseTours: "Browse All Tours",
      exploreDestinations: "Explore Destinations",
    },
    stats: {
      ariaLabel: "Key stats",
      destinations: "Destinations",
      travelers: "Happy Travelers",
      rating: "Avg. Rating",
    },
    whyUs: {
      eyebrow: "Why Choose Us",
      title: "Why Travel with Wanderlust?",
      subtitle:
        "We've spent years crafting journeys that go beyond the tourist trail — here's what makes us different.",
      items: [
        {
          title: "Expert Local Guides",
          description:
            "Every tour is led by certified guides born and raised in the region — giving you authentic insider access that no app or map can replicate.",
        },
        {
          title: "Small Groups (Max 12)",
          description:
            "Smaller groups mean personal attention, deeper connections with locals, and access to places that large tours simply cannot reach.",
        },
        {
          title: "Authentic Experiences",
          description:
            "Sleep in yurts, share meals with nomadic families, and discover places that standard tourism never reaches — genuine cultural immersion.",
        },
      ] as [
        { title: string; description: string },
        { title: string; description: string },
        { title: string; description: string },
      ],
    },
    socialProof: {
      ariaLabel: "Traveler ratings",
      outOf: "out of 5",
      ratedByPrefix: "Rated by",
      verifiedTravelers: "524 verified travelers",
      leaveReview: "Leave a review",
      viewAllReviews: "View All Reviews",
      reviews: [
        {
          quote: "Best travel decision I ever made — our guide knew every hidden spot.",
          name: "Emma B.",
          country: "United Kingdom",
        },
        {
          quote: "Sleeping in a yurt under the stars is something I'll never forget.",
          name: "Lars M.",
          country: "Germany",
        },
        {
          quote: "Perfectly balanced — adventurous but never rushed. Absolutely perfect.",
          name: "Hana K.",
          country: "Japan",
        },
      ] as [
        { quote: string; name: string; country: string },
        { quote: string; name: string; country: string },
        { quote: string; name: string; country: string },
      ],
    },
    featuredTours: {
      eyebrow: "Curated Journeys",
      title: "Featured Tours",
      subtitle: "Handpicked journeys that showcase the best of Central Asia.",
      viewAll: "View all tours",
      from: "From",
      viewTour: "View Tour",
      viewTourAriaPrefix: "View Tour",
      ratingPrefix: "Rated",
      ratingSuffix: "out of 5",
      ratingAriaPrefix: "Rating:",
      reviewsSuffix: "reviews",
    },
    featuredDestinations: {
      eyebrow: "Iconic Places",
      title: "Top Destinations",
      subtitle: "Iconic places where ancient legend meets breathtaking landscape.",
      viewAll: "All destinations",
      toursSuffix: "tours",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What Our Travelers Say",
      subtitle: "Real reviews from real adventurers. No filters, no edits.",
      readAll: "Read All Reviews",
      leaveReview: "Leave a Review",
      items: [
        {
          name: "Emma B.",
          country: "United Kingdom",
          tour: "Silk Road Adventure",
          quote:
            "The Silk Road tour was the trip of a lifetime. Our guide's knowledge of local history was extraordinary — I learned more in 10 days than in years of reading.",
        },
        {
          name: "Lars M.",
          country: "Germany",
          tour: "Nomadic Life Experience",
          quote:
            "Sleeping in a traditional yurt under a sky full of stars in Kyrgyzstan is something I will carry with me forever. Wanderlust made it feel effortless.",
        },
        {
          name: "Hana K.",
          country: "Japan",
          tour: "Mountain Expedition",
          quote:
            "The small group meant we got to know everyone deeply. The itinerary was perfectly balanced — adventurous but never rushed. Absolutely perfect.",
        },
      ] as [
        { name: string; country: string; tour: string; quote: string },
        { name: string; country: string; tour: string; quote: string },
        { name: string; country: string; tour: string; quote: string },
      ],
    },
    newsletter: {
      title: "Get Inspired Weekly",
      subtitle:
        "Travel tips, exclusive deals, and hidden gems from Central Asia — delivered straight to your inbox. No spam, ever.",
      emailLabel: "Your email address",
      emailPlaceholder: "your@email.com",
      subscribe: "Subscribe",
      disclaimer: "No spam. Unsubscribe at any time.",
      formAriaLabel: "Newsletter signup form",
    },
    cta: {
      title: "Ready to Start Your Adventure?",
      subtitle:
        "Our travel experts are available to craft a custom itinerary just for you. No two trips are alike — and yours shouldn't be either.",
      browseTours: "Browse Tours",
      contactUs: "Contact Us",
    },
    difficulty: {
      Easy: "Easy",
      Moderate: "Moderate",
      Challenging: "Challenging",
    },
    search: {
      ariaLabel: "Find a tour",
      eyebrow: "Find Your Journey",
      destinationLabel: "Destination",
      anyDestination: "Any destination",
      durationLabel: "Duration",
      anyDuration: "Any duration",
      short: "1–5 Days",
      medium: "6–10 Days",
      long: "11+ Days",
      findTours: "Find Tours",
      seeAllTours: "See All Tours",
      tourSingular: "tour available",
      tourPlural: "tours available",
      from: "From",
      noMatch: "No tours match your selection. Try a different duration.",
    },
  },
  tourCategory: {
    cultural: "Cultural",
    adventure: "Adventure",
  },
  tours: {
    hero: {
      eyebrow: "Curated Journeys",
      titlePrefix: "Explore Our",
      titleAccent: "Tours",
      subtitle:
        "From cultural immersions to mountain expeditions, find the perfect adventure for your travel style.",
      ariaLabel: "Tours hero",
    },
    filters: {
      sidebarAriaLabel: "Tour filters",
      heading: "Filters",
      clearAll: "Clear all",
      destinationLabel: "Destination",
      allDestinations: "All Destinations",
      categoryLabel: "Category",
      allCategories: "All Categories",
      difficultyLabel: "Difficulty",
      anyDifficulty: "Any Difficulty",
      durationLabel: "Duration",
      anyDuration: "Any Duration",
      short: "1-5 Days",
      medium: "6-10 Days",
      long: "11+ Days",
      maxPrice: "Max Price",
      showFilters: "Show Filters",
      hideFilters: "Hide Filters",
    },
    sort: {
      label: "Sort by:",
      featured: "Featured",
      priceLow: "Price: Low to High",
      priceHigh: "Price: High to Low",
      rating: "Highest Rated",
      duration: "Duration",
      toursFound: "tours found",
    },
    card: {
      featured: "Featured",
      viewTour: "View Tour",
      viewTourAriaPrefix: "View Tour",
    },
    empty: {
      title: "No tours found",
      subtitle: "Try adjusting your filters to find what you're looking for.",
      clear: "Clear all filters",
    },
    listingsAriaLabel: "Tour listings",
    detail: {
      notFound: "Tour Not Found",
      back: "Back to Tours",
      heroAriaSuffix: "hero",
      overviewEyebrow: "About This Tour",
      overviewTitle: "Overview",
      highlightsEyebrow: "What Awaits You",
      highlightsTitle: "Highlights",
      itineraryEyebrow: "Day by Day",
      itineraryTitle: "Itinerary",
      inclusionsEyebrow: "The Details",
      inclusionsTitle: "What's Included",
      included: "Included",
      notIncluded: "Not Included",
      detailsAriaLabel: "Tour details",
      ratingAriaPrefix: "Rating:",
      ratingMid: "out of 5,",
      ratingSuffix: "reviews",
      reviewsSuffix: "reviews",
      locationIconAria: "Location",
      durationIconAria: "Duration",
      groupIconAria: "Group size",
      priceFrom: "From",
      perPerson: "/ person",
      bookNow: "Book This Tour",
      saveWishlist: "Save to Wishlist",
      rateTour: "Rate This Tour",
      perks: [
        "Free cancellation up to 30 days",
        "Reserve now, pay later",
        "Small group experience",
      ] as [string, string, string],
      reviewCta: {
        title: "Been on this tour?",
        subtitle:
          "Share your experience to help future travelers. Only verified bookings can leave reviews.",
        button: "Write a Review",
      },
    },
  },
  destinations: {
    hero: {
      eyebrow: "Central Asia",
      title: "Explore Our Destinations",
      subtitle:
        "From the snow-capped peaks of the Tian Shan to the ancient Silk Road cities, discover the wonders of Central Asia.",
      ariaLabel: "Destinations hero",
    },
    filters: {
      ariaLabel: "Filter by country",
      all: "All Destinations",
    },
    countries: {
      Kazakhstan: "Kazakhstan",
      Kyrgyzstan: "Kyrgyzstan",
      Uzbekistan: "Uzbekistan",
    } as Record<string, string>,
    card: {
      featured: "Featured",
      toursSuffix: "tours",
    },
    results: {
      showingPrefix: "Showing",
      destinationSingular: "destination",
      destinationPlural: "destinations",
      in: "in",
    },
    empty: {
      title: "No destinations found",
      subtitle: "We don't have destinations in this country yet.",
      viewAll: "View all destinations",
    },
    stats: {
      destinations: "Destinations",
      tours: "Tours",
      countries: "Countries",
      travelers: "Happy Travelers",
    },
    cta: {
      eyebrow: "Plan Your Journey",
      title: "Can't decide where to go?",
      subtitle:
        "Our travel experts can help you plan the perfect itinerary based on your interests, budget, and time frame.",
      button: "Talk to an Expert",
    },
    listingsAriaLabel: "Destinations listing",
    detail: {
      back: "Back to Destinations",
      heroAriaSuffix: "hero",
      toursAvailableSuffix: "tours available",
      detailsAriaLabel: "Destination details",
      quickFacts: {
        eyebrow: "Know Before You Go",
        title: "Quick Facts",
        languages: "Languages:",
        currency: "Currency:",
        timezone: "Timezone:",
        planVisit: "Plan Your Visit",
      },
      overview: {
        eyebrow: "About This Place",
        titlePrefix: "About",
        highlightsTitle: "Highlights",
      },
      weather: {
        eyebrow: "When to Visit",
        title: "Best Time to Visit",
        summer: "Summer",
        winter: "Winter",
      },
      thingsToDo: {
        eyebrow: "Experiences",
        title: "Things to Do",
      },
      relatedTours: {
        eyebrow: "Curated Journeys",
        title: "Tours in This Destination",
        viewAll: "View All Tours",
        viewTourAriaPrefix: "View Tour",
        ratingAriaPrefix: "Rated",
        ratingAriaSuffix: "out of 5",
      },
    },
  },
  about: {
    hero: {
      ariaLabel: "About Wanderlust",
      since: "Since 2018",
      eyebrow: "Our Story",
      titlePrefix: "About",
      titleAccent: "Wanderlust",
      subtitle:
        "We're passionate travelers dedicated to sharing the hidden gems of Central Asia with the world.",
    },
    story: {
      eyebrow: "Our Journey",
      title: "Our Story",
      imageAlt: "Central Asian landscape",
      paragraphs: [
        "Wanderlust was born from a simple belief: Central Asia is one of the world's most underrated travel destinations, and it deserves to be shared with curious explorers everywhere.",
        "Founded in 2018 by a group of local guides and international travel enthusiasts, we set out to create authentic, immersive experiences that go beyond typical tourism. We wanted travelers to feel the warmth of nomadic hospitality, taste home-cooked meals in remote villages, and witness landscapes that few outsiders ever see.",
        "Today, we've helped over 1,000 travelers discover the magic of the Silk Road, from the turquoise domes of Samarkand to the wild peaks of the Tian Shan. Every trip we design reflects our commitment to sustainable travel, cultural respect, and unforgettable adventure.",
      ] as [string, string, string],
    },
    mission: {
      eyebrow: "Our Purpose",
      title: "Our Mission",
      body: "To connect travelers with the authentic soul of Central Asia through responsible, meaningful experiences that benefit local communities and preserve cultural heritage for future generations.",
    },
    team: {
      eyebrow: "The People",
      title: "Meet Our Team",
      subtitle:
        "Local experts and global adventurers united by a love for Central Asia.",
      members: [
        {
          name: "Aibek Nurzhanov",
          role: "Founder & Lead Guide",
          bio: "Born in the Tian Shan foothills, Aibek has 15+ years of guiding experience across Central Asia.",
        },
        {
          name: "Sarah Mitchell",
          role: "Operations Director",
          bio: "Former travel journalist who fell in love with the region and never left. Manages logistics and partnerships.",
        },
        {
          name: "Bekzat Omarov",
          role: "Cultural Expert",
          bio: "Historian and storyteller specializing in Silk Road history and nomadic traditions.",
        },
        {
          name: "Elena Petrova",
          role: "Customer Experience",
          bio: "Ensures every traveler feels supported from first inquiry to final farewell.",
        },
      ] as [
        { name: string; role: string; bio: string },
        { name: string; role: string; bio: string },
        { name: string; role: string; bio: string },
        { name: string; role: string; bio: string },
      ],
    },
    values: {
      eyebrow: "What We Stand For",
      title: "Our Values",
      subtitle: "The principles that guide every journey we create.",
      items: [
        {
          title: "Authentic Experiences",
          description:
            "We go beyond tourist traps to connect you with real people, traditions, and hidden places.",
        },
        {
          title: "Sustainable Travel",
          description:
            "We minimize environmental impact and ensure tourism benefits local communities directly.",
        },
        {
          title: "Safety First",
          description:
            "Experienced guides, vetted partners, and 24/7 support ensure your peace of mind.",
        },
        {
          title: "Small Groups",
          description:
            "Intimate group sizes mean personalized attention and deeper connections.",
        },
      ] as [
        { title: string; description: string },
        { title: string; description: string },
        { title: string; description: string },
        { title: string; description: string },
      ],
    },
    cta: {
      eyebrow: "Begin Your Journey",
      title: "Ready to Explore With Us?",
      subtitle:
        "Let's plan your Central Asian adventure together. Our team is here to answer your questions and craft your perfect trip.",
      contactUs: "Contact Us",
      browseTours: "Browse Tours",
    },
  },
};

export type Translations = typeof en;
export default en;
