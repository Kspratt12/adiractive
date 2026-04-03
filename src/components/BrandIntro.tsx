"use client";

import { motion } from "framer-motion";

export default function BrandIntro() {
  return (
    <section className="py-24 lg:py-40 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="label-text text-pink-hot mb-6 block">
              Our Story
            </span>
            <h2 className="heading-lg text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8">
              A Space Where
              <br />
              <span className="italic text-pink-deep">Everyone Belongs</span>
            </h2>
            <div className="space-y-6">
              <p className="body-text text-charcoal-light text-lg">
                Haven is more than a studio. It&apos;s a sanctuary. A space
                rooted in faith, community, and the joy of moving your body.
                We believe that strength isn&apos;t just physical. It&apos;s
                the confidence you carry when you walk out our doors.
              </p>
              <p className="body-text text-charcoal-light">
                Our strength-based reformer workouts blend controlled movements
                with modern training, endurance, and full-body conditioning.
                Every class is music-driven and intentionally paced to help you
                feel strong, energized, and accomplished.
              </p>
              <p className="body-text text-charcoal-light">
                Whether you&apos;re stepping onto a reformer for the first time
                or you&apos;re a seasoned athlete, Haven is designed for you.
                Every movement can be tailored with modifications, progressions,
                and spring adjustments to meet you exactly where you are.
              </p>
            </div>
          </motion.div>

          {/* Image - Founders with pink balloons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/vertical1.png"
                alt="Haven Reformer Studio founders with pink balloons and kettlebell"
                className="w-full h-[500px] lg:h-[650px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent" />
            </div>
            {/* Decorative accent - matching studio pink glow */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-hot/20 rounded-full blur-3xl" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-lilac-light/30 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
