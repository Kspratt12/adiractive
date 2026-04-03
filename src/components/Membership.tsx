"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Drop-In",
    price: "$30",
    period: "per class",
    description: "Perfect for visitors and trying us out.",
    features: [
      "Single class access",
      "All class types",
      "No commitment",
    ],
    accent: false,
    cta: "Book a Drop-In",
  },
  {
    name: "5 Class Pack",
    price: "$115.99",
    period: "valid 90 days",
    description: "Flexibility without the subscription. Move on your schedule.",
    features: [
      "5 classes",
      "90-day validity",
      "No monthly commitment",
      "~$23 per class",
    ],
    accent: false,
    cta: "Get Class Pack",
  },
  {
    name: "8 Classes / Month",
    price: "$129.99",
    period: "per month",
    description: "Consistent practice with room to breathe. About two sessions a week.",
    features: [
      "8 classes monthly",
      "Flexible scheduling",
      "~$16 per class",
      "Cancel anytime",
    ],
    accent: true,
    cta: "Start Membership",
    badge: "Most Popular",
  },
  {
    name: "Unlimited",
    price: "$159.99",
    period: "per month",
    description: "Move as often as your body desires. Full freedom, full access.",
    features: [
      "Unlimited classes",
      "1 guest pass / month",
      "Priority booking",
      "Best value",
    ],
    accent: false,
    cta: "Go Unlimited",
  },
];

export default function Membership() {
  return (
    <section className="py-24 lg:py-40 px-6 lg:px-12" id="membership">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-20"
        >
          <span className="label-text text-lilac-dark mb-4 block">
            Membership
          </span>
          <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4">
            Find Your <span className="italic text-rose">Rhythm</span>
          </h2>
          <p className="body-text text-charcoal-light text-lg max-w-xl mx-auto">
            Whether you&apos;re dropping in or going all in, there&apos;s a plan
            that fits your life.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                plan.accent
                  ? "bg-charcoal text-cream shadow-2xl scale-[1.02] lg:scale-105"
                  : "bg-white text-charcoal shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(232,196,196,0.2)]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-rose text-cream text-[10px] font-medium tracking-[0.12em] uppercase rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="heading-md text-xl mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="heading-xl text-3xl lg:text-4xl">
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-1 ${plan.accent ? "text-cream/50" : "text-warm-gray"}`}
                >
                  {plan.period}
                </span>
              </div>
              <p
                className={`body-text text-sm mb-6 ${plan.accent ? "text-cream/70" : "text-charcoal-light"}`}
              >
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-center gap-2 text-sm ${plan.accent ? "text-cream/80" : "text-charcoal-light"}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={plan.accent ? "#E8C4C4" : "#C9878F"}
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/book"
                className={`block w-full text-center px-6 py-3 rounded-full text-xs font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                  plan.accent
                    ? "bg-cream text-charcoal hover:bg-blush-light"
                    : "bg-charcoal text-cream hover:bg-charcoal-light"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Intro Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="body-text text-warm-gray">
            First time?{" "}
            <Link href="/book" className="text-rose hover:text-blush-dark underline underline-offset-4 transition-colors">
              Try an Intro to Haven class for just $15
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
