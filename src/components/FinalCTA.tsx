"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://adiractive.com/cdn/shop/files/IMG_4332.jpg?v=1774034409&width=3840"
          alt="Haven Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className="label-text text-blush-light/70 mb-6 block">
            Your Journey Starts Here
          </span>
          <h2 className="heading-xl text-4xl md:text-6xl lg:text-7xl text-cream mb-8">
            Ready to Find
            <br />
            <span className="italic text-blush-light">Your Haven?</span>
          </h2>
          <p className="body-text text-cream/70 text-lg mb-12 max-w-lg mx-auto">
            Step onto the reformer. Feel the music. Move with intention. Leave
            stronger than you arrived — physically, mentally, and connected to
            a community that lifts you up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-10 py-4 bg-cream text-charcoal text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-blush-light transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Your First Class
            </Link>
            <Link
              href="#membership"
              className="inline-flex items-center justify-center px-10 py-4 border border-cream/30 text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-cream/10 transition-all duration-300"
            >
              View Membership
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
