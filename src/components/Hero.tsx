"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[650px] flex items-end overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0">
        <img
          src="/jordan-jones1.png"
          alt="Haven Reformer Studio neon sign"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Video fades in on top once loaded */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: videoScale }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          className="w-full h-full object-cover object-center"
        >
          <source src="/haven-reel-2.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-cream via-cream/60 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-24 sm:pb-28 lg:pb-36"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl text-[clamp(2.6rem,5.5vw,4.2rem)] text-cream mb-5 sm:mb-6 max-w-xl lg:max-w-2xl leading-[1.08]"
        >
          Your Haven
          <br />
          <span className="italic text-pink-light neon-text-glow">
            to Feel Strong Again
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="body-text text-base sm:text-lg text-cream/60 mb-10 sm:mb-12 max-w-sm lg:max-w-md leading-[1.8]"
        >
          A boutique reformer studio where strength meets softness,
          and every class feels like it was made for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5"
        >
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-10 sm:px-12 py-4.5 bg-pink-hot text-cream text-[11px] font-medium tracking-[0.22em] uppercase rounded-full hover:bg-pink-deep transition-all duration-500 neon-glow-strong"
          >
            Book Your First Class
          </Link>
          <Link
            href="#classes"
            className="inline-flex items-center justify-center px-10 sm:px-12 py-4.5 bg-cream/12 border border-cream/30 text-cream text-[11px] font-medium tracking-[0.22em] uppercase rounded-full hover:bg-cream/20 hover:border-cream/50 transition-all duration-500 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            What to Expect
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cream/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
