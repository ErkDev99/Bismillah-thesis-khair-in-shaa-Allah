import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 dark:bg-black text-white overflow-hidden">
      {/* Radial emerald glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-emerald-400 font-serif tracking-wide">Wanderlust</h3>
            <p className="mt-4 text-stone-400 leading-relaxed">
              Discover amazing destinations and create unforgettable memories with our expertly crafted tours.
            </p>
            {/* Leaf ornament */}
            <div className="flex items-center gap-2 mt-5" aria-hidden="true">
              <div className="h-px w-8 bg-emerald-500/40" />
              <svg className="w-4 h-4 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
              </svg>
              <div className="h-px w-8 bg-emerald-500/40" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-[0.2em] text-sm text-emerald-300/80">Quick Links</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><Link href="/tours" className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">Tours</Link></li>
              <li><Link href="/destinations" className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">Destinations</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-[0.2em] text-sm text-emerald-300/80">Support</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><Link href="/practical-info" className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">Practical Info</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-[0.2em] text-sm text-emerald-300/80">Contact Us</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>info@wanderlust.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Travel Street</li>
              <li>Adventure City, AC 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with nature divider */}
        <div className="mt-10 pt-8 text-center">
          {/* Nature divider */}
          <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
            <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
            <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
            </svg>
            <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
          </div>
          <p className="text-stone-400 text-sm">
            &copy; {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}