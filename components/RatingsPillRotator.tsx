"use client";

import { useEffect, useMemo, useState } from "react";

type Ratings = {
  airbnb: { note: number | null; avis: number };
  booking: { note: number | null; avis: number };
};

const fmtAirbnb = (n: number | null) => (n == null ? "—" : n.toFixed(2));
const fmtBooking = (n: number | null) => (n == null ? "—" : n.toFixed(1));
const fmtAvis = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 17.27l-5.18 2.73 0.99-5.79L3.5 9.24l5.82-.85L12 3l2.68 5.39 5.82.85-4.31 4.97.99 5.79L12 17.27z" />
    </svg>
  );
}

export default function RatingsPillRotator({
  ratings,
  intervalMs = 3000,
}: {
  ratings: Ratings;
  intervalMs?: number;
}) {
  const items = useMemo(
    () => [
      {
        key: "airbnb" as const,
        label: "Airbnb",
        note: ratings.airbnb.note,
        avis: ratings.airbnb.avis,
        denom: "/5",
        fmt: fmtAirbnb,
        title: (n: string, a: string) => `Airbnb • ${n}/5 • ${a} avis`,
      },
      {
        key: "booking" as const,
        label: "Booking",
        note: ratings.booking.note,
        avis: ratings.booking.avis,
        denom: "/10",
        fmt: fmtBooking,
        title: (n: string, a: string) => `Booking • ${n}/10 • ${a} avis`,
      },
    ],
    [ratings]
  );

  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => {
      // petite transition “fade” clean
      setFade(true);
      window.setTimeout(() => {
        setIdx((v) => (v + 1) % items.length);
        setFade(false);
      }, 180);
    }, intervalMs);

    return () => window.clearInterval(t);
  }, [intervalMs, items.length]);

  const it = items[idx];
  const noteStr = it.fmt(it.note);
  const avisStr = fmtAvis(it.avis);

  return (
    <div className="mt-5">
      <div
        className={[
          "group inline-flex items-center gap-2 rounded-full",
          "border border-white/15 bg-white/10 px-4 py-2",
          "text-xs text-white/90 backdrop-blur-md",
          "shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition",
          "hover:-translate-y-[1px] hover:bg-white/15 hover:border-white/25",
          fade ? "opacity-50" : "opacity-100",
        ].join(" ")}
        title={it.title(noteStr, avisStr)}
      >
        {/* pastille premium + étoile jaune */}
        <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/10">
          <span className="absolute -inset-1 rounded-full bg-white/10 blur-md opacity-0 transition group-hover:opacity-100" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
          <StarIcon className="relative h-4 w-4 text-yellow-300" />
        </span>

        <span className="font-medium tracking-wide text-white/85">{it.label}</span>
        <span className="text-white/50">•</span>

        <span className="font-semibold text-white">
          {noteStr}
          {it.denom}
        </span>

        <span className="text-white/60">({avisStr} avis)</span>
      </div>
    </div>
  );
}