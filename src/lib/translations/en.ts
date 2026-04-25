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
  contact: {
    hero: {
      ariaLabel: "Contact Wanderlust",
      eyebrow: "We're Listening",
      titlePrefix: "Get in",
      titleAccent: "Touch",
      subtitle:
        "Have questions about a tour? Ready to start planning? We would love to hear from you.",
    },
    info: {
      eyebrow: "Reach Us",
      title: "Contact Information",
      labels: {
        email: "Email",
        phone: "Phone",
        office: "Office",
        hours: "Hours",
      },
      hours: "Mon-Fri: 9AM-6PM (UTC+6)",
      followUs: "Follow Us",
    },
    form: {
      eyebrow: "Inquiry Form",
      title: "Send Us a Message",
      subtitle:
        "Fill out the form below and we will get back to you as soon as possible.",
      fullNameLabel: "Full Name *",
      fullNamePlaceholder: "John Doe",
      emailLabel: "Email Address *",
      emailPlaceholder: "john@example.com",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+1 (555) 000-0000",
      subjectLabel: "Subject *",
      selectSubject: "Select a subject",
      subjects: {
        tourInquiry: "Tour Inquiry",
        customTrip: "Custom Trip Planning",
        booking: "Booking Question",
        partnership: "Partnership Opportunity",
        feedback: "Feedback",
        other: "Other",
      },
      messageLabel: "Message *",
      messagePlaceholder: "Tell us about your travel plans or questions...",
      submit: "Send Message",
      sending: "Sending...",
      success:
        "Thank you! Your message has been sent. We will get back to you within 24 hours.",
      error: "Something went wrong. Please try again or email us directly.",
    },
    map: {
      eyebrow: "Our Location",
      title: "Find Us",
      iframeTitle: "Our location in Bishkek, Kyrgyzstan",
    },
    faq: {
      eyebrow: "Quick Answers",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How quickly will you respond to my inquiry?",
          answer:
            "We typically respond within 24 hours during business days. For urgent matters, please call us directly.",
        },
        {
          question: "Can you create custom itineraries?",
          answer:
            "Absolutely! We specialize in tailor-made trips. Share your interests, budget, and timeframe, and we will craft the perfect journey.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept major credit cards, bank transfers, and PayPal. A 30% deposit secures your booking, with the balance due 30 days before departure.",
        },
      ] as [
        { question: string; answer: string },
        { question: string; answer: string },
        { question: string; answer: string },
      ],
      moreQuestionsPrefix: "More questions?",
      moreQuestionsLink: "Check our Practical Info page",
    },
  },
  practicalInfo: {
    hero: {
      ariaLabel: "Practical travel information",
      bannerLabel: "Travel Guide",
      eyebrow: "Know Before You Go",
      titlePrefix: "Practical",
      titleAccent: "Information",
      subtitle:
        "Everything you need to know to prepare for your Central Asian adventure.",
    },
    quickNav: {
      ariaLabel: "Practical info sections",
      sections: {
        visa: "Visa Info",
        weather: "Weather",
        packing: "Packing",
        health: "Health & Safety",
        money: "Money",
        culture: "Culture",
      },
    },
    visa: {
      eyebrow: "Entry Requirements",
      title: "Visa Information",
      durationLabel: "Visa-free duration",
      visaFreeForLabel: "Visa-free for citizens of",
      noteStrong: "Note:",
      noteBody:
        "Visa requirements change frequently. Always verify current requirements with the official embassy or consulate before traveling.",
      countries: [
        {
          country: "Kazakhstan",
          flag: "🇰🇿",
          visaFree: "USA, UK, EU countries, Canada, Australia, Japan, South Korea, UAE",
          duration: "30 days",
          notes:
            "Visa-free for 70+ countries. Registration required for stays over 30 days.",
        },
        {
          country: "Kyrgyzstan",
          flag: "🇰🇬",
          visaFree: "USA, UK, EU countries, Canada, Australia, Japan, Most countries",
          duration: "60 days",
          notes:
            "One of the most open visa policies in Central Asia. E-visa available for others.",
        },
        {
          country: "Uzbekistan",
          flag: "🇺🇿",
          visaFree: "USA, UK, EU countries, Canada, Australia, Japan, South Korea",
          duration: "30 days",
          notes:
            "Visa-free since 2019 for 90+ countries. E-visa available for others.",
        },
      ] as [
        { country: string; flag: string; visaFree: string; duration: string; notes: string },
        { country: string; flag: string; visaFree: string; duration: string; notes: string },
        { country: string; flag: string; visaFree: string; duration: string; notes: string },
      ],
    },
    weather: {
      eyebrow: "When to Visit",
      title: "Weather & Best Time to Visit",
      bestForLabel: "Best for",
      seasons: [
        {
          season: "Spring (Mar–May)",
          icon: "🌸",
          temp: "10–20°C (50–68°F)",
          description:
            "Mild temperatures, occasional rain. Flowers bloom across the steppes.",
          ideal: "City tours, cultural sites, photography",
        },
        {
          season: "Summer (Jun–Aug)",
          icon: "☀️",
          temp: "25–40°C (77–104°F)",
          description: "Hot in lowlands, perfect in mountains. Peak trekking season.",
          ideal: "Mountain treks, lake visits, nomadic experiences",
        },
        {
          season: "Autumn (Sep–Nov)",
          icon: "🍂",
          temp: "10–25°C (50–77°F)",
          description: "Golden colors, comfortable temperatures. Fewer crowds.",
          ideal: "Hiking, photography, cultural festivals",
        },
        {
          season: "Winter (Dec–Feb)",
          icon: "❄️",
          temp: "-10 to 5°C (14–41°F)",
          description: "Cold but magical. Skiing opportunities in mountains.",
          ideal: "Skiing, winter landscapes, hot springs",
        },
      ] as [
        { season: string; icon: string; temp: string; description: string; ideal: string },
        { season: string; icon: string; temp: string; description: string; ideal: string },
        { season: string; icon: string; temp: string; description: string; ideal: string },
        { season: string; icon: string; temp: string; description: string; ideal: string },
      ],
    },
    packing: {
      eyebrow: "What to Bring",
      title: "Packing Lists",
      essentials: {
        title: "Essentials",
        items: [
          "Passport (valid 6+ months)",
          "Travel insurance documents",
          "Copies of important documents",
          "Credit/debit cards + some cash (USD)",
          "Phone + charger + adapter (Type C/F)",
          "Medications + basic first aid",
          "Sunscreen + sunglasses",
          "Reusable water bottle",
        ] as [string, string, string, string, string, string, string, string],
      },
      clothing: {
        title: "Clothing",
        items: [
          "Layers (weather varies greatly)",
          "Comfortable walking shoes",
          "Light jacket or fleece",
          "Rain jacket (spring/autumn)",
          "Hat for sun protection",
          "Modest clothing for religious sites",
          "Warm clothes if visiting mountains",
          "Swimwear (for lakes/pools)",
        ] as [string, string, string, string, string, string, string, string],
      },
      trekking: {
        title: "Trekking Gear",
        items: [
          "Sturdy hiking boots (broken in)",
          "Trekking poles",
          "Daypack (20–30L)",
          "Headlamp + batteries",
          "Thermal underwear",
          "Down jacket",
          "Gloves + warm hat",
          "Sleeping bag liner (for yurt stays)",
        ] as [string, string, string, string, string, string, string, string],
      },
    },
    health: {
      eyebrow: "Stay Well",
      title: "Health & Safety",
      items: [
        {
          title: "Vaccinations",
          icon: "💉",
          content:
            "No mandatory vaccinations required. Recommended: Hepatitis A & B, Typhoid, routine vaccinations. Consult your doctor 4–6 weeks before travel.",
        },
        {
          title: "Altitude",
          icon: "⛰️",
          content:
            "Many destinations are above 2,000 m. Acclimatize gradually, stay hydrated, and watch for altitude sickness symptoms. Descend if symptoms worsen.",
        },
        {
          title: "Water",
          icon: "💧",
          content:
            "Drink only bottled or purified water. Avoid ice in drinks outside major hotels. Bottled water is widely available and inexpensive.",
        },
        {
          title: "Safety",
          icon: "🛡️",
          content:
            "Central Asia is generally very safe for tourists. Use common sense, avoid displaying expensive items, and keep valuables secure.",
        },
      ] as [
        { title: string; icon: string; content: string },
        { title: string; icon: string; content: string },
        { title: string; icon: string; content: string },
        { title: string; icon: string; content: string },
      ],
      emergencyStrong: "Emergency Numbers:",
      emergencyBody:
        "Police: 102 | Ambulance: 103 | Fire: 101 (in all Central Asian countries)",
    },
    money: {
      eyebrow: "Currency",
      title: "Money & Currency",
      currencyLabel: "Currency",
      rateLabel: "Approximate rate",
      countries: [
        {
          country: "Kazakhstan",
          currency: "Tenge (KZT)",
          rate: "~450 KZT = 1 USD",
          tips:
            "ATMs widely available in cities. Cards accepted in major establishments. Carry cash for bazaars and rural areas.",
        },
        {
          country: "Kyrgyzstan",
          currency: "Som (KGS)",
          rate: "~88 KGS = 1 USD",
          tips:
            "Cash preferred in most places. ATMs available in Bishkek and major towns. USD easily exchanged.",
        },
        {
          country: "Uzbekistan",
          currency: "Som (UZS)",
          rate: "~12,500 UZS = 1 USD",
          tips:
            "Cash is king. Bring clean, new USD bills. Cards increasingly accepted in tourist areas.",
        },
      ] as [
        { country: string; currency: string; rate: string; tips: string },
        { country: string; currency: string; rate: string; tips: string },
        { country: string; currency: string; rate: string; tips: string },
      ],
      tipStrong: "Tip:",
      tipBody:
        "Bring clean, unmarked US dollars (2009 or newer) for the best exchange rates. Torn or marked bills may be refused.",
    },
    culture: {
      eyebrow: "Local Customs",
      title: "Cultural Etiquette",
      tips: [
        {
          title: "Hospitality",
          description:
            "Central Asians are incredibly hospitable. You may be invited into homes for tea — it's polite to accept. Remove shoes when entering homes.",
        },
        {
          title: "Greetings",
          description:
            "Handshakes are common between men. With women, wait for them to extend their hand first. A slight bow shows respect to elders.",
        },
        {
          title: "Bread",
          description:
            "Bread (non/nan) is sacred. Never place it upside down, throw it away, or put it on the ground. Break it by hand, don't cut with a knife.",
        },
        {
          title: "Photography",
          description:
            "Always ask permission before photographing people. Some religious sites prohibit photography. Military installations are off-limits.",
        },
        {
          title: "Dress Code",
          description:
            "Dress modestly, especially at religious sites. Women should cover shoulders and knees. Headscarves required at some mosques.",
        },
        {
          title: "Bargaining",
          description:
            "Expected at bazaars and markets. Start at 50–60% of asking price. Keep it friendly and smile. Fixed prices in shops and supermarkets.",
        },
      ] as [
        { title: string; description: string },
        { title: string; description: string },
        { title: string; description: string },
        { title: string; description: string },
        { title: string; description: string },
        { title: string; description: string },
      ],
    },
    cta: {
      eyebrow: "Your Next Step",
      title: "Ready to Start Your Adventure?",
      subtitle:
        "Now that you know what to expect, let us help you plan the perfect trip.",
      browseTours: "Browse Tours",
      contactUs: "Contact Us",
    },
  },
  faq: {
    hero: {
      ariaLabel: "Frequently asked questions",
      bannerLabel: "Need Help?",
      eyebrow: "Answers",
      titlePrefix: "Frequently Asked",
      titleAccent: "Questions",
      subtitle:
        "Everything you need to know about traveling with Wanderlust. Can't find your answer? Contact us anytime.",
    },
    quickNavAriaLabel: "FAQ categories",
    categoryLabel: "Category",
    categories: {
      general: {
        title: "General Questions",
        faqs: [
          {
            question: "What countries does Wanderlust operate in?",
            answer:
              "We specialize in Central Asia, specifically Kazakhstan, Kyrgyzstan, and Uzbekistan. These three countries offer an incredible diversity of experiences — from the ancient Silk Road cities of Uzbekistan to the nomadic traditions of Kyrgyzstan and the modern cities and stunning nature of Kazakhstan.",
          },
          {
            question: "Is Central Asia safe for tourists?",
            answer:
              "Yes, Central Asia is generally very safe for tourists. The region has low crime rates, and locals are known for their warm hospitality toward visitors. As with any travel, we recommend standard precautions: keep valuables secure, be aware of your surroundings, and follow local customs. Our guides are with you throughout the journey to ensure your safety and comfort.",
          },
          {
            question: "What languages are spoken in Central Asia?",
            answer:
              "Each country has its own national language (Kazakh, Kyrgyz, Uzbek), but Russian is widely understood across the region as a common second language. English is spoken in tourist areas and by younger generations in cities, but less common in rural areas. All our tours include English-speaking guides, so language won't be a barrier.",
          },
          {
            question: "What is the best time to visit Central Asia?",
            answer:
              "The best time depends on your interests. For general sightseeing and comfortable temperatures, visit in spring (April–June) or autumn (September–October). Summer (July–August) is ideal for mountain trekking but can be very hot in Uzbekistan. Winter (December–February) offers skiing opportunities in Kazakhstan and Kyrgyzstan, plus fewer crowds at historical sites.",
          },
        ] as [
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
        ],
      },
      booking: {
        title: "Booking & Payments",
        faqs: [
          {
            question: "How do I book a tour?",
            answer:
              "You can book a tour by clicking 'Book This Tour' on any tour page, which will take you to our contact form. Alternatively, email us at info@wanderlust.com or call +1 (555) 123-4567. We'll confirm availability, answer any questions, and send you a detailed itinerary and invoice.",
          },
          {
            question: "What payment methods do you accept?",
            answer:
              "We accept major credit cards (Visa, MasterCard, American Express), bank transfers, and PayPal. For bank transfers, we provide details for both USD and EUR accounts. All payments are processed securely.",
          },
          {
            question: "What is your deposit and payment policy?",
            answer:
              "We require a 30% deposit to secure your booking. The remaining 70% is due 30 days before your tour start date. For bookings made within 30 days of departure, full payment is required at the time of booking.",
          },
          {
            question: "What is your cancellation policy?",
            answer:
              "We understand plans can change. Cancellations made 60+ days before departure receive a full refund minus a $100 admin fee. Cancellations 30–59 days before departure receive a 50% refund. Cancellations less than 30 days before departure are non-refundable. We strongly recommend purchasing travel insurance.",
          },
          {
            question: "Can I customize a tour or create a private trip?",
            answer:
              "Absolutely! We love creating custom itineraries. Tell us your interests, budget, group size, and preferred dates, and we'll design a personalized journey just for you. Private tours are available for any of our existing itineraries as well.",
          },
        ] as [
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
        ],
      },
      tours: {
        title: "Tours & Experiences",
        faqs: [
          {
            question: "What is included in the tour price?",
            answer:
              "Our tour prices typically include: accommodation, transportation within the region, English-speaking guides, entrance fees to attractions, and meals as specified in the itinerary (usually breakfast daily plus some lunches and dinners). International flights, travel insurance, visa fees (if any), and personal expenses are not included unless otherwise stated.",
          },
          {
            question: "What is the group size for tours?",
            answer:
              "Our group sizes vary by tour type. Cultural tours typically have 6–16 participants, adventure treks have 4–8, and photography expeditions are limited to 4–8 for personalized attention. We believe smaller groups provide better experiences and more meaningful connections.",
          },
          {
            question: "What fitness level is required for your tours?",
            answer:
              "This varies by tour. Our cultural tours are suitable for anyone who can walk for a few hours with breaks. Adventure and trekking tours require moderate to good fitness — you should be comfortable hiking 10–15 km per day with elevation changes. Each tour page specifies the difficulty level (Easy, Moderate, or Challenging).",
          },
          {
            question: "What type of accommodation is provided?",
            answer:
              "Accommodation varies by tour and location. In cities, we use 3–4 star hotels or boutique guesthouses. In rural areas, you may stay in traditional yurts, family homestays, or comfortable guesthouses. All accommodations are clean, safe, and carefully selected for authenticity and comfort.",
          },
          {
            question: "Are meals included? What about dietary restrictions?",
            answer:
              "Most tours include breakfast daily, plus additional meals as specified. We can accommodate vegetarian, vegan, gluten-free, and other dietary requirements with advance notice. Central Asian cuisine is meat-heavy, but our team knows how to find delicious alternatives.",
          },
        ] as [
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
        ],
      },
      practical: {
        title: "Practical Information",
        faqs: [
          {
            question: "Do I need a visa to visit Central Asia?",
            answer:
              "Many nationalities enjoy visa-free access. Citizens of the USA, UK, EU, Canada, Australia, and 60+ other countries can visit Kazakhstan, Kyrgyzstan, and Uzbekistan visa-free for 30–60 days. Check our Practical Info page or your country's embassy website for the most current requirements.",
          },
          {
            question: "What currency should I bring?",
            answer:
              "US dollars are the best currency to bring — they're easily exchanged everywhere and often get the best rates. Bring clean, unmarked bills from 2009 or newer. ATMs are available in cities, and credit cards are increasingly accepted in urban areas, but cash is essential for rural regions and bazaars.",
          },
          {
            question: "What should I pack for a Central Asia trip?",
            answer:
              "Pack layers, as temperatures can vary significantly between day and night. Comfortable walking shoes are essential. For religious sites, bring modest clothing (covering shoulders and knees). Sun protection is important at high altitudes. Check our Practical Info page for detailed packing lists by season and tour type.",
          },
          {
            question: "Is travel insurance required?",
            answer:
              "While not technically required, we strongly recommend comprehensive travel insurance that covers medical emergencies, evacuation, trip cancellation, and lost luggage. For adventure tours involving trekking at altitude, ensure your policy covers activities up to 4,000 m or higher.",
          },
          {
            question: "What vaccinations do I need?",
            answer:
              "No vaccinations are mandatory for Central Asia. However, we recommend being up-to-date on routine vaccinations and considering Hepatitis A, Hepatitis B, and Typhoid. Consult your doctor or a travel clinic 4–6 weeks before departure for personalized advice.",
          },
          {
            question: "Can I use my mobile phone in Central Asia?",
            answer:
              "Yes, mobile coverage is good in cities and along main routes. You can buy local SIM cards inexpensively at airports and phone shops (bring your passport). WiFi is available in most hotels and many cafes. In remote mountain areas, coverage may be limited or unavailable.",
          },
        ] as [
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
          { question: string; answer: string },
        ],
      },
    },
    contactCta: {
      eyebrow: "Still Stuck?",
      title: "Still Have Questions?",
      subtitle:
        "Our team is here to help. Reach out anytime and we'll get back to you within 24 hours.",
      contactUs: "Contact Us",
      emailUs: "Email Us Directly",
      callUsPrefix: "Or call us at",
    },
    related: {
      eyebrow: "Explore More",
      title: "Helpful Resources",
      items: [
        {
          title: "Practical Info",
          description: "Visa, weather, packing lists, and more",
        },
        {
          title: "Our Tours",
          description: "Browse all available adventures",
        },
        {
          title: "About Us",
          description: "Learn about our team and mission",
        },
      ] as [
        { title: string; description: string },
        { title: string; description: string },
        { title: string; description: string },
      ],
    },
  },
  blog: {
    hero: {
      ariaLabel: "Travel blog",
      eyebrowOrnament: "The Journal",
      eyebrow: "Stories from the Silk Road",
      titlePrefix: "Travel Stories &",
      titleAccent: "Guides",
      subtitle:
        "Insights, tips, and inspiration for your Central Asian adventure from our team of local experts.",
    },
    categories: {
      "travel-guide": "Travel Guide",
      culture: "Culture",
      photography: "Photography",
      "food-culture": "Food & Culture",
      adventure: "Adventure",
      destinations: "Destinations",
    } as Record<
      "travel-guide" | "culture" | "photography" | "food-culture" | "adventure" | "destinations",
      string
    >,
    filter: {
      ariaLabel: "Filter posts by category",
      allPosts: "All Posts",
    },
    card: {
      featured: "Featured",
      readFeaturedAriaPrefix: "Read featured post",
      readAriaPrefix: "Read",
    },
    empty: {
      title: "No posts found",
      subtitle: "No blog posts in this category yet.",
      viewAll: "View all posts",
    },
    newsletter: {
      ariaLabel: "Blog newsletter signup",
      eyebrow: "Stay Inspired",
      title: "Get Travel Tips in Your Inbox",
      subtitle:
        "Subscribe to our newsletter for exclusive guides, deals, and inspiration for your next adventure.",
      emailLabel: "Your email address",
      emailPlaceholder: "your@email.com",
      subscribe: "Subscribe",
    },
    detail: {
      back: "Back to Blog",
      notFound: "Post Not Found",
      tagsLabel: "Tags",
      share: "Share this article",
      shareTwitter: "Share on Twitter",
      shareFacebook: "Share on Facebook",
      shareLinkedIn: "Share on LinkedIn",
      related: {
        eyebrow: "Keep Reading",
        title: "Related Articles",
        readAriaPrefix: "Read",
      },
      cta: {
        eyebrow: "Inspired?",
        title: "Ready to Experience Central Asia?",
        subtitle:
          "Turn inspiration into adventure. Browse our curated tours or contact us to plan your custom journey.",
        exploreTours: "Explore Tours",
        contactUs: "Contact Us",
      },
    },
  },
  review: {
    hero: {
      eyebrow: "Share Your Experience",
      titlePrefix: "Leave a",
      titleAccent: "Review",
      subtitle:
        "Your feedback helps future travelers choose the right adventure and helps us improve our tours.",
    },
    steps: {
      verify: "Verify Booking",
      write: "Write Review",
      done: "Done",
    },
    verify: {
      title: "Verify Your Booking",
      subtitle:
        "To ensure authentic reviews, we verify that you traveled with us. Enter your booking reference and the email you used when booking.",
      infoTitle: "Where to find your booking reference",
      infoBody:
        "Check the confirmation email you received after booking. Your reference starts with “WL-” followed by the year and a number (e.g., WL-2025-001).",
      bookingRefLabel: "Booking Reference",
      bookingRefPlaceholder: "e.g. WL-2025-001",
      emailLabel: "Email Address",
      emailPlaceholder: "The email you used when booking",
      submit: "Verify Booking",
      verifying: "Verifying...",
      errorNotFound:
        "Booking reference not found. Please check your confirmation email for the correct reference number. Demo references: WL-2025-001 through WL-2025-006.",
      errorEmailMismatch:
        "The email address does not match this booking. Please use the email you booked with.",
    },
    why: {
      title: "Why do we verify reviews?",
      items: [
        {
          strong: "Authenticity",
          body: "Every review comes from someone who actually traveled with us",
        },
        {
          strong: "Trust",
          body: "Future travelers can book with confidence knowing reviews are real",
        },
        {
          strong: "Quality",
          body: "Verified feedback helps us continuously improve our tours",
        },
      ] as [
        { strong: string; body: string },
        { strong: string; body: string },
        { strong: string; body: string },
      ],
    },
    write: {
      verifiedFor: "Verified booking for:",
      title: "Write Your Review",
      subtitle: "Tell us about your experience on the {tour}.",
      ratingLabel: "Overall Rating",
      starRatingAriaLabel: "Star rating",
      starAriaSingular: "star",
      starAriaPlural: "stars",
      ratingLabels: ["Poor", "Fair", "Good", "Very Good", "Excellent"] as [
        string,
        string,
        string,
        string,
        string,
      ],
      titleLabel: "Review Title",
      titlePlaceholder: "Summarize your experience in a few words",
      bodyLabel: "Your Review",
      bodyPlaceholder:
        "What did you enjoy most? What stood out? Would you recommend this tour?",
      charsNeededSuffix: "more characters needed",
      charsSuffix: "characters",
      nameLabel: "Display Name",
      namePlaceholder: "How your name will appear (e.g. Sarah M.)",
      recommend: "I would recommend Wanderlust to a friend",
      submit: "Submit Review",
      errors: {
        rating: "Please select a star rating.",
        title: "Please add a title for your review.",
        bodyMin: "Please write at least 20 characters in your review.",
        name: "Please enter your name.",
      },
    },
    success: {
      title: "Thank You!",
      body: "Your review for {tour} has been submitted successfully.",
      livePrefix: "Your verified review is now live.",
      viewAllReviews: "View all traveler reviews →",
      verifiedTraveler: "Verified Traveler",
      browseMoreTours: "Browse More Tours",
      backToHome: "Back to Home",
    },
  },
};

export type Translations = typeof en;
export default en;
