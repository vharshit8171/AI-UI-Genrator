import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function FAQ({
  title = "Frequently Asked Questions",
  subtitle,
  items = [],
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

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
          width: "350px",
          height: "350px",
          bottom: "0",
          left: "0",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium mb-5"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
            }}
          >
            ❓ FAQ
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

        <div className="space-y-3">
          {items?.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? s.accentFaint : s.cardBg,
                  border: isOpen ? `1px solid ${s.accentSubtle}` : s.cardBorder,
                  borderRadius: s.cardRadius,
                  backdropFilter: s.cardBlur,
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  onClick={() => toggle(i)}
                >
                  <span
                    className="text-sm md:text-base font-semibold"
                    style={{ color: s.text }}
                  >
                    {item.question}
                  </span>

                  <div
                    className="shrink-0 w-7 h-7 flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? s.accent : s.cardBg,
                      color: isOpen
                        ? theme.mood === "light"
                          ? "#fff"
                          : "#000"
                        : s.mutedText,
                      borderRadius: s.cardRadius,
                      border: s.cardBorder,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <div
                      className="h-px w-full mb-4"
                      style={{ background: s.cardBorder }}
                    />
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: s.mutedText }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
