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
      "Full-body conditioning that blends controlled reformer movements with modern strength training.",
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
      "Intentionally paced to curated playlists. Every beat moves with purpose, keeping you in the flow.",
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
      "Personalized attention with hands-on cues. Small enough to be seen, big enough to feel the energy.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "All Levels Welcome",
    description:
      "Every movement can be tailored with modifications, progressions, and spring adjustments. Start where you are.",
  },
];

export default function ClassExperience() {
  return (
    <section className="py-24 lg:py-40 px-6 lg:px-12" id="classes">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="label-text text-blush-dark mb-4 block">
              The Classes
            </span>
            <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-charcoal">
              Not Traditional
              <br />
              <span className="italic text-rose">Pilates</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex items-end"
          >
            <p className="body-text text-charcoal-light text-lg max-w-lg">
              We take a modern, athletic approach. Our classes blend traditional
              reformer exercises with dynamic strength training sequences and
              controlled movements — leaving you feeling strong, energized, and
              accomplished.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(232,196,196,0.2)] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-blush-light/50 flex items-center justify-center text-rose mb-6 group-hover:bg-blush-light transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="heading-md text-xl lg:text-2xl text-charcoal mb-3">
                {feature.title}
              </h3>
              <p className="body-text text-charcoal-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Class Types */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-charcoal text-cream p-8 lg:p-12"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-lilac-dark/20 rounded-full blur-[80px]" />
            <span className="label-text text-blush-light/60 mb-4 block">
              New to Haven?
            </span>
            <h3 className="heading-lg text-2xl lg:text-3xl mb-4">
              Intro to Haven
            </h3>
            <p className="body-text text-cream/70 mb-6">
              A beginner-friendly 25-minute session designed for those brand new
              to reformer-based training. Learn the reformer setup, foundational
              movements, and class flow at a comfortable pace.
            </p>
            <div className="flex items-center justify-between">
              <span className="heading-md text-2xl text-blush-light">$15</span>
              <Link
                href="/book"
                className="px-6 py-2.5 bg-cream text-charcoal text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-blush-light transition-colors duration-300"
              >
                Book Intro
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-white p-8 lg:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blush/20 rounded-full blur-[80px]" />
            <span className="label-text text-lilac-dark mb-4 block">
              Signature Experience
            </span>
            <h3 className="heading-lg text-2xl lg:text-3xl text-charcoal mb-4">
              Haven Signature Class
            </h3>
            <p className="body-text text-charcoal-light mb-6">
              Our full-body, strength-focused workout that blends traditional
              reformer exercises with modern strength training. Dynamic
              sequences, controlled movements, all levels with personalized
              coaching.
            </p>
            <div className="flex items-center justify-between">
              <span className="heading-md text-2xl text-rose">
                From $23/class
              </span>
              <Link
                href="/book"
                className="px-6 py-2.5 bg-charcoal text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-charcoal-light transition-colors duration-300"
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
