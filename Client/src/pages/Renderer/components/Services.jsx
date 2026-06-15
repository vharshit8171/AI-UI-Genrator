import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

const DEFAULT_ICONS = ["⚡", "🎯", "🛡️", "🚀", "💡", "🔧", "📊", "🎨"];

export default function Services({
  title = "Our Services",
  subtitle,
  items = [],
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
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "500px",
          height: "400px",
          bottom: "-100px",
          left: "-100px",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium mb-5"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
            }}
          >
            🛠️ Services
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items?.map((item, i) => (
            <div
              key={i}
              className="group relative p-7 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
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
                className="absolute top-5 right-5 text-xs font-bold opacity-30"
                style={{ color: s.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <div
                className="w-12 h-12 flex items-center justify-center text-xl mb-5"
                style={{
                  background: s.accentFaint,
                  border: `1px solid ${s.accentSubtle}`,
                  borderRadius: s.cardRadius,
                }}
              >
                {item.icon || DEFAULT_ICONS[i % DEFAULT_ICONS.length]}
              </div>

              <h3
                className="text-lg font-semibold mb-3"
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

              <div
                className="mt-5 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: s.accent }}
              >
                Learn more <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
