import { useState, useEffect } from "react";
import { STATS, HERO_PROMPTS } from "../../../constants/landingData.jsx";

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    setTyped("");

    const interval = setInterval(() => {
      if (charIndex <= HERO_PROMPTS[promptIndex].length) {
        setTyped(HERO_PROMPTS[promptIndex].slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPromptIndex((prev) => (prev + 1) % HERO_PROMPTS.length);
        }, 2200);
      }
    }, 38);

    return () => clearInterval(interval);
  }, [promptIndex]);

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-8 pt-24 pb-16">

      <div className="animate-fade-up inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-4 py-1.5 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse-dot" />
        <span className="text-[11px] text-orange-400 font-semibold tracking-widest uppercase">
          Now in Public Beta
        </span>
      </div>

      <h1 className="animate-fade-up-1 text-white font-black leading-[1.02] tracking-tighter max-w-5xl mb-7"
        style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(44px, 7.5vw, 92px)" }}>
        The AI that builds{" "}
        <span className="relative inline-block bg-linear-to-r from-orange-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
          websites
          <svg className="absolute -bottom-1.5 left-0 w-full overflow-visible"
            height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
            <path d="M0,6 Q50,0 100,5 Q150,10 200,4" stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
          </svg>
        </span>
        {" "}for you
      </h1>

      <p className="animate-fade-up-2 text-white/40 max-w-lg leading-relaxed mb-12"
        style={{ fontSize: "clamp(16px, 2vw, 20px)" }}>
        Describe your vision in plain words. Our AI turns it into a live,
        production-ready website in seconds — no code, no templates.
      </p>

      <div className="animate-fade-up-3 w-full max-w-2xl mb-12">
        <div className="flex items-center gap-3 bg-white/3 border border-orange-300/20 rounded-2xl pl-5 pr-1.5 py-1.5 shadow-[0_0_60px_rgba(249,115,22,0.07)]">
          <span className="text-white/25 text-sm whitespace-nowrap">Build me</span>

          <span className="flex-1 text-sm text-white/70 text-left min-h-5.5" style={{ fontFamily: "DM Mono, monospace" }}>
            {typed}
            <span className="inline-block w-0.5 h-3.5 bg-orange-500 ml-0.5 align-middle animate-blink" />
          </span>

          <button className="bg-linear-to-br from-orange-500 to-amber-500 text-[#0a0907] text-sm font-bold px-6 py-3 rounded-xl whitespace-nowrap shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-200 hover:shadow-[0_0_32px_rgba(249,115,22,0.6)] hover:scale-[1.02] cursor-pointer border-none">
            Generate →
          </button>
        </div>
        <p className="text-white/20 text-xs mt-2.5">
          Free forever · No credit card · 3 sites on free plan
        </p>
      </div>

      <div className="animate-fade-up-4 flex gap-14 justify-center flex-wrap">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-black text-amber-400 tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
              {stat.value}
            </p>
            <p className="text-white/30 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
