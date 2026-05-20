import { useNavigate } from "react-router-dom";
import { AUTH_FEATURES } from "../../../constants/authData.jsx";

export default function AuthLeftPanel() {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex flex-col justify-between w-120 shrink-0 bg-white/2 border-r border-white/6 p-10">

      <div>
        <div onClick={()=>{navigate("/")}} 
        className="flex items-center gap-2 mb-8 cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-lg font-black text-[#0a0907]"
            style={{ fontFamily: "Syne, sans-serif" }}>
            B
          </div>
          <span className="text-white text-lg font-black tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
            Buildr
          </span>
        </div>

        <h2 className="text-white font-black leading-tight tracking-tight mb-2.5"
          style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 3vw, 40px)" }}>
          Build websites at the speed of thought
        </h2>
        <p className="text-white/40 text-sm leading-relaxed mb-8">
          Describe what you want. Our AI builds it. You ship it.
          No code, no templates.
        </p>

        <div className="flex flex-col gap-3">
          {AUTH_FEATURES.map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-lg shrink-0">
                {f.icon}
              </div>
              <span className="text-white/60 text-md">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/3 border border-white/6 rounded-md p-4 mt-5">
        <p className="text-white/60 text-md leading-relaxed mb-5">
          "I shipped my landing page in under 10 minutes. The AI understood
          my brand better than any designer I've hired."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-xs font-black text-[#0a0907]"
            style={{ fontFamily: "Syne, sans-serif" }}>
            SC
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Sarah Chen</p>
            <p className="text-white/30 text-xs">Founder, Luma Labs</p>
          </div>
        </div>
      </div>

    </div>
  );
}
