import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-stone-950 dark:bg-black text-white overflow-hidden">
      {/* Art Deco geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="footer-deco" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5"/>
            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-deco)"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-400 font-serif tracking-wide">Wanderlust</h3>
            <p className="mt-4 text-stone-400 leading-relaxed">
              Discover amazing destinations and create unforgettable memories with our expertly crafted tours.
            </p>
            {/* Diamond ornament */}
            <div className="flex items-center gap-2 mt-5" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/40" />
              <div className="w-2 h-2 rotate-45 border border-amber-500/50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/40" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-[0.2em] text-sm text-amber-300/80">Quick Links</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><Link href="/tours" className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">Tours</Link></li>
              <li><Link href="/destinations" className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">Destinations</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-[0.2em] text-sm text-amber-300/80">Support</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><Link href="/practical-info" className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">Practical Info</Link></li>
              <li><Link href="/faq" className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-[0.2em] text-sm text-amber-300/80">Contact Us</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>info@wanderlust.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Travel Street</li>
              <li>Adventure City, AC 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Art Deco divider */}
        <div className="mt-10 pt-8 text-center">
          {/* Diamond divider */}
          <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
            <div className="h-px w-16 md:w-24 bg-amber-500/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rotate-45 border border-amber-500/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/50" />
            <div className="h-px w-16 md:w-24 bg-amber-500/30" />
          </div>
          <p className="text-stone-400 text-sm">
            &copy; {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}