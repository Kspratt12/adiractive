"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Haven changed my entire relationship with fitness. I walked in nervous and walked out feeling like I found my people. The energy is contagious.",
    name: "Lauren M.",
    detail: "Member since 2024",
  },
  {
    quote:
      "I have never felt so strong and so welcomed in a studio before. The instructors truly see you and meet you where you are. This place is special.",
    name: "Ashley T.",
    detail: "Unlimited Member",
  },
  {
    quote:
      "The music, the energy, the community. It all comes together in a way that makes you want to come back. Haven is my favorite hour of the week.",
    name: "Rachel K.",
    detail: "8-Class Member",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-40 px-6 lg:px-12 bg-warm-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="label-text text-pink-hot mb-4 block">
            Community
          </span>
          <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-charcoal">
            Hear From Our <span className="italic text-pink-deep">Haven</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
            >
              {/* Quote mark */}
              <div className="heading-xl text-6xl text-pink-light/60 absolute top-4 left-6 leading-none select-none">
                &ldquo;
              </div>

              <div className="pt-8">
                <p className="body-text text-charcoal-light text-lg mb-8 relative">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-hot to-pink-light flex items-center justify-center">
                    <span className="text-sm font-medium text-cream">
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      {t.name}
                    </p>
                    <p className="text-xs text-warm-gray">{t.detail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
