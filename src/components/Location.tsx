"use client";

import { motion } from "framer-motion";

export default function Location() {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-16 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0.4, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="label-text text-pink-hot mb-5 block tracking-[0.25em] text-[10px]">
              Visit Us
            </span>
            <h2 className="heading-xl text-[clamp(2rem,4.5vw,3.5rem)] text-charcoal mb-8">
              Find Your Way to{" "}
              <span className="italic text-pink-deep">Haven</span>
            </h2>

            <div className="space-y-7">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-pink-light/30 flex items-center justify-center text-pink-hot">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-sm mb-1">Address</h4>
                  <p className="text-[13px] text-warm-gray leading-relaxed">
                    2908 N Main St, Unit 100 (back unit)
                    <br />
                    Fuquay-Varina, NC 27526
                  </p>
                  <p className="text-[12px] text-warm-gray/60 mt-1 italic">
                    Open during class hours only
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-pink-light/30 flex items-center justify-center text-pink-hot">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-sm mb-1">Email (Recommended)</h4>
                  <a
                    href="mailto:hello.adir.active@gmail.com"
                    className="text-[13px] text-pink-hot hover:text-pink-deep transition-colors"
                  >
                    hello.adir.active@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-pink-light/30 flex items-center justify-center text-pink-hot">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-sm mb-1">Text Only</h4>
                  <a
                    href="sms:9842059212"
                    className="text-[13px] text-pink-hot hover:text-pink-deep transition-colors"
                  >
                    (984) 205-9212
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-pink-light/30 flex items-center justify-center text-pink-hot">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-sm mb-1">Follow Us</h4>
                  <a
                    href="https://www.instagram.com/havenreformer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-pink-hot hover:text-pink-deep transition-colors"
                  >
                    @havenreformer
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0.4, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden neon-glow h-[320px] sm:h-[400px] lg:h-[480px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.5!2d-78.7996!3d35.5963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac8a4f0b4e7b0d%3A0x0!2s2908+N+Main+St%2C+Fuquay-Varina%2C+NC+27526!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Haven Reformer Studio Location"
              className="grayscale-[20%] contrast-[1.05]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
