"use client";

import { useMemo, useState } from "react";
import GiteCard from "./GiteCard";

export default function GiteGrid({ gites }: { gites: any[] }) {
  const [ville,       setVille]       = useState<string>("all");
  const [capaciteMin, setCapaciteMin] = useState<number>(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const villes = useMemo(() => {
    const s = new Set<string>();
    (gites || []).forEach((g) => { if (g?.ville) s.add(g.ville); });
    return Array.from(s).sort((a, b) => a.localeCompare(b, "fr"));
  }, [gites]);

  const capacites = useMemo(() => {
    const s = new Set<number>();
    (gites || []).forEach((g) => {
      const c = Number(g?.capacite);
      if (!Number.isNaN(c) && c > 0) s.add(Math.min(6, c));
    });
    return Array.from(s).sort((a, b) => a - b);
  }, [gites]);

  const filtered = useMemo(() => {
    return (gites || []).filter((g) => {
      if (!g) return false;
      if (ville !== "all" && g.ville !== ville) return false;
      if (capaciteMin > 0 && Number(g.capacite || 0) < capaciteMin) return false;
      return true;
    });
  }, [gites, ville, capaciteMin]);

  const hasActiveFilters = ville !== "all" || capaciteMin > 0;

  return (
    <main className="min-h-screen">
      {/* ── Header + filtres ── */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-20 pb-8 sm:pb-10">

          <h1 className="text-2xl sm:text-4xl font-semibold text-white mb-3 sm:mb-4 leading-snug">
            Nos gîtes en Baie de Somme
          </h1>

          <p className="text-sm sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            {/* Version courte mobile */}
            <span className="sm:hidden">
              Hébergements sélectionnés en Baie de Somme — confort, nature et littoral.
            </span>
            {/* Version complète desktop */}
            <span className="hidden sm:inline">
              Découvrez nos hébergements sélectionnés en Baie de Somme. Chaque logement a été
              choisi pour son emplacement et son confort, afin de vous offrir un séjour
              exceptionnel entre nature et littoral.
            </span>
          </p>

          {/* ── Filtres desktop (inchangés) ── */}
          <div className="hidden md:flex mt-8 flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="w-full md:w-72">
              <label className="block text-sm text-white/70 mb-2">Lieu</label>
              <select
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                className="w-full rounded-xl bg-white/10 text-white border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20"
              >
                <option value="all" className="text-black">Tous les lieux</option>
                {villes.map((v) => (
                  <option key={v} value={v} className="text-black">{v}</option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-72">
              <label className="block text-sm text-white/70 mb-2">Capacité minimum</label>
              <select
                value={capaciteMin}
                onChange={(e) => setCapaciteMin(Number(e.target.value))}
                className="w-full rounded-xl bg-white/10 text-white border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20"
              >
                <option value={0} className="text-black">Toutes capacités</option>
                {capacites.filter((c) => c <= 6).map((c) => (
                  <option key={c} value={c} className="text-black">{c} personnes et +</option>
                ))}
              </select>
            </div>

            <div className="text-white/60 text-sm md:ml-auto">
              {filtered.length} hébergement(s)
            </div>
          </div>

          {/* ── Filtres mobile : barre compacte ── */}
          <div className="md:hidden mt-5">
            {/* Ligne : compteur + bouton filtres */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/55 text-xs">
                {filtered.length} hébergement{filtered.length > 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
                className={[
                  "rounded-xl px-4 py-2 text-xs font-600 font-semibold border transition",
                  hasActiveFilters
                    ? "bg-white text-slate-900 border-white"
                    : "bg-white/10 text-white border-white/20",
                ].join(" ")}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 2.5h11M3 6.5h7M5 10.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Filtres
                {hasActiveFilters && (
                  <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-900 text-white text-[10px]">
                    {(ville !== "all" ? 1 : 0) + (capaciteMin > 0 ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Panel filtres déroulant */}
            {filtersOpen && (
              <div className="rounded-2xl bg-white/8 border border-white/12 p-4 flex flex-col gap-4"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}>
                <div>
                  <label className="block text-xs text-white/60 mb-1.5">Lieu</label>
                  <select
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full rounded-xl bg-white/10 text-white border border-white/15 px-4 py-2.5 text-sm outline-none"
                  >
                    <option value="all" className="text-black">Tous les lieux</option>
                    {villes.map((v) => (
                      <option key={v} value={v} className="text-black">{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-1.5">Capacité minimum</label>
                  <select
                    value={capaciteMin}
                    onChange={(e) => setCapaciteMin(Number(e.target.value))}
                    className="w-full rounded-xl bg-white/10 text-white border border-white/15 px-4 py-2.5 text-sm outline-none"
                  >
                    <option value={0} className="text-black">Toutes capacités</option>
                    {capacites.filter((c) => c <= 6).map((c) => (
                      <option key={c} value={c} className="text-black">{c} personnes et +</option>
                    ))}
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={() => { setVille("all"); setCapaciteMin(0); }}
                    className="text-xs text-white/50 underline text-left"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Grille ── */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm">
              Aucun hébergement ne correspond à vos critères.
              <button
                onClick={() => { setVille("all"); setCapaciteMin(0); }}
                className="block mx-auto mt-3 text-slate-700 underline"
              >
                Voir tous les gîtes
              </button>
            </div>
          ) : (
            /* Mobile : 1 colonne / sm : 2 colonnes / lg : 3 colonnes */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
              {filtered.map((g) => (
                <GiteCard key={g.id} gite={g} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}