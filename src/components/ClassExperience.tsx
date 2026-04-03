"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Strength-Based",
    description:
      "Full-body conditioning that blends controlled reformer movements with modern strength training and endurance work.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    title: "Music-Driven",
    description:
      "Set to curated playlists that keep energy high and motivation strong. Every beat moves with purpose.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Small Groups",
    description:
      "Our small-group setting allows instructors to offer personalized cues so you can move safely and confidently.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "All Levels Welcome",
    description:
      "Options to modify or progress each movement based on your experience, strength, and comfort level.",
  },
];

export default function ClassExperience() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-16 bg-charcoal text-cream" id="classes">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0.4, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="label-text text-pink-hot mb-4 block">
              The Classes
            </span>
            <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-cream">
              Not Traditional
              <br />
              <span className="italic text-pink-light neon-text-glow">Pilates</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.4, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex items-end"
          >
            <p className="body-text text-cream/60 text-lg max-w-lg">
              Athletic, intentional, and designed to challenge you while still
              being accessible. Dynamic sequences, controlled movements, and
              thoughtfully programmed flows that target the entire body.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0.4, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-cream/[0.06] border border-cream/[0.08] rounded-2xl p-6 sm:p-8 lg:p-10 hover:bg-cream/[0.1] transition-all duration-500"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-pink-light/40 flex items-center justify-center text-pink-hot mb-4 sm:mb-6 group-hover:bg-pink-light transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="heading-md text-lg sm:text-xl lg:text-2xl text-cream mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="body-text text-cream/50 text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Class Types */}
        <div className="mt-12 sm:mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0.4, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-charcoal text-cream p-6 sm:p-8 lg:p-12"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-hot/20 rounded-full blur-[80px]" />
            <span className="label-text text-pink-light/60 mb-3 sm:mb-4 block">
              New to Haven?
            </span>
            <h3 className="heading-lg text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">
              Intro to Haven
            </h3>
            <p className="body-text text-cream/70 mb-4 text-sm sm:text-base">
              A beginner-friendly class designed for those brand new to
              reformer-based training. Learn the fundamentals including reformer
              setup, spring changes, basic positioning, and movement patterns.
              Move at a slower, more intentional pace while still getting a
              full-body workout.
            </p>
            <ul className="space-y-1.5 mb-6 text-cream/60 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-pink-light rounded-full" />
                Reformer basics &amp; setup
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-pink-light rounded-full" />
                Foundational strength movements
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-pink-light rounded-full" />
                Modifications for all bodies
              </li>
            </ul>
            <div className="flex items-center justify-between">
              <span className="heading-md text-xl sm:text-2xl text-pink-light">$15</span>
              <Link
                href="/book"
                className="px-5 sm:px-6 py-2.5 bg-pink-hot text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-pink-deep transition-colors duration-300"
              >
                Book Intro
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.4, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-cream/[0.06] border border-cream/[0.08] p-6 sm:p-8 lg:p-12"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink/20 rounded-full blur-[80px]" />
            <span className="label-text text-lilac-dark mb-3 sm:mb-4 block">
              Signature Experience
            </span>
            <h3 className="heading-lg text-xl sm:text-2xl lg:text-3xl text-cream mb-3 sm:mb-4">
              Haven Signature Class
            </h3>
            <p className="body-text text-cream/60 mb-4 text-sm sm:text-base">
              A full-body, strength-focused workout that blends traditional
              reformer exercises with modern strength training and endurance
              work. Athletic, intentional, and designed to challenge you
              while still being accessible to all levels.
            </p>
            <ul className="space-y-1.5 mb-6 text-cream/50 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-pink-hot rounded-full" />
                Athletic &amp; modern reformer programming
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-pink-hot rounded-full" />
                Small-group, intentional coaching
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-pink-hot rounded-full" />
                Uplifting, community-driven atmosphere
              </li>
            </ul>
            <div className="flex items-center justify-between">
              <span className="heading-md text-xl sm:text-2xl text-pink-hot">
                From $23/class
              </span>
              <Link
                href="/book"
                className="px-5 sm:px-6 py-2.5 bg-charcoal text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-charcoal-light transition-colors duration-300"
              >
                View Schedule
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
