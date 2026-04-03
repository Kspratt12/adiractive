import { useState, useEffect, useCallback } from "react";

export interface MomenceSession {
  id: number;
  sessionName: string;
  level: string;
  startsAt: string;
  endsAt: string;
  link: string;
  location: string;
  inPerson: boolean;
  fixedTicketPrice: number;
  durationMinutes: number;
  capacity: number;
  remainingSpots: { remaining: number; total: number };
  teacher: string;
  teacherId: number;
  teacherPicture: string;
  isCancelled: boolean;
  allowWaitlist: boolean;
  waitlistFull: boolean;
  currency: string;
}

interface ScheduleResponse {
  payload: MomenceSession[];
  pagination: { page: number; pageSize: number; totalCount: number };
}

export function useSchedule() {
  const [sessions, setSessions] = useState<MomenceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSchedule = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch multiple pages to cover 30+ days
      const allSessions: MomenceSession[] = [];
      for (let page = 1; page <= 4; page++) {
        const res = await fetch(`/api/schedule?pageSize=200&page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data: ScheduleResponse = await res.json();
        const active = data.payload.filter((s) => !s.isCancelled);
        allSessions.push(...active);
        if (allSessions.length >= data.pagination.totalCount) break;
      }
      setSessions(allSessions);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  return { sessions, loading, error, refetch: fetchSchedule };
}

// Convert UTC ISO to YYYY-MM-DD in EST
function toESTDateString(utcString: string): string {
  const d = new Date(utcString);
  // Format as YYYY-MM-DD in EST
  const parts = d.toLocaleDateString("en-CA", { timeZone: "America/New_York" }).split("-");
  return parts.join("-"); // Already YYYY-MM-DD from en-CA locale
}

// Get YYYY-MM-DD for today in EST
function todayEST(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

export function formatTime(utcString: string): string {
  return new Date(utcString).toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateShort(utcString: string): string {
  return new Date(utcString).toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Get the EST date key (YYYY-MM-DD) for a session
export function getESTDate(utcString: string): string {
  return toESTDateString(utcString);
}

// Group sessions by EST YYYY-MM-DD date
export function groupByDate(sessions: MomenceSession[]): Record<string, MomenceSession[]> {
  const groups: Record<string, MomenceSession[]> = {};
  for (const session of sessions) {
    const dateKey = toESTDateString(session.startsAt);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(session);
  }
  // Sort groups by date
  const sorted: Record<string, MomenceSession[]> = {};
  Object.keys(groups)
    .sort()
    .forEach((key) => {
      sorted[key] = groups[key];
    });
  return sorted;
}

// Get unique teachers
export function getUniqueTeachers(sessions: MomenceSession[]): string[] {
  return Array.from(new Set(sessions.map((s) => s.teacher))).sort();
}

// Build week dates starting from today (YYYY-MM-DD keys)
export function getWeekDates(): { label: string; dateKey: string; isToday: boolean }[] {
  const today = todayEST();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    // Build date by parsing today and adding days
    const [y, m, d] = today.split("-").map(Number);
    const date = new Date(y, m - 1, d + i);
    const dateKey = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    const label = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    dates.push({ label, dateKey, isToday: i === 0 });
  }
  return dates;
}

// Build N days from today
export function getNextNDays(n: number): {
  label: string;
  dateKey: string;
  isToday: boolean;
  dayName: string;
  dayNum: string;
}[] {
  const today = todayEST();
  const dates = [];
  for (let i = 0; i < n; i++) {
    const [y, m, d] = today.split("-").map(Number);
    const date = new Date(y, m - 1, d + i);
    const dateKey = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    const label = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = String(date.getDate());
    dates.push({ label, dateKey, isToday: i === 0, dayName, dayNum });
  }
  return dates;
}
