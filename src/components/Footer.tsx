"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Studio: [
    { href: "/book", label: "Book a Class" },
    { href: "#classes", label: "Class Options" },
    { href: "#membership", label: "Membership" },
    { href: "#studio", label: "What to Expect" },
  ],
  Connect: [
    { href: "https://www.instagram.com/havenreformerstudio", label: "Instagram" },
    { href: "#contact", label: "Contact Us" },
    { href: "/book", label: "Gift Cards" },
  ],
  Info: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cancellation Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="heading-lg text-3xl text-cream mb-4">Haven</h3>
            <p className="body-text text-sm text-cream/60 mb-6 max-w-xs">
              Rooted in faith, community &amp; having fun.
              <br />
              Your Haven to grow strong.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/havenreformerstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-blush hover:bg-blush/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="label-text text-cream/40 mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="body-text text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} Haven Reformer Studio &amp; Boutique. All rights reserved.
          </p>
          <p className="text-xs text-cream/30">
            A space where everyone belongs.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
