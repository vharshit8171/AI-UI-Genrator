import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function About({
  title = "About Us",
  description = "We are a passionate team building great products.",
  mission,
  values = [],
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
          height: "500px",
          top: "-120px",
          right: "-120px",
          background: s.accentFaint,
        }}
      />
      <div
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
          bottom: "-60px",
          left: "-60px",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold mb-6 backdrop-blur-sm"
              style={{
                background: s.accentFaint,
                border: `1px solid ${s.accentSubtle}`,
                color: s.accent,
                borderRadius: s.cardRadius,
              }}
            >
              <span>✦</span>
              <span>About Us</span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ color: s.text }}
            >
              {title}
            </h2>

            <div
              className="mt-4 h-1 w-16 rounded-full"
              style={{
                background: `linear-gradient(to right, ${s.accent}, ${s.accentFaint})`,
              }}
            />

            <p
              className="mt-6 text-base md:text-lg leading-relaxed"
              style={{ color: s.mutedText }}
            >
              {description}
            </p>

            {mission && (
              <div
                className="mt-8 p-6 relative overflow-hidden"
                style={{
                  background: s.accentFaint,
                  border: `1px solid ${s.accentSubtle}`,
                  borderRadius: s.cardRadius,
                  backdropFilter: s.cardBlur,
                }}
              >
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                  style={{ background: `${s.accent}25` }}
                />
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: s.accent }}
                  />
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: s.accent }}
                  >
                    Our Mission
                  </p>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: s.mutedText }}
                >
                  {mission}
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center gap-3">
              <button
                className="px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                style={s.primaryBtn}
              >
                Meet the Team
              </button>
              <button
                className="px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-80 cursor-pointer"
                style={s.ghostBtn}
              >
                Our Story →
              </button>
            </div>
          </div>

          <div>
            {values?.length > 0 ? (
              <div className="space-y-4">
                {values.map((val, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-default"
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
                      className="w-10 h-10 flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{
                        background: s.accentFaint,
                        border: `1px solid ${s.accentSubtle}`,
                        color: s.accent,
                        borderRadius: s.cardRadius,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h4
                        className="font-semibold text-sm mb-1"
                        style={{ color: s.text }}
                      >
                        {val.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: s.mutedText }}
                      >
                        {val.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "5+", label: "Years Experience", icon: "🏆" },
                  { value: "200+", label: "Happy Clients", icon: "😊" },
                  { value: "50+", label: "Team Members", icon: "👥" },
                  { value: "99%", label: "Satisfaction Rate", icon: "⭐" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
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
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <h3
                      className="text-3xl font-extrabold"
                      style={{ color: s.accent }}
                    >
                      {stat.value}
                    </h3>
                    <p
                      className="mt-1 text-xs font-medium"
                      style={{ color: s.mutedText }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div
              className="mt-6 flex items-center gap-3 px-5 py-3"
              style={{
                background: s.cardBg,
                border: s.cardBorder,
                borderRadius: s.cardRadius,
                backdropFilter: s.cardBlur,
              }}
            >
              <div
                className="w-8 h-8 flex items-center justify-center shrink-0"
                style={{
                  background: s.accentFaint,
                  color: s.accent,
                  borderRadius: s.cardRadius,
                }}
              >
                🌍
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: s.text }}>
                  Trusted Worldwide
                </p>
                <p className="text-xs" style={{ color: s.mutedText }}>
                  Serving customers across 40+ countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
