"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const coachImages: Record<string, string> = {
  "Shannon Daly": "/brand1.jpg",
  "Erika Parker": "/coach1.jpg",
  "Ginevra Myers": "/brand2.jpg",
  "Kasey Everette": "/coach2.jpg",
  "Megan Cornell": "/vertical5.png",
};

const coachInitials: Record<string, string> = {
  "Shannon Daly": "SD",
  "Erika Parker": "EP",
  "Ginevra Myers": "GM",
  "Kasey Everette": "KE",
  "Megan Cornell": "MC",
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const allInstructors = ["All", "Shannon Daly", "Erika Parker", "Ginevra Myers", "Kasey Everette", "Megan Cornell"];

const scheduleData = [
  {
    day: "Mon",
    classes: [
      { time: "5:00 AM", name: "Signature 50 Minute Class", instructor: "Shannon Daly", duration: "50 min", spots: 2, price: "$30" },
      { time: "9:00 AM", name: "Signature 50 Minute Class", instructor: "Erika Parker", duration: "50 min", spots: 0, price: "$30" },
      { time: "12:00 PM", name: "Intro to Haven", instructor: "Shannon Daly", duration: "25 min", spots: 6, price: "$15" },
      { time: "5:30 PM", name: "Signature 50 Minute Class", instructor: "Ginevra Myers", duration: "50 min", spots: 3, price: "$30" },
    ],
  },
  {
    day: "Tue",
    classes: [
      { time: "5:00 AM", name: "Signature 50 Minute Class", instructor: "Shannon Daly", duration: "50 min", spots: 4, price: "$30" },
      { time: "9:30 AM", name: "Signature 50 Minute Class", instructor: "Kasey Everette", duration: "50 min", spots: 1, price: "$30" },
      { time: "4:30 PM", name: "Signature 50 Minute Class", instructor: "Megan Cornell", duration: "50 min", spots: 5, price: "$30" },
      { time: "6:00 PM", name: "Signature 50 Minute Class", instructor: "Erika Parker", duration: "50 min", spots: 0, price: "$30" },
    ],
  },
  {
    day: "Wed",
    classes: [
      { time: "5:00 AM", name: "Signature 50 Minute Class", instructor: "Ginevra Myers", duration: "50 min", spots: 2, price: "$30" },
      { time: "9:00 AM", name: "Intro to Haven", instructor: "Shannon Daly", duration: "25 min", spots: 8, price: "$15" },
      { time: "12:00 PM", name: "Signature 50 Minute Class", instructor: "Kasey Everette", duration: "50 min", spots: 3, price: "$30" },
      { time: "5:30 PM", name: "Signature 50 Minute Class", instructor: "Megan Cornell", duration: "50 min", spots: 1, price: "$30" },
    ],
  },
  {
    day: "Thu",
    classes: [
      { time: "5:00 AM", name: "Signature 50 Minute Class", instructor: "Shannon Daly", duration: "50 min", spots: 5, price: "$30" },
      { time: "9:30 AM", name: "Signature 50 Minute Class", instructor: "Erika Parker", duration: "50 min", spots: 2, price: "$30" },
      { time: "5:30 PM", name: "Signature 50 Minute Class", instructor: "Ginevra Myers", duration: "50 min", spots: 0, price: "$30" },
      { time: "7:00 PM", name: "Signature 50 Minute Class", instructor: "Kasey Everette", duration: "50 min", spots: 3, price: "$30" },
    ],
  },
  {
    day: "Fri",
    classes: [
      { time: "5:00 AM", name: "Signature 50 Minute Class", instructor: "Shannon Daly", duration: "50 min", spots: 0, price: "$30" },
      { time: "9:00 AM", name: "Signature 50 Minute Class", instructor: "Megan Cornell", duration: "50 min", spots: 4, price: "$30" },
      { time: "12:00 PM", name: "Intro to Haven", instructor: "Erika Parker", duration: "25 min", spots: 7, price: "$15" },
    ],
  },
  {
    day: "Sat",
    classes: [
      { time: "8:00 AM", name: "Signature 50 Minute Class", instructor: "Shannon Daly", duration: "50 min", spots: 1, price: "$30" },
      { time: "9:30 AM", name: "Signature 50 Minute Class", instructor: "Ginevra Myers", duration: "50 min", spots: 3, price: "$30" },
      { time: "11:00 AM", name: "Intro to Haven", instructor: "Kasey Everette", duration: "25 min", spots: 5, price: "$15" },
    ],
  },
  {
    day: "Sun",
    classes: [
      { time: "9:00 AM", name: "Signature 50 Minute Class", instructor: "Shannon Daly", duration: "50 min", spots: 2, price: "$30" },
      { time: "10:30 AM", name: "Signature 50 Minute Class", instructor: "Megan Cornell", duration: "50 min", spots: 4, price: "$30" },
    ],
  },
];

export default function SchedulePreview() {
  const [activeDay, setActiveDay] = useState("Mon");
  const [activeInstructor, setActiveInstructor] = useState("All");
  const activeDayData = scheduleData.find((d) => d.day === activeDay);
  const filteredClasses = activeDayData?.classes.filter(
    (cls) => activeInstructor === "All" || cls.instructor === activeInstructor
  ) || [];

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-16 bg-warm-white" id="schedule">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14 lg:mb-20"
        >
          <span className="label-text text-pink-hot mb-5 block tracking-[0.25em] text-[10px]">
            This Week at Haven
          </span>
          <h2 className="heading-xl text-[clamp(2rem,5vw,4.5rem)] text-charcoal mb-5">
            Find Your <span className="italic text-pink-deep">Class</span>
          </h2>
          <p className="body-text text-warm-gray text-base sm:text-lg max-w-lg mx-auto">
            The waitlists do move, so don&apos;t be afraid to hop on one or a few!
          </p>
        </motion.div>

        {/* Day Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex sm:justify-center gap-1.5 sm:gap-2 mb-4 overflow-x-auto pb-2 px-1 scrollbar-hide -mx-1"
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-400 whitespace-nowrap ${
                activeDay === day
                  ? "bg-pink-hot text-cream neon-glow-strong"
                  : "bg-white text-charcoal-light hover:bg-pink-light/20 card-elevated"
              }`}
            >
              {day}
            </button>
          ))}
        </motion.div>

        {/* Instructor Filter */}
        <div className="flex sm:justify-center gap-2 mb-10 sm:mb-12 overflow-x-auto pb-3 px-1 scrollbar-hide -mx-1">
          {allInstructors.map((name) => (
            <button
              key={name}
              onClick={() => setActiveInstructor(name)}
              className={`flex items-center gap-1.5 shrink-0 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 whitespace-nowrap ${
                activeInstructor === name
                  ? "bg-charcoal text-cream"
                  : "bg-white/80 text-warm-gray hover:bg-pink-light/20 card-elevated"
              }`}
            >
              {name !== "All" && (
                <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 ring-1 ring-pink-light/30">
                  <img
                    src={coachImages[name] || "/brand1.jpg"}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              {name === "All" ? "All Instructors" : name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {filteredClasses.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="body-text text-warm-gray">No classes match your filters. Try a different day or instructor.</p>
            </div>
          )}
          {filteredClasses.map((cls, i) => (
            <motion.div
              key={`${activeDay}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group bg-white rounded-2xl p-5 sm:p-6 card-elevated hover:card-elevated-hover transition-all duration-500 border border-transparent hover:border-pink-light/30"
            >
              <div className="flex items-start gap-3.5 sm:gap-4 mb-5">
                {/* Coach Avatar */}
                <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-pink-light/40 ring-offset-2 ring-offset-white">
                  <img
                    src={coachImages[cls.instructor] || "/brand1.jpg"}
                    alt={cls.instructor}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <h4 className="heading-md text-base sm:text-lg text-charcoal truncate">
                      {cls.name}
                    </h4>
                    <span className="heading-md text-base sm:text-lg text-pink-hot shrink-0">
                      {cls.price}
                    </span>
                  </div>
                  <p className="text-[13px] text-warm-gray">
                    {cls.instructor}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 mb-5 pl-[3.25rem] sm:pl-[3.5rem]">
                <div className="flex items-center gap-1.5 text-charcoal-light">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-[13px]">{cls.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-charcoal-light">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                  </svg>
                  <span className="text-[13px]">{cls.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pl-[3.25rem] sm:pl-[3.5rem]">
                {cls.spots > 0 ? (
                  <span className="text-xs text-warm-gray flex items-center gap-1.5">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${cls.spots <= 2 ? "bg-pink-hot animate-pulse" : "bg-emerald-400"}`} />
                    {cls.spots} {cls.spots === 1 ? "spot" : "spots"} left
                  </span>
                ) : (
                  <span className="text-xs text-pink-hot flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-hot/40" />
                    Waitlist available
                  </span>
                )}
                <a
                  href="https://momence.com/u/haven-reformer-studio-SkXWwM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-2 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-400 inline-block ${
                    cls.spots > 0
                      ? "bg-pink-hot text-cream hover:bg-pink-deep neon-glow"
                      : "border border-pink-hot/60 text-pink-hot hover:bg-pink-hot hover:text-cream"
                  }`}
                >
                  {cls.spots > 0 ? "Book" : "Join Waitlist"}
                </a>
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
          className="text-center mt-14"
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-3 px-10 py-4 bg-pink-hot text-cream text-[11px] font-medium tracking-[0.2em] uppercase rounded-full hover:bg-pink-deep transition-all duration-500 neon-glow-strong"
          >
            View Full Schedule
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
