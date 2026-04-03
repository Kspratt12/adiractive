import { useState, useEffect, useCallback } from "react";

const MOMENCE_API = "https://api.momence.com/host-plugins/host/62133/host-schedule/sessions";

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
      // Fetch directly from Momence public API (CORS enabled)
      const allSessions: MomenceSession[] = [];
      let page = 1;
      const maxPages = 5;

      while (page <= maxPages) {
        const res = await fetch(`${MOMENCE_API}?pageSize=200&page=${page}`);
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const data: ScheduleResponse = await res.json();
        const active = data.payload.filter((s) => !s.isCancelled);
        allSessions.push(...active);
        // Stop if we got everything or this page had fewer than requested
        if (allSessions.length >= data.pagination.totalCount || data.payload.length < 200) break;
        page++;
      }

      setSessions(allSessions);
      setError(false);
    } catch (err) {
      console.error("Schedule fetch error:", err);
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
  return new Date(utcString).toLocaleDateString("en-CA", { timeZone: "America/New_York" });
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

export function getESTDate(utcString: string): string {
  return toESTDateString(utcString);
}

export function groupByDate(sessions: MomenceSession[]): Record<string, MomenceSession[]> {
  const groups: Record<string, MomenceSession[]> = {};
  for (const session of sessions) {
    const dateKey = toESTDateString(session.startsAt);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(session);
  }
  const sorted: Record<string, MomenceSession[]> = {};
  Object.keys(groups).sort().forEach((key) => { sorted[key] = groups[key]; });
  return sorted;
}

export function getUniqueTeachers(sessions: MomenceSession[]): string[] {
  return Array.from(new Set(sessions.map((s) => s.teacher))).sort();
}

function buildDateKey(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function getWeekDates(): { label: string; dateKey: string; isToday: boolean }[] {
  const [y, m, d] = todayEST().split("-").map(Number);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(y, m - 1, d + i);
    const dateKey = buildDateKey(date.getFullYear(), date.getMonth(), date.getDate());
    const label = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    dates.push({ label, dateKey, isToday: i === 0 });
  }
  return dates;
}

export function getNextNDays(n: number): {
  label: string; dateKey: string; isToday: boolean; dayName: string; dayNum: string;
}[] {
  const [y, m, d] = todayEST().split("-").map(Number);
  const dates = [];
  for (let i = 0; i < n; i++) {
    const date = new Date(y, m - 1, d + i);
    const dateKey = buildDateKey(date.getFullYear(), date.getMonth(), date.getDate());
    const label = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = String(date.getDate());
    dates.push({ label, dateKey, isToday: i === 0, dayName, dayNum });
  }
  return dates;
}
