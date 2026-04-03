"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const scheduleData = [
  {
    day: "Mon",
    classes: [
      { time: "6:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 3, price: "$30" },
      { time: "9:00 AM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 0, price: "$30" },
      { time: "12:00 PM", name: "Intro to Haven", instructor: "Coach Sarah", duration: "25 min", spots: 6, price: "$15" },
      { time: "5:30 PM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 2, price: "$30" },
    ],
  },
  {
    day: "Tue",
    classes: [
      { time: "6:00 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 4, price: "$30" },
      { time: "9:30 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 1, price: "$30" },
      { time: "4:30 PM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 5, price: "$30" },
      { time: "6:00 PM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 0, price: "$30" },
    ],
  },
  {
    day: "Wed",
    classes: [
      { time: "6:00 AM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 2, price: "$30" },
      { time: "9:00 AM", name: "Intro to Haven", instructor: "Coach Mia", duration: "25 min", spots: 8, price: "$15" },
      { time: "12:00 PM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 3, price: "$30" },
      { time: "5:30 PM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 1, price: "$30" },
    ],
  },
  {
    day: "Thu",
    classes: [
      { time: "6:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 5, price: "$30" },
      { time: "9:30 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 2, price: "$30" },
      { time: "5:30 PM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 0, price: "$30" },
    ],
  },
  {
    day: "Fri",
    classes: [
      { time: "6:00 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 6, price: "$30" },
      { time: "9:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 4, price: "$30" },
      { time: "12:00 PM", name: "Intro to Haven", instructor: "Coach Jenna", duration: "25 min", spots: 7, price: "$15" },
    ],
  },
  {
    day: "Sat",
    classes: [
      { time: "8:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 1, price: "$30" },
      { time: "9:30 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 3, price: "$30" },
      { time: "11:00 AM", name: "Intro to Haven", instructor: "Coach Jenna", duration: "25 min", spots: 5, price: "$15" },
    ],
  },
  {
    day: "Sun",
    classes: [
      { time: "9:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 2, price: "$30" },
      { time: "10:30 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 4, price: "$30" },
    ],
  },
];

export default function SchedulePreview() {
  const [activeDay, setActiveDay] = useState("Mon");
  const activeDayData = scheduleData.find((d) => d.day === activeDay);

  return (
    <section className="py-24 lg:py-40 px-6 lg:px-12 bg-warm-white" id="schedule">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="label-text text-pink-hot mb-4 block">
            This Week
          </span>
          <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4">
            Find Your <span className="italic text-pink-deep">Class</span>
          </h2>
          <p className="body-text text-charcoal-light text-lg max-w-xl mx-auto">
            The waitlists do move, so don&apos;t be afraid to hop on one or a few!
          </p>
        </motion.div>

        {/* Day Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2"
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-[0.1em] uppercase transition-all duration-300 whitespace-nowrap ${
                activeDay === day
                  ? "bg-pink-hot text-cream shadow-lg neon-glow"
                  : "bg-white text-charcoal-light hover:bg-pink-light/30"
              }`}
            >
              {day}
            </button>
          ))}
        </motion.div>

        {/* Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {activeDayData?.classes.map((cls, i) => (
            <motion.div
              key={`${activeDay}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-2xl p-6 lg:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(231,84,128,0.12)] transition-all duration-500 border border-transparent hover:border-pink-light/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="heading-md text-lg text-charcoal mb-1">
                    {cls.name}
                  </h4>
                  <p className="body-text text-sm text-warm-gray">
                    {cls.instructor}
                  </p>
                </div>
                <span className="heading-md text-lg text-pink-hot">
                  {cls.price}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1.5 text-charcoal-light">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-sm">{cls.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-charcoal-light">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-sm">{cls.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                {cls.spots > 0 ? (
                  <span className="text-xs text-warm-gray">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${cls.spots <= 2 ? "bg-pink-hot" : "bg-green-400"}`} />
                    {cls.spots} {cls.spots === 1 ? "spot" : "spots"} left
                  </span>
                ) : (
                  <span className="text-xs text-pink-hot flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-hot/50" />
                    Waitlist Available
                  </span>
                )}
                <Link
                  href="/book"
                  className={`px-5 py-2 rounded-full text-xs font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                    cls.spots > 0
                      ? "bg-pink-hot text-cream hover:bg-pink-deep"
                      : "border border-pink-hot text-pink-hot hover:bg-pink-hot hover:text-cream"
                  }`}
                >
                  {cls.spots > 0 ? "Book" : "Join Waitlist"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Schedule CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-pink-hot text-cream text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-pink-deep transition-colors duration-300 shadow-lg neon-glow"
          >
            View Full Schedule
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
