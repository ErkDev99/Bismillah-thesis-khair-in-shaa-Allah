// src/app/review/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — multi-step review form with booking verification.
// Style: Nature / Travel Magazine — emerald + cream palette, rounded corners,
// leaf dividers, bright photography, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Nature Divider — leaf ornament ─────────────────────────────────────────
function NatureDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
      <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
      </svg>
      <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
    </div>
  );
}

// ─── Simulated Booking Database ─────────────────────────────────────────────
// In production this would be a real API call. For the thesis demo,
// we accept any well-formatted booking reference + email combination.
const VALID_BOOKINGS: Record<string, { email: string; tour: string; date: string }> = {
  "WL-2025-001": { email: "sarah@example.com", tour: "Silk Road Adventure", date: "2025-09-15" },
  "WL-2025-002": { email: "david@example.com", tour: "Nomadic Life Experience", date: "2025-08-20" },
  "WL-2025-003": { email: "aiko@example.com", tour: "Mountain Expedition", date: "2025-07-10" },
  "WL-2024-004": { email: "maria@example.com", tour: "Cultural Heritage Tour", date: "2024-11-05" },
  "WL-2024-005": { email: "john@example.com", tour: "Photography Expedition", date: "2024-10-12" },
  "WL-2025-006": { email: "elena@example.com", tour: "Winter Wonderland", date: "2025-01-18" },
};

type Step = "verify" | "review" | "success";

interface ReviewData {
  tour: string;
  rating: number;
  title: string;
  body: string;
  name: string;
  recommend: boolean;
  date: string;
}

