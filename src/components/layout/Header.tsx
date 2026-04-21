"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "@/components/LocaleProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/", label: t.header.home },
    { href: "/tours", label: t.header.tours },
    { href: "/destinations", label: t.header.destinations },
    { href: "/about", label: t.header.about },
    { href: "/practical-info", label: t.header.practicalInfo },
    { href: "/blog", label: t.header.blog },
    { href: "/contact", label: t.header.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const LocaleToggle = ({ className = "" }: { className?: string }) => (
    <div
      className={`flex items-center rounded-md overflow-hidden border border-emerald-500/30 ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        aria-label={t.header.switchToEnglish}
        className={`px-2 py-1 text-[11px] font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-emerald-950 ${
          locale === "en"
            ? "bg-emerald-600 text-white"
            : "text-stone-300 hover:text-emerald-400"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ru")}
        aria-pressed={locale === "ru"}
        aria-label={t.header.switchToRussian}
        className={`px-2 py-1 text-[11px] font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-emerald-950 ${
          locale === "ru"
            ? "bg-emerald-600 text-white"
            : "text-stone-300 hover:text-emerald-400"
        }`}
      >
        RU
      </button>
    </div>
  );

  return (
    <header className="bg-emerald-950 dark:bg-black shadow-lg sticky top-0 z-50 border-b border-emerald-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex justify-between items-center h-16">
          {/* Logo — serif, nature feel */}
          <Link
            href="/"
            className="text-2xl font-bold text-emerald-400 font-serif tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 dark:focus-visible:ring-offset-black"
          >
            Wanderlust
          </Link>

          {/* Desktop Navigation + Theme Toggle + Locale Toggle */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const isCTA = link.href === "/contact";
              const base =
                "transition-colors text-xs lg:text-sm uppercase tracking-wide whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 dark:focus-visible:ring-offset-black";
              const classes = isCTA
                ? `${base} ml-1 lg:ml-2 px-3 lg:px-4 py-2 font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 ${
                    active ? "ring-2 ring-emerald-300" : ""
                  }`
                : `${base} px-2 lg:px-3 py-2 ${
                    active
                      ? "text-emerald-400 border-b-2 border-emerald-400"
                      : "text-stone-300 hover:text-emerald-400"
                  }`;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={classes}
                >
                  {link.label}
                </Link>
              );
            })}
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="ml-1 p-2 text-stone-300 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 dark:focus-visible:ring-offset-black"
                aria-label={resolvedTheme === "dark" ? t.header.lightMode : t.header.darkMode}
              >
                {resolvedTheme === "dark" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
            {mounted && <LocaleToggle className="ml-1" />}
          </div>

          {/* Mobile: Locale + Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-1">
            {mounted && <LocaleToggle />}
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 text-stone-300 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 dark:focus-visible:ring-offset-black"
                aria-label={resolvedTheme === "dark" ? t.header.lightMode : t.header.darkMode}
              >
                {resolvedTheme === "dark" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
            <button
              type="button"
              className="p-2 text-stone-300 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 dark:focus-visible:ring-offset-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t.header.closeMenu : t.header.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-emerald-500/20">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const isCTA = link.href === "/contact";
              const base =
                "uppercase tracking-wide text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 dark:focus-visible:ring-offset-black";
              const classes = isCTA
                ? `${base} block text-center mt-3 py-3 px-4 font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 ${
                    active ? "ring-2 ring-emerald-300" : ""
                  }`
                : `${base} block py-2.5 px-2 ${
                    active
                      ? "text-emerald-400"
                      : "text-stone-300 hover:text-emerald-400"
                  }`;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={classes}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
