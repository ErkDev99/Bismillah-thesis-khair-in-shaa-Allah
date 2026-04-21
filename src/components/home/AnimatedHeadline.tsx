"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/components/LocaleProvider";

export function AnimatedHeadline() {
  const { t } = useLocale();
  const countries = t.home.hero.countries;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % countries.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [countries.length]);

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 font-serif text-white text-center">
      {t.home.hero.headlinePrefix}
      <span className="relative flex w-full justify-center overflow-hidden pb-2 pt-1 h-[1.25em]">
        &nbsp;
        {countries.map((country, i) => (
          <motion.span
            key={i}
            className="text-emerald-400 absolute font-bold"
            initial={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 50, damping: 12 }}
            animate={
              activeIndex === i
                ? { y: 0, opacity: 1 }
                : { y: activeIndex > i ? -60 : 60, opacity: 0 }
            }
          >
            {country}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
