"use client";

import { useState } from "react";

// ── Palette cohérente avec la homepage ──────────────────────────────────
// Fond sombre forêt/mer, texte blanc, accents verts naturels
const ACCENT    = "#1C3A2F";   // vert forêt (bouton Réserver)
const ACCENT_LT = "#2A5242";   // vert légèrement plus clair au hover
const TEXT      = "#F8F7F2";
const TEXT_MUTED= "rgba(248,247,242,0.65)";
const BORDER    = "rgba(255,255,255,0.12)";
const INPUT_BG  = "rgba(255,255,255,0.07)";

type StatusType = { type: "success" | "error"; text: string } | null;

export default function ContactPageForm() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<StatusType>(null);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function validate() {
    if (!name.trim())          return "Veuillez renseigner votre nom.";
    if (!email.trim())         return "Veuillez renseigner votre email.";
    if (!email.includes("@")) return "Veuillez renseigner un email valide.";
    if (!message.trim())       return "Veuillez écrire votre message.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const err = validate();
    if (err) { setStatus({ type: "error", text: err }); return; }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: "question",
          name: name.trim(), email: email.trim(),
          phone: phone.trim() || null,
          guests: null, arrival: null, departure: null,
          arrivalTime: null, bookingRef: null, gite: null,
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Erreur serveur.");
      setStatus({ type: "success", text: "Merci ! Votre message a bien été envoyé. Nous vous répondons rapidement." });
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch (err: any) {
      setStatus({ type: "error", text: err?.message || "Une erreur est survenue." });
    } finally {
      setSending(false);
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: focused === field ? "rgba(255,255,255,0.10)" : INPUT_BG,
    border: `1px solid ${focused === field ? "rgba(255,255,255,0.28)" : BORDER}`,
    borderRadius: 12,
    color: TEXT,
    padding: "14px 18px",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    transition: "all 200ms ease",
    fontFamily: "inherit",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: TEXT_MUTED,
    marginBottom: 8,
    display: "block",
  };

  return (
    <>
      <style>{`
        ::placeholder { color: rgba(248,247,242,0.35) !important; }
        .contact-submit {
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 32px rgba(28,58,47,0.55) !important;
          background: ${ACCENT_LT} !important;
        }
        .contact-submit:active:not(:disabled) {
          transform: scale(0.98);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-card { animation: fadeUp 0.55s ease both; }
        .contact-card-left { animation: fadeUp 0.5s ease both; }
        .contact-card-right { animation: fadeUp 0.6s 0.08s ease both; }
      `}</style>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.8fr",
        gap: 32,
        alignItems: "start",
      }}>

        {/* ── Colonne gauche — infos ── */}
        <div className="contact-card-left" style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${BORDER}`,
          borderRadius: 24,
          padding: "36px 28px",
          backdropFilter: "blur(12px)",
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 20,
          }}>
            Contact & réservation
          </p>

          <h1 style={{
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 700, lineHeight: 1.1,
            color: TEXT, marginBottom: 16, letterSpacing: "-0.5px",
          }}>
            Contactez-<br />nous
          </h1>

          <p style={{
            fontSize: 15, lineHeight: 1.75,
            color: TEXT_MUTED, marginBottom: 36,
          }}>
            Une question ou une demande de réservation ? Nous vous répondons rapidement.
          </p>

          {/* Infos pratiques */}
          {[
            { icon: "✉️", label: "Email", value: "bluebaieconciergerie@gmail.com" },
            { icon: "📍", label: "Localisation", value: "Saint-Valery-sur-Somme\n& Marquenterre" },
            { icon: "⏱", label: "Réponse", value: "Sous 24h en général" },
          ].map((item) => (
            <div key={item.label} style={{
              display: "flex", gap: 14, alignItems: "flex-start",
              marginBottom: 20,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "rgba(255,255,255,0.07)",
                border: `1px solid ${BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 2 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.5, whiteSpace: "pre-line" }}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}

          {/* Réassurance */}
          <div style={{
            marginTop: 32, paddingTop: 24,
            borderTop: `1px solid ${BORDER}`,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {["🔒 Paiement sécurisé via Beds24", "🏡 Propriétaire présent & réactif", "📋 Linge & draps inclus"].map((item) => (
              <div key={item} style={{ fontSize: 13, color: TEXT_MUTED, display: "flex", alignItems: "center", gap: 8 }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── Colonne droite — formulaire ── */}
        <div className="contact-card-right" style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${BORDER}`,
          borderRadius: 24,
          padding: "36px 32px",
          backdropFilter: "blur(12px)",
        }}>
          <h2 style={{
            fontSize: 22, fontWeight: 600, color: TEXT,
            marginBottom: 28, letterSpacing: "-0.3px",
          }}>
            Envoyez-nous un message
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Nom</label>
                <input
                  required value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Votre nom"
                  style={inputStyle("name")}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  required type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="nom@email.com"
                  style={inputStyle("email")}
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Téléphone <span style={{ opacity: 0.5, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optionnel)</span></label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
                placeholder="06..."
                style={inputStyle("phone")}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Message</label>
              <textarea
                required value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Indiquez votre demande : dates souhaitées, nombre de personnes, gîte souhaité..."
                rows={6}
                style={{
                  ...inputStyle("message"),
                  resize: "vertical",
                  minHeight: 148,
                  paddingTop: 14,
                  lineHeight: 1.6,
                }}
              />
            </div>

            {status && (
              <div style={{
                marginBottom: 20,
                padding: "14px 18px",
                borderRadius: 12,
                fontSize: 14, lineHeight: 1.6,
                background: status.type === "success"
                  ? "rgba(28,58,47,0.35)"
                  : "rgba(190,24,93,0.18)",
                border: status.type === "success"
                  ? `1px solid rgba(28,58,47,0.6)`
                  : "1px solid rgba(244,114,182,0.35)",
                color: TEXT,
              }}>
                {status.type === "success" ? "✅ " : "⚠️ "}{status.text}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                disabled={sending}
                className="contact-submit"
                style={{
                  background: ACCENT,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 32px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: sending ? "not-allowed" : "pointer",
                  boxShadow: "0 6px 24px rgba(28,58,47,0.40)",
                  opacity: sending ? 0.7 : 1,
                  letterSpacing: "0.02em",
                }}
              >
                {sending ? "Envoi en cours…" : "Envoyer le message →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}