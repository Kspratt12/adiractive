"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

export default function VideoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoaded = () => {
      video.currentTime = 3;
    };
    video.addEventListener("loadedmetadata", handleLoaded);
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  return (
    <div ref={ref} className="relative w-full h-[180px] sm:h-[240px] lg:h-[300px] overflow-hidden">
      {/* Static fallback always visible behind video */}
      <img
        src="/haley-alford4.png"
        alt="Haven Reformer Studio"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src="/haven-reel-2.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-transparent to-warm-white pointer-events-none" />
    </div>
  );
}
