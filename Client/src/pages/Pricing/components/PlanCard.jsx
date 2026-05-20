export default function PlanCard({ plan, yearly }) {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div className={`relative flex flex-col rounded-lg p-7 border transition-all duration-200 ${
      plan.highlighted
        ? "bg-orange-500/[0.07] border-orange-500/40 shadow-[0_0_60px_rgba(249,115,22,0.1)]"
        : "bg-white/3 border-white/[0.07] hover:border-white/15"
    }`}>

      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-[#0a0907] text-[12px] font-black px-3.5 py-1 rounded-full whitespace-nowrap"
          style={{ fontFamily: "Syne, sans-serif" }}>
          {plan.badge}
        </div>
      )}

      <div className="mb-4">
        <p className="text-white/50 text-sm uppercase tracking-widest mb-2">{plan.name}</p>
        <div className="flex items-end gap-1.5 mb-2">
          <span className="text-white font-black text-5xl tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
            ${price}
          </span>
          {price > 0 && (
            <span className="text-white/35 text-sm mb-2">/mo</span>
          )}
        </div>
        {yearly && price > 0 && (
          <p className="text-orange-400/70 text-xs">Billed yearly</p>
        )}
        <p className="text-white/40 text-sm mt-3">{plan.description}</p>
      </div>

      <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border-none mb-7 ${
        plan.highlighted
          ? "bg-orange-500 hover:bg-orange-400 text-[#0a0907] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)]"
          : "bg-white/[0.07] hover:bg-white/12 text-white/80 hover:text-white"
      }`}>
        {plan.cta}
      </button>

      <div className="flex flex-col gap-3">
        {plan.features.map((feature) => (
          <div key={feature.text} className="flex items-center gap-3">
            {feature.included ? (
              <div className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0">
                <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                  <path d="M1 3.5l2 2 4-4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full bg-white/4 border border-white/10 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-px bg-white/20 rounded-full" />
              </div>
            )}
            <span className={`text-sm ${feature.included ? "text-white/70" : "text-white/25"}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
