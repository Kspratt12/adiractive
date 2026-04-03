"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] flex items-end overflow-hidden">
      {/* Video Background with parallax zoom */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
          poster="/vertical2.png"
        >
          <source src="/haven-reel-2.mp4#t=2" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-charcoal"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cream to-transparent" />

      {/* Content - bottom aligned for editorial feel */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-20 sm:pb-24 lg:pb-32"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl text-[clamp(2.8rem,8vw,7.5rem)] text-cream mb-6 sm:mb-8 max-w-4xl"
        >
          Your Haven
          <br />
          <span className="italic text-pink-light neon-text-glow">
            to Grow Strong
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="body-text text-base sm:text-lg text-cream/70 mb-10 sm:mb-12 max-w-md leading-relaxed"
        >
          A boutique reformer studio created to be a place of strength,
          joy, and belonging. Come as you are.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-4 bg-pink-hot text-cream text-[11px] font-medium tracking-[0.2em] uppercase rounded-full hover:bg-pink-deep transition-all duration-500 neon-glow-strong"
          >
            Book a Class
          </Link>
          <Link
            href="#classes"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-4 border border-cream/25 text-cream text-[11px] font-medium tracking-[0.2em] uppercase rounded-full hover:bg-cream/8 hover:border-cream/40 transition-all duration-500 backdrop-blur-sm"
          >
            What to Expect
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-transparent via-cream/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
