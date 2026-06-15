import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function RichText({ title, body, badge, styles = {} }) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const paragraphs = body ? body.split(/\n\n+/).filter(Boolean) : [];

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
          backgroundImage: `linear-gradient(${s.accent}06 1px, transparent 1px), linear-gradient(90deg, ${s.accent}06 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${s.accentFaint} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-px pointer-events-none transition-all duration-1000"
        style={{
          background: `linear-gradient(to bottom, transparent, ${s.accent}60, transparent)`,
          opacity: visible ? 1 : 0,
        }}
      />

      <div className="relative max-w-3xl mx-auto">
        {badge && (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold mb-8 transition-all duration-700"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
              boxShadow: `0 0 20px ${s.accent}18`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: s.accent }}
            />
            {badge}
          </div>
        )}

        {title && (
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6 transition-all duration-700 delay-100"
            style={{
              color: s.text,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {title.split(" ").map((word, wi, arr) => (
              <span key={wi}>
                {wi === Math.floor(arr.length / 2) ? (
                  <span style={{ color: s.accent }}>{word} </span>
                ) : (
                  `${word} `
                )}
              </span>
            ))}
          </h2>
        )}

        <div
          className="h-1 rounded-full mb-10 transition-all duration-1000 delay-200"
          style={{
            background: `linear-gradient(to right, ${s.accent}, ${s.accentFaint})`,
            width: visible ? "80px" : "0px",
            boxShadow: `0 0 12px ${s.accent}50`,
          }}
        />

        <div className="space-y-6">
          {(paragraphs.length > 0 ? paragraphs : body ? [body] : []).map(
            (para, i) => (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed transition-all duration-700"
                style={{
                  color: s.mutedText,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transitionDelay: `${(i + 3) * 80}ms`,
                  borderLeft: i === 0 ? `2px solid ${s.accent}40` : "none",
                  paddingLeft: i === 0 ? "16px" : "0",
                }}
              >
                {para}
              </p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
