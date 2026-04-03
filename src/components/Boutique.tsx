"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Boutique() {
  return (
    <section className="py-24 lg:py-40 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Gift Cards + Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {/* Gift Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-light/60 to-lilac-light/60 p-8 lg:p-12 flex flex-col justify-between min-h-[280px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-hot/10 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <span className="label-text text-pink-hot mb-4 block">
                Gift Cards
              </span>
              <h3 className="heading-lg text-2xl lg:text-3xl text-charcoal mb-3">
                Give the Gift of Haven
              </h3>
              <p className="body-text text-charcoal-light text-sm max-w-sm">
                Gift cards are valid for new or existing members. Can be used for
                studio classes or in the shop for apparel!
              </p>
            </div>
            <a
              href="https://adiractive.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-6 inline-flex self-start px-6 py-2.5 bg-pink-hot text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-pink-deep transition-colors duration-300 neon-glow"
            >
              Shop Gift Cards
            </a>
          </div>

          {/* Boutique Coming Soon */}
          <div className="relative rounded-2xl overflow-hidden p-8 lg:p-12 flex flex-col justify-between min-h-[280px]">
            <img
              src="/coach2.jpg"
              alt="Haven activewear"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-charcoal/10" />
            <div className="relative z-10 mt-auto">
              <span className="label-text text-pink-light mb-3 block">
                The Boutique
              </span>
              <h3 className="heading-lg text-2xl lg:text-3xl text-cream mb-2">
                Coming Soon
              </h3>
              <p className="body-text text-cream/70 text-sm max-w-sm">
                Apparel, grip socks, and studio essentials designed for the Haven community.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
