"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useSchedule,
  formatTime,
  getESTDate,
  getWeekDates,
  getUniqueTeachers,
  type MomenceSession,
} from "@/lib/useSchedule";

export default function SchedulePreview() {
  const { sessions, loading, error } = useSchedule();
  const weekDates = useMemo(() => getWeekDates(), []);
  const [activeDate, setActiveDate] = useState(weekDates[0]?.dateKey || "");
  const [activeInstructor, setActiveInstructor] = useState("All");

  const teachers = useMemo(() => getUniqueTeachers(sessions), [sessions]);

  const filteredClasses = useMemo(() => {
    return sessions.filter((s) => {
      const sessionDate = getESTDate(s.startsAt);
      if (sessionDate !== activeDate) return false;
      if (activeInstructor !== "All" && s.teacher !== activeInstructor) return false;
      return true;
    });
  }, [sessions, activeDate, activeInstructor]);

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-16 bg-warm-white" id="schedule">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0.4, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="label-text text-pink-hot mb-5 block tracking-[0.25em] text-[10px]">
            Live Schedule
          </span>
          <h2 className="heading-xl text-[clamp(2rem,5vw,4.5rem)] text-charcoal mb-4">
            Find Your <span className="italic text-pink-deep">Class</span>
          </h2>
          <p className="body-text text-warm-gray text-base sm:text-lg max-w-lg mx-auto">
            Real-time availability from our booking system. The waitlists do move!
          </p>
        </motion.div>

        {/* Week Date Tabs */}
        <div className="flex sm:justify-center gap-1.5 sm:gap-2 mb-4 overflow-x-auto pb-2 px-1 scrollbar-hide -mx-1">
          {weekDates.map((d) => (
            <button
              key={d.dateKey}
              onClick={() => setActiveDate(d.dateKey)}
              className={`shrink-0 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.12em] uppercase transition-all duration-300 whitespace-nowrap ${
                activeDate === d.dateKey
                  ? "bg-pink-hot text-cream neon-glow-strong"
                  : "bg-white text-charcoal-light hover:bg-pink-light/20 card-elevated"
              }`}
            >
              {d.isToday ? `Today` : d.label}
            </button>
          ))}
        </div>

        {/* Instructor Filter */}
        <div className="flex sm:justify-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 px-1 scrollbar-hide -mx-1">
          <button
            onClick={() => setActiveInstructor("All")}
            className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 whitespace-nowrap ${
              activeInstructor === "All"
                ? "bg-charcoal text-cream"
                : "bg-white/80 text-warm-gray hover:bg-pink-light/20 card-elevated"
            }`}
          >
            All Instructors
          </button>
          {teachers.map((name) => (
            <button
              key={name}
              onClick={() => setActiveInstructor(name)}
              className={`flex items-center gap-1.5 shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 whitespace-nowrap ${
                activeInstructor === name
                  ? "bg-charcoal text-cream"
                  : "bg-white/80 text-warm-gray hover:bg-pink-light/20 card-elevated"
              }`}
            >
              {name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-pink-hot/30 border-t-pink-hot rounded-full animate-spin mx-auto mb-4" />
            <p className="body-text text-warm-gray text-sm">Loading live schedule...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="body-text text-warm-gray mb-4">Unable to load live schedule.</p>
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

        {/* Class Cards */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              {filteredClasses.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="body-text text-warm-gray">
                    No classes scheduled for this day.
                  </p>
                </div>
              )}
              {filteredClasses.map((cls) => (
                <ClassCard key={cls.id} session={cls} />
              ))}
            </div>

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
        {/* Coach Avatar */}
        <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-pink-light/40 ring-offset-2 ring-offset-white">
          <img
            src={session.teacherPicture}
            alt={session.teacher}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-0.5">
            <h4 className="heading-md text-base sm:text-lg text-charcoal truncate">
              {session.sessionName}
            </h4>
            <span className="heading-md text-base sm:text-lg text-pink-hot shrink-0">
              ${session.fixedTicketPrice}
            </span>
          </div>
          <p className="text-[13px] text-warm-gray">
            {session.teacher}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 mb-5 pl-[3.25rem] sm:pl-[3.5rem]">
        <div className="flex items-center gap-1.5 text-charcoal-light">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-[13px]">{formatTime(session.startsAt)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-charcoal-light">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
          </svg>
          <span className="text-[13px]">{session.durationMinutes} min</span>
        </div>
      </div>

      <div className="flex items-center justify-between pl-[3.25rem] sm:pl-[3.5rem]">
        {!isFull ? (
          <span className="text-xs text-warm-gray flex items-center gap-1.5">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${spotsLeft <= 2 ? "bg-pink-hot animate-pulse" : "bg-emerald-400"}`} />
            {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
          </span>
        ) : (
          <span className="text-xs text-pink-hot flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-hot/40" />
            {session.allowWaitlist && !session.waitlistFull ? "Waitlist available" : "Full"}
          </span>
        )}
        <a
          href={session.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-5 py-2 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-400 inline-block ${
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
