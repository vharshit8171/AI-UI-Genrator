import { useState } from "react";
import BillingToggle from "./components/BillingToggle";
import PlanCard from "./components/PlanCard";
import FAQItem from "./components/FAQItem";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../../store/AuthStore.js";
import ParticleCanvas from "../LandingPage/components/ParticleCanvas.jsx";
import { PLANS, FAQS, LOGOS } from "../../constants/pricingData.jsx";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 border-b border-white/6 bg-[#0a0907]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-sm font-black text-[#0a0907]"
            style={{ fontFamily: "Syne, sans-serif" }}>
            B
          </div>
          <span className="text-white text-lg font-black tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
            Buildr
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-white/50 text-sm px-4 py-2 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
            Sign In
          </button>
          <button className="bg-orange-500 hover:bg-orange-400 text-[#0a0907] text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-px border-none cursor-pointer">
            Get Started Free
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ yearly, onToggle }) {
  return (
    <section className="relative z-10 pt-22 pb-16 px-8 text-center">
      <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-4 py-1 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" style={{ boxShadow: "0 0 8px #f97316" }} />
        <span className="text-[12px] text-orange-400 font-semibold tracking-widest uppercase">Simple Pricing</span>
      </div>

      <h1 className="text-white font-black tracking-tight max-w-4xl mx-auto"
        style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 64px)" }}>
        Pay for what you{" "}
        <span className="bg-orange-500 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          actually use
        </span>
      </h1>
      <p className="text-white/40 text-md max-w-xl mx-auto mb-3.5">
        No hidden fees. No surprises. Start free and scale when you're ready.
      </p>

      <div className="flex justify-center">
        <BillingToggle yearly={yearly} onToggle={onToggle} />
      </div>
    </section>
  );
}

function PlansSection({ yearly }) {
  return (
    <section className="relative z-10 px-8 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} yearly={yearly} />
        ))}
      </div>
    </section>
  );
}

function LogosSection() {
  return (
    <section className="relative z-10 px-8 py-12 border-y border-white/8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white/35 text-sm uppercase tracking-widest mb-8">Trusted by teams at</p>
        <div className="flex items-center justify-center gap-10 flex-wrap">
          {LOGOS.map((logo) => (
            <span key={logo}
              className="text-white/20 text-sm font-bold tracking-wide hover:text-white/40 transition-colors"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="relative z-10 px-8 py-18">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[14px] text-orange-500 font-semibold tracking-[0.12em] uppercase mb-3">FAQ</p>
          <h2 className="text-white font-black tracking-tight"
            style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(26px, 3.5vw, 40px)" }}>
            Questions answered
          </h2>
        </div>
        <div className="flex flex-col gap-3.5">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();

  const user = useAuthStore((s)=>s.user);
  const isAuthenticated = useAuthStore((s)=> s.isAuthenticated);

  return (
    <section className="relative z-10 px-8 pb-22">
      <div className="max-w-4xl mx-auto relative overflow-hidden bg-orange-500/6 border border-orange-500/18 rounded-2xl px-10 py-16 text-center">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.1) 0%, transparent 70%)" }}
        />
        <h2 className="relative text-white font-black tracking-tight"
          style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(26px, 3.5vw, 44px)" }}>
          Start building for free
        </h2>
        <p className="relative text-white/40 text-base mb-10">
          No credit card. No setup fee. Cancel anytime.
        </p>
        <div className="relative flex gap-3 justify-center flex-wrap">
         {(!user && !isAuthenticated) && (
           <button onClick={()=>{navigate("/auth")}} 
          className="bg-orange-500 hover:bg-orange-400 text-[#0a0907] font-bold text-md px-8 py-3.5 rounded-md transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(249,115,22,0.4)] cursor-pointer border-none">
            Get Started Free →
          </button>
         )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-8 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-lg font-black text-[#0a0907]"
            style={{ fontFamily: "Syne, sans-serif" }}>
            B
          </div>
          <span className="text-white/50 text-[14px]">© 2025 Buildr. All rights reserved.</span>
        </div>
        <div className="flex gap-7">
          {["Privacy", "Terms", "Status", "Twitter"].map((link) => (
            <a key={link} href="#" className="text-white/50 text-[14px] no-underline hover:text-amber-400 transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0907]">
      <ParticleCanvas />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.05) 0%, transparent 70%)" }}
      />
      <HeroSection yearly={yearly} onToggle={() => setYearly(!yearly)} />
      <PlansSection yearly={yearly} />
      <LogosSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
