"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type HeroProps = {
  ratings: {
    airbnb: { note: number | null; avis: number };
    booking: { note: number | null; avis: number };
  };
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

export default function Hero({ ratings }: HeroProps) {
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

  // Crossfade state
  const [idx, setIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (items.length < 2) return;

    const interval = window.setInterval(() => {
      const to = (idx + 1) % items.length;
      setNextIdx(to);
      setIsTransitioning(true);

      const t = window.setTimeout(() => {
        setIdx(to);
        setIsTransitioning(false);
      }, 520);

      return () => window.clearTimeout(t);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [idx, items.length]);

  const renderPill = (it: (typeof items)[number]) => {
    const noteStr = it.fmt(it.note);
    const avisStr = fmtAvis(it.avis);

    return (
      <div
        className={[
          "group inline-flex items-center gap-3 rounded-full whitespace-nowrap leading-none",
          "border border-white/15 bg-white/10 px-4 py-2",
          "text-xs text-white/90 backdrop-blur-md",
          "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
          "transition hover:-translate-y-[1px] hover:bg-white/15 hover:border-white/25",
        ].join(" ")}
        title={it.title(noteStr, avisStr)}
      >
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
    );
  };

  const current = items[idx];
  const upcoming = items[nextIdx];

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      <Image
        src="/images/home/baie-saint-valery-hero.jpg"
        alt="Baie de Somme - vue aérienne sur Saint-Valery-sur-Somme"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay premium */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      {/* Contenu */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
          <div className="max-w-3xl text-white">
            <p className="mb-5 text-[11px] md:text-xs uppercase tracking-[0.42em] text-white/80">
              Saint-Valery-sur-Somme • Marquenterre
            </p>

            <h1 className="mb-6 text-4xl md:text-6xl font-light leading-[1.05] drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
              Séjours d’exception
              <br />
              en Baie de Somme
            </h1>

            <p className="mb-9 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
              Gîtes au cœur de la Baie de Somme. Face au port de Saint-Valery, dans le quartier des
              pêcheurs ou au cœur du Marquenterre — des emplacements choisis pour votre séjour.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/gites"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-xs uppercase tracking-widest text-black transition hover:bg-white/90"
              >
                Découvrir les gîtes
              </a>

              <a
                href="/reservation"
                className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/0 px-7 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
              >
                Vérifier les disponibilités
              </a>
            </div>

            {/* Badge notes globales (cross-fade + blur + micro-slide) */}
            <div className="mt-5 flex flex-wrap gap-3">
              {/* ✅ inline-block => largeur = contenu */}
              <div className="relative h-[36px] inline-block">
                {/* couche “courante” */}
                <div
                  className={[
                    "absolute inset-0 will-change-transform will-change-opacity",
                    "transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isTransitioning ? "opacity-0 blur-[2px] translate-y-[2px]" : "opacity-100 blur-0 translate-y-0",
                  ].join(" ")}
                >
                  {renderPill(current)}
                </div>

                {/* couche “suivante” */}
                <div
                  className={[
                    "absolute inset-0 will-change-transform will-change-opacity",
                    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isTransitioning ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-[2px] -translate-y-[2px]",
                  ].join(" ")}
                >
                  {renderPill(upcoming)}
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-white/70">
              Linge & draps inclus • Arrivée simple • Assistance réactive
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}