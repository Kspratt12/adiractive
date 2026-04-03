"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VideoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  return (
    <div ref={ref} className="relative w-full h-[180px] sm:h-[240px] lg:h-[300px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        {/* Use reel-2 (studio tour) starting 3 seconds in for the action */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
          poster="/haley-alford4.png"
        >
          <source src="/haven-reel-2.mp4#t=3" type="video/mp4" />
        </video>
      </motion.div>
      {/* Soft fade edges into surrounding sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-transparent to-warm-white pointer-events-none" />
    </div>
  );
}
