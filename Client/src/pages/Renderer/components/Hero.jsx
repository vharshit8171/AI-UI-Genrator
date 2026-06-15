import { useEffect, useRef } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function Hero({
  badge,
  headline = "Build Something Amazing",
  subheadline = "Create modern and responsive websites with ease.",
  buttons = [],
  stats = [],
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.x += dot.speedX;
        dot.y += dot.speedY;
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${dot.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      style={{
        background: s.bg,
        padding: s.padding,
        color: s.text,
        ...s.pattern,
      }}
      className="relative overflow-hidden w-full min-h-[85vh] flex items-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      <div
        className="absolute pointer-events-none blur-[90px] rounded-full"
        style={{
          width: "420px",
          height: "360px",
          top: "-40px",
          left: "-60px",
          background: s.accentFaint,
        }}
      />
      <div
        className="absolute pointer-events-none blur-[110px] rounded-full"
        style={{
          width: "380px",
          height: "380px",
          bottom: "-60px",
          right: "-80px",
          background: s.accentFaint,
        }}
      />
      <div
        className="absolute pointer-events-none blur-[70px] rounded-full"
        style={{
          width: "200px",
          height: "200px",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          background: s.accentFaint,
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col text-center items-center py-16 md:py-18 px-6">
        {badge && (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold mb-6 tracking-wide uppercase"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
              boxShadow: `0 0 20px ${s.accent}15`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: s.accent }}
            />
            {badge}
          </div>
        )}

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.98] tracking-tight max-w-5xl"
          style={{ color: s.text }}
        >
          {headline}
        </h1>

        <p className="mt-7 text-lg md:text-xl leading-relaxed max-w-3xl"
          style={{ color: s.mutedText }}
        >
          {subheadline}
        </p>

        {buttons?.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {buttons.map((btn, i) => {
              const isPrimary = i === 0 || btn?.primary === true;
              return isPrimary ? (
                <button
                  key={i}
                  className="group relative inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm transition-all duration-200 cursor-pointer overflow-hidden"
                  style={s.primaryBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 8px 32px ${s.accent}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = s.primaryBtn.boxShadow;
                  }}
                >
                  {btn.label}
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  key={i}
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm transition-all duration-200 cursor-pointer"
                  style={s.ghostBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        )}

        {stats?.length > 0 && (
          <div className="mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative p-5 overflow-hidden transition-all duration-300"
                style={{
                  background: s.cardBg,
                  border: s.cardBorder,
                  borderRadius: s.cardRadius,
                  backdropFilter: s.cardBlur,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = s.accentFaint;
                  e.currentTarget.style.border = `1px solid ${s.accentSubtle}`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = s.cardBg;
                  e.currentTarget.style.border = s.cardBorder;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${s.accent}50, transparent)`,
                  }}
                />
                <div
                  className="text-2xl md:text-3xl font-extrabold tracking-tight"
                  style={{ color: s.accent }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-1 text-sm font-medium"
                  style={{ color: s.mutedText }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
