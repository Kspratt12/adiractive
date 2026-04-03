"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for assembling elements
  const img1Y = useTransform(scrollYProgress, [0, 0.5], [120, -20]);
  const img2Y = useTransform(scrollYProgress, [0.1, 0.6], [160, -10]);
  const img3Y = useTransform(scrollYProgress, [0.15, 0.65], [200, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [60, 0]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);
  const badge1Scale = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1]);
  const badge1Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const badge2Scale = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1]);
  const badge2Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const badge3Scale = useTransform(scrollYProgress, [0.35, 0.55], [0.5, 1]);
  const badge3Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-20 px-6 lg:px-16 bg-warm-white overflow-hidden"
    >
      {/* Ambient glow decorations */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-pink-light/15 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-lilac-light/10 rounded-full blur-[180px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-hot/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="label-text text-pink-hot mb-4 block tracking-[0.25em] text-[10px]">
            The Experience
          </span>
          <h2 className="heading-xl text-[clamp(2.2rem,5.5vw,5rem)] text-charcoal mb-4">
            More Than <span className="italic text-pink-deep">a Workout</span>
          </h2>
          <p className="body-text text-warm-gray text-base max-w-md mx-auto">
            Strength, joy, and community in every class.
          </p>
          <motion.div
            style={{ width: lineWidth }}
            className="h-[1px] bg-gradient-to-r from-transparent via-pink-hot/40 to-transparent mx-auto mt-6"
          />
        </motion.div>

        {/* Assembling image grid - the WOW moment */}
        <div className="relative grid grid-cols-12 gap-3 sm:gap-4 lg:gap-5 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
          {/* Large left image */}
          <motion.div
            style={{ y: img1Y }}
            className="col-span-7 sm:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden neon-glow"
          >
            <img
              src="https://adiractive.com/cdn/shop/files/IMG_4329.jpg?v=1774034243&width=1200"
              alt="Haven studio reformers"
              className="w-full h-[320px] sm:h-[420px] lg:h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            {/* Floating badge */}
            <motion.div
              style={{ scale: badge1Scale, opacity: badge1Opacity }}
              className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 glass-card px-4 sm:px-5 py-2 sm:py-2.5 rounded-full"
            >
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase text-pink-hot">
                Strength
              </span>
            </motion.div>
          </motion.div>

          {/* Right column - two stacked images */}
          <div className="col-span-5 sm:col-span-4 flex flex-col gap-3 sm:gap-4 lg:gap-5">
            <motion.div
              style={{ y: img2Y }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex-1"
            >
              <img
                src="/vertical3.png"
                alt="Haven coaches with equipment"
                className="w-full h-[150px] sm:h-[200px] lg:h-[265px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              <motion.div
                style={{ scale: badge2Scale, opacity: badge2Opacity }}
                className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
              >
                <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase text-lilac-dark">
                  Joy
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: img3Y }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex-1"
            >
              <img
                src="/vertical4.png"
                alt="Haven community mirror selfie"
                className="w-full h-[150px] sm:h-[200px] lg:h-[265px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              <motion.div
                style={{ scale: badge3Scale, opacity: badge3Opacity }}
                className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
              >
                <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase text-pink-hot">
                  Community
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Far right - tall accent image (desktop only) */}
          <motion.div
            style={{ y: img1Y }}
            className="hidden sm:block col-span-3 relative rounded-2xl sm:rounded-3xl overflow-hidden"
          >
            <img
              src="/vertical2.png"
              alt="Reformer workout with neon sign"
              className="w-full h-full min-h-[420px] lg:min-h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-charcoal/10" />
          </motion.div>
        </div>

        {/* Bottom text blocks that assemble */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 mt-16 sm:mt-20 lg:mt-28">
          {[
            {
              num: "01",
              title: "Feel the Rhythm",
              text: "Thoughtfully programmed, music-driven, and intentionally paced to help you feel strong, energized, and accomplished.",
            },
            {
              num: "02",
              title: "Build From Within",
              text: "A modern, athletic approach that blends controlled reformer movements with strength training and full-body conditioning.",
            },
            {
              num: "03",
              title: "Find Your People",
              text: "Rooted in faith. Led with love. A space where everyone belongs, where kindness leads, and joy is found through movement.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="label-text text-[10px] text-pink-hot/50 mb-3 block tracking-[0.3em]">
                {item.num}
              </span>
              <h3 className="heading-lg text-xl sm:text-2xl text-charcoal mb-3">
                {item.title}
              </h3>
              <p className="body-text text-sm text-warm-gray leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
