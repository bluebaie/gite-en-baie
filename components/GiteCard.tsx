import Link from "next/link";

export default function GiteCard({ gite }: any) {
  if (!gite) return null;

  const note = gite?.airbnbNote ?? null;
  const avis = gite?.airbnbAvis ?? null;

  return (
    <Link href={`/gites/${gite.slug}`} className="group block">
      <div className="rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm transition duration-300 group-hover:shadow-xl group-hover:-translate-y-1">

        {/* Image — plus haute sur mobile pour impact visuel */}
        <div className="relative h-52 sm:h-64 overflow-hidden bg-gray-100">
          {gite.imageUrl ? (
            <>
              <img
                src={gite.imageUrl}
                alt={gite.nom}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm">
              Photo à venir
            </div>
          )}

          {/* Badge note flottant sur l'image — mobile only */}
          {note && (
            <div className="absolute top-3 right-3 sm:hidden flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-1 text-white text-xs font-semibold">
              ⭐ {Number(note).toFixed(2)}
              {avis && <span className="text-white/70 font-normal ml-0.5">· {avis}</span>}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                {gite.nom}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1">{gite.ville}</p>
            </div>

            {/* Note — desktop uniquement (sur mobile elle est sur l'image) */}
            {note && (
              <div className="hidden sm:block shrink-0 text-right">
                <div className="text-sm font-semibold text-gray-900">
                  ⭐ {Number(note).toFixed(2)}
                </div>
                {avis && (
                  <div className="text-xs text-gray-500">{avis} avis</div>
                )}
              </div>
            )}
          </div>

          {gite.descriptionCourte && (
            <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4 line-clamp-2 leading-relaxed">
              {gite.descriptionCourte}
            </p>
          )}

          {/* Badges capacité / chambres / type */}
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
            {gite.capacite && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 sm:bg-transparent sm:px-0 sm:py-0">
                👥 {gite.capacite} pers.
              </span>
            )}
            {gite.chambres && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 sm:bg-transparent sm:px-0 sm:py-0">
                🛏 {gite.chambres} ch.
              </span>
            )}
            {gite.type && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 sm:bg-transparent sm:px-0 sm:py-0">
                {gite.type}
              </span>
            )}
          </div>

          <div className="mt-4 sm:mt-5">
            <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:underline">
              Voir le gîte →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}