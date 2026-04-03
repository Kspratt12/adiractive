"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const galleryImages = [
  {
    src: "/jordan-jones1.png",
    alt: "Haven Reformer Studio neon sign",
    span: "col-span-2 lg:row-span-2",
    height: "h-[200px] sm:h-[300px] lg:h-[600px]",
  },
  {
    src: "/haley-alford4.png",
    alt: "Haven studio reformers and boutique",
    span: "col-span-1 row-span-1",
    height: "h-[160px] sm:h-[220px] lg:h-[280px]",
  },
  {
    src: "/haley-alford3.png",
    alt: "Shannon celebrating at Haven studio",
    span: "col-span-1 row-span-1",
    height: "h-[160px] sm:h-[220px] lg:h-[280px]",
  },
  {
    src: "/haley-alford1.png",
    alt: "Reformer with pink LED lights",
    span: "col-span-1 row-span-1",
    height: "h-[160px] sm:h-[220px] lg:h-[320px]",
  },
  {
    src: "/jordan-jones2.png",
    alt: "Hot Moms Do Pilates grip socks with pink dumbbells",
    span: "col-span-1 row-span-1",
    height: "h-[160px] sm:h-[220px] lg:h-[320px]",
  },
];

export default function StudioGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Force play video when it scrolls into view (mobile fix)
  useEffect(() => {
    const video = videoRef.current;
    const container = videoContainerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked - fallback image is showing, that's fine
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 lg:py-24 px-6 lg:px-16" id="studio">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0.4, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-14 gap-4 lg:gap-6"
        >
          <div>
            <span className="label-text text-pink-hot mb-5 block tracking-[0.25em] text-[10px]">
              The Studio
            </span>
            <h2 className="heading-xl text-[clamp(2rem,5vw,4.5rem)] text-charcoal">
              Step Inside <span className="italic text-pink-deep">Haven</span>
            </h2>
          </div>
          <p className="body-text text-warm-gray text-base sm:text-lg max-w-sm">
            A warm, pink-lit space designed to make you feel welcome from
            the moment you walk in.
          </p>
        </motion.div>

        {/* Video Feature */}
        <div
          ref={videoContainerRef}
          className="mb-5 lg:mb-6 rounded-2xl sm:rounded-3xl overflow-hidden neon-glow-strong relative h-[200px] sm:h-[300px] lg:h-[420px]"
        >
          {/* Fallback image always visible behind video */}
          <img
            src="/haley-alford1.png"
            alt="Haven studio with pink LED lights"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/haven-reel-3.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gallery Grid */}
        <motion.div style={{ y }} className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.4, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`${img.span} rounded-xl sm:rounded-2xl overflow-hidden relative group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full ${img.height} object-cover transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
