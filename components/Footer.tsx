"use client";

import { useState } from "react";

const NAV_COLS = [
  {
    label: "Nos gîtes",
    links: [
      { name: "Balise en Baie", href: "/gites/balise-en-baie-saint-valery" },
      { name: "Le Belvédère en Baie", href: "/gites/le-belvedere-en-baie-saint-valery" },
      { name: "L'Anse Rouge", href: "/gites/anse-rouge-saint-valery" },
      { name: "L'Anse Noire", href: "/gites/anse-noire-saint-valery" },
      { name: "L'Estacade", href: "/gites/estacade-maison-pecheur-saint-valery" },
      { name: "Les Sableaux", href: "/gites/les-sableaux-saint-quentin-tourmont" },
      { name: "Le Bout des Dunes", href: "/gites/bout-des-dunes-saint-quentin-tourmont" },
    ],
  },
  {
    label: "Le site",
    links: [
      { name: "Accueil", href: "/" },
      { name: "Découvrir la Baie", href: "/#decouvrir" },
      { name: "Tous les gîtes", href: "/gites" },
      { name: "Blue Baie Conciergerie", href: "/blue-baie-conciergerie" },
      { name: "Nous contacter", href: "/contact" },
    ],
  },
  {
    label: "Réserver",
    links: [
      { name: "Réserver via Beds24", href: "https://beds24.com/booking2.php?ownerid=114927&referer=BookingLink", external: true },
    ],
  },
];

const LOCATIONS = [
  "Saint-Valery-sur-Somme",
  "Saint-Quentin-en-Tourmont",
  "Baie de Somme",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "relative",
        background: "#071E20",
        color: "#F8F7F2",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Texture / grain overlay ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 10% 0%, rgba(28,58,47,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 90% 100%, rgba(11,45,40,0.22) 0%, transparent 65%)
          `,
        }}
      />
      {/* Fine horizontal rule at top */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent)", position: "relative", zIndex: 1 }} />

      {/* ── Main content ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "64px 32px 0" }}>

        {/* Top row: brand + tagline + CTA */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "flex-start", gap: 32, marginBottom: 56,
          paddingBottom: 48,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 360 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              {/* Vague stylisée SVG */}
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="rgba(28,58,47,0.5)" />
                <path d="M6 22c2-3 4-5 6-5s4 4 6 4 4-5 6-5 4 3 6 3" stroke="#7ecfb0" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M6 26c2-2 4-4 6-4s4 3 6 3 4-4 6-4 4 2 6 2" stroke="rgba(126,207,176,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
              <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px", color: "#F8F7F2" }}>
                Gîtes en Baie
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(248,247,242,0.58)", margin: "0 0 20px" }}>
              Des hébergements d'exception en Baie de Somme.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {LOCATIONS.map((loc) => (
                <span key={loc} style={{
                  padding: "3px 10px", borderRadius: 99,
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: 11, color: "rgba(248,247,242,0.5)",
                  letterSpacing: "0.03em",
                }}>
                  {loc}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Réserver */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
            <a
              href="https://beds24.com/booking2.php?ownerid=114927&referer=BookingLink"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 28px", borderRadius: 14,
                background: "#1C3A2F",
                color: "#fff", fontSize: 14, fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(28,58,47,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(28,58,47,0.6), inset 0 1px 0 rgba(255,255,255,0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(28,58,47,0.5), inset 0 1px 0 rgba(255,255,255,0.08)";
              }}
            >
              <span style={{ fontSize: 16 }}>🔒</span> Réserver maintenant
            </a>
            <span style={{ fontSize: 11, color: "rgba(248,247,242,0.38)", textAlign: "right" }}>
              Paiement sécurisé · Sans frais cachés
            </span>
          </div>
        </div>

        {/* Nav columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "40px 48px",
          marginBottom: 56,
        }}>
          {NAV_COLS.map((col) => (
            <div key={col.label}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "rgba(248,247,242,0.38)",
                margin: "0 0 16px",
              }}>
                {col.label}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: 13, color: "rgba(248,247,242,0.65)",
                        textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: 4,
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F7F2")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,247,242,0.65)")}
                    >
                      {link.name}
                      {"external" in link && link.external && (
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
                          <path d="M1 8L8 1M8 1H3M8 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact col */}
          <div>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "rgba(248,247,242,0.38)",
              margin: "0 0 16px",
            }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href="tel:+33761757500"
                style={{ fontSize: 13, color: "rgba(248,247,242,0.65)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F7F2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,247,242,0.65)")}
              >
                <span style={{ fontSize: 14 }}>📞</span> 07 61 75 75 00
              </a>
              <a
                href="mailto:bluebaieconciergerie@gmail.com"
                style={{ fontSize: 13, color: "rgba(248,247,242,0.65)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F7F2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,247,242,0.65)")}
              >
                <span style={{ fontSize: 14 }}>✉️</span> bluebaieconciergerie@gmail.com
              </a>
              <a
                href="/contact"
                style={{
                  marginTop: 4,
                  display: "inline-flex", alignItems: "center",
                  padding: "8px 16px", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: 12, color: "rgba(248,247,242,0.7)", fontWeight: 600,
                  textDecoration: "none", transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#F8F7F2";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,247,242,0.7)";
                }}
              >
                Formulaire de contact →
              </a>
            </div>
          </div>
        </div>

        {/* Partenaire Blue Baie */}
        <div style={{
          padding: "20px 24px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: 16, marginBottom: 32,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src="/images/home/partners/Blue Baie.png"
              alt="Blue Baie Conciergerie"
              style={{ height: 36, width: "auto", background: "#e8f4f8", borderRadius: 8, padding: "4px 8px", objectFit: "contain" }}
            />
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(248,247,242,0.8)", margin: "0 0 2px" }}>
                Coordonné par Blue Baie Conciergerie
              </p>
              <p style={{ fontSize: 11, color: "rgba(248,247,242,0.4)", margin: 0 }}>
                Accueil, entretien et suivi voyageurs · 7j/7
              </p>
            </div>
          </div>
          <a
            href="/blue-baie-conciergerie"
            style={{
              fontSize: 12, fontWeight: 600, color: "rgba(248,247,242,0.55)",
              textDecoration: "none", display: "flex", alignItems: "center", gap: 4,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F7F2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,247,242,0.55)")}
          >
            En savoir plus
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 0 24px",
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center",
          gap: 12,
        }}>
          <p style={{ fontSize: 11, color: "rgba(248,247,242,0.32)", margin: 0 }}>
            © {year} Gîtes en Baie · Tous droits réservés
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { name: "Mentions légales", href: "/mentions-legales" },
              { name: "Politique de confidentialité", href: "/confidentialite" },
              { name: "CGV", href: "/cgv" },
            ].map((l) => (
              <a
                key={l.name}
                href={l.href}
                style={{
                  fontSize: 11, color: "rgba(248,247,242,0.32)",
                  textDecoration: "none", transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(248,247,242,0.65)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,247,242,0.32)")}
              >
                {l.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}