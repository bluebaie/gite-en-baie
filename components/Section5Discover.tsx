"use client";

type Spot = {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  badge?: string;
};

const SPOTS: Spot[] = [
  { title: "Le Crotoy", subtitle: "port • plage • Baie de Somme", text: "Charmant port de pêche et station balnéaire, Le Crotoy offre une vue exceptionnelle sur la baie. Idéal pour une promenade sur le port, une sortie en mer ou un coucher de soleil.", image: "/images/home/region/le-crotoy.jpg", badge: "Baie de Somme" },
  { title: "Saint-Valery-sur-Somme", subtitle: "cité médiévale • quais • train de la baie", text: "Village emblématique de la Baie de Somme, Saint-Valery séduit par ses ruelles historiques, son port animé et ses panoramas sur la baie.", image: "/images/home/region/saint-valery.jpg", badge: "Village" },
  { title: "Cayeux-sur-Mer & Le Hourdel", subtitle: "plage de galets • cabines • phoques", text: "Connue pour sa longue digue bordée de cabines, Cayeux est idéale pour profiter de la mer et observer les phoques près du Hourdel, selon les marées.", image: "/images/home/region/hourdel.jpg", badge: "Nature" },
  { title: "Fort-Mahon-Plage & Quend-Plage", subtitle: "dunes • plage • activités", text: "Deux stations balnéaires entourées de dunes et de nature, parfaites pour les balades à vélo, les sports nautiques et les longues promenades sur la plage.", image: "/images/home/region/quend.jpg", badge: "Plage" },
  { title: "Parc du Marquenterre", subtitle: "réserve naturelle • oiseaux", text: "Lieu incontournable pour observer les oiseaux et découvrir un environnement préservé au cœur de la réserve naturelle de la Baie de Somme.", image: "/images/home/region/marquenterre.jpg", badge: "Réserve" },
  { title: "Ault & Mers-les-Bains", subtitle: "falaises • villas • panoramas", text: "Ault et Mers-les-Bains offrent de superbes falaises et une architecture Belle Époque remarquable le long du front de mer.", image: "/images/home/region/ault.jpg", badge: "Falaises" },
  { title: "Baie d'Authie & Berck", subtitle: "dunes • plage • phoques", text: "De grands espaces entre dunes et mer. Berck est réputée pour sa plage immense, ses panoramas et l'observation des phoques selon les périodes.", image: "/images/home/region/berck.jpg", badge: "Grand air" },
  { title: "Le Touquet & Baie de Canche", subtitle: "pinède • estuaire • balades", text: "Entre dunes, pinèdes et estuaire, la Baie de Canche est parfaite pour marcher, pédaler et admirer les lumières du littoral.", image: "/images/home/region/le-touquet.jpg", badge: "Évasion" },
  { title: "Forêt de Crécy & Abbaye de Valloires", subtitle: "forêt • patrimoine • jardins", text: "Un bol d'air en forêt, puis une pause patrimoine à l'Abbaye de Valloires et ses jardins : idéal pour une sortie nature + culture.", image: "/images/home/region/foret.jpg", badge: "Patrimoine" },
];

export default function Section5Discover() {
  return (
    <section id="decouvrir" className="relative w-full py-12 sm:py-16">

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(6,25,30,0.55), rgba(6,25,30,0.75)), url('/images/home/baie-somme-drone.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#081c24]/60 via-[#0c2e3a]/50 to-[#0a2228]/80" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl sm:text-3xl font-semibold text-white leading-snug">
              Découvrir la Baie de Somme et ses environs
            </h2>
            <p className="mt-1.5 sm:mt-2 max-w-2xl text-xs sm:text-sm text-white/75">
              Nature, lumières incroyables et villages de charme : tout est réuni pour un séjour ressourçant.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <div className="rounded-full border border-white/10 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-white text-xs sm:text-sm backdrop-blur">🌿 Nature & grands espaces</div>
            <div className="rounded-full border border-white/10 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-white text-xs sm:text-sm backdrop-blur">🚴 Activités toute l'année</div>
          </div>
        </div>

        {/* Spots grid — 1 col mobile, 2 sm, 3 lg */}
        <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SPOTS.map((s) => <SpotCard key={s.title} spot={s} />)}
        </div>

        {/* Accès & distances */}
        <div className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">Accès & distances</h3>
              <p className="mt-1 text-xs sm:text-sm text-white/70">La Baie de Somme est facilement accessible pour un week-end ou quelques jours.</p>
            </div>
            <a href="https://www.baiedesomme.fr/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-2 text-xs sm:text-sm text-white hover:bg-white/25 transition">
              Découvrir l'Office de Tourisme →
            </a>
          </div>

          {/* Distances — scroll horizontal sur mobile, grille sur desktop */}
          <div className="mt-4 sm:mt-5 flex sm:grid gap-2 sm:gap-3 overflow-x-auto pb-1 sm:overflow-visible sm:grid-cols-2 lg:grid-cols-5" style={{ scrollbarWidth: "none" }}>
            {[
              { city: "Amiens",     time: "≈ 45 min" },
              { city: "Paris",      time: "≈ 2h15" },
              { city: "Le Touquet", time: "≈ 30 min" },
              { city: "Lille",      time: "≈ 2h" },
              { city: "Rouen",      time: "≈ 1h15" },
            ].map((item) => (
              <div key={item.city} className="shrink-0 rounded-2xl border border-white/10 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 min-w-[110px] sm:min-w-0">
                <div className="text-xs sm:text-sm text-white/80">{item.city}</div>
                <div className="mt-0.5 sm:mt-1 text-base sm:text-lg font-semibold text-white">{item.time}</div>
                <div className="text-[10px] sm:text-xs text-white/50">à partir de</div>
              </div>
            ))}
          </div>

          <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-white/70">Pour préparer votre séjour (idées de sorties, marées, événements, itinéraires), consultez le site officiel de l'Office de Tourisme.</p>
          <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/45">* Temps indicatifs, variables selon l'itinéraire et la circulation.</p>
        </div>

        {/* CTA */}
        <div className="mt-4 sm:mt-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm sm:text-base text-white font-semibold">Vous souhaitez un programme sur mesure ?</div>
              <p className="mt-1 text-xs sm:text-sm text-white/75">Selon la météo et vos envies, nous pouvons vous recommander un itinéraire (1, 2 ou 3 jours).</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <a href="/contact" className="flex-1 sm:flex-none text-center rounded-full bg-white/15 px-4 sm:px-5 py-2 text-xs sm:text-sm text-white hover:bg-white/25 transition">Demander des idées</a>
              <a href="/gites" className="flex-1 sm:flex-none text-center rounded-full border border-white/15 bg-white/10 px-4 sm:px-5 py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition">Voir les logements</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
      {/* Image moins haute sur mobile */}
      <div className="h-[155px] sm:h-[210px] w-full bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.55)), url('${spot.image}')` }} />
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div>
            <div className="text-sm sm:text-base text-white font-semibold">{spot.title}</div>
            <div className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-white/60">{spot.subtitle}</div>
          </div>
          {spot.badge && (
            <div className="shrink-0 rounded-full border border-white/10 bg-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs text-white/85">{spot.badge}</div>
          )}
        </div>
        {/* Tronqué à 3 lignes sur mobile, complet sur desktop */}
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-3 sm:line-clamp-none">{spot.text}</p>
      </div>
    </article>
  );
}