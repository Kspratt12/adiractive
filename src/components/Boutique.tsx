"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    name: "Haven Grip Socks",
    price: "$18",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&q=80",
    tag: "Essentials",
  },
  {
    name: "Haven Studio Tank",
    price: "$42",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
    tag: "Apparel",
  },
  {
    name: "Haven Water Bottle",
    price: "$28",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    tag: "Accessories",
  },
];

export default function Boutique() {
  return (
    <section className="py-24 lg:py-40 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="label-text text-lilac-dark mb-4 block">
              The Boutique
            </span>
            <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-charcoal">
              Shop <span className="italic text-rose">Haven</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <Link
              href="https://adiractive.com/collections/all"
              className="label-text text-charcoal-light hover:text-charcoal flex items-center gap-2 transition-colors"
            >
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 bg-cream-dark">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 glass-card rounded-full text-[10px] font-medium tracking-[0.1em] uppercase text-charcoal-light">
                    {product.tag}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="heading-md text-lg text-charcoal group-hover:text-rose transition-colors">
                  {product.name}
                </h3>
                <span className="body-text text-warm-gray">{product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gift Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-20 relative rounded-2xl overflow-hidden bg-gradient-to-r from-blush-light/50 to-lilac-light/50 p-8 lg:p-12"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="heading-lg text-2xl lg:text-3xl text-charcoal mb-2">
                Gift the Haven Experience
              </h3>
              <p className="body-text text-charcoal-light">
                Give someone you love the gift of strength, community, and joy.
              </p>
            </div>
            <Link
              href="https://adiractive.com/"
              className="shrink-0 px-8 py-3 bg-charcoal text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-charcoal-light transition-colors duration-300"
            >
              Shop Gift Cards
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
