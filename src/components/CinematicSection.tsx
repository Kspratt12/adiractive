"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CinematicSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.35], [6, 0]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.35], [0.5, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.45], [50, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const secondImgX = useTransform(scrollYProgress, [0.2, 0.5], [120, 0]);
  const secondImgOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Full-width background image with blur reveal */}
      <motion.div className="absolute inset-0">
        <motion.img
          src="/haley-alford4.png"
          alt="Haven Reformer Studio interior"
          className="w-full h-full object-cover"
          style={{
            filter: useTransform(blur, (v) => `blur(${v}px)`),
            opacity: imgOpacity,
          }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center min-h-[400px] sm:min-h-[500px]">
          {/* Text content */}
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            <span className="label-text text-pink-light/70 mb-5 block tracking-[0.3em] text-[10px]">
              The Experience
            </span>
            <h2 className="heading-xl text-[clamp(2.5rem,6vw,4.5rem)] text-cream mb-6 leading-[1.05]">
              This Is
              <br />
              <span className="italic text-pink-light neon-text-glow">
                Your Space
              </span>
            </h2>
            <div className="space-y-4 mb-8">
              <p className="body-text text-cream/50 text-lg leading-[1.9] max-w-md">
                Not just a workout.
                <br />
                Not just a class.
              </p>
              <p className="body-text text-cream/70 text-lg leading-[1.9] max-w-md">
                A space where you move, reset, and come back to yourself.
              </p>
            </div>
            <a
              href="https://momence.com/u/haven-reformer-studio-SkXWwM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-pink-hot text-cream text-[10px] font-medium tracking-[0.2em] uppercase rounded-full hover:bg-pink-deep transition-all duration-500 neon-glow"
            >
              Reserve Your Reformer
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Secondary image that slides in */}
          <motion.div
            style={{ x: secondImgX, opacity: secondImgOpacity }}
            className="relative hidden sm:block"
          >
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl neon-glow-strong -rotate-2 lg:ml-8">
              <img
                src="/vertical2.png"
                alt="Reformer workout at Haven"
                className="w-full h-[350px] lg:h-[450px] object-cover"
              />
            </div>
            {/* Accent floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-4 glass-card px-5 py-3 rounded-full shadow-lg"
            >
              <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-pink-hot">
                6 Reformers &middot; Small Groups
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
