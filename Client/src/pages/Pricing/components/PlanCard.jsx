import { Users, Zap, HardDrive, Layout } from "lucide-react";
import usePaymentStore from "../../../../store/PaymentStore.js";

export default function PlanCard({ plan }) {
  const Icon = plan.icon;
  const isLoading = usePaymentStore((state) => state.isLoading);
  const buyCredits = usePaymentStore((state) => state.buyCredits);

  const handleSelect = async() => {
    await buyCredits(plan.pack);
  }

  return (
    <div className={`relative flex flex-col rounded-xl p-7 border transition-all duration-300 ${plan.highlighted
        ? "bg-orange-500/[0.07] border-orange-500/40 shadow-[0_0_80px_rgba(249,115,22,0.12)] scale-[1.02]"
        : "bg-white/3 border-white/[0.07] hover:border-white/15 hover:bg-white/4"
      }`}
    >
      {plan.badge && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-[#0a0907] text-[11px] font-black px-4 py-1 rounded-full whitespace-nowrap tracking-wide"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {plan.badge}
        </div>
      )}

      <div className="mb-5">

        <div className="flex items-center gap-2.5 mb-4">
          <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${plan.gradient} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-md leading-none" style={{ fontFamily: "Syne, sans-serif" }}>
              {plan.name}
            </p>
            <p className="text-white/35 text-[11px] mt-0.5 font-semibold tracking-wide uppercase">
              {plan.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-end gap-2 mb-1">
          <span
            className="text-white font-black text-5xl tracking-tight leading-none"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            ${plan.price}
          </span>
          {plan.originalPrice && (
            <span className="text-white/25 text-xl line-through mb-1 font-medium">
              ${plan.originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          {plan.discount && (
            <span className="text-[11px] font-bold text-orange-400 bg-orange-500/15 border border-orange-500/20 px-2 py-0.5 rounded-full">
              {plan.discount}
            </span>
          )}
          <span className="text-white/25 text-[11px]">
            ≈ {plan.creditsPerDollar} credits / $1
          </span>
        </div>

        <p className="text-white/80 text-sm mt-3 leading-relaxed">
          {plan.description}
        </p>
      </div>

      <button disabled={isLoading} onClick={handleSelect}
        className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border-none mb-6 ${plan.highlighted
            ? "bg-orange-500 hover:bg-orange-400 text-[#0a0907] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)]"
            : "bg-white/[0.07] hover:bg-white/12 text-white/80 hover:text-white"
          }`}
        style={{ fontFamily: "Syne, sans-serif" }}
      >
         {isLoading ? "Redirecting..." : plan.cta}
      </button>

      <div className="flex flex-col gap-2.5 mb-6">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">
          What's included
        </p>
        {plan.features.map((feature) => (
          <div key={feature.text} className="flex items-center gap-3">
            {feature.included ? (
              <div className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0">
                <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                  <path
                    d="M1 3.5l2 2 4-4"
                    stroke="#f97316"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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

      <div className="border-t border-white/6 pt-2.5 pb-2.5">
        <p className="text-white/45 text-[10px] uppercase tracking-widest mb-3">
          Usage limits
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <LimitBadge icon={<Zap className="w-3 h-3" />} label="Per day" value={`${plan.limits.generationsPerDay} gen`} />
          <LimitBadge icon={<Layout className="w-3 h-3" />} label="Component/Page" value={`${plan.limits.maxComponentsPerPage} pages`} />
          <LimitBadge icon={<HardDrive className="w-3 h-3" />} label="Storage" value={`${plan.limits.storageGB} GB`} />
          <LimitBadge icon={<Users className="w-3 h-3" />} label="Members" value={`${plan.limits.teamMembers} seats`} />
        </div>
      </div>

      <div className="mt-auto border-t border-white/6 pt-2 flex flex-col gap-1.5">
        <MetaRow label="Support" value={plan.meta.supportLevel} />
        <MetaRow label="Credits expire" value={plan.meta.creditsExpiry} />
        <MetaRow label="Refund policy" value={plan.meta.refundPolicy} />
      </div>
    </div>
  );
}

function LimitBadge({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-white/3 border border-white/6 rounded-lg px-2.5 py-2">
      <span className="text-white/30">{icon}</span>
      <div className="min-w-0">
        <p className="text-white/25 text-[9px] uppercase tracking-wider leading-none mb-0.5">
          {label}
        </p>
        <p className="text-white/60 text-[11px] font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/25 text-[11px]">{label}</span>
      <span className="text-white/50 text-[11px] font-medium">{value}</span>
    </div>
  );
}