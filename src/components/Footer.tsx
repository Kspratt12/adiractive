"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Studio: [
    { href: "/book", label: "Book a Class" },
    { href: "/#classes", label: "Class Options" },
    { href: "/#membership", label: "Membership" },
    { href: "/about", label: "About Us" },
  ],
  Connect: [
    { href: "https://www.instagram.com/havenreformer", label: "Instagram" },
    { href: "mailto:hello.adir.active@gmail.com", label: "Email Us" },
    { href: "tel:9842059212", label: "(984) 205-9212" },
    { href: "https://adiractive.com/", label: "Gift Cards" },
  ],
  Info: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/terms#cancellation", label: "Cancellation Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Brand with Pink H */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              {/* Pink H Logo */}
              <div className="w-11 h-11 rounded-xl bg-pink-hot flex items-center justify-center neon-glow">
                <span className="text-cream font-serif italic text-xl leading-none">H</span>
              </div>
              <div>
                <h3 className="heading-lg text-2xl text-cream leading-none">Haven</h3>
                <span className="label-text text-[8px] text-cream/30 tracking-[0.3em]">
                  Reformer Studio
                </span>
              </div>
            </div>
            <p className="body-text text-sm text-cream/40 mb-5 max-w-xs leading-relaxed">
              Rooted in faith, community &amp; having fun.
              Your Haven to grow strong.
            </p>

            {/* Location */}
            <div className="mb-6">
              <p className="text-[13px] text-cream/50 leading-relaxed">
                2908 N Main St, Unit 100 (back unit)
                <br />
                Fuquay-Varina, NC 27526
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/havenreformer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/5 flex items-center justify-center hover:bg-pink-hot/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/50">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="mailto:hello.adir.active@gmail.com"
                className="w-9 h-9 rounded-full bg-cream/5 flex items-center justify-center hover:bg-pink-hot/20 transition-all duration-300"
                aria-label="Email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/50">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="label-text text-[9px] text-cream/25 mb-6 tracking-[0.3em]">{title}</h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-cream/45 hover:text-pink-light transition-colors duration-300"
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
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-cream/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-[11px] text-cream/20">
            &copy; {new Date().getFullYear()} Haven Reformer Studio &amp; Boutique
          </p>
          <p className="text-[11px] text-cream/20 italic">
            A space where everyone belongs.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
