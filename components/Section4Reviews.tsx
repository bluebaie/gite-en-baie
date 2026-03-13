"use client";

import { useEffect, useMemo, useState } from "react";

type Review = {
  id: string;
  Text?: string;
  Rating?: number;
  Scale?: number;
  Source?: string;
  Date?: string;
  Author?: string;
  Property?: any;
  "Nom (from Property)"?: any;
  GiteName?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function first(v: any) {
  if (Array.isArray(v)) return v[0];
  return v;
}

function getGiteName(r: Review) {
  if (r.GiteName) return r.GiteName;
  const fromLookup = first((r as any)["Nom (from Property)"]);
  if (fromLookup) return fromLookup;
  const maybe = first(r.Property);
  if (typeof maybe === "string" && maybe.startsWith("rec")) return "Gîte";
  if (maybe) return String(maybe);
  return "Gîte";
}

function formatRating(r: Review) {
  const rating = r.Rating;
  if (typeof rating !== "number") return "";
  const src = (r.Source || "").toLowerCase();
  const nice = Number.isInteger(rating) ? String(rating) : rating.toFixed(1);
  if (src.includes("air")) return `${nice}/5`;
  if (src.includes("book")) return `${nice}/10`;
  if (typeof r.Scale === "number") return `${nice}/${r.Scale}`;
  return nice;
}

function formatDate(d?: string) {
  if (!d) return "";
  const iso = new Date(d);
  if (isNaN(iso.getTime())) return d;
  const dd = String(iso.getDate()).padStart(2, "0");
  const mm = String(iso.getMonth() + 1).padStart(2, "0");
  const yyyy = iso.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function shortTitle(text?: string) {
  if (!text) return "Avis voyageur";
  const t = text.trim();
  if (t.length <= 60) return t;
  return t.slice(0, 60) + "…";
}

export default function Section4Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page,    setPage]    = useState(0);

  // Mobile : 1 avis / page — Desktop : 3 avis / page
  const [isMobile, setIsMobile] = useState(false);
  const PER_PAGE = isMobile ? 1 : 3;

  const [open,     setOpen]     = useState(false);
  const [selected, setSelected] = useState<Review | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        const res  = await fetch("/api/reviews", { cache: "no-store" });
        const json = await res.json();
        const recs: any[] = json?.records ?? [];
        const mapped: Review[] = recs.map((r) => ({ id: r.id, ...(r.fields || {}) }));
        if (!cancelled) { setReviews(mapped); setPage(0); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(reviews.length / PER_PAGE)),
    [reviews.length, PER_PAGE]
  );

  const visible = useMemo(() => {
    const start = page * PER_PAGE;
    return reviews.slice(start, start + PER_PAGE);
  }, [reviews, page, PER_PAGE]);

  const prev = () => setPage((p) => clamp(p - 1, 0, totalPages - 1));
  const next = () => setPage((p) => clamp(p + 1, 0, totalPages - 1));

  useEffect(() => {
    if (totalPages <= 1) return;
    const t = setInterval(() => setPage((p) => (p + 1) % totalPages), 4500);
    return () => clearInterval(t);
  }, [totalPages]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Swipe sur mobile
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  };

  function openReview(r: Review)  { setSelected(r); setOpen(true); }
  function closeReview()           { setOpen(false); setSelected(null); }

  return (
    <section className="relative z-0 w-full py-12 sm:py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.30)), url('/images/home/baie-somme-drone-mer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl sm:text-3xl font-semibold text-white leading-snug">
              Des avis authentiques, une confiance construite
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/75 max-w-xl">
              Une sélection de retours voyageurs (Airbnb & Booking) pour vous aider à choisir en toute sérénité.
            </p>
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              <div className="rounded-full border border-white/10 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-white text-xs sm:text-sm backdrop-blur">
                +900 avis voyageurs
              </div>
            </div>
          </div>

          {/* Badges notes — masqués sur mobile pour ne pas surcharger */}
          <div className="hidden sm:flex gap-2 flex-wrap">
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-white text-sm backdrop-blur">
              ★ Airbnb 4.9/5 (484+ avis)
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-white text-sm backdrop-blur">
              ★ Booking 9/10 (466+ avis)
            </div>
          </div>
          {/* Mobile : badges compacts sur une ligne */}
          <div className="flex sm:hidden gap-2">
            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-white text-xs backdrop-blur">
              ★ 4.9 Airbnb
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-white text-xs backdrop-blur">
              ★ 9.0 Booking
            </div>
          </div>
        </div>

        {/* Container avis */}
        <div className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 backdrop-blur-sm">

          {/* Barre nav */}
          <div className="flex items-center justify-between text-white/75 text-xs sm:text-sm">
            <div>{loading ? "Chargement…" : `${reviews.length} avis`}</div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 sm:py-2 hover:bg-white/20 text-sm"
              >
                ←
              </button>
              <button
                onClick={next}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 sm:py-2 hover:bg-white/20 text-sm"
              >
                →
              </button>
            </div>
          </div>

          {/* Grille avis — 1 col mobile, 3 col desktop */}
          <div
            className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {loading
              ? Array.from({ length: isMobile ? 1 : 3 }).map((_, i) => (
                  <div key={i} className="h-[220px] sm:h-[280px] rounded-2xl sm:rounded-3xl bg-white/10 animate-pulse" />
                ))
              : visible.map((r) => {
                  const giteName   = getGiteName(r);
                  const ratingLabel = formatRating(r);
                  const source     = r.Source ?? "Avis";

                  return (
                    <article
                      key={r.id}
                      className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                    >
                      <div className="flex flex-col" style={{ minHeight: isMobile ? 180 : 280 }}>
                        {/* top */}
                        <div className="flex justify-between items-start gap-3">
                          <div className="min-w-0">
                            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                              <span className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full text-white/90">
                                {source}
                              </span>
                              <span className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full text-white/90">
                                {giteName}
                              </span>
                            </div>
                            {/* Moins de lignes sur mobile */}
                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-white/90 line-clamp-5 sm:line-clamp-7">
                              {r.Text}
                            </p>
                          </div>

                          {ratingLabel && (
                            <div className="shrink-0 text-xs sm:text-sm bg-white/10 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-white">
                              {ratingLabel}
                            </div>
                          )}
                        </div>

                        {/* bottom */}
                        <div className="mt-auto pt-3 sm:pt-4">
                          <button
                            onClick={() => openReview(r)}
                            className="text-xs sm:text-sm underline text-white/90 hover:text-white"
                          >
                            Lire en entier →
                          </button>
                          <div className="flex justify-between text-[11px] sm:text-xs text-white/60 mt-2 sm:mt-3">
                            <span className="truncate">{r.Author || "—"}</span>
                            <span className="shrink-0">{formatDate(r.Date)}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  i === page
                    ? "w-4 bg-white"
                    : "w-1.5 sm:w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur px-4 pb-0 sm:pb-0"
          onClick={closeReview}
        >
          <div
            className="bg-[#0b1220] rounded-t-3xl sm:rounded-3xl border border-white/10 p-5 sm:p-6 w-full sm:max-w-xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Poignée mobile */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20 sm:hidden" />

            <h3 className="text-white font-semibold text-base sm:text-lg leading-snug">
              {shortTitle(selected.Text)}
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-1.5 sm:mt-2">
              {selected.Author} • {formatDate(selected.Date)}
            </p>
            <p className="mt-4 sm:mt-5 text-white/85 text-sm leading-relaxed whitespace-pre-line">
              {selected.Text}
            </p>
            <button
              onClick={closeReview}
              className="mt-5 sm:mt-6 px-4 py-2 bg-white/10 rounded-full text-white text-sm hover:bg-white/20 w-full sm:w-auto"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}