import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function Navbar({ logo = "Brand", links = [], styles = {} }) {
  const { id } = useParams();
  const location = useLocation();
  const isPreview = location.pathname.includes("/preview");

  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const resolvePath = (link) => {
    const cleanPath =
      link.path === "/"
        ? "/home"
        : link.path.startsWith("/")
          ? link.path
          : `/${link.path}`;
    return isPreview ? `/preview/${id}${cleanPath}` : cleanPath;
  };

  const isActive = (link) => location.pathname === resolvePath(link);

  return (
    <header
      ref={menuRef}
      style={{
        background: s.bg,
        color: s.text,
        borderBottom: scrolled ? `1px solid ${s.accentSubtle}` : s.cardBorder,
        boxShadow: scrolled ? `0 4px 32px rgba(0,0,0,0.35)` : "none",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      className="sticky top-0 z-50 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-3 flex items-center justify-between gap-4">
        <Link
          to={isPreview ? `/preview/${id}/` : "/"}
          className="flex items-center gap-2.5 shrink-0 group"
          style={{ textDecoration: "none" }}
        >
          <div
            className="w-9 h-9 flex items-center justify-center font-bold text-sm shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{
              background: s.accent,
              color: theme.mood === "light" ? "#ffffff" : "#000000",
              borderRadius: s.cardRadius,
              boxShadow: `0 4px 14px ${s.accent}40`,
            }}
          >
            {logo?.charAt(0)?.toUpperCase()}
          </div>
          <span
            className="text-base font-bold tracking-tight hidden sm:block"
            style={{ color: s.text }}
          >
            {logo}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {links?.map((link, i) => {
            const active = isActive(link);
            return (
              <Link
                key={i}
                to={resolvePath(link)}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  color: active ? s.text : s.mutedText,
                  background: active ? s.cardBg : "transparent",
                  borderRadius: s.cardRadius,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = s.text;
                    e.currentTarget.style.background = s.cardBg;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = s.mutedText;
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: s.accent }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            className="px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
            style={s.ghostBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Login
          </button>
          <button
            className="px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={s.primaryBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = `0 6px 20px ${s.accent}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = s.primaryBtn.boxShadow;
            }}
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.25 w-9 h-9 cursor-pointer transition-all duration-200"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          style={{
            background: menuOpen ? s.cardBg : "transparent",
            borderRadius: s.cardRadius,
          }}
        >
          {[
            menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
            null,
            menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
          ].map((transform, i) =>
            i === 1 ? (
              <span
                key={i}
                className="block h-[1.5px] w-5 rounded-full"
                style={{
                  background: s.text,
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
              />
            ) : (
              <span
                key={i}
                className="block h-[1.5px] w-5 rounded-full"
                style={{
                  background: s.text,
                  transform,
                  transition: "transform 0.25s ease",
                }}
              />
            ),
          )}
        </button>
      </div>

      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? "420px" : "0px",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.32s ease, opacity 0.25s ease",
          borderTop: menuOpen ? s.cardBorder : "none",
          background: s.bg,
        }}
      >
        <div className="px-4 pb-5 pt-3 flex flex-col gap-1">
          {links?.map((link, i) => {
            const active = isActive(link);
            return (
              <Link
                key={i}
                to={resolvePath(link)}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200"
                style={{
                  color: active ? s.text : s.mutedText,
                  background: active ? s.accentFaint : "transparent",
                  borderLeft: active
                    ? `2px solid ${s.accent}`
                    : `2px solid transparent`,
                  borderRadius: s.cardRadius,
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div
            className="mt-3 pt-3 flex flex-col gap-2"
            style={{ borderTop: s.cardBorder }}
          >
            <button
              className="w-full px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer"
              style={s.ghostBtn}
            >
              Login
            </button>
            <button
              className="w-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer"
              style={s.primaryBtn}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
