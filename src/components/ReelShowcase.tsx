"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const reels = [
  { type: "video" as const, src: "/haven-reel-1.mp4", poster: "/ig-thumb-1.jpg" },
  { type: "image" as const, src: "/haley-alford5.png" },
  { type: "video" as const, src: "/haven-reel-2.mp4", poster: "/ig-thumb-2.jpg" },
  { type: "image" as const, src: "/coach2.jpg" },
  { type: "video" as const, src: "/haven-reel-3.mp4", poster: "/vertical1.png" },
  { type: "image" as const, src: "/vertical3.png" },
];

function VideoReel({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = ref.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {poster && (
        <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default function ReelShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  return (
    <section ref={sectionRef} className="py-12 lg:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="label-text text-pink-hot mb-3 block tracking-[0.25em] text-[10px]">
              @havenreformer
            </span>
            <h2 className="heading-xl text-[clamp(1.8rem,4vw,3rem)] text-charcoal">
              Follow the <span className="italic text-pink-deep">Journey</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/havenreformer"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-hot/40 text-pink-hot text-[10px] font-medium tracking-[0.15em] uppercase hover:bg-pink-hot hover:text-cream transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            Follow Us
          </a>
        </div>
      </div>

      {/* Horizontal scrolling reel strip */}
      <motion.div
        style={{ x }}
        className="flex gap-3 sm:gap-4 pl-6 lg:pl-16"
      >
        {reels.map((reel, i) => (
          <motion.a
            key={i}
            href="https://www.instagram.com/havenreformer"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0.4, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="shrink-0 w-[200px] sm:w-[240px] lg:w-[280px] h-[320px] sm:h-[380px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden relative group block"
          >
            {reel.type === "video" ? (
              <VideoReel src={reel.src} poster={reel.poster} />
            ) : (
              <img
                src={reel.src}
                alt="Haven Reformer Studio"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Play icon for videos */}
            {reel.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-cream/30 backdrop-blur-sm flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            )}

            {/* IG style corner icon */}
            <div className="absolute top-3 right-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-40 group-hover:opacity-80 transition-opacity">
                {reel.type === "video" ? (
                  <>
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </>
                ) : (
                  <>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                  </>
                )}
              </svg>
            </div>
          </motion.a>
        ))}

        {/* Follow CTA card at the end */}
        <a
          href="https://www.instagram.com/havenreformer"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-[200px] sm:w-[240px] lg:w-[280px] h-[320px] sm:h-[380px] lg:h-[440px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-hot to-pink-deep flex flex-col items-center justify-center gap-4 group neon-glow mr-6 lg:mr-16"
        >
          <div className="w-14 h-14 rounded-full border-2 border-cream/30 flex items-center justify-center group-hover:border-cream/60 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="white" />
            </svg>
          </div>
          <span className="text-cream text-sm font-medium">@havenreformer</span>
          <span className="text-cream/60 text-[10px] tracking-[0.15em] uppercase">Follow on Instagram</span>
        </a>
      </motion.div>
    </section>
  );
}
