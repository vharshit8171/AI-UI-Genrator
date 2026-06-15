import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { resolveStyles } from "../../../utils/resolveStyles.js";

export default function Contact({
  title = "Get In Touch",
  subtitle,
  email,
  phone,
  address,
  styles = {},
}) {
  const theme = useTheme();
  const s = resolveStyles(theme, styles);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const contactItems = [
    email && {
      icon: "✉️",
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    phone && { icon: "📞", label: "Phone", value: phone, href: `tel:${phone}` },
    address && { icon: "📍", label: "Address", value: address, href: null },
  ].filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: s.bg,
        color: s.text,
        padding: s.padding,
        ...s.pattern,
      }}
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${s.accent}05 1px, transparent 1px), linear-gradient(90deg, ${s.accent}05 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          top: "-120px",
          right: "-120px",
          background: `radial-gradient(circle, ${s.accentFaint} 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          bottom: "-80px",
          left: "-80px",
          background: `radial-gradient(circle, ${s.accentFaint} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold mb-5"
            style={{
              border: `1px solid ${s.accentSubtle}`,
              background: s.accentFaint,
              color: s.accent,
              borderRadius: s.cardRadius,
              boxShadow: `0 0 20px ${s.accent}18`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: s.accent }}
            />
            Contact Us
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {contactItems.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 p-5 transition-all duration-500 cursor-pointer"
                style={{
                  background: s.cardBg,
                  border: s.cardBorder,
                  borderRadius: s.cardRadius,
                  backdropFilter: s.cardBlur,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${i * 100 + 200}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = s.accentFaint;
                  e.currentTarget.style.border = `1px solid ${s.accentSubtle}`;
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = s.cardBg;
                  e.currentTarget.style.border = s.cardBorder;
                  e.currentTarget.style.transform = "translateX(0)";
                }}
                onClick={() => item.href && window.open(item.href, "_blank")}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-xl shrink-0"
                  style={{
                    background: s.accentFaint,
                    border: `1px solid ${s.accentSubtle}`,
                    borderRadius: s.cardRadius,
                  }}
                >
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: s.mutedText }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: s.text }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="lg:col-span-3 p-8"
            style={{
              background: s.cardBg,
              border: s.cardBorder,
              borderRadius: s.cardRadius,
              backdropFilter: s.cardBlur,
            }}
          >
            {submitted ? (
              <div className="text-center py-16">
                <div
                  className="w-16 h-16 mx-auto flex items-center justify-center text-2xl mb-4"
                  style={{
                    background: s.accentFaint,
                    border: `1px solid ${s.accentSubtle}`,
                    borderRadius: s.cardRadius,
                  }}
                >
                  ✓
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: s.text }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: s.mutedText }}>
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Full Name", "Email Address"].map((placeholder, i) => (
                    <input
                      key={i}
                      type={i === 1 ? "email" : "text"}
                      placeholder={placeholder}
                      required
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: s.cardBg,
                        border: s.cardBorder,
                        borderRadius: s.cardRadius,
                        color: s.text,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.border = `1px solid ${s.accentSubtle}`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.border = s.cardBorder;
                      }}
                    />
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: s.cardBg,
                    border: s.cardBorder,
                    borderRadius: s.cardRadius,
                    color: s.text,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = `1px solid ${s.accentSubtle}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = s.cardBorder;
                  }}
                />

                <textarea
                  placeholder="Your message..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 text-sm outline-none resize-none transition-all duration-200"
                  style={{
                    background: s.cardBg,
                    border: s.cardBorder,
                    borderRadius: s.cardRadius,
                    color: s.text,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = `1px solid ${s.accentSubtle}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = s.cardBorder;
                  }}
                />

                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                  style={s.primaryBtn}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
