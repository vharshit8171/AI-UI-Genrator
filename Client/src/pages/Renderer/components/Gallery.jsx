import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #f97316, #ea580c)",
  "linear-gradient(135deg, #06b6d4, #0284c7)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  "linear-gradient(135deg, #f43f5e, #e11d48)",
  "linear-gradient(135deg, #eab308, #ca8a04)",
  "linear-gradient(135deg, #ec4899, #db2777)",
  "linear-gradient(135deg, #14b8a6, #0d9488)",
];

export default function Gallery({
  title = "Our Gallery",
  subtitle,
  items = [],
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight" && lightboxIndex !== null)
        setLightboxIndex((lightboxIndex + 1) % items.length);
      if (e.key === "ArrowLeft" && lightboxIndex !== null)
        setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, items.length]);

  const allTags = [
    "All",
    ...Array.from(new Set(items.map((i) => i.tag).filter(Boolean))),
  ];

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((i) => i.tag === activeFilter);

  return (
    <section
      ref={sectionRef}
      style={{
        background: s.bg,
        color: s.text,
        padding: s.padding,
        ...s.pattern,
      }}
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${s.accent}05 1px, transparent 1px), linear-gradient(90deg, ${s.accent}05 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          top: "-80px",
          right: "-80px",
          background: `radial-gradient(ellipse, ${s.accentFaint} 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold mb-5"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
              boxShadow: `0 0 20px ${s.accent}18`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: s.accent }}
            />
            Gallery
          </div>

          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: s.text }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: s.mutedText }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {allTags.length > 1 && (
          <div
            className="flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className="px-4 py-1.5 text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: activeFilter === tag ? s.accent : s.accentFaint,
                  color:
                    activeFilter === tag
                      ? theme.mood === "light"
                        ? "#fff"
                        : "#000"
                      : s.accent,
                  border: `1px solid ${s.accentSubtle}`,
                  borderRadius: s.cardRadius,
                  boxShadow:
                    activeFilter === tag ? `0 4px 16px ${s.accent}40` : "none",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item, i) => {
            const isHero = i === 0;
            return (
              <div
                key={i}
                onClick={() => setLightboxIndex(items.indexOf(item))}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-500 ${isHero ? "md:col-span-2 md:row-span-2" : ""}`}
                style={{
                  minHeight: isHero ? "320px" : "180px",
                  borderRadius: s.cardRadius,
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateY(0) scale(1)"
                    : "translateY(20px) scale(0.97)",
                  transitionDelay: `${i * 60 + 300}ms`,
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.caption || `Gallery item ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ minHeight: "inherit" }}
                  />
                ) : (
                  <div
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background:
                        PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
                      minHeight: "inherit",
                    }}
                  />
                )}

                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                  }}
                >
                  <div
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: s.cardRadius,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>

                  <div className="flex items-end justify-between gap-3">
                    {item.caption && (
                      <p className="text-sm font-semibold text-white leading-tight drop-shadow">
                        {item.caption}
                      </p>
                    )}
                    {item.tag && (
                      <span
                        className="shrink-0 inline-block px-2.5 py-0.5 text-xs font-bold"
                        style={{
                          background: `${s.accent}35`,
                          color: s.accent,
                          border: `1px solid ${s.accent}40`,
                          backdropFilter: "blur(4px)",
                          borderRadius: s.cardRadius,
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${s.accentSubtle}`,
                    borderRadius: s.cardRadius,
                  }}
                />
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24" style={{ color: s.mutedText }}>
            <p className="text-4xl mb-4">🖼️</p>
            <p className="text-sm">No items in this category.</p>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white transition-colors"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: s.cardRadius,
            }}
            onClick={() => setLightboxIndex(null)}
          >
            ✕
          </button>

          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: s.cardRadius,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + items.length) % items.length,
              );
            }}
          >
            ←
          </button>

          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: s.cardRadius,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % items.length);
            }}
          >
            →
          </button>

          <div
            className="max-w-4xl max-h-[80vh] w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              border: `1px solid ${s.accentSubtle}`,
              borderRadius: s.cardRadius,
            }}
          >
            {items[lightboxIndex]?.image ? (
              <img
                src={items[lightboxIndex].image}
                alt={items[lightboxIndex].caption || "Gallery"}
                className="w-full max-h-[80vh] object-contain"
              />
            ) : (
              <div
                className="w-full flex items-center justify-center text-white text-lg font-semibold"
                style={{
                  background:
                    PLACEHOLDER_GRADIENTS[
                      lightboxIndex % PLACEHOLDER_GRADIENTS.length
                    ],
                  height: "500px",
                }}
              >
                {items[lightboxIndex]?.caption || `Item ${lightboxIndex + 1}`}
              </div>
            )}
          </div>

          {(items[lightboxIndex]?.caption || items[lightboxIndex]?.tag) && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                borderRadius: s.cardRadius,
              }}
            >
              {items[lightboxIndex]?.caption && (
                <span className="text-sm text-white font-medium">
                  {items[lightboxIndex].caption}
                </span>
              )}
              {items[lightboxIndex]?.tag && (
                <span
                  className="text-xs font-bold px-2.5 py-0.5"
                  style={{
                    background: s.accentFaint,
                    color: s.accent,
                    borderRadius: s.cardRadius,
                  }}
                >
                  {items[lightboxIndex].tag}
                </span>
              )}
              <span className="text-xs" style={{ color: s.mutedText }}>
                {lightboxIndex + 1} / {items.length}
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
