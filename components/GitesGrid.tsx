"use client";

import { useMemo, useState } from "react";
import GiteCard from "./GiteCard";

export default function GiteGrid({ gites }: { gites: any[] }) {
  const [ville, setVille] = useState<string>("all");
  const [capaciteMin, setCapaciteMin] = useState<number>(0);

  const villes = useMemo(() => {
    const s = new Set<string>();
    (gites || []).forEach((g) => {
      if (g?.ville) s.add(g.ville);
    });
    return Array.from(s).sort((a, b) => a.localeCompare(b, "fr"));
  }, [gites]);

  const capacites = useMemo(() => {
    // on limite à 6 comme demandé
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

  return (
    <main className="min-h-screen">
      {/* Fond (cohérent + non blanc) */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
          <h1 className="text-4xl font-semibold text-white mb-4">
            Nos gîtes en Baie de Somme
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-3xl">
            Découvrez nos hébergements sélectionnés en Baie de Somme. Chaque logement a été
            choisi pour son emplacement et son confort, afin de vous offrir un séjour
            exceptionnel entre nature et littoral.
          </p>

          {/* Filtres */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="w-full md:w-72">
              <label className="block text-sm text-white/70 mb-2">Lieu</label>
              <select
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                className="w-full rounded-xl bg-white/10 text-white border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20"
              >
                <option value="all" className="text-black">Tous les lieux</option>
                {villes.map((v) => (
                  <option key={v} value={v} className="text-black">
                    {v}
                  </option>
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
                {capacites
                  .filter((c) => c <= 6)
                  .map((c) => (
                    <option key={c} value={c} className="text-black">
                      {c} personnes et +
                    </option>
                  ))}
              </select>
            </div>

            <div className="text-white/60 text-sm md:ml-auto">
              {filtered.length} hébergement(s)
            </div>
          </div>
        </div>
      </div>

      {/* Grille */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((g) => (
              <GiteCard key={g.id} gite={g} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}