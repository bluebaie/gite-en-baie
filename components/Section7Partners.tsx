"use client";

type Partner = {
  name: string;
  logoSrc: string;
  href: string;
  external?: boolean;
  nofollow?: boolean;
};

const PARTNERS: Partner[] = [
  {
    name: "Airbnb",
    logoSrc: "/images/home/partners/logo-Airbnb.jpg",
    href: "https://www.airbnb.fr/users/profile/1467271366112069516?previous_page_name=PdpHomeMarketplace",
    external: true,
    nofollow: true,
  },
  {
    name: "Booking.com",
    logoSrc: "/images/home/partners/logo-Booking.jpg",
    href: "https://www.booking.com/", // TODO: remplace par ta page Booking
    external: true,
    nofollow: true,
  },
  {
    name: "Guest Lucky",
    logoSrc: "/images/home/partners/logo-Guestlucky.png",
    href: "https://guestlucky.com/",
    external: true,
    nofollow: false,
  },
  {
    name: "Blue Baie Conciergerie",
    logoSrc: "/images/home/partners/Blue Baie.png",
    href: "/blue-baie-conciergerie",
    external: false,
    nofollow: false,
  },
];

export default function Section7Partners() {
  return (
    <section
      className="relative w-full overflow-hidden py-12 md:py-14"
      aria-labelledby="partners-title"
    >
      {/* Fond sable/beige : respiration visuelle au-dessus du footer */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f6f0e6] via-[#efe5d6] to-[#e7dccb]" />
      <div className="absolute inset-0 -z-10 opacity-[0.38] [background:radial-gradient(900px_420px_at_20%_20%,rgba(255,255,255,0.78),transparent_62%),radial-gradient(900px_420px_at_80%_60%,rgba(255,255,255,0.58),transparent_62%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.07]" />

      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#1b2a2f]/65">
            NOS SOLUTIONS &amp; PLATEFORMES
          </p>

          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h3
              id="partners-title"
              className="text-2xl md:text-3xl font-light leading-tight text-[#1b2a2f]"
            >
              Nos solutions &amp; plateformes
            </h3>

            <p className="max-w-xl text-sm leading-relaxed text-[#1b2a2f]/70">
              Réservation, accueil et communication : des outils éprouvés pour un
              séjour simple, fiable et sans friction.
            </p>
          </div>

          {/* Bande logos */}
          <div className="mt-6 rounded-3xl border border-black/10 bg-white/60 px-6 py-6 backdrop-blur-md shadow-[0_12px_34px_rgba(0,0,0,0.08)]">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {PARTNERS.map((p) => {
                const rel = [
                  p.external ? "noopener" : null,
                  p.external ? "noreferrer" : null,
                  p.nofollow ? "nofollow" : null,
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <a
                    key={p.name}
                    href={p.href}
                    target={p.external ? "_blank" : undefined}
                    rel={rel || undefined}
                    className="group inline-flex items-center gap-3 rounded-2xl px-3 py-2 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
                    aria-label={p.name}
                    title={p.name}
                  >
                    <img
                      src={p.logoSrc}
                      alt={p.name}
                      className="h-8 md:h-9 w-auto opacity-80 transition duration-200 group-hover:opacity-100 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Texte SEO discret + accessibilité (caché visuellement) */}
                    <span className="sr-only">{p.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Micro-ligne SEO (discrète) */}
            <p className="mt-5 text-center text-[12px] leading-relaxed text-[#1b2a2f]/60">
              Blue Baie Conciergerie coordonne la réservation, l’accueil et
              l’assistance voyageur pour vos séjours en Baie de Somme.
            </p>
          </div>

          <p className="mt-3 text-center text-xs text-[#1b2a2f]/55">
            * Marques citées à titre indicatif. Blue Baie Conciergerie assure la
            gestion et l’assistance voyageur.
          </p>
        </div>
      </div>
    </section>
  );
}