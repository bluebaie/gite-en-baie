const BG      = "#F7F3EC";
const TEXT    = "#1C1917";
const MUTED   = "#78716C";
const BORDER  = "#DDD7CB";
const DIVIDER = "#E8E3D9";
const BG_CARD = "#FFFFFF";

const SECTIONS = [
  {
    title: "Éditeur du site",
    content: `Blue Baie Conciergerie
Entrepreneur individuel — Christelle Guilbert

28 Route de Forest-Montiers
80120 Saint-Quentin-en-Tourmont

SIREN : 917 905 887
SIRET (siège) : 917 905 887 00027
Numéro de TVA intracommunautaire : FR96917905887
Code NAF/APE : 96.09Z — Autres services personnels n.c.a.
Activité : Conciergerie, location, services personnels
Immatriculation RCS : 917 905 887 R.C.S. Amiens (le 01/08/2022)

Dirigeant : Christelle Guilbert

Email : bluebaieconciergerie@gmail.com
Téléphone : 07 61 75 75 00`,
  },
  {
    title: "Directeur de la publication",
    content: `Baptiste Guilbert`,
  },
  {
    title: "Hébergement",
    content: `Ce site est hébergé par :

Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723
États-Unis
https://vercel.com`,
  },
  {
    title: "Propriétaire des hébergements",
    content: `Les gîtes proposés sur ce site sont la propriété de :

Hervé Guilbert
121 Rue Anguier du Peuple
80230 Saint-Valery-sur-Somme

SIRET : 828 070 789 00031
Code NAF/APE : 6820A — Location de logements

Blue Baie Conciergerie assure la coordination des réservations, l'accueil et le suivi des voyageurs pour le compte du propriétaire.`,
  },
  {
    title: "Propriété intellectuelle",
    content: `L'ensemble du contenu de ce site (textes, photographies, illustrations, logo) est la propriété exclusive de Blue Baie Conciergerie et/ou d'Hervé Guilbert, sauf mention contraire.

Toute reproduction, représentation, modification ou exploitation, totale ou partielle, de ce contenu sans autorisation préalable et écrite est interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.`,
  },
  {
    title: "Données personnelles",
    content: `Ce site collecte des données personnelles via le formulaire de contact (nom, email, téléphone, message). Ces données sont utilisées uniquement pour répondre à vos demandes.

Pour en savoir plus sur la manière dont nous traitons vos données, consultez notre Politique de confidentialité.

Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à : bluebaieconciergerie@gmail.com`,
  },
  {
    title: "Liens hypertextes",
    content: `Ce site peut contenir des liens vers des sites tiers (Airbnb, Booking.com, Beds24, etc.). Blue Baie Conciergerie ne peut être tenu responsable du contenu de ces sites externes.`,
  },
  {
    title: "Limitation de responsabilité",
    content: `Les informations publiées sur ce site sont fournies à titre indicatif. Blue Baie Conciergerie s'efforce de maintenir les informations à jour mais ne garantit pas l'exactitude ou l'exhaustivité des contenus.

La responsabilité du site ne peut être engagée en cas d'erreur ou d'omission dans les informations disponibles.`,
  },
  {
    title: "Droit applicable",
    content: `Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.`,
  },
];

export default function MentionsLegalesPage() {
  return (
    <main style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      <style>{`
        .ml-outer { max-width: 860px; margin: 0 auto; padding: 120px 32px 80px; }
        .ml-card  { background: ${BG_CARD}; border: 1px solid ${BORDER}; border-radius: 20px; padding: 32px 36px; margin-bottom: 16px; }
        @media (max-width: 767px) {
          .ml-outer { padding: 90px 18px 60px; }
          .ml-card  { padding: 22px 20px; border-radius: 16px; }
        }
      `}</style>

      <div className="ml-outer">

        <a href="/" style={{ fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32, fontWeight: 500 }}>
          ← Retour à l'accueil
        </a>

        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>
          Informations légales
        </p>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: TEXT, marginBottom: 12, lineHeight: 1.1, letterSpacing: "-0.4px" }}>
          Mentions légales
        </h1>
        <p style={{ fontSize: 14, color: MUTED, marginBottom: 40, lineHeight: 1.7 }}>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la Confiance en l'Économie Numérique (LCEN), les informations légales relatives au site sont précisées ci-dessous.
        </p>

        {SECTIONS.map((s) => (
          <div className="ml-card" key={s.title}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: TEXT, marginBottom: 14, letterSpacing: "-0.2px" }}>
              {s.title}
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: MUTED, margin: 0, whiteSpace: "pre-line" }}>
              {s.content}
            </p>
          </div>
        ))}

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${DIVIDER}`, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>© 2026 Gîtes en Baie — Blue Baie Conciergerie</p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="/confidentialite" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>Politique de confidentialité</a>
            <a href="/cgv" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>CGV</a>
            <a href="/contact" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>Contact</a>
          </div>
        </div>

      </div>
    </main>
  );
}