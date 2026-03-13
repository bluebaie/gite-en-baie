"use client";

import { useState } from "react";

const ACCENT      = "#1C3A2F";
const ACCENT_DARK = "#142b22";
const ACCENT_GLOW = "rgba(28,58,47,0.35)";

export default function ReserveButton({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 4px 20px ${ACCENT_GLOW}; }
          50%       { box-shadow: 0 6px 32px rgba(28,58,47,0.55), 0 0 0 6px rgba(28,58,47,0.10); }
        }
        .reserve-btn {
          animation: pulse-glow 2.8s ease-in-out infinite;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .reserve-btn:hover {
          animation: none;
          transform: scale(1.035) translateY(-1px);
          box-shadow: 0 10px 36px rgba(28,58,47,0.45);
        }
        .reserve-btn:active {
          transform: scale(0.98) translateY(0px);
          box-shadow: 0 4px 16px ${ACCENT_GLOW};
        }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="reserve-btn"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: "16px 20px",
          background: hovered ? ACCENT_DARK : ACCENT,
          color: "#fff",
          borderRadius: 14,
          fontSize: 16,
          fontWeight: 700,
          textDecoration: "none",
          boxSizing: "border-box",
          letterSpacing: "0.2px",
          marginBottom: 6,
          cursor: "pointer",
        }}
      >
        🗓&nbsp; Réserver ce gîte
      </a>
    </>
  );
}