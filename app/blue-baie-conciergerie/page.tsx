// ── Palette cohérente avec le site ──────────────────────────────────────
const BG     = "#071E20";
const ACCENT = "#1C3A2F";
const TEXT   = "#F8F7F2";
const MUTED  = "rgba(248,247,242,0.65)";
const BORDER = "rgba(255,255,255,0.10)";

export default function BlueBaiePage() {
  return (
    <main style={{
      minHeight: "100vh", position: "relative",
      background: BG, color: TEXT,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>

      <style>{`
        /* ── Responsive Blue Baie page ── */
        .bb-hero-content {
          position: relative; z-index: 2;
          max-width: 1100px; margin: 0 auto;
          padding: 140px 32px 80px;
        }
        .bb-body {
          max-width: 1100px; margin: 0 auto;
          padding: 64px 32px 80px;
        }
        .bb-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .bb-plans-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .bb-cta-row {
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between;
          gap: 24px;
        }
        .bb-cta-btns {
          display: flex; gap: 12px; flex-wrap: wrap;
        }
        .bb-hero-logo {
          height: 70px;
        }
        .bb-hero-title {
          font-size: clamp(32px, 5vw, 54px);
        }
        .bb-hero-desc {
          font-size: 18px;
        }

        @media (max-width: 767px) {
          .bb-hero-content {
            padding: 100px 18px 48px;
          }
          .bb-body {
            padding: 36px 18px 60px;
          }
          .bb-hero-logo {
            height: 48px;
          }
          .bb-hero-title {
            font-size: clamp(24px, 7vw, 36px);
          }
          .bb-hero-desc {
            font-size: 15px;
          }
          .bb-services-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          /* Plans : 1 colonne sur mobile */
          .bb-plans-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          /* Zone intervention : padding réduit */
          .bb-zone {
            padding: 24px 20px !important;
            border-radius: 18px !important;
          }
          /* CTA final : empilé sur mobile */
          .bb-cta-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .bb-cta-btns {
            width: 100%;
            flex-direction: column;
          }
          .bb-cta-btns a {
            text-align: center;
            justify-content: center;
          }
          /* Section body gaps */
          .bb-section-mb {
            margin-bottom: 40px !important;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 480, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/home/baie-somme-drone.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(7,30,32,0.90) 0%, rgba(11,45,40,0.80) 60%, rgba(7,30,32,0.95) 100%)" }} />

        <div className="bb-hero-content">
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: MUTED, textDecoration: "none", marginBottom: 28, fontWeight: 500 }}>
            ← Retour aux gîtes
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            <img
              src="/images/home/partners/Blue Baie.png"
              alt="Blue Baie Conciergerie"
              className="bb-hero-logo"
              style={{ width: "auto", borderRadius: 14, background: "#e8f4f8", padding: "8px 12px", objectFit: "contain" }}
            />
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 4 }}>
                Partenaire officiel
              </p>
              <h1 className="bb-hero-title" style={{ fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.5px", color: TEXT, margin: 0 }}>
                Blue Baie Conciergerie
              </h1>
            </div>
          </div>

          <p className="bb-hero-desc" style={{ lineHeight: 1.75, color: MUTED, maxWidth: 680, marginBottom: 32 }}>
            Derrière chaque gîte de <strong style={{ color: TEXT }}>Gîtes en Baie</strong>, il y a une équipe dédiée. Blue Baie Conciergerie coordonne l'accueil, l'entretien et le suivi de nos hébergements — pour que votre séjour soit parfait du premier au dernier instant.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href="https://www.bluebaie.fr" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: ACCENT, color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(28,58,47,0.45)" }}>
              Visiter le site Blue Baie →
            </a>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: `1px solid ${BORDER}`, color: TEXT, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Nous contacter
            </a>
          </div>
        </div>
      </div>

      {/* ── Corps ── */}
      <div className="bb-body">

        {/* Services */}
        <div className="bb-section-mb" style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>Ce qu'ils font pour vous</p>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.3px", marginBottom: 12, color: TEXT }}>Un accompagnement complet, de A à Z</h2>
          <p style={{ fontSize: 16, color: MUTED, marginBottom: 28, maxWidth: 600, lineHeight: 1.7 }}>
            De la mise en ligne de l'annonce à l'accueil des voyageurs, Blue Baie Conciergerie prend en charge chaque étape pour assurer des séjours sans friction.
          </p>

          <div className="bb-services-grid">
            {[
              { icon: "📋", title: "Mise en ligne & optimisation des annonces", desc: "Rédaction soignée, photos professionnelles, publication sur Airbnb, Booking.com et autres plateformes." },
              { icon: "📅", title: "Coordination des réservations",             desc: "Synchronisation automatique des calendriers, zéro risque de double réservation." },
              { icon: "🏡", title: "Accueil des voyageurs 7j/7",                desc: "Accueil personnalisé ou autonome via boîtier sécurisé. Les voyageurs sont accompagnés à chaque étape." },
              { icon: "🧹", title: "Entretien & ménage professionnel",          desc: "Équipe dédiée pour chaque passage. Linge, serviettes et draps toujours impeccables." },
              { icon: "💰", title: "Optimisation tarifaire",                    desc: "Tarification dynamique adaptée à la saison, aux événements locaux et à la demande." },
              { icon: "💬", title: "Suivi et assistance voyageurs",             desc: "Réactivité avant, pendant et après le séjour. Avis traités avec soin et professionnalisme." },
            ].map((item) => (
              <div key={item.title} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "20px" }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 6 }}>{item.title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: MUTED, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Forfaits */}
        <div className="bb-section-mb" style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>Pour les propriétaires</p>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.3px", marginBottom: 12, color: TEXT }}>Vous avez un bien en Baie de Somme ?</h2>
          <p style={{ fontSize: 16, color: MUTED, marginBottom: 28, maxWidth: 600, lineHeight: 1.7 }}>
            Blue Baie Conciergerie propose deux formules pour vous libérer des contraintes du quotidien et valoriser votre bien.
          </p>

          <div className="bb-plans-grid">
            {[
              { title: "Formule Complète", commission: "23 %", sub: "de commission par réservation", desc: "La formule tout-en-un. Blue Baie s'occupe de tout : annonces, réservations, accueil, ménage, linge et suivi voyageurs.", features: ["Home Staging & photos pro", "Accueil physique sur place", "Ménage professionnel", "Linge fourni aux voyageurs", "Optimisation tarifaire"], highlight: true },
              { title: "Formule Digitale",  commission: "15 %", sub: "de commission par réservation", desc: "Pour les propriétaires qui préfèrent garder la main sur l'accueil. Blue Baie coordonne la partie digitale.", features: ["Création & publication d'annonces", "Optimisation tarifaire", "Coordination des réservations", "Accueil autonome (boîtier)", "Suivi voyageurs"], highlight: false },
            ].map((plan) => (
              <div key={plan.title} style={{ background: plan.highlight ? "rgba(28,58,47,0.35)" : "rgba(255,255,255,0.04)", border: `1px solid ${plan.highlight ? "rgba(28,58,47,0.6)" : BORDER}`, borderRadius: 20, padding: "24px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, marginBottom: 8 }}>{plan.title}</div>
                <div style={{ fontSize: 38, fontWeight: 800, color: TEXT, letterSpacing: "-1px", marginBottom: 4 }}>{plan.commission}</div>
                <div style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>{plan.sub}</div>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 16 }}>{plan.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ fontSize: 13, color: TEXT, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "#4ade80", fontSize: 12 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Zone intervention */}
        <div className="bb-zone" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 24, padding: "36px 40px", marginBottom: 40 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Zone d'intervention</h3>
          <p style={{ fontSize: 14, color: MUTED, marginBottom: 20 }}>Blue Baie Conciergerie intervient sur l'ensemble de la Baie de Somme et ses alentours.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Saint-Valery-sur-Somme", "Le Crotoy", "Fort-Mahon-Plage", "Saint-Quentin-en-Tourmont", "Quend", "Berck", "Noyelles-sur-Mer", "Favières", "Cayeux-sur-Mer", "Ault"].map((city) => (
              <span key={city} style={{ padding: "6px 14px", borderRadius: 99, background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, fontSize: 13, color: TEXT }}>
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 24, padding: "32px" }}>
          <div className="bb-cta-row">
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Intéressé par les services de Blue Baie ?</h3>
              <p style={{ fontSize: 15, color: MUTED, margin: 0 }}>Contactez directement l'équipe ou visitez leur site pour en savoir plus.</p>
            </div>
            <div className="bb-cta-btns">
              <a href="https://www.bluebaie.fr" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 24px", borderRadius: 12, background: ACCENT, color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                Site Blue Baie →
              </a>
              <a href="tel:+33761757500" style={{ padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: `1px solid ${BORDER}`, color: TEXT, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                📞 07 61 75 75 00
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}