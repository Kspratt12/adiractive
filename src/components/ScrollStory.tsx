"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const storyItems = [
  {
    image: "https://adiractive.com/cdn/shop/files/IMG_4329.jpg?v=1774034243&width=1200",
    label: "Move",
    title: "Feel the Rhythm",
    text: "Thoughtfully programmed, music-driven, and intentionally paced. Our classes help you feel strong, energized, and accomplished.",
  },
  {
    image: "/vertical3.png",
    label: "Strengthen",
    title: "Build From Within",
    text: "A modern, athletic approach that blends controlled reformer movements with strength training, endurance, and full-body conditioning.",
  },
  {
    image: "/vertical4.png",
    label: "Belong",
    title: "More Than a Workout",
    text: "Rooted in our faith-based mission, Haven is a space where everyone belongs. Leave class feeling stronger physically, lighter mentally, and more connected.",
  },
];

function StoryCard({
  item,
  index,
}: {
  item: (typeof storyItems)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="py-10 sm:py-12 lg:py-20">
      <div
        className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center"
      >
        <motion.div
          style={{ y, opacity }}
          className={`relative ${isEven ? "" : "lg:order-2"}`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl neon-glow">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="absolute -bottom-3 sm:-bottom-4 right-4 sm:right-8 glass-card px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg"
          >
            <span className="label-text text-pink-hot text-[10px]">
              {item.label}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className={isEven ? "" : "lg:order-1"}
        >
          <span className="label-text text-lilac-dark mb-3 sm:mb-4 block">
            0{index + 1}
          </span>
          <h3 className="heading-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4 sm:mb-6">
            {item.title}
          </h3>
          <p className="body-text text-charcoal-light text-base sm:text-lg max-w-md">
            {item.text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-warm-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-light/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lilac-light/15 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12 sm:mb-16 lg:mb-24 px-6"
      >
        <span className="label-text text-pink-hot mb-3 sm:mb-4 block">
          What to Expect
        </span>
        <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal">
          More Than a Workout
        </h2>
      </motion.div>

      {storyItems.map((item, i) => (
        <StoryCard key={i} item={item} index={i} />
      ))}
    </section>
  );
}
