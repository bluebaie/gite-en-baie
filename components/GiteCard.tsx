import Link from "next/link";

export default function GiteCard({ gite }: any) {
  if (!gite) return null;

  const note = gite?.airbnbNote ?? null;
  const avis = gite?.airbnbAvis ?? null;

  return (
    <Link href={`/gites/${gite.slug}`} className="group block">

      <div className="rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm transition duration-300 group-hover:shadow-xl group-hover:-translate-y-1">

        {/* IMAGE */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          {gite.imageUrl ? (
            <>
              <img
                src={gite.imageUrl}
                alt={gite.nom}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              Photo à venir
            </div>
          )}
        </div>

        {/* CONTENU */}
        <div className="p-6">

          {/* TITRE + NOTE */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {gite.nom}
              </h2>

              <p className="text-gray-600 text-sm mt-1">
                📍 {gite.ville}
              </p>
            </div>

            {note && (
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  ⭐ {Number(note).toFixed(2)}
                </div>
                {avis && (
                  <div className="text-xs text-gray-500">
                    {avis} avis
                  </div>
                )}
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          {gite.descriptionCourte && (
            <p className="text-gray-700 text-sm mt-4 line-clamp-2">
              {gite.descriptionCourte}
            </p>
          )}

          {/* PICTOGRAMMES */}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-700">

            {gite.capacite && (
              <span>👥 {gite.capacite} pers</span>
            )}

            {gite.surface && (
              <span>📐 {gite.surface} m²</span>
            )}

            {gite.etoiles && (
              <span>⭐ {gite.etoiles}★</span>
            )}

          </div>

          {/* BOUTON */}
          <div className="mt-5">
            <span className="text-blue-600 text-sm font-medium group-hover:underline">
              Voir le gîte →
            </span>
          </div>

        </div>

      </div>

    </Link>
  );
}