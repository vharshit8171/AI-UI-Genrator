import {useNavigate} from "react-router-dom";
import useAuthStore from "../../../../store/AuthStore.js";

export default function CTASection() {
  const navigate = useNavigate();

  const user = useAuthStore((s)=> s.user);
  const isAuthenticated = useAuthStore((s)=> s.isAuthenticated);

  return (
    <section className="relative z-10 px-8 pt-8 pb-8">
      <div className="max-w-5xl mx-auto relative overflow-hidden bg-orange-500/6 border border-orange-500/18 rounded-2xl px-10 py-8 text-center">

        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-125 h-75 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.1) 0%, transparent 70%)" }}
        />

        <h2 className="relative text-white font-black tracking-tight"
          style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(25px, 4.5vw, 50px)" }}>
          Start building for free
        </h2>
        <p className="relative text-white/40 text-lg mb-6">
          No credit card. No setup. Just describe and ship.
        </p>

        <div className="relative flex gap-3.5 justify-center flex-wrap">
          {(!user && !isAuthenticated) && (
            <button onClick={()=>{navigate("/auth")}}
           className="bg-linear-to-br from-orange-500 to-amber-500 text-[#0a0907] font-bold text-base px-10 py-3.5 rounded-xl shadow-[0_4px_28px_rgba(249,115,22,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(249,115,22,0.6)] cursor-pointer border-none">
            Get Started Free →
          </button>
          ) }
          <button onClick={()=>{navigate("/dashboard")}} 
          className="bg-transparent border border-white/12 text-white/60 text-base px-10 py-3.5 rounded-xl transition-all duration-200 hover:border-orange-500/40 hover:text-amber-400 cursor-pointer"
             style={{ fontFamily: "Syne, sans-serif" }}>
            View Templates
          </button>
        </div>

      </div>
    </section>
  );
}
