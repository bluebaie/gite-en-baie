"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const fmtAirbnb  = (n?: number) => (typeof n === "number" ? n.toFixed(2) : "—");
const fmtBooking = (n?: number) => (typeof n === "number" ? n.toFixed(1) : "—");
const fmtAvis    = (n?: number) =>
  new Intl.NumberFormat("fr-FR").format(typeof n === "number" ? n : 0);

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 17.27l-5.18 2.73 0.99-5.79L3.5 9.24l5.82-.85L12 3l2.68 5.39 5.82.85-4.31 4.97.99 5.79L12 17.27z" />
    </svg>
  );
}

type Gite = {
  id: string;
  nom: string;
  slug: string;
  ville: string;
  secteur?: string;
  capacite?: number;
  surface?: number;
  etoiles?: number;
  imageUrl?: string;
  bookingUrl?: string;
  airbnbNote?: number;
  airbnbAvis?: number;
  bookingNote?: number;
  bookingAvis?: number;
};

export default function Section2Featured({ highlights }: { highlights: Gite[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (media?.matches) return;

    const intervalMs = 3000;

    const tick = () => {
      if (!el || paused) return;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const step = el.clientWidth;
      const next = Math.min(el.scrollLeft + step, maxScrollLeft);
      if (el.scrollLeft >= maxScrollLeft - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: next, behavior: "smooth" });
      }
    };

    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="relative overflow-hidden">
      {/* Background premium bleu mer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#061a22] via-[#062a33] to-[#041319]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#0ea5a6]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.55))]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">

        {/* Titre + texte */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight text-white leading-snug">
            Nos gîtes en Baie de Somme
          </h2>

          {/* Description complète desktop, raccourcie mobile */}
          <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed max-w-5xl">
            <span className="sm:hidden">
              Vue sur la baie, maison de pêcheur ou cocon intimiste au cœur du Marquenterre —
              chaque adresse a son caractère, avec le même souci du confort.
            </span>
            <span className="hidden sm:inline">
              Face au port de Saint-Valery-sur-Somme, dans le quartier authentique
              du Courtgain ou au cœur du Marquenterre, nos gîtes offrent des
              expériences différentes : vue panoramique sur la baie, maison de
              pêcheur typique, cocon intimiste ou grande maison familiale. Chaque
              adresse a son caractère, toujours avec le même souci du confort, de
              l'emplacement et du plaisir de séjourner en Baie de Somme.
            </span>
          </p>
        </div>

        {/* À la une */}
        {highlights?.length ? (
          <div className="mt-8 sm:mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-xl font-medium text-white">À la une</h3>
              {/* Indicateur défilement — masqué sur mobile (trop verbeux) */}
              <p className="hidden sm:block text-xs text-white/60">
                {paused ? "Pause" : "Défilement auto"} · Survole pour arrêter
              </p>
              {/* Mobile : petits dots indicateurs */}
              <p className="sm:hidden text-xs text-white/45">
                Glisse pour voir plus →
              </p>
            </div>

            {/* SCROLLER */}
            <div
              ref={scrollerRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
              className="mt-4 overflow-x-auto pb-3 scroll-smooth"
              // Cache la scrollbar sur mobile
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex gap-3 sm:gap-4 snap-x snap-mandatory">
                {highlights.map((g) => (
                  <div
                    key={g.id}
                    className={[
                      "snap-start",
                      // Mobile : presque plein écran pour qu'on voie clairement qu'il y en a d'autres
                      "min-w-[82vw] sm:min-w-[360px] lg:min-w-[420px]",
                      "rounded-2xl p-[1px]",
                      "bg-gradient-to-br",
                      "from-white/18 via-white/6 to-[#0ea5a6]/18",
                      "transition",
                      "hover:from-white/28 hover:via-white/10 hover:to-[#0ea5a6]/24",
                    ].join(" ")}
                  >
                    <article
                      className="
                        group relative overflow-hidden rounded-2xl
                        bg-white/[0.06] backdrop-blur-xl
                        border border-white/10
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:bg-white/[0.08]
                        hover:shadow-[0_18px_55px_rgba(0,0,0,0.55)]
                      "
                    >
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />
                        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/8 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#0ea5a6]/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      {/* Image — ratio légèrement plus haut sur mobile */}
                      <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full bg-white/5 overflow-hidden">
                        {g.imageUrl ? (
                          <img
                            src={g.imageUrl}
                            alt={g.nom}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : null}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                      </div>

                      <div className="relative p-4 sm:p-5">
                        <h4 className="text-base sm:text-lg font-semibold text-white leading-snug">
                          {g.nom}
                        </h4>

                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-white/70">
                          {g.ville}
                          {g.secteur ? ` — ${g.secteur}` : ""}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                          {typeof g.capacite === "number" && (
                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs text-white/80 backdrop-blur-sm">
                              {g.capacite} pers.
                            </span>
                          )}

                          {typeof g.airbnbNote === "number" || typeof g.bookingNote === "number" ? (
                            <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs text-white/85 backdrop-blur-sm">
                              <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-300" />
                              <span className="font-semibold">
                                {typeof g.airbnbNote === "number" ? fmtAirbnb(g.airbnbNote) : fmtBooking(g.bookingNote)}
                              </span>
                              {/* Nombre d'avis masqué sur mobile pour compacité */}
                              <span className="text-white/60 hidden sm:inline">
                                ({fmtAvis(typeof g.airbnbNote === "number" ? g.airbnbAvis : g.bookingAvis)} avis)
                              </span>
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3">
                          <Link
                            href={`/gites/${g.slug}`}
                            className="flex-1 rounded-lg bg-white/10 px-3 sm:px-4 py-2 text-center text-xs sm:text-sm text-white transition hover:bg-white/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                          >
                            Voir
                          </Link>

                          {g.bookingUrl ? (
                            <a
                              href={g.bookingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 rounded-lg bg-white px-3 sm:px-4 py-2 text-center text-xs sm:text-sm text-black transition hover:opacity-95 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                            >
                              Réserver
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}