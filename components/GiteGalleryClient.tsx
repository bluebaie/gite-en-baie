"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function GiteGalleryClient({ images, title }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const gallery = images.filter(Boolean);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((p) => (p + 1) % gallery.length);
      if (e.key === "ArrowLeft") setActiveIndex((p) => (p - 1 + gallery.length) % gallery.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, gallery.length]);

  // Empêche le scroll du body quand la lightbox est ouverte
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (gallery.length === 0) return null;

  return (
    <>
      {/* ════ GRILLE GALERIE ════ */}
      <section style={{ marginBottom: 40 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "220px 220px",
          gap: 8,
          borderRadius: 18,
          overflow: "hidden",
        }}>
          {/* Grande image principale */}
          <div style={{ gridRow: "1 / 3", overflow: "hidden" }}>
            <img
              src={gallery[0]}
              alt={`${title} - photo 1`}
              onClick={() => { setActiveIndex(0); setOpen(true); }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }}
            />
          </div>

          {/* 4 petites */}
          {[1, 2, 3, 4].map((i) =>
            gallery[i] ? (
              <div key={i} style={{ overflow: "hidden", position: "relative" }}>
                <img
                  src={gallery[i]}
                  alt={`${title} - photo ${i + 1}`}
                  onClick={() => { setActiveIndex(i); setOpen(true); }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }}
                />
                {/* Bouton "Voir toutes les photos" sur la dernière petite image */}
                {i === 4 && gallery.length > 5 && (
                  <button
                    onClick={() => { setActiveIndex(0); setOpen(true); }}
                    style={{
                      position: "absolute", right: 12, bottom: 12,
                      background: "#fff", border: "1px solid #d1d5db",
                      borderRadius: 10, padding: "10px 14px",
                      fontSize: 13, fontWeight: 600, color: "#111827",
                      cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    }}
                  >
                    ⊞ Voir les {gallery.length} photos
                  </button>
                )}
              </div>
            ) : (
              <div key={i} style={{ background: "#EDE8DF" }} />
            )
          )}
        </div>
      </section>

      {/* ════ LIGHTBOX ════ */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(10, 14, 26, 0.94)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 1000, display: "flex", flexDirection: "column", gap: 14 }}
          >

            {/* ── Barre supérieure ── */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: "0.2px" }}>
                {title} &nbsp;·&nbsp; {activeIndex + 1} / {gallery.length}
              </span>

              {/* BOUTON FERMER bien visible */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  backdropFilter: "blur(10px)",
                  color: "#ffffff",
                  borderRadius: 12,
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.2px",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>✕</span>
                Fermer & retourner à la page
              </button>
            </div>

            {/* ── Image principale + flèches DANS l'image ── */}
            <div style={{
              position: "relative",
              background: "#0d1117",
              borderRadius: 16,
              overflow: "hidden",
              lineHeight: 0,
            }}>
              <img
                src={gallery[activeIndex]}
                alt={`${title} - photo ${activeIndex + 1}`}
                style={{
                  width: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
              />

              {/* Flèche gauche */}
              {gallery.length > 1 && (
                <button
                  onClick={() => setActiveIndex((p) => (p - 1 + gallery.length) % gallery.length)}
                  style={{
                    position: "absolute", top: "50%", left: 14,
                    transform: "translateY(-50%)",
                    width: 44, height: 44, borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,0.90)",
                    color: "#111827",
                    fontSize: 18, fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  ←
                </button>
              )}

              {/* Flèche droite */}
              {gallery.length > 1 && (
                <button
                  onClick={() => setActiveIndex((p) => (p + 1) % gallery.length)}
                  style={{
                    position: "absolute", top: "50%", right: 14,
                    transform: "translateY(-50%)",
                    width: 44, height: 44, borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,0.90)",
                    color: "#111827",
                    fontSize: 18, fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  →
                </button>
              )}
            </div>

            {/* ── Miniatures ── */}
            <div style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 4,
            }}>
              {gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    flexShrink: 0,
                    padding: 0,
                    border: index === activeIndex
                      ? "2px solid #ffffff"
                      : "2px solid transparent",
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "transparent",
                    cursor: "pointer",
                    opacity: index === activeIndex ? 1 : 0.55,
                    transition: "opacity 0.15s, border-color 0.15s",
                  }}
                >
                  <img
                    src={img}
                    alt={`miniature ${index + 1}`}
                    style={{ width: 90, height: 64, objectFit: "cover", display: "block" }}
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}