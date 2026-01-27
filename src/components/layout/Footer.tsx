import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-emerald-400">Wanderlust</h3>
            <p className="mt-4 text-gray-400">
              Discover amazing destinations and create unforgettable memories with our expertly crafted tours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/tours" className="hover:text-emerald-400">Tours</Link></li>
              <li><Link href="/destinations" className="hover:text-emerald-400">Destinations</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/practical-info" className="hover:text-emerald-400">Practical Info</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-400">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>info@wanderlust.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Travel Street</li>
              <li>Adventure City, AC 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}