const BG      = "#F7F3EC";
const TEXT    = "#1C1917";
const MUTED   = "#78716C";
const BORDER  = "#DDD7CB";
const DIVIDER = "#E8E3D9";
const BG_CARD = "#FFFFFF";

const SECTIONS = [
  {
    title: "1. Responsable du traitement",
    content: `Hervé Guilbert
121 Rue Anguier du Peuple
80230 Saint-Valery-sur-Somme

SIRET principal : 828 070 789 00031
Activité : Location de logements (code NAF 6820A)

Email de contact : guilbert.immobilier@gmail.com
Téléphone : 07 87 96 04 76`,
  },
  {
    title: "2. Données collectées",
    content: `Ce site collecte uniquement les données que vous saisissez dans le formulaire de contact :

• Nom et prénom
• Adresse email
• Numéro de téléphone (optionnel)
• Dates de séjour et nombre de personnes (optionnel)
• Message libre

Aucune donnée n'est collectée de manière automatique à des fins de profilage ou de ciblage publicitaire.`,
  },
  {
    title: "3. Finalité du traitement",
    content: `Les données collectées sont utilisées exclusivement pour :

• Répondre à vos demandes de contact et d'information
• Traiter vos demandes de réservation
• Assurer le suivi de votre séjour

Vos données ne sont jamais vendues, louées ou transmises à des tiers à des fins commerciales.`,
  },
  {
    title: "4. Durée de conservation",
    content: `Vos données sont conservées pendant 3 ans à compter de votre dernier contact, conformément aux recommandations de la CNIL pour les données de prospects et clients.

Passé ce délai, vos données sont supprimées ou anonymisées.`,
  },
  {
    title: "5. Destinataires des données",
    content: `Vos données sont accessibles à :

• Hervé Guilbert (responsable du traitement)
• L'équipe Blue Baie Conciergerie (gestion des séjours)

Elles sont stockées via les sous-traitants techniques suivants, dans le respect du RGPD :

• Airtable (base de données des messages) — hébergé aux États-Unis, couvert par des clauses contractuelles types
• Vercel (hébergement du site) — infrastructure sécurisée`,
  },
  {
    title: "6. Cookies et traceurs",
    content: `Ce site n'utilise pas de cookies de tracking, de publicité ou d'analyse comportementale.

Des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés (session, sécurité). Ces cookies ne nécessitent pas votre consentement selon la réglementation en vigueur.`,
  },
  {
    title: "7. Vos droits",
    content: `Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :

• Droit d'accès à vos données personnelles
• Droit de rectification des données inexactes
• Droit à l'effacement (« droit à l'oubli »)
• Droit d'opposition au traitement
• Droit à la limitation du traitement
• Droit à la portabilité de vos données

Pour exercer ces droits, contactez-nous à : bluebaieconciergerie@gmail.com

En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) sur le site www.cnil.fr.`,
  },
  {
    title: "8. Sécurité",
    content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Le site est hébergé sur une infrastructure sécurisée (Vercel) avec connexion chiffrée HTTPS.`,
  },
  {
    title: "9. Modification de la présente politique",
    content: `Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée en bas de page. Nous vous invitons à la consulter régulièrement.`,
  },
];

export default function ConfidentialitePage() {
  const lastUpdate = "Mars 2026";

  return (
    <main style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      <style>{`
        .conf-outer  { max-width: 860px; margin: 0 auto; padding: 120px 32px 80px; }
        .conf-card   { background: ${BG_CARD}; border: 1px solid ${BORDER}; border-radius: 20px; padding: 32px 36px; margin-bottom: 16px; }
        @media (max-width: 767px) {
          .conf-outer { padding: 90px 18px 60px; }
          .conf-card  { padding: 22px 20px; border-radius: 16px; }
        }
      `}</style>

      <div className="conf-outer">

        {/* Header */}
        <a href="/" style={{ fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32, fontWeight: 500 }}>
          ← Retour à l'accueil
        </a>

        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>
          Mentions légales & RGPD
        </p>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: TEXT, marginBottom: 12, lineHeight: 1.1, letterSpacing: "-0.4px" }}>
          Politique de confidentialité
        </h1>
        <p style={{ fontSize: 14, color: MUTED, marginBottom: 40, lineHeight: 1.7 }}>
          Ce document décrit la manière dont Gîtes en Baie collecte, utilise et protège vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française Informatique et Libertés.
        </p>

        {/* Sections */}
        {SECTIONS.map((s) => (
          <div className="conf-card" key={s.title}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: TEXT, marginBottom: 14, letterSpacing: "-0.2px" }}>
              {s.title}
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: MUTED, margin: 0, whiteSpace: "pre-line" }}>
              {s.content}
            </p>
          </div>
        ))}

        {/* Footer */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${DIVIDER}`, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>
            Dernière mise à jour : {lastUpdate}
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="/mentions-legales" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>Mentions légales</a>
            <a href="/cgv" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>CGV</a>
            <a href="/contact" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>Contact</a>
          </div>
        </div>

      </div>
    </main>
  );
}