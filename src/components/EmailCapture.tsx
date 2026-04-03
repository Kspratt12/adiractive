"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 lg:py-20 px-6 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0.4, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-pink-hot to-pink-deep p-8 sm:p-12 lg:p-16 text-center neon-glow-strong"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-[60px]" />

          <div className="relative z-10">
            <span className="label-text text-cream/60 mb-4 block tracking-[0.3em] text-[10px]">
              Stay Connected
            </span>
            <h2 className="heading-xl text-[clamp(1.8rem,4vw,3rem)] text-cream mb-4">
              Join the Haven Community
            </h2>
            <p className="body-text text-cream/70 text-base max-w-md mx-auto mb-8">
              Be the first to know about new classes, special events, and
              exclusive offers. No spam, just good vibes.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4"
              >
                <div className="w-12 h-12 rounded-full bg-cream/20 flex items-center justify-center mx-auto mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-cream font-medium">Welcome to the Haven fam!</p>
                <p className="text-cream/60 text-sm mt-1">Check your inbox for a little something.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/15 border border-cream/20 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-cream/30 focus:border-transparent backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-cream text-pink-hot text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-pink-light transition-colors duration-300 shrink-0"
                >
                  Join Us
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
