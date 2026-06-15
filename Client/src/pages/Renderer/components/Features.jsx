import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function Features({
  title,
  subtitle,
  items = [],
  ctaText,
  badgeLabel = "Features",
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  return (
    <section
      style={{
        background: s.bg,
        color: s.text,
        padding: s.padding,
        ...s.pattern,
      }}
      className="relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.accentSubtle}, transparent)`,
        }}
      />

      <div
        className="absolute pointer-events-none blur-[120px] rounded-full"
        style={{
          width: "600px",
          height: "400px",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          background: s.accentFaint,
        }}
      />
      <div
        className="absolute pointer-events-none blur-[100px] rounded-full"
        style={{
          width: "300px",
          height: "300px",
          bottom: "0",
          right: "5%",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold mb-6 tracking-widest uppercase"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: s.accent }}
            />
            {badgeLabel}
          </div>

          {title && (
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{ color: s.text }}
            >
              {title}
            </h2>
          )}

          {subtitle && (
            <p
              className="mt-5 text-base md:text-lg leading-relaxed"
              style={{ color: s.mutedText }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items?.map((item, i) => (
            <div
              key={i}
              className="group relative p-6 transition-all duration-300 overflow-hidden cursor-default"
              style={{
                background: s.cardBg,
                border: s.cardBorder,
                borderRadius: s.cardRadius,
                backdropFilter: s.cardBlur,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = s.accentFaint;
                e.currentTarget.style.borderColor = s.accentSubtle;
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${s.accentSubtle}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = s.cardBg;
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.border = s.cardBorder;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${s.accent}60, transparent)`,
                }}
              />

              <div
                className="absolute top-5 right-5 text-xs font-bold tabular-nums"
                style={{ color: s.mutedText }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <div
                className="w-12 h-12 flex items-center justify-center text-xl mb-5 transition-all duration-300"
                style={{
                  background: s.accentFaint,
                  border: `1px solid ${s.accentSubtle}`,
                  borderRadius: s.cardRadius,
                }}
              >
                {item.icon || "✨"}
              </div>

              <h3
                className="text-base font-semibold mb-2 leading-snug"
                style={{ color: s.text }}
              >
                {item.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: s.mutedText }}
              >
                {item.description}
              </p>

              {item.tag && (
                <div className="mt-4">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      background: s.accentFaint,
                      color: s.accent,
                      border: `1px solid ${s.accentSubtle}`,
                      borderRadius: s.cardRadius,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {items?.length === 0 && (
          <div
            className="text-center py-16"
            style={{
              border: `1px dashed ${s.cardBorder}`,
              borderRadius: s.cardRadius,
              color: s.mutedText,
            }}
          >
            <div className="text-3xl mb-3">🧩</div>
            <p className="text-sm">No features to display yet.</p>
          </div>
        )}

        {ctaText && (
          <div className="mt-14 text-center">
            <button
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-0.5"
              style={s.primaryBtn}
            >
              {ctaText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
