"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Build calendar grid for a given month
function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);
  return grid;
}

export default function BookPage() {
  const { sessions, loading, error } = useSchedule();
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState("All");

  // Calendar month navigation
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const calGrid = useMemo(() => buildCalendarGrid(calYear, calMonth), [calYear, calMonth]);
  const monthLabel = new Date(calYear, calMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const weekDates = useMemo(() => getNextNDays(7), []);

  const todayKey = useMemo(() => {
    const t = new Date();
    return [t.getFullYear(), String(t.getMonth() + 1).padStart(2, "0"), String(t.getDate()).padStart(2, "0")].join("-");
  }, []);

  const activeDate = selectedDay || weekDates[0]?.dateKey || todayKey;
  const teachers = useMemo(() => getUniqueTeachers(sessions), [sessions]);

  // Filter sessions based on view mode
  const filteredSessions = useMemo(() => {
    if (viewMode === "week") {
      return sessions.filter((s) => {
        if (getESTDate(s.startsAt) !== activeDate) return false;
        if (selectedInstructor !== "All" && s.teacher !== selectedInstructor) return false;
        return true;
      });
    }
    // Month view: if a day is selected show that day, otherwise show all in the month
    if (selectedDay) {
      return sessions.filter((s) => {
        if (getESTDate(s.startsAt) !== selectedDay) return false;
        if (selectedInstructor !== "All" && s.teacher !== selectedInstructor) return false;
        return true;
      });
    }
    // Show all sessions in the selected calendar month
    const monthPrefix = `${calYear}-${String(calMonth + 1).padStart(2, "0")}`;
    return sessions.filter((s) => {
      if (!getESTDate(s.startsAt).startsWith(monthPrefix)) return false;
      if (selectedInstructor !== "All" && s.teacher !== selectedInstructor) return false;
      return true;
    });
  }, [sessions, activeDate, selectedInstructor, viewMode, selectedDay, calYear, calMonth]);

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

  function calDayKey(day: number) {
    return `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(calYear - 1); setCalMonth(11); }
    else setCalMonth(calMonth - 1);
    setSelectedDay(null);
  }

  function nextMonth() {
    if (calMonth === 11) { setCalYear(calYear + 1); setCalMonth(0); }
    else setCalMonth(calMonth + 1);
    setSelectedDay(null);
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        {/* Header */}
        <section className="px-6 lg:px-16 py-10 lg:py-14">
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
              <p className="body-text text-warm-gray text-base sm:text-lg max-w-xl mb-8">
                Live schedule pulled directly from our booking system. Accurate to the minute.
              </p>

              {/* Week / Month Toggle */}
              <div className="flex gap-1 bg-cream-dark rounded-full p-1 w-fit">
                <button
                  onClick={() => { setViewMode("week"); setSelectedDay(null); }}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[10px] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                    viewMode === "week" ? "bg-pink-hot text-cream neon-glow" : "text-warm-gray hover:text-charcoal"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  Week
                </button>
                <button
                  onClick={() => { setViewMode("month"); setSelectedDay(null); }}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[10px] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                    viewMode === "month" ? "bg-pink-hot text-cream neon-glow" : "text-warm-gray hover:text-charcoal"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Month
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Date Selection */}
        <section className="px-6 lg:px-16 pb-4">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {viewMode === "week" ? (
                <motion.div
                  key="week"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Week Strip */}
                  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-1 px-1">
                    {weekDates.map((d) => (
                      <button
                        key={d.dateKey}
                        onClick={() => setSelectedDay(d.dateKey)}
                        className={`shrink-0 flex flex-col items-center px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 min-w-[64px] ${
                          activeDate === d.dateKey
                            ? "bg-pink-hot text-cream neon-glow"
                            : sessionCountByDate[d.dateKey]
                            ? "bg-white text-charcoal hover:bg-pink-light/20 card-elevated"
                            : "bg-white/50 text-warm-gray/50"
                        }`}
                      >
                        <span className="text-[10px] font-medium tracking-[0.1em] uppercase">
                          {d.isToday ? "Today" : d.dayName}
                        </span>
                        <span className="text-lg font-medium leading-tight mt-0.5">
                          {d.dayNum}
                        </span>
                        {sessionCountByDate[d.dateKey] && (
                          <span className={`text-[9px] mt-1 ${activeDate === d.dateKey ? "text-cream/70" : "text-pink-hot/60"}`}>
                            {sessionCountByDate[d.dateKey]} classes
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="month"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Calendar */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 card-elevated max-w-md mx-auto lg:mx-0">
                    {/* Month Nav */}
                    <div className="flex items-center justify-between mb-5">
                      <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-pink-light/20 flex items-center justify-center transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <h3 className="heading-md text-base sm:text-lg text-charcoal">{monthLabel}</h3>
                      <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-pink-light/20 flex items-center justify-center transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <div key={d} className="text-center text-[9px] font-medium tracking-[0.1em] uppercase text-warm-gray/50 py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {calGrid.map((day, i) => {
                        if (day === null) return <div key={`empty-${i}`} />;
                        const key = calDayKey(day);
                        const hasClasses = sessionCountByDate[key];
                        const isSelected = selectedDay === key;
                        const isToday = key === todayKey;

                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedDay(isSelected ? null : key)}
                            className={`relative flex flex-col items-center py-2 rounded-lg transition-all duration-200 text-sm ${
                              isSelected
                                ? "bg-pink-hot text-cream font-medium"
                                : isToday
                                ? "bg-pink-light/30 text-pink-hot font-medium"
                                : hasClasses
                                ? "hover:bg-pink-light/15 text-charcoal"
                                : "text-warm-gray/40"
                            }`}
                          >
                            {day}
                            {hasClasses && (
                              <div className="flex gap-0.5 mt-0.5">
                                {Array.from({ length: Math.min(hasClasses, 4) }).map((_, j) => (
                                  <span
                                    key={j}
                                    className={`w-1 h-1 rounded-full ${
                                      isSelected ? "bg-cream/60" : "bg-pink-hot/50"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected day label */}
                    {selectedDay && (
                      <div className="mt-4 pt-4 border-t border-cream-dark/50 flex items-center justify-between">
                        <p className="text-sm text-charcoal font-medium">
                          {new Date(selectedDay + "T12:00:00").toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <button
                          onClick={() => setSelectedDay(null)}
                          className="text-[10px] text-warm-gray hover:text-pink-hot transition-colors uppercase tracking-[0.1em]"
                        >
                          Show All
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructor Filter */}
            <div className="flex gap-2 mt-5 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
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
        <section className="px-6 lg:px-16 py-6 pb-16">
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
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
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
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
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
              {formatTime(session.startsAt)} <span className="text-[10px] text-warm-gray/60">ET</span>
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
