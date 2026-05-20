import { useState } from "react";
import {BADGE_STYLES} from "../../../constants/featureData.jsx"

function FeatureCard({ icon, title, desc, badge, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-lg p-6 border transition-all duration-300 cursor-default"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(10,9,7,0.9) 100%)"
          : "rgba(255,255,255,0.02)",
        borderColor: hovered ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.06)",
        boxShadow: hovered ? "0 0 32px rgba(249,115,22,0.08), inset 0 1px 0 rgba(249,115,22,0.1)" : "none",
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="absolute top-4 right-4 w-24 h-24 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(245,158,11,0.15))"
            : "rgba(255,255,255,0.04)",
          color: hovered ? "#fb923c" : "rgba(255,255,255,0.4)",
          boxShadow: hovered ? "0 0 16px rgba(249,115,22,0.2)" : "none",
        }}
      >
        {icon}
      </div>

      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
        <h3 className="text-white text-lg font-bold tracking-tight"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {title}
        </h3>
        {badge && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${BADGE_STYLES[badge]}`}
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {badge}
          </span>
        )}
      </div>

      <p className="text-white/45 text-sm leading-relaxed transition-colors duration-300"
        style={{
          fontFamily: "Syne, sans-serif",
          color: hovered ? "rgba(255,255,255,0.6)" : undefined,
        }}>
        {desc}
      </p>
    </div>
  );
}

export default FeatureCard;