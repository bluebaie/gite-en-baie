"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function GiteGalleryClient({ images, title }: Props) {
  const [open,        setOpen]        = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile,    setIsMobile]    = useState(false);

  const gallery = images.filter(Boolean);

  // ── Détection mobile ────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Clavier ─────────────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape")     setOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((p) => (p + 1) % gallery.length);
      if (e.key === "ArrowLeft")  setActiveIndex((p) => (p - 1 + gallery.length) % gallery.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, gallery.length]);

  // ── Scroll body ─────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (gallery.length === 0) return null;

  // ── Swipe touch ─────────────────────────────────────────────────────
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setActiveIndex((p) => (p + 1) % gallery.length);
      else          setActiveIndex((p) => (p - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <>
      {/* ════ GRILLE GALERIE ════ */}
      <section style={{ marginBottom: 40 }}>

        {/* ── Desktop : grille 2+4 (inchangée) ── */}
        {!isMobile && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "220px 220px",
            gap: 8,
            borderRadius: 18,
            overflow: "hidden",
          }}>
            <div style={{ gridRow: "1 / 3", overflow: "hidden" }}>
              <img
                src={gallery[0]}
                alt={`${title} - photo 1`}
                onClick={() => { setActiveIndex(0); setOpen(true); }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }}
              />
            </div>
            {[1, 2, 3, 4].map((i) =>
              gallery[i] ? (
                <div key={i} style={{ overflow: "hidden", position: "relative" }}>
                  <img
                    src={gallery[i]}
                    alt={`${title} - photo ${i + 1}`}
                    onClick={() => { setActiveIndex(i); setOpen(true); }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }}
                  />
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
        )}

        {/* ── Mobile : image principale + strip ── */}
        {isMobile && (
          <div style={{ borderRadius: 16, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
              <img
                src={gallery[0]}
                alt={`${title} - photo 1`}
                onClick={() => { setActiveIndex(0); setOpen(true); }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }}
              />
              {gallery.length > 1 && (
                <button
                  onClick={() => { setActiveIndex(0); setOpen(true); }}
                  style={{
                    position: "absolute", right: 12, bottom: 12,
                    background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 10, padding: "7px 12px",
                    fontSize: 12, fontWeight: 600, color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ⊞ {gallery.length} photos
                </button>
              )}
            </div>

            {gallery.length > 1 && (
              <div style={{
                display: "flex", gap: 6,
                overflowX: "auto", padding: "8px 8px 4px",
                scrollbarWidth: "none",
                background: "#f5f0e8",
              }}>
                {gallery.slice(1, 6).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => { setActiveIndex(i + 1); setOpen(true); }}
                    style={{ flexShrink: 0, width: 80, height: 60, borderRadius: 8, overflow: "hidden", cursor: "zoom-in" }}
                  >
                    <img
                      src={img}
                      alt={`${title} - photo ${i + 2}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ════ LIGHTBOX ════ */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(10, 14, 26, 0.97)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "12px 0 0" : "20px 24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              width: "100%",
              maxWidth: isMobile ? "100%" : 1000,
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 10 : 14,
              height: isMobile ? "100%" : "auto",
            }}
          >
            {/* Barre supérieure */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: isMobile ? "0 16px" : "0",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: isMobile ? 12 : 13, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
                {!isMobile && <>{title} &nbsp;·&nbsp; </>}
                {activeIndex + 1} / {gallery.length}
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: isMobile ? 5 : 7,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  backdropFilter: "blur(10px)",
                  color: "#ffffff", borderRadius: 12,
                  padding: isMobile ? "8px 14px" : "10px 20px",
                  cursor: "pointer",
                  fontSize: isMobile ? 13 : 14, fontWeight: 600,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>✕</span>
                {isMobile ? "Fermer" : "Fermer & retourner à la page"}
              </button>
            </div>

            {/* Image principale */}
            <div style={{
              position: "relative",
              background: "#0d1117",
              borderRadius: isMobile ? 0 : 16,
              overflow: "hidden",
              lineHeight: 0,
              flex: isMobile ? "1" : "unset",
              display: "flex", alignItems: "center",
            }}>
              <img
                src={gallery[activeIndex]}
                alt={`${title} - photo ${activeIndex + 1}`}
                style={{
                  width: "100%",
                  maxHeight: isMobile ? "100%" : "70vh",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
              />

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveIndex((p) => (p - 1 + gallery.length) % gallery.length)}
                    style={{
                      position: "absolute", top: "50%", left: isMobile ? 10 : 14,
                      transform: "translateY(-50%)",
                      width: 44, height: 44, borderRadius: "50%",
                      border: "none", background: "rgba(255,255,255,0.90)",
                      color: "#111827", fontSize: 18, fontWeight: 700,
                      cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >←</button>
                  <button
                    onClick={() => setActiveIndex((p) => (p + 1) % gallery.length)}
                    style={{
                      position: "absolute", top: "50%", right: isMobile ? 10 : 14,
                      transform: "translateY(-50%)",
                      width: 44, height: 44, borderRadius: "50%",
                      border: "none", background: "rgba(255,255,255,0.90)",
                      color: "#111827", fontSize: 18, fontWeight: 700,
                      cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >→</button>
                </>
              )}
            </div>

            {/* Miniatures */}
            <div style={{
              display: "flex", gap: 6, overflowX: "auto",
              padding: isMobile ? "0 16px 16px" : "0 0 4px",
              scrollbarWidth: "none", flexShrink: 0,
            }}>
              {gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    flexShrink: 0, padding: 0,
                    border: index === activeIndex ? "2px solid #ffffff" : "2px solid transparent",
                    borderRadius: 8, overflow: "hidden",
                    background: "transparent", cursor: "pointer",
                    opacity: index === activeIndex ? 1 : 0.45,
                    transition: "opacity 0.15s, border-color 0.15s",
                  }}
                >
                  <img
                    src={img}
                    alt={`miniature ${index + 1}`}
                    style={{
                      width: isMobile ? 70 : 90,
                      height: isMobile ? 50 : 64,
                      objectFit: "cover", display: "block",
                    }}
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