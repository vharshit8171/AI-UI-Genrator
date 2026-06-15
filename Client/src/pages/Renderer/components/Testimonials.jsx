import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

function StarRating({ rating = 5, accentColor }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          viewBox="0 0 20 20"
          fill={i < rating ? accentColor : "rgba(255,255,255,0.15)"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({
  title = "Customer Reviews",
  subtitle = "",
  items = [],
  stats = [],
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const [activeCard, setActiveCard] = useState(null);

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
          width: "400px",
          height: "400px",
          top: "-60px",
          right: "-60px",
          background: s.accentFaint,
        }}
      />
      <div
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "280px",
          height: "280px",
          bottom: "-40px",
          left: "5%",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold mb-5 backdrop-blur-sm"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
            }}
          >
            <span>⭐</span>
            <span>Testimonials</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: s.text }}
          >
            {title}
          </h2>

          <div className="flex justify-center mt-4">
            <div
              className="h-1 w-16 rounded-full"
              style={{
                background: `linear-gradient(to right, ${s.accent}, ${s.accentFaint})`,
              }}
            />
          </div>

          {subtitle && (
            <p
              className="mt-5 text-base md:text-lg leading-relaxed"
              style={{ color: s.mutedText }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {items?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <div
                key={i}
                className="group backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                style={{
                  background: activeCard === i ? s.accentFaint : s.cardBg,
                  border:
                    activeCard === i
                      ? `1px solid ${s.accentSubtle}`
                      : s.cardBorder,
                  borderRadius: s.cardRadius,
                  backdropFilter: s.cardBlur,
                  boxShadow:
                    activeCard === i ? `0 8px 32px ${s.accent}18` : "none",
                  padding: "24px",
                }}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="text-4xl leading-none font-serif"
                    style={{ color: `${s.accent}50` }}
                  >
                    "
                  </div>
                  <StarRating
                    rating={item.rating ?? 5}
                    accentColor={s.accent}
                  />
                </div>

                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: s.mutedText }}
                >
                  {item.review || item.message}
                </p>

                <div
                  className="my-5 h-px"
                  style={{ background: s.cardBorder }}
                />

                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 flex items-center justify-center font-bold text-base shrink-0 transition-all duration-300"
                    style={{
                      background:
                        activeCard === i ? `${s.accent}30` : s.accentFaint,
                      border: `1.5px solid ${s.accentSubtle}`,
                      color: s.accent,
                      borderRadius: s.cardRadius,
                    }}
                  >
                    {item.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-semibold text-sm truncate"
                      style={{ color: s.text }}
                    >
                      {item.name}
                    </h4>
                    {item.role && (
                      <p
                        className="text-xs truncate"
                        style={{ color: s.mutedText }}
                      >
                        {item.role}
                      </p>
                    )}
                  </div>

                  <div
                    className="shrink-0 flex items-center gap-1 px-2.5 py-1 text-xs font-medium"
                    style={{
                      background: s.accentFaint,
                      color: s.accent,
                      borderRadius: s.cardRadius,
                    }}
                  >
                    ✓ Verified
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16"
            style={{
              background: s.cardBg,
              border: `1px dashed ${s.cardBorder}`,
              borderRadius: s.cardRadius,
            }}
          >
            <div className="text-5xl mb-4">💬</div>
            <p className="text-sm" style={{ color: s.mutedText }}>
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        )}

        {stats?.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-5 text-center transition-all duration-300 hover:-translate-y-0.5 cursor-default"
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
                <h3
                  className="text-3xl font-extrabold"
                  style={{ color: s.accent }}
                >
                  {stat.value}
                </h3>
                <p
                  className="mt-1 text-sm font-medium"
                  style={{ color: s.mutedText }}
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
