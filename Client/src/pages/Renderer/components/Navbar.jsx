import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Navbar({logo = "Brand",links = [],styles = {},}) {
  const { id } = useParams();
  const location = useLocation();
  const isPreview = location.pathname.includes("/preview");
  const [menuOpen, setMenuOpen] = useState(false);

  const accentColor = styles?.accent || "#f97316";
  const textColor = styles?.text || "#ffffff";
  const mutedTextColor = styles?.text ? `${styles.text}80` : "rgba(255,255,255,0.7)";

  const resolvePath = (link) => {
    const cleanPath =
      link.path === "/"
        ? "/"
        : link.path.startsWith("/")
        ? link.path
        : `/${link.path}`;
    return isPreview ? `/preview/${id}${cleanPath}` : cleanPath;
  };

  return (
    <header style={{ background: styles?.bg ||
          "linear-gradient(to right, #0f172a, #111827, #1e293b)",
        color: textColor,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
      className="sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3.5 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-bold text-base shadow-md shrink-0"
            style={{ background: accentColor }}
          >
            {logo?.charAt(0)?.toUpperCase()}
          </div>

          <h1 className="text-base md:text-lg font-bold tracking-tight"
            style={{ color: textColor }}
          >
            {logo}
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {links?.map((link, i) => (
            <Link key={i}
              to={resolvePath(link)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
              style={{ color: mutedTextColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = textColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = mutedTextColor)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-white/10"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: mutedTextColor,
            }}
          >
            Login
          </button>
          <button className="px-5 py-2 rounded-lg text-black text-sm font-semibold transition-all duration-200 cursor-pointer hover:opacity-90"
            style={{
              background: accentColor,
              boxShadow: `0 4px 14px ${accentColor}35`,
            }}
          >
            Get Started
          </button>
        </div>

        <button className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{
              background: textColor,
              transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <span className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{
              background: textColor,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{
              background: textColor,
              transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-1"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background:
              styles?.bg ||
              "linear-gradient(to right, #0f172a, #111827, #1e293b)",
          }}
        >
          {links?.map((link, i) => (
            <Link key={i}
              to={resolvePath(link)}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
              style={{ color: mutedTextColor }}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-3 flex flex-col gap-2">
            <button className="w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-white/10"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: mutedTextColor,
              }}
            >
              Login
            </button>
            <button className="w-full px-4 py-2.5 rounded-lg text-black text-sm font-semibold transition-all duration-200 cursor-pointer hover:opacity-90"
              style={{ background: accentColor }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}