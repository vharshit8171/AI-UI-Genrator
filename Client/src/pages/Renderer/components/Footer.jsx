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
  const accentColor = styles?.accent || "#f97316";
  const textColor = styles?.text || "#ffffff";

  const mutedColor = styles?.text
    ? `${styles.text}70`
    : "rgba(255,255,255,0.6)";

  const subtleColor = styles?.text
    ? `${styles.text}50`
    : "rgba(255,255,255,0.4)";

  const borderColor = styles?.text
    ? `${styles.text}15`
    : "rgba(255,255,255,0.1)";

  return (
    <footer
      style={{
        background:
          styles?.bg ||
          "linear-gradient(to right, #0f172a, #111827, #1e293b)",
        color: textColor,
        padding: styles?.padding || "60px 24px 24px",
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-bold text-base shadow-md shrink-0"
                style={{ background: accentColor }}
              >
                {logo?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h2 className="text-base font-bold">
                  {logo}
                </h2>

                {tagline && (
                  <p
                    className="text-xs"
                    style={{ color: mutedColor }}
                  >
                    {tagline}
                  </p>
                )}
              </div>
            </div>

            {description && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: mutedColor }}
              >
                {description}
              </p>
            )}

            {/* Socials */}
            {socials?.length > 0 && (
              <div className="flex items-center gap-3 pt-1">
                {socials.map((social, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all duration-200 cursor-pointer hover:opacity-80"
                    style={{
                      background: `${accentColor}18`,
                      border: `1px solid ${accentColor}25`,
                      color: accentColor,
                    }}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columns */}
          {columns?.map((col, ci) => (
            <div key={ci}>
              <h3
                className="text-xs font-semibold uppercase tracking-wider mb-4"
              >
                {col.heading}
              </h3>

              <ul className="space-y-2.5">
                {col.links?.map((item, li) => (
                  <li
                    key={li}
                    className="text-sm transition-all duration-200 cursor-pointer hover:text-white"
                    style={{ color: mutedColor }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {newsletter?.enabled && (
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-wider mb-4"
              >
                {newsletter.heading}
              </h3>

              <p
                className="text-sm mb-4"
                style={{ color: mutedColor }}
              >
                {newsletter.description}
              </p>

              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder={
                    newsletter.placeholder || "Enter your email"
                  }
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${borderColor}`,
                    color: textColor,
                  }}
                />

                <button
                  className="w-full px-4 py-2.5 rounded-lg text-black text-sm font-semibold hover:opacity-90 transition-all duration-200"
                  style={{
                    background: accentColor,
                  }}
                >
                  {newsletter.buttonText || "Subscribe"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div
          className="pt-5 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <p
            className="text-xs"
            style={{ color: subtleColor }}
          >
            {copyright}
          </p>

          {bottomLinks?.length > 0 && (
            <div className="flex items-center gap-5">
              {bottomLinks.map((item, i) => (
                <span
                  key={i}
                  className="text-xs cursor-pointer hover:text-white transition-all duration-200"
                  style={{ color: subtleColor }}
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