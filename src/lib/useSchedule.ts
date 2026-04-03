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
      // Fetch enough to cover ~2 weeks
      const res = await fetch("/api/schedule?pageSize=100&page=1");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ScheduleResponse = await res.json();
      // Filter out cancelled sessions
      const active = data.payload.filter((s) => !s.isCancelled);
      setSessions(active);
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

// Helper: convert UTC ISO string to EST date/time
export function toEST(utcString: string) {
  const date = new Date(utcString);
  return new Date(date.toLocaleString("en-US", { timeZone: "America/New_York" }));
}

export function formatTime(utcString: string): string {
  const date = new Date(utcString);
  return date.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateShort(utcString: string): string {
  const date = new Date(utcString);
  return date.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateFull(utcString: string): string {
  const date = new Date(utcString);
  return date.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getESTDate(utcString: string): string {
  const date = new Date(utcString);
  return date.toLocaleDateString("en-US", { timeZone: "America/New_York" });
}

export function getESTDayName(utcString: string): string {
  const date = new Date(utcString);
  return date.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
  });
}

export function isToday(utcString: string): boolean {
  const sessionDate = getESTDate(utcString);
  const now = new Date();
  const todayEST = now.toLocaleDateString("en-US", { timeZone: "America/New_York" });
  return sessionDate === todayEST;
}

// Group sessions by EST date
export function groupByDate(sessions: MomenceSession[]): Record<string, MomenceSession[]> {
  const groups: Record<string, MomenceSession[]> = {};
  for (const session of sessions) {
    const dateKey = getESTDate(session.startsAt);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(session);
  }
  return groups;
}

// Get unique teachers from sessions
export function getUniqueTeachers(sessions: MomenceSession[]): string[] {
  const teachers = new Set(sessions.map((s) => s.teacher));
  return Array.from(teachers).sort();
}

// Get week dates starting from today
export function getWeekDates(): { label: string; dateKey: string; isToday: boolean }[] {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateKey = d.toLocaleDateString("en-US", { timeZone: "America/New_York" });
    const label = d.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    dates.push({ label, dateKey, isToday: i === 0 });
  }
  return dates;
}
