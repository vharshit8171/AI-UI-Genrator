import { useState } from "react";
import { FEATURES } from "../../../constants/landingData.jsx";

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-7 bg-[#0a0907] transition-colors duration-300 cursor-default overflow-hidden hover:bg-orange-500/[0.07]">
      {hovered && (
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500 to-transparent" />
      )}

      <span className="text-4xl mb-3.5 block">{feature.icon}</span>
      <h3 className="text-white font-bold text-[20px] mb-2 tracking-tight"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {feature.title}
      </h3>
      <p className="text-white/50 text-md leading-relaxed">
        {feature.desc}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="relative z-10 px-8 py-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8">
          <p className="text-[18px] text-orange-500 font-semibold tracking-[0.12em] uppercase mb-1">
            Capabilities
          </p>
          <h2 className="text-white font-black tracking-tight"
            style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(30px, 4vw, 50px)" }}>
            Everything you need to ship
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-orange-300/[0.07] rounded-2xl overflow-hidden border border-orange-300/10">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
}
