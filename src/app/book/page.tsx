"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import {
  useSchedule,
  formatTime,
  formatDateShort,
  getESTDate,
  getUniqueTeachers,
  groupByDate,
  getNextNDays,
  type MomenceSession,
} from "@/lib/useSchedule";

type ViewMode = "week" | "month";

export default function BookPage() {
  const { sessions, loading, error } = useSchedule();
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState("All");

  const weekDates = useMemo(() => getNextNDays(7), []);
  const monthDates = useMemo(() => getNextNDays(30), []);
  const dates = viewMode === "week" ? weekDates : monthDates;

  const activeDate = selectedDay || dates[0]?.dateKey || "";
  const teachers = useMemo(() => getUniqueTeachers(sessions), [sessions]);

  const filteredSessions = useMemo(() => {
    if (viewMode === "week" || selectedDay) {
      return sessions.filter((s) => {
        const d = getESTDate(s.startsAt);
        if (d !== activeDate) return false;
        if (selectedInstructor !== "All" && s.teacher !== selectedInstructor) return false;
        return true;
      });
    }
    // Month view with no day selected shows all
    return sessions.filter((s) => {
      if (selectedInstructor !== "All" && s.teacher !== selectedInstructor) return false;
      return true;
    });
  }, [sessions, activeDate, selectedInstructor, viewMode, selectedDay]);

  const grouped = useMemo(() => groupByDate(filteredSessions), [filteredSessions]);

  // Count sessions per date for calendar dots
  const sessionCountByDate = useMemo(() => {
    const counts: Record<string, number> = {};
    sessions.forEach((s) => {
      const dk = getESTDate(s.startsAt);
      counts[dk] = (counts[dk] || 0) + 1;
    });
    return counts;
  }, [sessions]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        {/* Header */}
        <section className="px-6 lg:px-16 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0.5, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="label-text text-[10px] text-warm-gray hover:text-pink-hot transition-colors mb-6 inline-flex items-center gap-2 tracking-[0.2em]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back Home
              </Link>
              <h1 className="heading-xl text-[clamp(2.2rem,5vw,4.5rem)] text-charcoal mt-4 mb-3">
                Book a <span className="italic text-pink-deep">Class</span>
              </h1>
              <p className="body-text text-warm-gray text-base sm:text-lg max-w-xl mb-6">
                Live schedule pulled directly from our booking system. Accurate to the minute.
              </p>

              {/* Week / Month Toggle */}
              <div className="flex gap-1 bg-cream-dark rounded-full p-1 w-fit">
                <button
                  onClick={() => { setViewMode("week"); setSelectedDay(null); }}
                  className={`px-5 py-2 rounded-full text-[10px] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                    viewMode === "week" ? "bg-pink-hot text-cream" : "text-warm-gray hover:text-charcoal"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => { setViewMode("month"); setSelectedDay(null); }}
                  className={`px-5 py-2 rounded-full text-[10px] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                    viewMode === "month" ? "bg-pink-hot text-cream" : "text-warm-gray hover:text-charcoal"
                  }`}
                >
                  Month
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 lg:px-16 pb-4">
          <div className="max-w-6xl mx-auto">
            {/* Date Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-hide -mx-1 px-1">
              {dates.map((d) => (
                <button
                  key={d.dateKey}
                  onClick={() => setSelectedDay(d.dateKey)}
                  className={`shrink-0 flex flex-col items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-center transition-all duration-300 min-w-[56px] ${
                    activeDate === d.dateKey
                      ? "bg-pink-hot text-cream neon-glow"
                      : "bg-white text-charcoal-light hover:bg-pink-light/20 card-elevated"
                  }`}
                >
                  <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase">
                    {d.dayName}
                  </span>
                  <span className="text-base sm:text-lg font-medium leading-tight">
                    {d.dayNum}
                  </span>
                  {sessionCountByDate[d.dateKey] && (
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: Math.min(sessionCountByDate[d.dateKey], 5) }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-1 h-1 rounded-full ${
                            activeDate === d.dateKey ? "bg-cream/60" : "bg-pink-hot/40"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Instructor Filter */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              <button
                onClick={() => setSelectedInstructor("All")}
                className={`shrink-0 px-3.5 py-2 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                  selectedInstructor === "All"
                    ? "bg-charcoal text-cream"
                    : "bg-white/80 text-warm-gray hover:bg-pink-light/20"
                }`}
              >
                All Instructors
              </button>
              {teachers.map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedInstructor(name)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                    selectedInstructor === name
                      ? "bg-charcoal text-cream"
                      : "bg-white/80 text-warm-gray hover:bg-pink-light/20"
                  }`}
                >
                  {name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="px-6 lg:px-16 py-8 pb-20">
          <div className="max-w-6xl mx-auto">
            {loading && (
              <div className="text-center py-16">
                <div className="w-8 h-8 border-2 border-pink-hot/30 border-t-pink-hot rounded-full animate-spin mx-auto mb-4" />
                <p className="body-text text-warm-gray text-sm">Loading live schedule...</p>
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-12">
                <p className="body-text text-warm-gray mb-4">Unable to load schedule.</p>
                <a
                  href="https://momence.com/u/haven-reformer-studio-SkXWwM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-pink-hot text-cream text-[10px] font-medium tracking-[0.15em] uppercase rounded-full inline-block"
                >
                  View on Momence
                </a>
              </div>
            )}

            {!loading && !error && (
              <>
                {Object.keys(grouped).length === 0 && (
                  <div className="text-center py-14">
                    <p className="body-text text-warm-gray text-lg">No classes for this selection.</p>
                    <p className="body-text text-warm-gray/60 text-sm mt-2">Try another day or instructor.</p>
                  </div>
                )}

                {Object.entries(grouped).map(([dateKey, classes]) => (
                  <div key={dateKey} className="mb-8">
                    <h3 className="heading-md text-base sm:text-lg text-charcoal mb-4 sticky top-16 bg-cream/95 backdrop-blur-sm py-3 z-10 border-b border-pink-light/15">
                      {formatDateShort(classes[0].startsAt)}
                      <span className="text-warm-gray text-sm font-normal ml-2">
                        ({classes.length} {classes.length === 1 ? "class" : "classes"})
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {classes.map((cls) => (
                        <BookingCard key={cls.id} session={cls} />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* Info Cards */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 card-elevated">
                <div className="w-11 h-11 rounded-xl bg-pink-light/30 flex items-center justify-center text-pink-hot mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h4 className="heading-md text-base text-charcoal mb-2">New Here?</h4>
                <p className="body-text text-[13px] text-warm-gray">
                  Start with an Intro to Haven class ($15). Learn the reformer, meet your coaches, and get comfortable.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 card-elevated">
                <div className="w-11 h-11 rounded-xl bg-lilac-light/40 flex items-center justify-center text-lilac-dark mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <h4 className="heading-md text-base text-charcoal mb-2">Waitlist Tips</h4>
                <p className="body-text text-[13px] text-warm-gray">
                  Waitlists do move! Don&apos;t be afraid to hop on one or a few. You&apos;ll be notified when a spot opens.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 card-elevated">
                <div className="w-11 h-11 rounded-xl bg-pink-light/30 flex items-center justify-center text-pink-hot mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h4 className="heading-md text-base text-charcoal mb-2">Save With Membership</h4>
                <p className="body-text text-[13px] text-warm-gray">
                  Unlimited classes from $159.99/mo or grab an 8-class pack for $129.99/mo.
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

function BookingCard({ session }: { session: MomenceSession }) {
  const spotsLeft = session.remainingSpots.remaining;
  const isFull = spotsLeft === 0;

  return (
    <div className="group bg-white rounded-2xl p-5 sm:p-6 card-elevated hover:card-elevated-hover transition-all duration-500 border border-transparent hover:border-pink-light/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-pink-light/40 ring-offset-2 ring-offset-white">
          <img
            src={session.teacherPicture}
            alt={session.teacher}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="heading-md text-base sm:text-lg text-charcoal">
              {formatTime(session.startsAt)}
            </span>
            <span className="heading-md text-sm sm:text-base text-pink-hot">
              ${session.fixedTicketPrice}
            </span>
          </div>
          <h4 className="font-medium text-charcoal text-[13px] truncate">
            {session.sessionName}
          </h4>
          <p className="text-xs text-warm-gray">
            {session.teacher} &middot; {session.durationMinutes} min
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pl-[3rem] sm:pl-[3.25rem]">
        {!isFull ? (
          <span className="text-xs text-warm-gray flex items-center gap-1.5">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${spotsLeft <= 2 ? "bg-pink-hot animate-pulse" : "bg-emerald-400"}`} />
            {spotsLeft}/{session.capacity} spots
          </span>
        ) : (
          <span className="text-xs text-pink-hot flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-hot/40" />
            {session.allowWaitlist && !session.waitlistFull ? "Waitlist" : "Full"}
          </span>
        )}
        <a
          href={session.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-5 py-2 rounded-full text-[10px] font-medium tracking-[0.12em] uppercase transition-all duration-400 inline-block ${
            !isFull
              ? "bg-pink-hot text-cream hover:bg-pink-deep neon-glow"
              : "border border-pink-hot/60 text-pink-hot hover:bg-pink-hot hover:text-cream"
          }`}
        >
          {!isFull ? "Book" : "Waitlist"}
        </a>
      </div>
    </div>
  );
}
