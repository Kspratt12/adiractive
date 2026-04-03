"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    src: "/vertical7.png",
    alt: "Haven Reformer Studio neon sign",
    span: "col-span-2 row-span-2",
    height: "h-[400px] lg:h-[600px]",
  },
  {
    src: "/vertical4.png",
    alt: "Haven community group selfie",
    span: "col-span-1 row-span-1",
    height: "h-[280px]",
  },
  {
    src: "/vertical5.png",
    alt: "Member celebrating 100th class",
    span: "col-span-1 row-span-1",
    height: "h-[280px]",
  },
  {
    src: "/vertical2.png",
    alt: "Reformer workout under neon sign",
    span: "col-span-1 row-span-1",
    height: "h-[320px]",
  },
  {
    src: "https://adiractive.com/cdn/shop/files/IMG_4430.jpg?v=1774034409&width=1200",
    alt: "Haven Reformer Studio reformers",
    span: "col-span-1 row-span-1",
    height: "h-[320px]",
  },
];

export default function StudioGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="py-28 lg:py-44 px-6 lg:px-16" id="studio">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 lg:mb-20 gap-6"
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

        {/* Video Feature - cinematic crop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5 lg:mb-6 rounded-2xl sm:rounded-3xl overflow-hidden neon-glow-strong"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[250px] sm:h-[350px] lg:h-[420px] object-cover object-center"
          >
            <source src="/haven-reel-3.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div style={{ y }} className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
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