export default function ReviewPage() {
  const [step, setStep] = useState<Step>("verify");

  // Verification fields
  const [bookingRef, setBookingRef] = useState("");
  const [email, setEmail] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedTour, setVerifiedTour] = useState("");

  // Review fields
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [recommend, setRecommend] = useState(true);
  const [reviewError, setReviewError] = useState("");

  // Saved reviews (localStorage)
  const [savedReviews, setSavedReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wanderlust-reviews");
      if (stored) setSavedReviews(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setVerifyError("");
    setIsVerifying(true);

    // Simulate API delay
    setTimeout(() => {
      const trimmedRef = bookingRef.trim().toUpperCase();
      const trimmedEmail = email.trim().toLowerCase();

      const booking = VALID_BOOKINGS[trimmedRef];
      if (!booking) {
        setVerifyError(
          "Booking reference not found. Please check your confirmation email for the correct reference number. Demo references: WL-2025-001 through WL-2025-006."
        );
        setIsVerifying(false);
        return;
      }

      if (booking.email !== trimmedEmail) {
        setVerifyError(
          "The email address does not match this booking. Please use the email you booked with."
        );
        setIsVerifying(false);
        return;
      }

      setVerifiedTour(booking.tour);
      setStep("review");
      setIsVerifying(false);
    }, 800);
  }

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    setReviewError("");

    if (rating === 0) {
      setReviewError("Please select a star rating.");
      return;
    }
    if (!reviewTitle.trim()) {
      setReviewError("Please add a title for your review.");
      return;
    }
    if (!reviewBody.trim() || reviewBody.trim().length < 20) {
      setReviewError("Please write at least 20 characters in your review.");
      return;
    }
    if (!displayName.trim()) {
      setReviewError("Please enter your name.");
      return;
    }

    const newReview: ReviewData = {
      tour: verifiedTour,
      rating,
      title: reviewTitle.trim(),
      body: reviewBody.trim(),
      name: displayName.trim(),
      recommend,
      date: new Date().toISOString(),
    };

    const updated = [...savedReviews, newReview];
    setSavedReviews(updated);
    try {
      localStorage.setItem("wanderlust-reviews", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setStep("success");
  }

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="relative bg-emerald-950 text-white overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            Share Your Experience
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
            Leave a <span className="text-emerald-400">Review</span>
          </h1>
          <p className="text-stone-400 max-w-xl mx-auto">
            Your feedback helps future travelers choose the right adventure and helps us improve our tours.
          </p>
          <NatureDivider className="mt-5" />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-10">
          {(["Verify Booking", "Write Review", "Done"] as const).map((label, i) => {
            const stepIndex = i;
            const currentIndex = step === "verify" ? 0 : step === "review" ? 1 : 2;
            const isActive = stepIndex === currentIndex;
            const isDone = stepIndex < currentIndex;
            return (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`w-8 sm:w-12 h-px ${
                      isDone ? "bg-emerald-500" : "bg-stone-300 dark:bg-slate-700"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 flex items-center justify-center text-xs font-bold border-2 transition-colors rounded-full ${
                      isActive
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : isDone
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-500"
                        : "border-stone-300 dark:border-slate-600 text-stone-400"
                    }`}
                  >
                    {isDone ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`text-xs uppercase tracking-wider hidden sm:inline ${
                      isActive
                        ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                        : isDone
                        ? "text-emerald-600 dark:text-emerald-500"
                        : "text-stone-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Step 1: Verify Booking ─────────────────────────────────────── */}
        {step === "verify" && (
          <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-6 sm:p-8 rounded-xl">
            <h2 className="text-xl font-bold text-stone-900 dark:text-emerald-100 font-serif mb-2">
              Verify Your Booking
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
              To ensure authentic reviews, we verify that you traveled with us. Enter your booking reference and the email you used when booking.
            </p>

            {/* How it works info box */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4 mb-6 rounded-xl">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-emerald-800 dark:text-emerald-300">
                  <p className="font-semibold mb-1">Where to find your booking reference</p>
                  <p>Check the confirmation email you received after booking. Your reference starts with &ldquo;WL-&rdquo; followed by the year and a number (e.g., WL-2025-001).</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label htmlFor="booking-ref" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Booking Reference
                </label>
                <input
                  id="booking-ref"
                  type="text"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  placeholder="e.g. WL-2025-001"
                  required
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-600 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500"
                />
              </div>

              <div>
                <label htmlFor="booking-email" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Email Address
                </label>
                <input
                  id="booking-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="The email you used when booking"
                  required
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-600 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500"
                />
              </div>

              {verifyError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-3 text-sm text-red-700 dark:text-red-300 rounded-xl">
                  {verifyError}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-6 py-3 font-semibold uppercase tracking-wide transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify Booking"
                )}
              </button>
            </form>
          </div>
        )}

        {/* ─── Step 2: Write Review ───────────────────────────────────────── */}
        {step === "review" && (
          <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-6 sm:p-8 rounded-xl">
            {/* Verified badge */}
            <div className="flex items-center gap-2 mb-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 px-3 py-2 w-fit rounded-lg">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                Verified booking for: {verifiedTour}
              </span>
            </div>

            <h2 className="text-xl font-bold text-stone-900 dark:text-emerald-100 font-serif mb-2">
              Write Your Review
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
              Tell us about your experience on the {verifiedTour}.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-transform hover:scale-110"
                      role="radio"
                      aria-checked={rating === star}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      <svg
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "text-amber-400 fill-current"
                            : "text-stone-300 dark:text-slate-600"
                        }`}
                        viewBox="0 0 20 20"
                        fill={star <= (hoverRating || rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={star <= (hoverRating || rating) ? 0 : 1}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-stone-600 dark:text-stone-400">
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </span>
                  )}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label htmlFor="review-title" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Review Title
                </label>
                <input
                  id="review-title"
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="Summarize your experience in a few words"
                  required
                  maxLength={100}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-600 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500"
                />
              </div>

              {/* Review Body */}
              <div>
                <label htmlFor="review-body" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Your Review
                </label>
                <textarea
                  id="review-body"
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  placeholder="What did you enjoy most? What stood out? Would you recommend this tour?"
                  required
                  rows={5}
                  minLength={20}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-600 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500 resize-y"
                />
                <p className="text-xs text-stone-400 mt-1">
                  {reviewBody.length < 20
                    ? `${20 - reviewBody.length} more characters needed`
                    : `${reviewBody.length} characters`}
                </p>
              </div>

              {/* Display Name */}
              <div>
                <label htmlFor="display-name" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Display Name
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How your name will appear (e.g. Sarah M.)"
                  required
                  maxLength={50}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-600 text-stone-900 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500"
                />
              </div>

              {/* Would Recommend */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={recommend}
                  onClick={() => setRecommend(!recommend)}
                  className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                    recommend ? "bg-emerald-500" : "bg-stone-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      recommend ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <label className="text-sm text-stone-700 dark:text-stone-300">
                  I would recommend Wanderlust to a friend
                </label>
              </div>

              {reviewError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-3 text-sm text-red-700 dark:text-red-300 rounded-xl">
                  {reviewError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-6 py-3 font-semibold uppercase tracking-wide transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        {/* ─── Step 3: Success ─────────────────────────────────────────────── */}
        {step === "success" && (
          <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-6 sm:p-8 text-center rounded-xl">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-5 border-2 border-emerald-500 rounded-full">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-emerald-100 font-serif mb-2">
              Thank You!
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-2">
              Your review for <strong className="text-stone-900 dark:text-emerald-100">{verifiedTour}</strong> has been submitted successfully.
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-500 mb-6">
              Your verified review is now live.{" "}
              <Link href="/reviews" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700">
                View all traveler reviews →
              </Link>
            </p>
            <NatureDivider className="mb-6" />

            {/* Show submitted review preview */}
            <div className="bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 p-5 text-left mb-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-current" : "text-stone-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-stone-900 dark:text-emerald-100">{rating}.0</span>
              </div>
              <p className="font-semibold text-stone-900 dark:text-emerald-100 mb-1">{reviewTitle}</p>
              <p className="text-sm text-stone-700 dark:text-stone-300 italic font-serif leading-relaxed mb-2">
                &ldquo;{reviewBody}&rdquo;
              </p>
              <p className="text-xs text-stone-500">
                {displayName} &middot; {verifiedTour} &middot;{" "}
                <span className="text-emerald-600 dark:text-emerald-400">Verified Traveler</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tours"
                className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-6 py-2.5 font-semibold uppercase tracking-wide transition-all text-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                Browse More Tours
              </Link>
              <Link
                href="/"
                className="border-2 border-stone-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-500 text-stone-700 dark:text-stone-300 px-6 py-2.5 font-semibold uppercase tracking-wide transition-all text-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Why we verify section */}
        {step === "verify" && (
          <div className="mt-8 bg-stone-50 dark:bg-slate-900/50 border border-stone-200 dark:border-slate-800 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-emerald-100 mb-2 font-serif">
              Why do we verify reviews?
            </h3>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Authenticity</strong> — Every review comes from someone who actually traveled with us</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Trust</strong> — Future travelers can book with confidence knowing reviews are real</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Quality</strong> — Verified feedback helps us continuously improve our tours</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
