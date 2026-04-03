"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const storyItems = [
  {
    image: "/vertical2.png",
    label: "Move",
    title: "Feel the Rhythm",
    text: "Music-driven classes that flow with purpose. Every movement, every beat, designed to challenge and uplift you.",
  },
  {
    image: "/vertical3.png",
    label: "Strengthen",
    title: "Build From Within",
    text: "A modern, athletic approach to reformer training. Not traditional Pilates. Something stronger, more dynamic.",
  },
  {
    image: "/vertical4.png",
    label: "Belong",
    title: "Find Your People",
    text: "Small group sessions where encouragement is real and every person matters. This is community, not just a class.",
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
    <div ref={ref} className="py-12 lg:py-20">
      <div
        className={`max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
      >
        <motion.div
          style={{ y, opacity }}
          className={`relative ${isEven ? "" : "lg:order-2"}`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl neon-glow">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
          </div>
          {/* Float label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="absolute -bottom-4 right-8 glass-card px-6 py-3 rounded-full shadow-lg"
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
          <span className="label-text text-lilac-dark mb-4 block">
            0{index + 1}
          </span>
          <h3 className="heading-lg text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
            {item.title}
          </h3>
          <p className="body-text text-charcoal-light text-lg max-w-md">
            {item.text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section className="py-16 lg:py-24 bg-warm-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-light/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lilac-light/15 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 lg:mb-24 px-6"
      >
        <span className="label-text text-pink-hot mb-4 block">
          The Experience
        </span>
        <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-charcoal">
          More Than a Workout
        </h2>
      </motion.div>

      {storyItems.map((item, i) => (
        <StoryCard key={i} item={item} index={i} />
      ))}
    </section>
  );
}
