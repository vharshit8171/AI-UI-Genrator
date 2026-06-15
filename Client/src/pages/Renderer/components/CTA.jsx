import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function CTA({
  headline = "Ready to Get Started?",
  subheadline = "Join thousands of users building with us today.",
  button = {},
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const [hovered, setHovered] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section
      style={{
        background: s.bg,
        padding: s.padding,
        color: s.text,
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
      <div
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "220px",
          height: "220px",
          bottom: "-30px",
          right: "10%",
          background: s.accentFaint,
        }}
      />
      <div
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "180px",
          height: "180px",
          top: "0",
          left: "5%",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div
          className="px-8 py-14 md:py-20 relative overflow-hidden"
          style={{
            background: hovered ? s.accentFaint : s.cardBg,
            border: hovered ? `1px solid ${s.accentSubtle}` : s.cardBorder,
            borderRadius: s.cardRadius,
            backdropFilter: s.cardBlur,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 blur-2xl rounded-full pointer-events-none"
            style={{
              width: "300px",
              height: "80px",
              background: `${s.accent}${hovered ? "20" : "10"}`,
              transition: "background 0.4s ease",
            }}
          />

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold mb-6 backdrop-blur-sm"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
            }}
          >
            <span>🚀</span>
            <span>Get Started Today</span>
          </div>

          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
            style={{ color: s.text }}
          >
            {headline}
          </h2>

          <div className="flex justify-center mt-4">
            <div
              className="h-1 w-20 rounded-full"
              style={{
                background: `linear-gradient(to right, ${s.accent}, ${s.accentFaint})`,
              }}
            />
          </div>

          <p
            className="mt-6 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: s.mutedText }}
          >
            {subheadline}
          </p>

          {submitted ? (
            <div
              className="mt-10 inline-flex items-center gap-3 px-8 py-4"
              style={{
                background: s.accentFaint,
                border: `1px solid ${s.accentSubtle}`,
                color: s.accent,
                borderRadius: s.cardRadius,
              }}
            >
              <span className="text-lg">✓</span>
              <span className="font-semibold text-sm">
                You're in! We'll be in touch soon.
              </span>
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-4">
              {button?.label ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    className="px-8 py-3.5 font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    style={s.primaryBtn}
                  >
                    {button.label}
                  </button>
                  <button
                    className="px-8 py-3.5 font-semibold text-sm transition-all duration-200 hover:opacity-80 active:scale-95 cursor-pointer"
                    style={s.ghostBtn}
                  >
                    Learn More →
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="flex-1 px-5 py-3.5 text-sm outline-none transition-all duration-200"
                    style={{
                      background: s.cardBg,
                      border: emailFocused
                        ? `1px solid ${s.accentSubtle}`
                        : s.cardBorder,
                      color: s.text,
                      borderRadius: s.cardRadius,
                    }}
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer shrink-0"
                    style={s.primaryBtn}
                  >
                    Get Started
                  </button>
                </form>
              )}
            </div>
          )}

          <p className="mt-6 text-xs" style={{ color: s.mutedText }}>
            🔒 No credit card required · Free to start · Cancel anytime
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
            {[
              { icon: "⚡", label: "Instant Setup" },
              { icon: "🛡️", label: "Enterprise Security" },
              { icon: "🌍", label: "99.9% Uptime" },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color: s.mutedText }}
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
