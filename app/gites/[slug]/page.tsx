import { fetchGites } from "../../../lib/airtable";
import GiteGalleryClient from "../../../components/GiteGalleryClient";
import ReserveButton from "../../../components/ReserveButton";

// ─── Palette "Ivoire Chaud" — Relais & Châteaux ───────────────────────────
//
//  BG          #F7F3EC   ivoire chaud principal — toute la page
//  BG_CARD     #FFFFFF   carte blanche sur ivoire = contraste élégant
//  BG_BADGE    #EDE8DF   ivoire légèrement plus sombre pour badges / réassurance
//  BORDER      #DDD7CB   beige bordure naturelle
//  DIVIDER     #E8E3D9   séparateur très discret
//
//  TEXT        #1C1917   noir chaud (pas froid)
//  TEXT_MUTED  #78716C   marron-gris secondaire
//
//  ACCENT      #1C3A2F   vert forêt profond — bouton Réserver (premium, naturel)
//  ACCENT_GLOW rgba(28,58,47,0.20)  ombre bouton
//
//  STAR        #B45309   ambre chaud pour les étoiles
//
// ──────────────────────────────────────────────────────────────────────────

const BG         = "#F7F3EC";
const BG_CARD    = "#FFFFFF";
const BG_BADGE   = "#EDE8DF";
const BORDER     = "#DDD7CB";
const DIVIDER    = "#E8E3D9";
const TEXT       = "#1C1917";
const TEXT_MUTED = "#78716C";
const ACCENT     = "#1C3A2F";
const ACCENT_GLOW= "rgba(28,58,47,0.22)";

