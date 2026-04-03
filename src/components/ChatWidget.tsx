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
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2.5rem)] sm:w-72 max-w-[280px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-pink-hot to-pink-light px-5 py-4">
              <h3 className="heading-md text-lg text-cream">Hey there! 👋</h3>
              <p className="text-xs text-cream/80 mt-0.5">How can we help?</p>
            </div>
            <div className="p-3 space-y-0.5">
              {quickReplies.map((reply) => (
                <Link
                  key={reply.label}
                  href={reply.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-pink-light/15 transition-colors duration-200 group"
                >
                  <span className="text-base">{reply.icon}</span>
                  <span className="text-sm text-charcoal group-hover:text-pink-hot transition-colors flex-1">
                    {reply.label}
                  </span>
                  <svg className="w-3.5 h-3.5 text-warm-gray/40 group-hover:text-pink-hot transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
            <div className="px-3 pb-3">
              <div className="p-2.5 bg-cream rounded-xl text-center">
                <p className="text-[11px] text-warm-gray">
                  Email us:{" "}
                  <a href="mailto:hello.adir.active@gmail.com" className="text-pink-hot hover:underline">
                    hello.adir.active@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(!open)}
        className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-400 ${
          open
            ? "bg-charcoal text-cream shadow-lg"
            : "bg-pink-hot text-cream shadow-[0_4px_20px_rgba(232,68,122,0.25)]"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
