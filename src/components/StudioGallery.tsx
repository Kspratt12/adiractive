"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    src: "https://adiractive.com/cdn/shop/files/IMG_4329.jpg?v=1774034243&width=1600",
    alt: "Haven Studio reformer room",
    span: "col-span-2 row-span-2",
    height: "h-[400px] lg:h-[600px]",
  },
  {
    src: "https://adiractive.com/cdn/shop/files/IMG_4430.jpg?v=1774034409&width=1200",
    alt: "Haven Studio community",
    span: "col-span-1 row-span-1",
    height: "h-[280px]",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    alt: "Reformer workout in progress",
    span: "col-span-1 row-span-1",
    height: "h-[280px]",
  },
  {
    src: "https://adiractive.com/cdn/shop/files/IMG_4332.jpg?v=1774034409&width=1200",
    alt: "Haven Studio atmosphere",
    span: "col-span-1 row-span-1",
    height: "h-[320px]",
  },
  {
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
    alt: "Pilates equipment detail",
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
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="py-24 lg:py-40 px-6 lg:px-12" id="studio">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6"
        >
          <div>
            <span className="label-text text-blush-dark mb-4 block">
              The Studio
            </span>
            <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-charcoal">
              Step Inside <span className="italic text-rose">Haven</span>
            </h2>
          </div>
          <p className="body-text text-charcoal-light text-lg max-w-md">
            A warm, light-filled space designed to make you feel welcome from
            the moment you walk in. This is your Haven.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div style={{ y }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`${img.span} rounded-2xl overflow-hidden relative group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full ${img.height} object-cover transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
