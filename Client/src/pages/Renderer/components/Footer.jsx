import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function Footer({
  logo = "Brand",
  tagline,
  description,
  columns = [],
  socials = [],
  newsletter,
  bottomLinks = [],
  copyright,
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <footer
      style={{
        background: s.bg,
        color: s.text,
        padding: s.padding || "64px 24px 28px",
        borderTop: `1px solid ${s.cardBorder}`,
        ...s.pattern,
      }}
      className="relative overflow-hidden"
    >
      <div
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
          top: "-80px",
          left: "10%",
          background: s.accentFaint,
        }}
      />
      <div
        className="absolute blur-3xl rounded-full pointer-events-none"
        style={{
          width: "250px",
          height: "250px",
          bottom: "0",
          right: "5%",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          <div className="space-y-5 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center font-extrabold text-base shrink-0"
                style={{
                  background: s.accent,
                  color: theme.mood === "light" ? "#ffffff" : "#000000",
                  borderRadius: s.cardRadius,
                  boxShadow: `0 4px 14px ${s.accent}40`,
                }}
              >
                {logo?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h2
                  className="text-base font-bold tracking-tight"
                  style={{ color: s.text }}
                >
                  {logo}
                </h2>
                {tagline && (
                  <p className="text-xs mt-0.5" style={{ color: s.mutedText }}>
                    {tagline}
                  </p>
                )}
              </div>
            </div>

            {description && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: s.mutedText }}
              >
                {description}
              </p>
            )}

            {socials?.length > 0 && (
              <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                {socials.map((social, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 text-sm flex items-center justify-center transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                    style={{
                      background: s.accentFaint,
                      border: `1px solid ${s.accentSubtle}`,
                      color: s.accent,
                      borderRadius: s.cardRadius,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${s.accent}30`;
                      e.currentTarget.style.boxShadow = `0 4px 12px ${s.accent}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = s.accentFaint;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    title={social.label || ""}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            )}
          </div>

          {columns?.map((col, ci) => (
            <div key={ci} className="space-y-4">
              <h3
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: s.text }}
              >
                {col.heading}
              </h3>
              <div
                className="w-8 h-0.5 rounded-full"
                style={{ background: `${s.accent}50` }}
              />
              <ul className="space-y-3">
                {col.links?.map((item, li) => (
                  <li key={li}>
                    <span
                      className="text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      style={{ color: s.mutedText }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = s.text;
                        e.currentTarget.style.paddingLeft = "4px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = s.mutedText;
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {newsletter?.enabled && (
            <div className="space-y-4">
              <h3
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: s.text }}
              >
                {newsletter.heading || "Newsletter"}
              </h3>
              <div
                className="w-8 h-0.5 rounded-full"
                style={{ background: `${s.accent}50` }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{ color: s.mutedText }}
              >
                {newsletter.description ||
                  "Get the latest updates straight to your inbox."}
              </p>

              {subscribed ? (
                <div
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium"
                  style={{
                    background: s.accentFaint,
                    border: `1px solid ${s.accentSubtle}`,
                    color: s.accent,
                    borderRadius: s.cardRadius,
                  }}
                >
                  <span>✓</span>
                  <span>You're subscribed!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-2.5"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={newsletter.placeholder || "your@email.com"}
                    required
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full px-4 py-2.5 text-sm outline-none transition-all duration-200"
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
                    className="w-full px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                    style={s.primaryBtn}
                  >
                    {newsletter.buttonText || "Subscribe"}
                  </button>
                </form>
              )}

              <p className="text-xs" style={{ color: s.mutedText }}>
                📧 No spam, unsubscribe at any time.
              </p>
            </div>
          )}
        </div>

        <div
          className="h-px w-full rounded-full"
          style={{
            background: `linear-gradient(to right, transparent, ${s.accent}30, transparent)`,
          }}
        />

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: s.mutedText }}>
            {copyright ||
              `© ${new Date().getFullYear()} ${logo}. All rights reserved.`}
          </p>

          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: s.mutedText }}>
              Made with
            </span>
            <span className="text-xs mx-1" style={{ color: s.accent }}>
              ♥
            </span>
            <span className="text-xs" style={{ color: s.mutedText }}>
              by the {logo} team
            </span>
          </div>

          {bottomLinks?.length > 0 && (
            <div className="flex items-center gap-5 flex-wrap justify-center">
              {bottomLinks.map((item, i) => (
                <span
                  key={i}
                  className="text-xs cursor-pointer transition-all duration-200"
                  style={{ color: s.mutedText }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = s.text)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = s.mutedText)
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
