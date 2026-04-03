"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/vertical2.png"
        >
          <source src="/haven-reel-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-cream/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-text text-pink-light mb-6 block">
              Haven Reformer Studio &amp; Boutique
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl text-5xl md:text-7xl lg:text-8xl text-cream mb-8"
          >
            Your Haven
            <br />
            <span className="italic text-pink-light neon-text-glow">
              to Grow Strong
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="body-text text-lg md:text-xl text-cream/80 mb-12 max-w-xl"
          >
            Rooted in faith, community &amp; having fun. Strength-based
            reformer workouts designed to make you feel strong, energized,
            and accomplished.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-pink-hot text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-pink-deep transition-all duration-300 shadow-lg hover:shadow-xl neon-glow"
            >
              Book a Class
            </Link>
            <Link
              href="#classes"
              className="inline-flex items-center justify-center px-8 py-4 border border-cream/40 text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-cream/10 transition-all duration-300"
            >
              What to Expect
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-text text-[10px] text-cream/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-cream/30"
        />
      </motion.div>
    </section>
  );
}
