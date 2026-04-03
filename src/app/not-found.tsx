"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 rounded-2xl bg-pink-hot flex items-center justify-center neon-glow mx-auto mb-6">
          <span className="text-cream font-serif italic text-3xl leading-none">H</span>
        </div>
        <h1 className="heading-xl text-6xl sm:text-7xl text-charcoal mb-3">404</h1>
        <p className="heading-lg text-xl sm:text-2xl text-charcoal mb-2">
          Page Not <span className="italic text-pink-deep">Found</span>
        </p>
        <p className="body-text text-warm-gray mb-8">
          Looks like this page took a rest day. Let&apos;s get you back on the reformer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 bg-pink-hot text-cream text-[11px] font-medium tracking-[0.18em] uppercase rounded-full hover:bg-pink-deep transition-colors neon-glow inline-block"
          >
            Back Home
          </Link>
          <Link
            href="/book"
            className="px-8 py-3.5 border border-pink-hot/40 text-pink-hot text-[11px] font-medium tracking-[0.18em] uppercase rounded-full hover:bg-pink-hot hover:text-cream transition-all inline-block"
          >
            Book a Class
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
