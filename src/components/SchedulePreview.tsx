"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useSchedule,
  formatTime,
  getESTDate,
  getUniqueTeachers,
  type MomenceSession,
} from "@/lib/useSchedule";

type ViewMode = "week" | "month";

function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);
  return grid;
}

export default function SchedulePreview() {
  const { sessions, loading, error } = useSchedule();
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [activeInstructor, setActiveInstructor] = useState("All");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const calGrid = useMemo(() => buildCalendarGrid(calYear, calMonth), [calYear, calMonth]);
  const monthLabel = new Date(calYear, calMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const todayKey = useMemo(() => new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }), []);

  const teachers = useMemo(() => getUniqueTeachers(sessions), [sessions]);

  // Build week tabs from actual session dates
  const dateTabs = useMemo(() => {
    const dateSet = new Set(sessions.map((s) => getESTDate(s.startsAt)));
    const sorted = Array.from(dateSet).sort();
    return sorted.slice(0, 7).map((dateKey) => {
      const [y, m, d] = dateKey.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      const label = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      return { dateKey, label, isToday: dateKey === todayKey };
    });
  }, [sessions, todayKey]);

  const activeDate = selectedDate || dateTabs[0]?.dateKey || "";

  // Session counts by date for calendar dots
  const sessionCountByDate = useMemo(() => {
    const counts: Record<string, number> = {};
    sessions.forEach((s) => {
      const dk = getESTDate(s.startsAt);
      counts[dk] = (counts[dk] || 0) + 1;
    });
    return counts;
  }, [sessions]);

  // Filter sessions
  const filteredClasses = useMemo(() => {
    if (viewMode === "month" && !selectedDate) {
      const prefix = `${calYear}-${String(calMonth + 1).padStart(2, "0")}`;
      return sessions.filter((s) => {
        if (!getESTDate(s.startsAt).startsWith(prefix)) return false;
        if (activeInstructor !== "All" && s.teacher !== activeInstructor) return false;
        return true;
      });
    }
    return sessions.filter((s) => {
      if (getESTDate(s.startsAt) !== activeDate) return false;
      if (activeInstructor !== "All" && s.teacher !== activeInstructor) return false;
      return true;
    });
  }, [sessions, activeDate, activeInstructor, viewMode, selectedDate, calYear, calMonth]);

  // Group for month "show all" view
  const grouped = useMemo(() => {
    if (viewMode !== "month" || selectedDate) return {};
    const groups: Record<string, MomenceSession[]> = {};
    filteredClasses.forEach((s) => {
      const dk = getESTDate(s.startsAt);
      if (!groups[dk]) groups[dk] = [];
      groups[dk].push(s);
    });
    return groups;
  }, [filteredClasses, viewMode, selectedDate]);

  function calDayKey(day: number) {
    return `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
  function prevMonth() { if (calMonth === 0) { setCalYear(calYear - 1); setCalMonth(11); } else setCalMonth(calMonth - 1); setSelectedDate(null); }
  function nextMonth() { if (calMonth === 11) { setCalYear(calYear + 1); setCalMonth(0); } else setCalMonth(calMonth + 1); setSelectedDate(null); }

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-16 bg-warm-white" id="schedule">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0.4, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-10"
        >
          <span className="label-text text-pink-hot mb-5 block tracking-[0.25em] text-[10px]">
            Live Schedule
          </span>
          <h2 className="heading-xl text-[clamp(2rem,5vw,4.5rem)] text-charcoal mb-4">
            Find Your <span className="italic text-pink-deep">Class</span>
          </h2>
          <p className="body-text text-warm-gray text-base sm:text-lg max-w-lg mx-auto mb-6">
            Real-time availability. The waitlists do move!
          </p>

          {/* Week / Month Toggle */}
          <div className="flex gap-1 bg-cream-dark rounded-full p-1 w-fit mx-auto">
            <button
              onClick={() => { setViewMode("week"); setSelectedDate(null); }}
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
              onClick={() => { setViewMode("month"); setSelectedDate(null); }}
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

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-pink-hot/30 border-t-pink-hot rounded-full animate-spin mx-auto mb-4" />
            <p className="body-text text-warm-gray text-sm">Loading live schedule...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="body-text text-warm-gray mb-4">Unable to load live schedule.</p>
            <a href="https://momence.com/u/haven-reformer-studio-SkXWwM" target="_blank" rel="noopener noreferrer"
              className="px-6 py-2.5 bg-pink-hot text-cream text-[10px] font-medium tracking-[0.15em] uppercase rounded-full inline-block">
              View on Momence
            </a>
          </div>
        )}

        {/* Schedule Content */}
        {!loading && !error && (
          <>
            <AnimatePresence mode="wait">
              {viewMode === "week" ? (
                <motion.div key="week" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {/* Week Date Tabs */}
                  <div className="flex sm:justify-center gap-1.5 sm:gap-2 mb-4 overflow-x-auto pb-2 px-1 scrollbar-hide -mx-1">
                    {dateTabs.map((d) => (
                      <button
                        key={d.dateKey}
                        onClick={() => setSelectedDate(d.dateKey)}
                        className={`shrink-0 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.12em] uppercase transition-all duration-300 whitespace-nowrap ${
                          activeDate === d.dateKey
                            ? "bg-pink-hot text-cream neon-glow-strong"
                            : "bg-white text-charcoal-light hover:bg-pink-light/20 card-elevated"
                        }`}
                      >
                        {d.isToday ? "Today" : d.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="month" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {/* Calendar */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 card-elevated max-w-sm mx-auto mb-4">
                    <div className="flex items-center justify-between mb-5">
                      <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-pink-light/20 flex items-center justify-center transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                      </button>
                      <h3 className="heading-md text-base sm:text-lg text-charcoal">{monthLabel}</h3>
                      <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-pink-light/20 flex items-center justify-center transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                        <div key={d} className="text-center text-[9px] font-medium tracking-[0.1em] uppercase text-warm-gray/50 py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calGrid.map((day, i) => {
                        if (day === null) return <div key={`e-${i}`} />;
                        const key = calDayKey(day);
                        const hasClasses = sessionCountByDate[key];
                        const isSelected = selectedDate === key;
                        const isToday = key === todayKey;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedDate(isSelected ? null : key)}
                            className={`relative flex flex-col items-center py-2 rounded-lg transition-all duration-200 text-sm ${
                              isSelected ? "bg-pink-hot text-cream font-medium"
                              : isToday ? "bg-pink-light/30 text-pink-hot font-medium"
                              : hasClasses ? "hover:bg-pink-light/15 text-charcoal"
                              : "text-warm-gray/40"
                            }`}
                          >
                            {day}
                            {hasClasses && (
                              <div className="flex gap-0.5 mt-0.5">
                                {Array.from({ length: Math.min(hasClasses, 4) }).map((_, j) => (
                                  <span key={j} className={`w-1 h-1 rounded-full ${isSelected ? "bg-cream/60" : "bg-pink-hot/50"}`} />
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {selectedDate && (
                      <div className="mt-4 pt-4 border-t border-cream-dark/50 flex items-center justify-between">
                        <p className="text-sm text-charcoal font-medium">
                          {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                        </p>
                        <button onClick={() => setSelectedDate(null)} className="text-[10px] text-warm-gray hover:text-pink-hot transition-colors uppercase tracking-[0.1em]">
                          Show All
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructor Filter */}
            <div className="flex sm:justify-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 px-1 scrollbar-hide -mx-1">
              <button
                onClick={() => setActiveInstructor("All")}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 whitespace-nowrap ${
                  activeInstructor === "All" ? "bg-charcoal text-cream" : "bg-white/80 text-warm-gray hover:bg-pink-light/20 card-elevated"
                }`}
              >
                All Instructors
              </button>
              {teachers.map((name) => (
                <button
                  key={name}
                  onClick={() => setActiveInstructor(name)}
                  className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 whitespace-nowrap ${
                    activeInstructor === name ? "bg-charcoal text-cream" : "bg-white/80 text-warm-gray hover:bg-pink-light/20 card-elevated"
                  }`}
                >
                  {name.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Class Cards */}
            {(viewMode === "week" || selectedDate) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {filteredClasses.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="body-text text-warm-gray">No classes for this selection.</p>
                  </div>
                )}
                {filteredClasses.map((cls) => (
                  <ClassCard key={cls.id} session={cls} />
                ))}
              </div>
            ) : (
              // Month "show all" grouped view
              <div className="space-y-6">
                {Object.keys(grouped).length === 0 && (
                  <div className="text-center py-10">
                    <p className="body-text text-warm-gray">No classes this month.</p>
                  </div>
                )}
                {Object.entries(grouped).sort(([a],[b]) => a.localeCompare(b)).map(([, classes]) => (
                  <div key={classes[0].startsAt}>
                    <h3 className="heading-md text-sm text-charcoal mb-3 pb-2 border-b border-pink-light/15">
                      {new Date(classes[0].startsAt).toLocaleDateString("en-US", { timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric" })}
                      <span className="text-warm-gray font-normal ml-2">({classes.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {classes.map((cls) => (
                        <ClassCard key={cls.id} session={cls} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View Full Schedule CTA */}
            <div className="text-center mt-12">
              <Link
                href="/book"
                className="inline-flex items-center gap-3 px-10 py-4 bg-pink-hot text-cream text-[11px] font-medium tracking-[0.2em] uppercase rounded-full hover:bg-pink-deep transition-all duration-500 neon-glow-strong"
              >
                View Full Schedule
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ClassCard({ session }: { session: MomenceSession }) {
  const spotsLeft = session.remainingSpots.remaining;
  const isFull = spotsLeft === 0;

  return (
    <div className="group bg-white rounded-2xl p-5 sm:p-6 card-elevated hover:card-elevated-hover transition-all duration-500 border border-transparent hover:border-pink-light/30">
      <div className="flex items-start gap-3.5 sm:gap-4 mb-5">
        <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-pink-light/40 ring-offset-2 ring-offset-white">
          <img src={session.teacherPicture} alt={session.teacher} className="w-full h-full object-cover object-top" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-0.5">
            <h4 className="heading-md text-base sm:text-lg text-charcoal truncate">{session.sessionName}</h4>
            <span className="heading-md text-base sm:text-lg text-pink-hot shrink-0">${session.fixedTicketPrice}</span>
          </div>
          <p className="text-[13px] text-warm-gray">{session.teacher}</p>
        </div>
      </div>
      <div className="flex items-center gap-5 mb-5 pl-[3.25rem] sm:pl-[3.5rem]">
        <div className="flex items-center gap-1.5 text-charcoal-light">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          <span className="text-[13px]">{formatTime(session.startsAt)} <span className="text-[10px] text-warm-gray/60">ET</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-charcoal-light">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /></svg>
          <span className="text-[13px]">{session.durationMinutes} min</span>
        </div>
      </div>
      <div className="flex items-center justify-between pl-[3.25rem] sm:pl-[3.5rem]">
        {!isFull ? (
          <span className="text-xs text-warm-gray flex items-center gap-1.5">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${spotsLeft <= 2 ? "bg-pink-hot animate-pulse" : "bg-emerald-400"}`} />
            {spotsLeft}/{session.capacity} spots
          </span>
        ) : (
          <span className="text-xs text-pink-hot flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-hot/40" />
            {session.allowWaitlist && !session.waitlistFull ? "Waitlist available" : "Full"}
          </span>
        )}
        <a href={session.link} target="_blank" rel="noopener noreferrer"
          className={`px-5 py-2 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-400 inline-block ${
            !isFull ? "bg-pink-hot text-cream hover:bg-pink-deep neon-glow" : "border border-pink-hot/60 text-pink-hot hover:bg-pink-hot hover:text-cream"
          }`}>
          {!isFull ? "Book" : "Waitlist"}
        </a>
      </div>
    </div>
  );
}
