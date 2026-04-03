"use client";

import { motion } from "framer-motion";

export default function BrandIntro() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0.5, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="label-text text-pink-hot mb-4 sm:mb-6 block">
              What is Haven?
            </span>
            <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 sm:mb-8">
              A Space Where
              <br />
              <span className="italic text-pink-deep">Everyone Belongs</span>
            </h2>
            <div className="space-y-5 sm:space-y-6">
              <p className="body-text text-charcoal-light text-base sm:text-lg">
                Haven is a boutique reformer studio created to be a place of
                strength, joy, and belonging. Our classes are strength-based,
                athletic, and intentionally designed to challenge your body
                through modern reformer training, endurance, and full-body
                conditioning.
              </p>
              <p className="body-text text-charcoal-light text-sm sm:text-base">
                At the heart of Haven is our faith-based foundation. Our mission
                is rooted in the belief that every person is worthy of care,
                encouragement, and community. Haven is a space where kindness
                leads and joy is found through movement and connection.
              </p>
              <p className="body-text text-charcoal-light text-sm sm:text-base">
                Our small-group format allows for intentional coaching, genuine
                relationships, and a supportive environment where you are seen
                and celebrated. Whether you come for the workout, the people, or
                the sense of peace that fills the room, Haven is a safe place to
                grow in strength, confidence, and joy.
              </p>
            </div>
          </motion.div>

          {/* Image - Founders */}
          <motion.div
            initial={{ opacity: 0.5, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/brand2.jpg"
                alt="Haven Reformer Studio founders"
                className="w-full h-[400px] sm:h-[500px] lg:h-[650px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-hot/20 rounded-full blur-3xl" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-lilac-light/30 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
