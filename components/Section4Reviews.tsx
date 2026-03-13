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

  const [page, setPage] = useState(0);
  const PER_PAGE = 3;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Review | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const json = await res.json();
        const recs: any[] = json?.records ?? [];

        const mapped: Review[] = recs.map((r) => ({
          id: r.id,
          ...(r.fields || {}),
        }));

        if (!cancelled) {
          setReviews(mapped);
          setPage(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(reviews.length / PER_PAGE));
  }, [reviews.length]);

  const visible = useMemo(() => {
    const start = page * PER_PAGE;
    return reviews.slice(start, start + PER_PAGE);
  }, [reviews, page]);

  const prev = () => setPage((p) => clamp(p - 1, 0, totalPages - 1));
  const next = () => setPage((p) => clamp(p + 1, 0, totalPages - 1));

  useEffect(() => {
    if (totalPages <= 1) return;
    const t = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, 4500);
    return () => clearInterval(t);
  }, [totalPages]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function openReview(r: Review) {
    setSelected(r);
    setOpen(true);
  }

  function closeReview() {
    setOpen(false);
    setSelected(null);
  }

  return (
    <section className="relative z-0 w-full py-16">
      {/* background image (z-0, PAS négatif) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              // overlay léger directement dans le background
              "linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.30)), url('/images/home/baie-somme-drone-mer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* voile additionnel très léger pour homogénéiser */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* contenu au-dessus */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Des avis authentiques, une confiance construite
            </h2>

            <p className="mt-2 text-sm text-white/75 max-w-xl">
              Une sélection de retours voyageurs (Airbnb & Booking) pour vous aider à choisir en toute sérénité.
            </p>

            {/* stats (tes chiffres) */}
            <div className="mt-4 flex flex-wrap gap-2">
           <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-white text-sm backdrop-blur">
            +900 avis voyageurs
           </div>
          </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-white text-sm backdrop-blur">
              ★ Airbnb 4.9/5 (484+ avis)
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-white text-sm backdrop-blur">
              ★ Booking 9/10 (466+ avis)
            </div>
          </div>
        </div>

        {/* container (moins opaque) */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between text-white/75 text-sm">
            <div>{loading ? "Chargement…" : `${reviews.length} avis disponibles`}</div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-2 hover:bg-white/20"
              >
                ←
              </button>
              <button
                onClick={next}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-2 hover:bg-white/20"
              >
                →
              </button>
            </div>
          </div>

          {/* reviews */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-[280px] rounded-3xl bg-white/10 animate-pulse" />
                ))
              : visible.map((r) => {
                  const giteName = getGiteName(r);
                  const ratingLabel = formatRating(r);
                  const source = r.Source ?? "Avis";

                  return (
                    <article
                      key={r.id}
                      className="group relative rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur
                      transition hover:-translate-y-1 hover:bg-white/15"
                    >
                      <div className="flex h-[280px] flex-col">
                        {/* top */}
                        <div className="flex justify-between items-start gap-3">
                          <div className="min-w-0">
                            <div className="flex gap-2 flex-wrap">
                              <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/90">
                                {source}
                              </span>
                              <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/90">
                                {giteName}
                              </span>
                            </div>

                            {/* texte (UNE seule fois) */}
                            <p className="mt-3 text-sm leading-relaxed text-white/90 line-clamp-7">
                              {r.Text}
                            </p>
                          </div>

                          {ratingLabel && (
                            <div className="shrink-0 text-sm bg-white/10 px-3 py-2 rounded-xl text-white">
                              {ratingLabel}
                            </div>
                          )}
                        </div>

                        {/* bottom */}
                        <div className="mt-auto pt-4">
                          <button
                            onClick={() => openReview(r)}
                            className="text-sm underline text-white/90 hover:text-white"
                          >
                            Lire en entier →
                          </button>

                          <div className="flex justify-between text-xs text-white/60 mt-3">
                            <span className="truncate">{r.Author || "—"}</span>
                            <span className="shrink-0">{formatDate(r.Date)}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 w-2 rounded-full ${i === page ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* modal */}
      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
          onClick={closeReview}
        >
          <div
            className="bg-[#0b1220] rounded-3xl border border-white/10 p-6 max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-semibold text-lg">{shortTitle(selected.Text)}</h3>

            <p className="text-white/70 text-sm mt-2">
              {selected.Author} • {formatDate(selected.Date)}
            </p>

            <p className="mt-5 text-white/85 text-sm whitespace-pre-line">{selected.Text}</p>

            <button
              onClick={closeReview}
              className="mt-6 px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}