export default async function GitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gites = await fetchGites();

  const gite = gites.find(
    (g: any) =>
      String(g.slug).trim().toLowerCase() ===
      String(slug).trim().toLowerCase()
  );

  if (!gite) {
    return (
      <main style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: TEXT_MUTED, fontSize: 14 }}>Gîte introuvable</p>
      </main>
    );
  }

  const allImages = [
    ...(gite.imageUrl ? [gite.imageUrl] : []),
    ...(Array.isArray(gite.images) ? gite.images : []),
  ].filter(Boolean);
  const gallery = [...new Set(allImages)] as string[];

  const infoBadges = [
    gite.capacite ? `${gite.capacite} voyageurs` : null,
    gite.chambres ? `${gite.chambres} chambre${gite.chambres > 1 ? "s" : ""}` : null,
    gite.surface  ? `${gite.surface} m²` : null,
    gite.etoiles  ? `${gite.etoiles} étoiles` : null,
    gite.type     || null,
  ].filter(Boolean);

  const equipements = [
    gite.terrasse ? { icon: "🌿", label: "Terrasse" } : null,
    gite.parking  ? { icon: "🚗", label: "Parking" }  : null,
    gite.wifi     ? { icon: "📶", label: "Wifi" }      : null,
    { icon: gite.animaux ? "🐾" : "🚫", label: gite.animaux ? "Animaux acceptés" : "Animaux non admis" },
    gite.type     ? { icon: "🏠", label: gite.type }   : null,
  ].filter(Boolean) as { icon: string; label: string }[];

  const reservationInfos: Array<[string, string]> = [
    gite.capacite    ? ["Capacité",    `${gite.capacite} personnes`] : null,
    gite.chambres    ? ["Chambres",    `${gite.chambres}`] : null,
    gite.surface     ? ["Surface",     `${gite.surface} m²`] : null,
    gite.etoiles     ? ["Classement",  `${"★".repeat(gite.etoiles)} ${gite.etoiles} étoiles`] : null,
    gite.airbnbNote  != null ? ["Note Airbnb",  `⭐ ${Number(gite.airbnbNote).toFixed(2)}${gite.airbnbAvis  ? ` · ${gite.airbnbAvis} avis`  : ""}`] : null,
    gite.bookingNote != null ? ["Note Booking", `${Number(gite.bookingNote).toFixed(1)}${gite.bookingAvis ? ` · ${gite.bookingAvis} avis` : ""}`] : null,
  ].filter(Boolean) as Array<[string, string]>;

  const reservationUrl = gite.beds24Url || gite.bookingUrl || "#";

  return (
    <div style={{
      background: BG,
      color: TEXT,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      minHeight: "100vh",
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ paddingTop: 96 }} />

        {/* ── Retour ── */}
        <a href="/gites" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, color: TEXT_MUTED, textDecoration: "none",
          padding: "0 0 20px", cursor: "pointer", fontWeight: 500,
          letterSpacing: "0.1px",
          position: "relative",
          zIndex: 10,
        }}>
          ← Retour aux gîtes
        </a>

        {/* ── Titre ── */}
        <h1 style={{
          fontSize: 30, fontWeight: 700, color: TEXT,
          marginBottom: 10, lineHeight: 1.25, letterSpacing: "-0.4px",
        }}>
          {gite.nom}
        </h1>

        {/* ── Sous-titre ── */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          gap: "4px 10px", fontSize: 14, color: TEXT_MUTED, marginBottom: 24,
        }}>
          {gite.airbnbNote != null && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "#B45309", fontSize: 13 }}>★</span>
              <strong style={{ color: TEXT }}>{Number(gite.airbnbNote).toFixed(2)}</strong>
              {gite.airbnbAvis && (
                <span style={{ color: TEXT_MUTED }}>· {gite.airbnbAvis} avis Airbnb</span>
              )}
            </span>
          )}
          {gite.airbnbNote != null && gite.bookingNote != null && (
            <span style={{ color: BORDER, margin: "0 2px" }}>·</span>
          )}
          {gite.bookingNote != null && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "#003580", fontSize: 13 }}>★</span>
              <strong style={{ color: TEXT }}>{Number(gite.bookingNote).toFixed(1)}</strong>
              {gite.bookingAvis && (
                <span style={{ color: TEXT_MUTED }}>· {gite.bookingAvis} avis Booking</span>
              )}
            </span>
          )}
          {(gite.airbnbNote != null || gite.bookingNote != null) && (
            <span style={{ color: BORDER, margin: "0 2px" }}>·</span>
          )}
          <span style={{ color: TEXT_MUTED }}>
            {gite.adresse ? `${gite.adresse}, ` : ""}
            {gite.codePostal ? `${gite.codePostal} ` : ""}
            {gite.ville}{gite.secteur ? ` — ${gite.secteur}` : ""}
          </span>
        </div>

        {/* ── Galerie ── */}
        <GiteGalleryClient images={gallery} title={gite.nom} />

        {/* ══════════════════════════════════════
            LAYOUT PRINCIPAL
        ══════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 370px",
          gap: 64,
          alignItems: "start",
        }}>

          {/* ════ GAUCHE ════ */}
          <div>

            {/* Info badges */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 8,
              paddingBottom: 28, borderBottom: `1px solid ${DIVIDER}`,
            }}>
              {infoBadges.map((item, i) => (
                <span key={i} style={{
                  background: BG_BADGE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8, padding: "8px 14px",
                  fontSize: 13, color: TEXT, fontWeight: 500,
                }}>
                  {item}
                </span>
              ))}
            </div>

            {/* Description */}
            <div style={{ padding: "28px 0", borderBottom: `1px solid ${DIVIDER}` }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 14 }}>
                À propos du logement
              </h2>
              {gite.descriptionCourte?.trim() && (
                <p style={{ fontSize: 16, lineHeight: 1.8, color: TEXT, marginBottom: 14 }}>
                  {gite.descriptionCourte}
                </p>
              )}
              {gite.descriptionLongue?.trim() && (
                <div style={{ fontSize: 15, lineHeight: 1.85, color: TEXT_MUTED, whiteSpace: "pre-line" }}>
                  {gite.descriptionLongue}
                </div>
              )}
            </div>

            {/* Équipements */}
            <div style={{ padding: "28px 0", borderBottom: `1px solid ${DIVIDER}` }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 16 }}>
                Équipements et points forts
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {equipements.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px", borderRadius: 12,
                    border: `1px solid ${BORDER}`, background: BG_CARD,
                    fontSize: 14, color: TEXT,
                  }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Couchages */}
            {gite.lits?.trim() && (
              <div style={{ padding: "28px 0", borderBottom: `1px solid ${DIVIDER}` }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 14 }}>
                  Couchages
                </h2>
                <div style={{
                  background: BG_CARD, borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                  padding: "18px 22px", fontSize: 14,
                  lineHeight: 1.8, color: TEXT_MUTED, whiteSpace: "pre-line",
                }}>
                  {gite.lits}
                </div>
              </div>
            )}

            {/* Localisation */}
            <div style={{ paddingTop: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 16 }}>
                Localisation
              </h2>

              {/* Google Maps embed — gratuit, sans clé API */}
              <div style={{
                height: 340, borderRadius: 16, overflow: "hidden",
                border: `1px solid ${BORDER}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}>
                <iframe
                  title={`Carte — ${gite.nom}`}
                  width="100%"
                  height="100%"
                  style={{ display: "block", border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    [gite.adresse, gite.codePostal, gite.ville, "France"]
                      .filter(Boolean)
                      .join(", ")
                  )}&output=embed&z=15`}
                />
              </div>

              <p style={{ marginTop: 12, fontSize: 14, color: TEXT_MUTED, lineHeight: 1.7 }}>
                <strong style={{ color: TEXT }}>
                  {gite.adresse ? `${gite.adresse}, ` : ""}
                  {gite.codePostal ? `${gite.codePostal} ` : ""}
                  {gite.ville}{gite.secteur ? ` — ${gite.secteur}` : ""}
                </strong>. Emplacement idéal pour profiter du secteur et découvrir la Baie de Somme.
              </p>
            </div>
          </div>

          {/* ════ SIDEBAR STICKY ════ */}
          <aside style={{ position: "sticky", top: 96 }}>
            <div style={{
              background: BG_CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 20,
              padding: "24px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.09)",
            }}>

              {/* ══ BOUTON RÉSERVER ══ */}
              <ReserveButton href={reservationUrl} />

              <p style={{ textAlign: "center", fontSize: 11, color: TEXT_MUTED, marginBottom: 20, marginTop: 6 }}>
                Réservation sécurisée via Beds24 · Sans frais cachés
              </p>

              {/* Séparateur */}
              <div style={{ borderTop: `1px solid ${DIVIDER}`, marginBottom: 16 }} />

              {/* Label section */}
              <div style={{
                fontSize: 11, fontWeight: 600, color: TEXT_MUTED,
                textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12,
              }}>
                Détails du logement
              </div>

              {/* Infos */}
              {reservationInfos.map(([label, value], i, arr) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontSize: 13, padding: "9px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${DIVIDER}` : "none",
                }}>
                  <span style={{ color: TEXT_MUTED }}>{label}</span>
                  <span style={{ fontWeight: 600, color: TEXT }}>{value}</span>
                </div>
              ))}

              {/* Bouton secondaire Booking */}
              {gite.bookingUrl && gite.bookingUrl !== reservationUrl && (
                <>
                  <div style={{ borderTop: `1px solid ${DIVIDER}`, margin: "16px 0" }} />
                  <a
                    href={gite.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "100%", padding: "12px",
                      background: "transparent", color: TEXT,
                      borderRadius: 12, fontSize: 13, fontWeight: 600,
                      textDecoration: "none", border: `1px solid ${BORDER}`,
                      boxSizing: "border-box",
                    }}
                  >
                    Voir aussi sur Booking.com
                  </a>
                </>
              )}


              {/* Réassurance */}
              <div style={{ marginTop: 16 }}>
                <div style={{
                  textAlign: "center",
                  background: BG_BADGE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 10, padding: "10px 6px",
                  fontSize: 11, color: TEXT_MUTED, lineHeight: 1.4,
                }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>🔒</div>
                  Paiement sécurisé
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
}