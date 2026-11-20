// Time helpers for the "time spent" widget (local-date based, like Instagram's activity view).

export const dayKey = (d: Date = new Date()): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const formatDuration = (seconds: number): string => {
  const s = Math.max(0, Math.round(seconds));
  if (s < 60) return `${s}s`;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

export interface DayUsage { key: string; label: string; short: string; seconds: number; isToday: boolean; }

export const lastNDays = (time: Record<string, number>, n = 7, liveToday = 0): DayUsage[] => {
  const out: DayUsage[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const key = dayKey(d);
    out.push({
      key,
      label: d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      short: d.toLocaleDateString('en-US', { weekday: 'short' }),
      seconds: (time[key] || 0) + (i === 0 ? liveToday : 0),
      isToday: i === 0,
    });
  }
  return out;
};
