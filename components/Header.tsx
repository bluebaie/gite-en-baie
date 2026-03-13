"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Accueil",    href: "/" },
  { label: "Les gîtes", href: "/gites" },
  { label: "Découvrir", href: "/#decouvrir" },
  { label: "Contact",   href: "/contact" },
];

const DARK_HERO_PAGES = ["/", "/gites", "/contact"];
const MOBILE_BREAKPOINT = 768;

export default function Header() {
  const pathname = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const [hash,        setHash]        = useState<string>("");

  // ── Resize detector ─────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Scroll detector ──────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Hash tracker ─────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => setHash(window.location.hash || "");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // ── Close menu on nav ────────────────────────────────────────────────
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // ── Background logic ─────────────────────────────────────────────────
  const isHome      = pathname === "/";
  const isGitePage  = pathname?.startsWith("/gites/");
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname ?? "");
  const alwaysDark  = isGitePage || !hasDarkHero;

  const wrapperStyle = useMemo(() => {
    if (alwaysDark) {
      return {
        background: "rgba(11, 31, 37, 0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.18)" : "none",
        transition: "box-shadow 0.3s ease",
        borderRadius: isMobile ? 0 : 16,
      };
    }
    return {
      background: scrolled ? "rgba(11, 31, 37, 0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.20)" : "none",
      transition: "all 0.35s ease",
      borderRadius: isMobile ? 0 : 16,
    };
  }, [alwaysDark, scrolled, isMobile]);

  const textColor = "rgba(255,255,255,0.90)";
  const textMuted = "rgba(255,255,255,0.60)";

  const getActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return isHome && hash === href.replace("/", "");
    return pathname?.startsWith(href);
  };

  return (
    <header style={{ position: "fixed", inset: "0 0 auto 0", zIndex: 50 }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: isMobile ? "0" : "10px 20px 0",
      }}>
        <div style={wrapperStyle}>

          {/* ── Barre principale ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isMobile ? "14px 16px" : "12px 20px",
          }}>

            {/* Brand */}
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center",
              gap: 8, textDecoration: "none", color: textColor,
              fontSize: isMobile ? 16 : 15, letterSpacing: "0.2px",
            }}>
              <span style={{ fontWeight: 600 }}>Gîtes</span>
              <span style={{ opacity: 0.7, fontWeight: 400 }}>en Baie</span>
            </Link>

            {/* Desktop nav — caché sur mobile */}
            {!isMobile && (
              <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {NAV.map((item) => {
                  const active = getActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "7px 14px", borderRadius: 10,
                        fontSize: 14, textDecoration: "none",
                        fontWeight: active ? 600 : 400,
                        color: active ? "#fff" : textMuted,
                        background: active ? "rgba(255,255,255,0.12)" : "transparent",
                        transition: "all 0.18s ease",
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <a
                  href="https://beds24.com/booking2.php?ownerid=114927&referer=BookingLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: 8,
                    display: "inline-flex", alignItems: "center",
                    padding: "8px 18px", borderRadius: 10,
                    fontSize: 13, fontWeight: 600,
                    color: "#fff", background: "#1C3A2F",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.10)",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.18s",
                  }}
                >
                  Vérifier les disponibilités
                </a>
              </nav>
            )}

            {/* Mobile : CTA compact + burger */}
            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a
                  href="https://beds24.com/booking2.php?ownerid=114927&referer=BookingLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "8px 14px", borderRadius: 10,
                    fontSize: 12, fontWeight: 700,
                    color: "#fff", background: "#1C3A2F",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 12px rgba(28,58,47,0.4)",
                  }}
                >
                  Réserver
                </a>

                {/* Burger icon */}
                <button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                    width: 40, height: 40,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: mobileOpen ? "rgba(255,255,255,0.08)" : "transparent",
                    cursor: "pointer",
                    padding: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{
                    display: "block", width: 18, height: 1.5,
                    background: textColor, borderRadius: 2,
                    transform: mobileOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none",
                    transition: "transform 0.2s",
                  }} />
                  <span style={{
                    display: "block", width: 18, height: 1.5,
                    background: textColor, borderRadius: 2,
                    opacity: mobileOpen ? 0 : 1,
                    transition: "opacity 0.2s",
                  }} />
                  <span style={{
                    display: "block", width: 18, height: 1.5,
                    background: textColor, borderRadius: 2,
                    transform: mobileOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none",
                    transition: "transform 0.2s",
                  }} />
                </button>
              </div>
            )}
          </div>

          {/* ── Mobile panel déroulant ── */}
          {isMobile && mobileOpen && (
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "8px 12px 16px",
              animation: "fadeDown 0.2s ease",
            }}>
              <style>{`
                @keyframes fadeDown {
                  from { opacity: 0; transform: translateY(-6px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <div style={{
                display: "flex", flexDirection: "column", gap: 2,
                background: "rgba(0,0,0,0.20)",
                borderRadius: 14, padding: "6px 8px",
              }}>
                {NAV.map((item) => {
                  const active = getActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "flex", alignItems: "center",
                        padding: "12px 14px", borderRadius: 10,
                        fontSize: 15, textDecoration: "none",
                        fontWeight: active ? 600 : 400,
                        color: active ? "#fff" : textMuted,
                        background: active ? "rgba(255,255,255,0.10)" : "transparent",
                      }}
                    >
                      {item.label}
                      {active && (
                        <span style={{
                          marginLeft: "auto",
                          width: 6, height: 6, borderRadius: "50%",
                          background: "#7ecfb0",
                        }} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}