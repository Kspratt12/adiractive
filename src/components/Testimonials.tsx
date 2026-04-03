"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Haven has truly been a lifeline for me postpartum. Starting Pilates here has helped ward off postpartum anxiety and depression, strengthened my core in a way that feels safe and intentional, and has become the highlight of many of my sleep deprived days. Shannon, the owner, is such a light and truly has a gift to connect all these ladies in such a special place.",
    name: "Jennifer Cotten",
    detail: "Google Review",
    stars: 5,
    photos: [],
  },
  {
    quote:
      "I absolutely love Haven! The hardest part for me was honestly just coming through the doors — I had never done Pilates before and I've never really been a \"gym girly,\" so I was nervous to try something new. But the instructors immediately made me feel comfortable and supported. I actually signed up for a membership after my very first class!",
    name: "Cayla Morris",
    detail: "Google Review",
    stars: 5,
    photos: [],
  },
  {
    quote:
      "Shannon, the owner, pours herself into everyone who walks through the door and makes classes such a fun atmosphere. She radiates joy, and puts everyone before herself while pushing you to become the strongest you can be. So glad I found this studio, it has become my favorite place to be.",
    name: "Haley Alford",
    detail: "Google Review · 5 photos",
    stars: 5,
    photos: ["/haley-alford1.png", "/haley-alford2.png", "/haley-alford3.png", "/haley-alford4.png", "/haley-alford5.png"],
  },
  {
    quote:
      "The classes are fun, dynamic, and genuinely engaging — you work hard without even realizing it because you're having a great time. The instructors are motivating, the vibe is vibing, and every session leaves me feeling stronger, and energized.",
    name: "Jordan Jones",
    detail: "Google Review · 2 photos",
    stars: 5,
    photos: ["/jordan-jones1.png", "/jordan-jones2.png"],
  },
  {
    quote:
      "Haven is my happy place! From the moment I walk in, the big windows, the bright lights, the positive environment, it all sets my day on the right path! My muscles have never been as toned and strong! I leave every class feeling stronger.",
    name: "Carole Tyler",
    detail: "Local Guide",
    stars: 5,
    photos: [],
  },
  {
    quote:
      "Haven is the BEST! Shannon and everyone in class is so sweet and welcoming! The motto everyone is welcome is an understatement here, I'm a newbie to pilates but no one ever makes you feel bad for that. So thankful for this studio and this community!",
    name: "Liesel Berry",
    detail: "Google Review",
    stars: 5,
    photos: [],
  },
  {
    quote:
      "Shannon is simply amazing! She has created the cutest place for reformer Pilates and is as sweet as can be. She has the best merch, best music and you are guaranteed a great workout every single time.",
    name: "Tamara Hanson",
    detail: "Local Guide",
    stars: 5,
    photos: [],
  },
  {
    quote:
      "Haven is such a great experience. Studio is beautiful, and Shannon makes you feel supported while still challenging you. I always leave thinking about when I can book my next class!!",
    name: "Yasmin",
    detail: "Google Review · 1 photo",
    stars: 5,
    photos: ["/yasmin1.png"],
  },
];

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-16 bg-warm-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0.4, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="label-text text-pink-hot mb-5 block tracking-[0.25em] text-[10px]">
            Community Love
          </span>
          <h2 className="heading-xl text-[clamp(2rem,5vw,4.5rem)] text-charcoal mb-5">
            Hear From Our <span className="italic text-pink-deep">Haven</span>
          </h2>
          <p className="body-text text-warm-gray text-base sm:text-lg max-w-md mx-auto">
            Real words from real people who found their place at Haven.
          </p>
        </motion.div>

        {/* Star rating */}
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-14 lg:mb-20"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#E8447A" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-warm-gray ml-1">5.0 on</span>
          <svg width="16" height="16" viewBox="0 0 24 24" className="ml-1">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm text-warm-gray">Google</span>
        </motion.div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {visible.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0.4, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-white rounded-2xl p-6 sm:p-8 card-elevated flex flex-col overflow-hidden min-w-0"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#E8447A" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p className="body-text text-charcoal-light text-[14px] sm:text-[15px] leading-relaxed mb-5 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Review Photos */}
              {t.photos.length > 0 && (
                <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide max-w-full">
                  {t.photos.map((photo, pi) => (
                    <div
                      key={pi}
                      className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden"
                    >
                      <img
                        src={photo}
                        alt={`${t.name} photo ${pi + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-hot to-pink-light flex items-center justify-center">
                  <span className="text-xs font-medium text-cream">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-warm-gray">{t.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More / Less */}
        {testimonials.length > 3 && (
          <motion.div
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase border border-pink-hot/40 text-pink-hot hover:bg-pink-hot hover:text-cream transition-all duration-400"
            >
              {showAll ? "Show Less" : `Read More Reviews (${testimonials.length - 3}+)`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
