"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book a Class" },
  { href: "/#classes", label: "Classes" },
  { href: "/#membership", label: "Membership" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const textColor = scrolled ? "text-charcoal" : "text-cream";
  const textColorMuted = scrolled ? "text-charcoal-light" : "text-cream/70";
  const hamburgerColor = scrolled ? "bg-charcoal" : "bg-cream";

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    // If it's a hash link and we're already on the homepage, scroll manually
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-xl shadow-[0_1px_0_rgba(240,166,176,0.2)]"
            : "bg-gradient-to-b from-charcoal/40 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-hot flex items-center justify-center neon-glow">
                <span className="text-cream font-serif italic text-sm leading-none">H</span>
              </div>
              <div className="flex flex-col">
                <span className={`heading-md text-lg lg:text-xl leading-none transition-colors duration-500 ${textColor}`}>
                  Haven
                </span>
                <span className={`text-[7px] sm:text-[8px] font-medium tracking-[0.2em] uppercase transition-colors duration-500 ${textColorMuted}`}>
                  Reformer Studio
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-[10px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 relative group ${textColorMuted} hover:text-pink-hot`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-pink-hot group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://momence.com/u/haven-reformer-studio-SkXWwM"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-pink-hot text-cream text-[10px] font-medium tracking-[0.18em] uppercase rounded-full hover:bg-pink-deep transition-colors duration-300 neon-glow"
              >
                Book Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block w-5 h-[1.5px] origin-center transition-colors duration-500 ${mobileOpen ? "bg-charcoal" : hamburgerColor}`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block w-5 h-[1.5px] transition-colors duration-500 ${mobileOpen ? "bg-charcoal" : hamburgerColor}`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block w-5 h-[1.5px] origin-center transition-colors duration-500 ${mobileOpen ? "bg-charcoal" : hamburgerColor}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream"
          >
            <div className="flex flex-col items-center justify-center h-full gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="heading-lg text-2xl sm:text-3xl text-charcoal hover:text-pink-hot transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
              >
                <a
                  href="https://momence.com/u/haven-reformer-studio-SkXWwM"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 px-8 py-3 bg-pink-hot text-cream text-[10px] font-medium tracking-[0.18em] uppercase rounded-full inline-block"
                >
                  Book a Class
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
