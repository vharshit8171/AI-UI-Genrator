export default function Hero({
  badge,
  headline = "Build Something Amazing",
  subheadline = "Create modern and responsive websites with ease.",
  buttons = [],
  stats = [],
  styles = {},
}) {
  return (
    <section
      style={{
        background:
          styles?.bg ||
          "linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
        padding: styles?.padding || "90px 24px",
        textAlign: styles?.alignment || "center",
      }}
      className="relative overflow-hidden w-full"
    >
      {/* Background Blur Effects */}
      <div
        className="absolute bg-orange-500/20 blur-3xl rounded-full pointer-events-none"
        style={{
          width: "300px",
          height: "280px",
          top: "60px",
          left: "80px",
        }}
      />

      <div
        className="absolute bg-purple-500/10 blur-3xl rounded-full pointer-events-none"
        style={{
          width: "320px",
          height: "320px",
          bottom: "60px",
          right: "-80px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-5">
            {badge}
          </div>
        )}

        {/* Headline */}
        <h1
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto"
          style={{
            color: styles?.text || "#ffffff",
          }}
        >
          {headline}
        </h1>

        {/* Subheadline */}
        <p
          className="mt-6 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          style={{
            color: styles?.text
              ? `${styles.text}CC`
              : "rgba(255,255,255,0.72)",
          }}
        >
          {subheadline}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {buttons?.map((btn, i) => (
            <button
              key={i}
              style={
                btn?.primary
                  ? {
                      background: styles?.accent || "orange-500",
                      color: "#000",
                    }
                  : {}
              }
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md cursor-pointer
                ${
                  btn?.primary
                    ? "hover:opacity-90 text-black"
                    : "bg-orange-500 hover:bg-white/20 text-white border border-white/10"
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        {stats?.length > 0 && (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3
                  className="text-2xl font-bold"
                  style={{
                    color: styles?.accent || "#fb923c",
                  }}
                >
                  {stat.value}
                </h3>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color: styles?.text
                      ? `${styles.text}99`
                      : "rgba(255,255,255,0.6)",
                  }}
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