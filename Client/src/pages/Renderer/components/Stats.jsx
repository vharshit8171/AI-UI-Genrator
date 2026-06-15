import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function Stats({ title, subtitle, items = [], styles = {} }) {
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
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "300px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {title && (
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight"
                style={{ color: s.text }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="mt-4 text-base md:text-lg"
                style={{ color: s.mutedText }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid gap-5 ${
            items.length <= 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
              : items.length === 3
                ? "grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto"
                : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {items?.map((item, i) => (
            <div
              key={i}
              className="relative p-8 text-center group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: s.cardBg,
                border: s.cardBorder,
                borderRadius: s.cardRadius,
                backdropFilter: s.cardBlur,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${s.accentSubtle}`;
                e.currentTarget.style.background = s.accentFaint;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = s.cardBorder;
                e.currentTarget.style.background = s.cardBg;
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                style={{ background: `${s.accent}60` }}
              />

              <h3
                className="text-4xl md:text-5xl font-extrabold tracking-tight"
                style={{ color: s.accent }}
              >
                {item.value}
              </h3>

              <p
                className="mt-3 text-sm font-medium"
                style={{ color: s.mutedText }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
