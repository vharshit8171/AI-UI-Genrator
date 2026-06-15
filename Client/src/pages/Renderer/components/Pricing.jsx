import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function Pricing({
  title = "Simple Pricing",
  subtitle,
  plans = [],
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const popularIndex = plans.length > 2 ? 1 : -1;

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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
            💎 Pricing
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

        <div
          className={`grid gap-6 ${
            plans.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {plans?.map((plan, i) => {
            const isPopular = i === popularIndex;
            return (
              <div
                key={i}
                className="relative p-7 flex flex-col transition-all duration-300"
                style={
                  isPopular
                    ? {
                        background: s.accentFaint,
                        border: `1px solid ${s.accentSubtle}`,
                        borderRadius: s.cardRadius,
                        backdropFilter: s.cardBlur,
                      }
                    : {
                        background: s.cardBg,
                        border: s.cardBorder,
                        borderRadius: s.cardRadius,
                        backdropFilter: s.cardBlur,
                      }
                }
              >
                {isPopular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold whitespace-nowrap"
                    style={{
                      background: s.accent,
                      color: theme.mood === "light" ? "#fff" : "#000",
                      borderRadius: s.cardRadius,
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: s.text }}
                >
                  {plan.name}
                </h3>

                <div className="mt-3 mb-6">
                  <span
                    className="text-4xl font-extrabold"
                    style={{ color: isPopular ? s.accent : s.text }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className="text-sm ml-1"
                      style={{ color: s.mutedText }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <div
                  className="w-full h-px mb-6"
                  style={{ background: s.cardBorder }}
                />

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features?.map((feat, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: s.mutedText }}
                    >
                      <span
                        className="mt-0.5 shrink-0 text-base leading-none"
                        style={{ color: s.accent }}
                      >
                        ✓
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 font-semibold text-sm transition-all duration-200 hover:opacity-90 cursor-pointer"
                  style={isPopular ? s.primaryBtn : s.ghostBtn}
                >
                  {plan.cta || "Get Started"}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-10 text-xs" style={{ color: s.mutedText }}>
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
