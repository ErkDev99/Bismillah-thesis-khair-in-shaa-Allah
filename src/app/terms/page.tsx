// src/app/terms/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Wanderlust",
  description: "Terms and conditions for using Wanderlust travel services and website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-emerald-200">Last updated: January 29, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8 text-lg">
              Welcome to Wanderlust. By accessing our website and using our services, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing or using the Wanderlust website and services, you agree to comply with and be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Services Description</h2>
            <p className="text-gray-600 mb-6">
              Wanderlust provides travel planning, tour booking, and related tourism services for destinations in Central Asia, including Kazakhstan, Kyrgyzstan, and Uzbekistan. We act as an intermediary between travelers and local service providers including hotels, transport operators, and tour guides.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Booking and Payment</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>A 30% deposit is required to confirm your booking</li>
              <li>The remaining balance is due 30 days before the tour start date</li>
              <li>Bookings made within 30 days of departure require full payment</li>
              <li>All prices are in USD unless otherwise stated</li>
              <li>Prices are subject to change until booking is confirmed</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Cancellation Policy</h2>
            <p className="text-gray-600 mb-4">Our cancellation policy is as follows:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li><strong>60+ days before departure:</strong> Full refund minus $100 administrative fee</li>
              <li><strong>30-59 days before departure:</strong> 50% refund</li>
              <li><strong>Less than 30 days before departure:</strong> No refund</li>
              <li>Cancellations must be submitted in writing via email</li>
            </ul>
            <p className="text-gray-600 mb-6">
              We strongly recommend purchasing comprehensive travel insurance to protect against unforeseen cancellations.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Travel Insurance</h2>
            <p className="text-gray-600 mb-6">
              Travel insurance is strongly recommended and may be required for certain adventure tours. Your insurance should cover medical emergencies, evacuation, trip cancellation, and lost luggage. For trekking tours, ensure coverage extends to activities at altitude (4,000m+).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Travel Documents</h2>
            <p className="text-gray-600 mb-6">
              You are responsible for ensuring you have valid travel documents including passports, visas, and any required vaccinations. Wanderlust is not liable for any issues arising from inadequate documentation. We recommend checking entry requirements at least 8 weeks before travel.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Health and Fitness</h2>
            <p className="text-gray-600 mb-6">
              Some tours require a reasonable level of fitness. You are responsible for assessing your own fitness for your chosen tour and disclosing any medical conditions that may affect your participation. We reserve the right to exclude participants whose condition may pose a risk to themselves or others.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Itinerary Changes</h2>
            <p className="text-gray-600 mb-6">
              While we make every effort to operate tours as described, we reserve the right to modify itineraries due to weather conditions, safety concerns, local regulations, or circumstances beyond our control. Alternative arrangements of similar value will be provided where possible.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              Wanderlust acts as an agent for hotels, transport providers, and other service suppliers. We are not liable for any injury, damage, loss, delay, or inconvenience caused by these third parties or by events beyond our reasonable control, including but not limited to natural disasters, civil unrest, or pandemic restrictions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              All content on this website, including text, images, logos, and design, is owned by Wanderlust or our licensors and is protected by copyright laws. You may not reproduce, distribute, or use any content without our written permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. User Conduct</h2>
            <p className="text-gray-600 mb-4">When using our website and services, you agree not to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Provide false or misleading information</li>
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to interfere with the website&apos;s operation</li>
              <li>Infringe on the rights of others</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through good-faith negotiation or, if necessary, binding arbitration.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after changes constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none text-gray-600 mb-6 space-y-2">
              <li><strong>Email:</strong> legal@wanderlust.com</li>
              <li><strong>Phone:</strong> +1 (555) 123-4567</li>
              <li><strong>Address:</strong> 123 Travel Street, Adventure City, AC 12345</li>
            </ul>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}