"use client";

import Image from "next/image";

function IconCircle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full",
        "border border-white/12 bg-white/8 backdrop-blur-md",
        "shadow-[0_12px_30px_rgba(0,0,0,0.20)]",
        // micro interaction premium
        "transition-transform duration-300 group-hover:scale-[1.03]",
        className,
      ].join(" ")}
    >
      {/* halo discret */}
      <span className="pointer-events-none absolute -inset-2 rounded-full bg-white/5 blur-xl opacity-70" />
      <span className="relative">{children}</span>
    </span>
  );
}

function CheckSpark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M9.2 12.8l1.9 1.9 3.9-4.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2.8l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z"
        fill="currentColor"
        opacity=".55"
      />
    </svg>
  );
}

function Feather({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 12c-4.5 0-8.5 1.5-12 6-1.5-5 3-11 9-11 1.7 0 3 1.3 3 3 0 1.2-.4 2.2-1 3.2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 18c2.2-1.5 5.1-2.4 8-2.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Key({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M7.5 14.5a4.5 4.5 0 1 1 3.9-6.8L22 7v4l-2 2v2h-2v2h-3l-1.1 1.1a4.5 4.5 0 0 1-6.4-3.6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="14.5" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Section3Experience() {
  return (
    <section className="relative overflow-hidden">
      {/* fond : transition douce (vert -> bleu) + texture + reflets */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1f3f3a] via-[#0e2f3a] to-[#072534]" />

      {/* liant premium avec la section précédente */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/6 to-transparent opacity-40" />

      <div className="absolute inset-0 opacity-[0.28] [background:radial-gradient(1200px_600px_at_15%_30%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(900px_500px_at_70%_60%,rgba(255,255,255,0.07),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.05]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12 pt-8 pb-12 md:pt-10 md:pb-16">
        <div className="grid items-center gap-10 md:grid-cols-12">
          {/* TEXTE */}
          <div className="md:col-span-6">
            <p className="mb-3 text-[11px] md:text-xs uppercase tracking-[0.42em] text-white/70">
              UNE EXPÉRIENCE PENSÉE POUR VOUS
            </p>

            <h2 className="text-3xl md:text-5xl font-light leading-[1.08] text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
              Des lieux choisis avec attention, pour des séjours réussis
            </h2>

            <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-white/75">
              Des adresses sélectionnées avec soin, une arrivée autonome, et une assistance disponible quand vous en avez
              besoin.
            </p>

            {/* LISTE PREMIUM */}
            <div className="mt-8 space-y-4">
              {/* item 1 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:border-white/16 hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
                <div className="flex gap-4">
                  <IconCircle>
                    <CheckSpark className="h-5 w-5 text-white/85" />
                  </IconCircle>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="text-sm md:text-base font-semibold text-white md:whitespace-nowrap">
                        Sélection exigeante
                      </h3>
                      <span className="hidden md:inline h-1.5 w-1.5 rounded-full bg-white/35" />
                      <span className="text-[11px] md:text-xs text-white/60">
                        emplacement • caractère • authenticité
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-relaxed text-white/70">
                      Chaque adresse est choisie pour son emplacement, son caractère et son authenticité.
                    </p>
                  </div>
                </div>

                <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
              </div>

              {/* item 2 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:border-white/16 hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
                <div className="flex gap-4">
                  <IconCircle>
                    <Feather className="h-5 w-5 text-white/85" />
                  </IconCircle>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="text-sm md:text-base font-semibold text-white md:whitespace-nowrap">
                        Confort maîtrisé
                      </h3>
                      <span className="hidden md:inline h-1.5 w-1.5 rounded-full bg-white/35" />
                      <span className="text-[11px] md:text-xs text-white/60">
                        linge inclus • équipements complets
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-relaxed text-white/70">
                      Linge inclus, équipements complets, attention portée aux détails.
                    </p>
                  </div>
                </div>

                <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
              </div>

              {/* item 3 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:border-white/16 hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
                <div className="flex items-start gap-4">
                  <IconCircle>
                    <Key className="h-5 w-5 text-white/85" />
                  </IconCircle>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="min-w-0 text-sm md:text-base font-semibold text-white md:whitespace-nowrap">
                        Séjour fluide & personnalisé
                      </h3>
                      <span className="hidden md:inline h-1.5 w-1.5 rounded-full bg-white/35" />
                      <span className="text-[11px] md:text-xs text-white/60">
                        arrivée autonome • livret digital • accompagnement
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-relaxed text-white/70">
                      Arrivée autonome, livret d’accueil digital personnalisé, et accompagnement tout au long du séjour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="md:col-span-6">
            <div className="relative md:ml-auto md:mr-0 w-full md:w-[520px] lg:w-[560px] md:-mt-6">
              <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 shadow-[0_40px_90px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/home/vue-matin.jpg"
                    alt="Vue du port au lever du soleil en Baie de Somme"
                    fill
                    className="object-cover object-[50%_35%] transition-transform duration-700 will-change-transform hover:scale-[1.02]"
                    priority={false}
                  />

                  {/* overlay subtil premium */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_30%_20%,rgba(255,255,255,0.14),transparent_60%)]" />
                </div>

                {/* reflet bas */}
                <div className="pointer-events-none absolute -bottom-16 left-1/2 h-28 w-[85%] -translate-x-1/2 rounded-full bg-white/10 blur-2xl opacity-40" />
              </div>

              {/* micro label optionnel (discret) */}
              <div className="mt-4 text-xs text-white/55 md:text-right">
                Baie de Somme • lever du soleil
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}