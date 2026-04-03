"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const quickReplies = [
  { label: "Book a Class", href: "/book", icon: "📅" },
  { label: "First Time Info", href: "#classes", icon: "✨" },
  { label: "Pricing", href: "#membership", icon: "💰" },
  { label: "Schedule", href: "/book", icon: "🕐" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-[0_16px_60px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-hot to-pink-light p-6">
              <h3 className="heading-md text-xl text-cream">
                Hey there! 👋
              </h3>
              <p className="body-text text-sm text-cream/80 mt-1">
                How can we help you today?
              </p>
            </div>

            {/* Quick Replies */}
            <div className="p-4 space-y-2">
              {quickReplies.map((reply) => (
                <Link
                  key={reply.label}
                  href={reply.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-light/20 transition-colors duration-200 group"
                >
                  <span className="text-lg">{reply.icon}</span>
                  <span className="body-text text-sm text-charcoal group-hover:text-pink-hot transition-colors">
                    {reply.label}
                  </span>
                  <svg
                    className="ml-auto w-4 h-4 text-warm-gray group-hover:text-pink-hot transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <div className="p-3 bg-cream rounded-xl text-center">
                <p className="text-xs text-warm-gray">
                  Or email us at{" "}
                  <a
                    href="mailto:hello@havenreformer.com"
                    className="text-pink-hot hover:underline"
                  >
                    hello@havenreformer.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 ${
          open
            ? "bg-charcoal text-cream"
            : "bg-pink-hot text-cream neon-glow"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
