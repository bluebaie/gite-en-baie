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

// ── Pages avec Hero sombre (header transparent au top) ──────────────────
// Sur ces pages, le fond derrière le header est déjà sombre → texte blanc
// Sur toutes les autres (ex: /gites/[slug] fond ivoire) → header sombre fixe
const DARK_HERO_PAGES = ["/", "/gites", "/contact"];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash || "");
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHome = pathname === "/";

  // ── Est-ce une page avec Hero sombre ? ───────────────────────────────
  const hasDarkHero = DARK_HERO_PAGES.some(
    (p) => pathname === p || (p !== "/" && pathname?.startsWith(p + "/") === false && pathname === p)
  );
  // Pages gîtes individuelles (/gites/[slug]) = fond ivoire = PAS dark hero
  const isGitePage = pathname?.startsWith("/gites/");

  // Sur page gîte individuelle : toujours sombre (fond ivoire derrière)
  // Sur pages avec hero sombre : transparent au top, glass au scroll
  const alwaysDark = isGitePage || !hasDarkHero;

  // ── Styles dynamiques ────────────────────────────────────────────────

  // Wrapper du header
  const wrapperStyle = useMemo(() => {
    if (alwaysDark) {
      // Toujours sombre : fond #0F1E2B opaque, pas d'effet transparent
      return {
        background: scrolled
          ? "rgba(11, 31, 37, 0.98)"
          : "rgba(11, 31, 37, 0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.18)" : "none",
        transition: "all 0.3s ease",
        borderRadius: 16,
      };
    }
    // Pages hero sombre : transparent → glass au scroll
    return {
      background: scrolled
        ? "rgba(11, 31, 37, 0.92)"
        : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.20)" : "none",
      transition: "all 0.35s ease",
      borderRadius: 16,
    };
  }, [alwaysDark, scrolled]);

  // Texte toujours blanc (le fond est toujours sombre ou transparent sur hero sombre)
  const textColor = "rgba(255,255,255,0.90)";
  const textMuted = "rgba(255,255,255,0.60)";

  const getActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return isHome && hash === href.replace("/", "");
    return pathname?.startsWith(href);
  };

  return (
    <header style={{
      position: "fixed",
      inset: "0 0 auto 0",
      zIndex: 50,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "10px 20px 0" }}>
        <div style={wrapperStyle}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
          }}>

            {/* ── Brand ── */}
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center",
              gap: 8, textDecoration: "none",
              color: textColor,
              fontSize: 15, letterSpacing: "0.2px",
            }}>
              <span style={{ fontWeight: 600 }}>Gîtes</span>
              <span style={{ opacity: 0.7, fontWeight: 400 }}>en Baie</span>
            </Link>

            {/* ── Desktop nav ── */}
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

              {/* ── CTA "Vérifier les disponibilités" ── */}
              <a
                href="https://beds24.com/booking2.php?ownerid=114927&referer=BookingLink"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 8,
                  display: "inline-flex", alignItems: "center",
                  padding: "8px 18px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  background: "#1C3A2F",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.10)",
                  letterSpacing: "0.1px",
                  transition: "opacity 0.18s",
                  whiteSpace: "nowrap",
                }}
              >
                Vérifier les disponibilités
              </a>
            </nav>

            {/* ── Mobile burger ── */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                display: "none", // caché sur desktop via media query — voir note ci-dessous
                alignItems: "center",
                padding: "8px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: textColor,
                fontSize: 13, fontWeight: 500,
                cursor: "pointer",
              }}
              className="md:hidden"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? "✕" : "Menu"}
            </button>
          </div>

          {/* ── Mobile panel ── */}
          <div
            className={mobileOpen ? "block md:hidden" : "hidden"}
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "12px 16px 16px",
            }}
          >
            <div style={{
              display: "flex", flexDirection: "column", gap: 4,
              background: "rgba(0,0,0,0.25)",
              borderRadius: 12, padding: 8,
            }}>
              {NAV.map((item) => {
                const active = getActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "11px 14px", borderRadius: 10,
                      fontSize: 14, textDecoration: "none",
                      fontWeight: active ? 600 : 400,
                      color: active ? "#fff" : textMuted,
                      background: active ? "rgba(255,255,255,0.10)" : "transparent",
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
                  display: "block",
                  margin: "8px 0 0",
                  padding: "12px 14px",
                  borderRadius: 10,
                  fontSize: 14, fontWeight: 600,
                  color: "#fff",
                  background: "#1C3A2F",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Vérifier les disponibilités
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}