export default function Features({
  title,
  subtitle,
  items = [],
  ctaText,
  styles = {},
}) {
  const textColor = styles?.text || "#ffffff";

  const subTextColor = styles?.text
    ? `${styles.text}99`
    : "rgba(255,255,255,0.6)";

  const accentColor = styles?.accent || "#fb923c";

  return (
    <section
      style={{
        background:
          styles?.bg || "linear-gradient(to bottom, #0f172a, #111827)",
        color: textColor,
        padding: styles?.padding || "65px 24px",
      }}
      className="relative overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
          background: `${accentColor}18`,
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{
              border: `1px solid ${accentColor}30`,
              background: `${accentColor}15`,
              color: accentColor,
            }}
          >
            ⭐ Features
          </div>

          {title && (
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {title}
            </h2>
          )}

          {subtitle && (
            <p
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: subTextColor }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items?.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{
                  background: `${accentColor}18`,
                  border: `1px solid ${accentColor}25`,
                }}
              >
                {item.icon || "✨"}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: subTextColor }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {ctaText && (
          <div className="mt-12 text-center">
            <button
              className="px-6 py-2.5 rounded-xl font-semibold text-sm text-black shadow-md transition-all duration-200 hover:opacity-90"
              style={{
                background: accentColor,
                boxShadow: `0 4px 20px ${accentColor}30`,
              }}
            >
              {ctaText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}