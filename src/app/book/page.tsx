"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";

const instructors = ["All Instructors", "Coach Sarah", "Coach Jenna", "Coach Mia"];
const classTypes = ["All Classes", "Haven Signature", "Intro to Haven"];

const fullSchedule = [
  // Monday
  { day: "Monday", date: "Apr 7", time: "6:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 3, price: "$30" },
  { day: "Monday", date: "Apr 7", time: "9:00 AM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 0, price: "$30" },
  { day: "Monday", date: "Apr 7", time: "12:00 PM", name: "Intro to Haven", instructor: "Coach Sarah", duration: "25 min", spots: 6, price: "$15" },
  { day: "Monday", date: "Apr 7", time: "5:30 PM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 2, price: "$30" },
  { day: "Monday", date: "Apr 7", time: "7:00 PM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 4, price: "$30" },
  // Tuesday
  { day: "Tuesday", date: "Apr 8", time: "6:00 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 4, price: "$30" },
  { day: "Tuesday", date: "Apr 8", time: "9:30 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 1, price: "$30" },
  { day: "Tuesday", date: "Apr 8", time: "12:00 PM", name: "Intro to Haven", instructor: "Coach Jenna", duration: "25 min", spots: 5, price: "$15" },
  { day: "Tuesday", date: "Apr 8", time: "4:30 PM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 5, price: "$30" },
  { day: "Tuesday", date: "Apr 8", time: "6:00 PM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 0, price: "$30" },
  // Wednesday
  { day: "Wednesday", date: "Apr 9", time: "6:00 AM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 2, price: "$30" },
  { day: "Wednesday", date: "Apr 9", time: "9:00 AM", name: "Intro to Haven", instructor: "Coach Mia", duration: "25 min", spots: 8, price: "$15" },
  { day: "Wednesday", date: "Apr 9", time: "12:00 PM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 3, price: "$30" },
  { day: "Wednesday", date: "Apr 9", time: "5:30 PM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 1, price: "$30" },
  // Thursday
  { day: "Thursday", date: "Apr 10", time: "6:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 5, price: "$30" },
  { day: "Thursday", date: "Apr 10", time: "9:30 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 2, price: "$30" },
  { day: "Thursday", date: "Apr 10", time: "12:00 PM", name: "Intro to Haven", instructor: "Coach Sarah", duration: "25 min", spots: 7, price: "$15" },
  { day: "Thursday", date: "Apr 10", time: "5:30 PM", name: "Haven Signature", instructor: "Coach Jenna", duration: "50 min", spots: 0, price: "$30" },
  { day: "Thursday", date: "Apr 10", time: "7:00 PM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 3, price: "$30" },
  // Friday
  { day: "Friday", date: "Apr 11", time: "6:00 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 6, price: "$30" },
  { day: "Friday", date: "Apr 11", time: "9:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 4, price: "$30" },
  { day: "Friday", date: "Apr 11", time: "12:00 PM", name: "Intro to Haven", instructor: "Coach Jenna", duration: "25 min", spots: 7, price: "$15" },
  // Saturday
  { day: "Saturday", date: "Apr 12", time: "8:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 1, price: "$30" },
  { day: "Saturday", date: "Apr 12", time: "9:30 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 3, price: "$30" },
  { day: "Saturday", date: "Apr 12", time: "11:00 AM", name: "Intro to Haven", instructor: "Coach Jenna", duration: "25 min", spots: 5, price: "$15" },
  // Sunday
  { day: "Sunday", date: "Apr 13", time: "9:00 AM", name: "Haven Signature", instructor: "Coach Sarah", duration: "50 min", spots: 2, price: "$30" },
  { day: "Sunday", date: "Apr 13", time: "10:30 AM", name: "Haven Signature", instructor: "Coach Mia", duration: "50 min", spots: 4, price: "$30" },
];

const uniqueDays = [...new Set(fullSchedule.map((c) => c.day))];

export default function BookPage() {
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedInstructor, setSelectedInstructor] = useState("All Instructors");
  const [selectedClass, setSelectedClass] = useState("All Classes");

  const filtered = useMemo(() => {
    return fullSchedule.filter((cls) => {
      if (selectedDay !== "All" && cls.day !== selectedDay) return false;
      if (selectedInstructor !== "All Instructors" && cls.instructor !== selectedInstructor) return false;
      if (selectedClass !== "All Classes" && cls.name !== selectedClass) return false;
      return true;
    });
  }, [selectedDay, selectedInstructor, selectedClass]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof fullSchedule> = {};
    for (const cls of filtered) {
      const key = `${cls.day}, ${cls.date}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(cls);
    }
    return groups;
  }, [filtered]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        {/* Header */}
        <section className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link
                href="/"
                className="label-text text-warm-gray hover:text-charcoal transition-colors mb-6 inline-flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back Home
              </Link>
              <h1 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4 mb-4">
                Book a <span className="italic text-pink-deep">Class</span>
              </h1>
              <p className="body-text text-charcoal-light text-lg max-w-xl">
                The waitlists do move, so don&apos;t be afraid to hop on one or a
                few! Find the class that fits your schedule and flow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 lg:px-12 pb-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col md:flex-row gap-4"
            >
              {/* Day Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <button
                  onClick={() => setSelectedDay("All")}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${
                    selectedDay === "All"
                      ? "bg-charcoal text-cream"
                      : "bg-white text-charcoal-light hover:bg-pink-light/30"
                  }`}
                >
                  All Days
                </button>
                {uniqueDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-full text-xs font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${
                      selectedDay === day
                        ? "bg-charcoal text-cream"
                        : "bg-white text-charcoal-light hover:bg-pink-light/30"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>

              {/* Instructor Filter */}
              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
                className="px-4 py-2 rounded-full text-xs font-medium tracking-[0.1em] uppercase bg-white text-charcoal-light border border-cream-dark focus:outline-none focus:ring-2 focus:ring-pink-hot appearance-none cursor-pointer"
              >
                {instructors.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>

              {/* Class Type Filter */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 rounded-full text-xs font-medium tracking-[0.1em] uppercase bg-white text-charcoal-light border border-cream-dark focus:outline-none focus:ring-2 focus:ring-pink-hot appearance-none cursor-pointer"
              >
                {classTypes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
        </section>

        {/* Schedule */}
        <section className="px-6 lg:px-12 pb-24">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {Object.entries(grouped).length > 0 ? (
                <motion.div
                  key={`${selectedDay}-${selectedInstructor}-${selectedClass}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  {Object.entries(grouped).map(([dayLabel, classes]) => (
                    <div key={dayLabel}>
                      <h3 className="heading-md text-xl text-charcoal mb-4 sticky top-20 bg-cream/90 backdrop-blur-sm py-3 z-10">
                        {dayLabel}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {classes.map((cls, i) => (
                          <motion.div
                            key={`${dayLabel}-${i}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.05 }}
                            className="group bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(231,84,128,0.12)] transition-all duration-500 border border-transparent hover:border-pink-light/50"
                          >
                            {/* Time & Price */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="heading-md text-xl text-charcoal">
                                {cls.time}
                              </span>
                              <span className="heading-md text-lg text-pink-hot">
                                {cls.price}
                              </span>
                            </div>

                            {/* Class Name */}
                            <h4 className="font-medium text-charcoal mb-1">
                              {cls.name}
                            </h4>
                            <p className="text-sm text-warm-gray mb-4">
                              {cls.instructor} &middot; {cls.duration}
                            </p>

                            {/* Availability & CTA */}
                            <div className="flex items-center justify-between">
                              {cls.spots > 0 ? (
                                <span className="text-xs text-warm-gray flex items-center gap-1.5">
                                  <span
                                    className={`inline-block w-2 h-2 rounded-full ${
                                      cls.spots <= 2 ? "bg-rose" : "bg-green-400"
                                    }`}
                                  />
                                  {cls.spots} {cls.spots === 1 ? "spot" : "spots"} left
                                </span>
                              ) : (
                                <span className="text-xs text-pink-hot flex items-center gap-1.5">
                                  <span className="inline-block w-2 h-2 rounded-full bg-rose/50" />
                                  Waitlist
                                </span>
                              )}
                              <button
                                className={`px-5 py-2 rounded-full text-xs font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                                  cls.spots > 0
                                    ? "bg-pink-hot text-cream hover:bg-pink-deep"
                                    : "border border-rose text-pink-hot hover:bg-rose hover:text-cream"
                                }`}
                              >
                                {cls.spots > 0 ? "Book" : "Waitlist"}
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="body-text text-warm-gray text-lg">
                    No classes match your filters. Try adjusting your selection.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Info Banner */}
        <section className="px-6 lg:px-12 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 rounded-2xl bg-pink-light/30 flex items-center justify-center text-pink-hot mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h4 className="heading-md text-lg text-charcoal mb-2">
                  New Here?
                </h4>
                <p className="body-text text-sm text-charcoal-light">
                  Start with an Intro to Haven class ($15). Learn the reformer,
                  meet your coaches, and get comfortable before your first
                  signature class.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 rounded-2xl bg-lilac-light/50 flex items-center justify-center text-lilac-dark mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <h4 className="heading-md text-lg text-charcoal mb-2">
                  Waitlist Tips
                </h4>
                <p className="body-text text-sm text-charcoal-light">
                  Waitlists do move! Don&apos;t be afraid to hop on one or a
                  few. You&apos;ll be notified as soon as a spot opens up.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 rounded-2xl bg-pink-light/30 flex items-center justify-center text-pink-hot mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h4 className="heading-md text-lg text-charcoal mb-2">
                  Save With Membership
                </h4>
                <p className="body-text text-sm text-charcoal-light">
                  Unlimited classes from $159.99/mo. Or grab an 8-class pack for
                  $129.99/mo. The more you move, the more you save.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
