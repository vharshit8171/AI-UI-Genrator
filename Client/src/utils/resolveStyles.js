const DENSITY = {
  compact: "48px 24px",
  normal: "80px 24px",
  spacious: "120px 24px",
};

const RADIUS = {
  sharp: "6px",
  rounded: "14px",
  pill: "9999px",
};

const LAYOUT = {
  centered: { textAlign: "center", justifyContent: "center", alignItems: "center" },
  left: { textAlign: "left", justifyContent: "flex-start", alignItems: "flex-start" },
  split: { textAlign: "left", justifyContent: "space-between", alignItems: "center" },
};

const PATTERN = {
  none: { backgroundImage: "none", backgroundSize: "auto" },
  grid: {
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  },
  dots: {
    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
    backgroundSize: "20px 20px",
  },
  lines: {
    backgroundImage: `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(255,255,255,0.02) 10px,
      rgba(255,255,255,0.02) 11px
    )`,
    backgroundSize: "auto",
  },
};

export function resolveStyles(theme = {}, styles = {}) {
  const accent = styles.accent || theme.accent || "#f97316";
  const bg = styles.bg || theme.bg || "#0f172a";
  const text = styles.text || theme.text || "#ffffff";
  const mutedText = theme.mutedText || "rgba(255,255,255,0.6)";
  const surface = theme.surface || "rgba(255,255,255,0.04)";

  const sectionBg = styles.gradient
    ? `linear-gradient(135deg, ${bg} 0%, ${bg}cc 50%, ${accent}18 100%)`
    : bg;

  const cardBg = styles.glass ? "rgba(255,255,255,0.06)" : surface;
  const cardBorder = styles.glass
    ? "1px solid rgba(255,255,255,0.12)"
    : "1px solid rgba(255,255,255,0.06)";
  const cardBlur = styles.glass ? "blur(14px)" : "none";

  const padding = DENSITY[styles.density] || DENSITY.normal;
  const cardRadius = RADIUS[theme.radius] || RADIUS.rounded;
  const btnRadius = theme.radius === "pill"
    ? RADIUS.pill
    : theme.radius === "sharp"
      ? RADIUS.sharp
      : "10px";

  const layout = LAYOUT[styles.layout] || LAYOUT.centered;
  const pattern = PATTERN[styles.pattern] || PATTERN.none;

  const accentFaint = `${accent}18`;   // very faint — for section tints
  const accentSubtle = `${accent}35`;   // border color
  const accentGlow = `${accent}45`;   // box shadow

  const primaryBtn = {
    background: accent,
    color: "#000000",
    borderRadius: btnRadius,
    boxShadow: `0 4px 18px ${accentGlow}`,
  };

  const ghostBtn = {
    background: "transparent",
    color: mutedText,
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: btnRadius,
  };

  return {
    accent, bg: sectionBg, text, mutedText, surface,
    accentFaint, accentSubtle, accentGlow,
    cardBg, cardBorder, cardBlur, cardRadius,
    padding, layout, pattern,
    primaryBtn, ghostBtn, btnRadius,
  };
}