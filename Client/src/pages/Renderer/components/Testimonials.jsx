export default function Testimonials({
  title = "Customer Reviews",
  subtitle = "",
  items = [],
  stats = [],
  styles = {},
}) {

  const accentColor = styles?.accent || "#fb923c";
  const textColor = styles?.text || "#ffffff";

  const mutedColor = styles?.text
    ? `${styles.text}99`
    : "rgba(255,255,255,0.7)";

  const subtleColor = styles?.text
    ? `${styles.text}70`
    : "rgba(255,255,255,0.6)";

  const verySubtleColor = styles?.text
    ? `${styles.text}50`
    : "rgba(255,255,255,0.4)";

  return (
    <section
      style={{
        background:
          styles?.bg ||
          "linear-gradient(to bottom, #111827, #0f172a)",
        color: textColor,
        padding: styles?.padding || "80px 24px",
      }}
      className="relative overflow-hidden"
    >

      {/* Background Glow */}
      <div
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
          top: "0",
          right: "0",
          background: `${accentColor}18`,
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          {/* Small Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{
              border: `1px solid ${accentColor}30`,
              background: `${accentColor}15`,
              color: accentColor,
            }}
          >
            ⭐ Testimonials
          </div>

          {/* Title */}
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: textColor }}
          >
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: subtleColor }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {items?.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border =
                  `1px solid ${accentColor}40`;

                e.currentTarget.style.background =
                  "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border =
                  "1px solid rgba(255,255,255,0.08)";

                e.currentTarget.style.background =
                  "rgba(255,255,255,0.04)";
              }}
            >

              {/* Quote */}
              <div
                className="text-4xl leading-none mb-4"
                style={{ color: `${accentColor}40` }}
              >
                "
              </div>

              {/* Message */}
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: mutedColor }}
              >
                {item.message}
              </p>

              {/* User */}
              <div className="mt-6 flex items-center gap-3">

                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shrink-0"
                  style={{
                    background: `${accentColor}20`,
                    border: `1px solid ${accentColor}25`,
                    color: accentColor,
                  }}
                >
                  {item.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {/* Info */}
                <div>
                  <h4
                    className="font-semibold text-sm"
                    style={{ color: textColor }}
                  >
                    {item.name}
                  </h4>

                  {item.role && (
                    <p
                      className="text-xs"
                      style={{ color: verySubtleColor }}
                    >
                      {item.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Stats */}
        {stats?.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">

            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3
                  className="text-2xl font-bold"
                  style={{ color: accentColor }}
                >
                  {stat.value}
                </h3>

                <p
                  className="mt-1 text-sm"
                  style={{ color: subtleColor }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}