import { PLAN } from "../../../constants/dashboardData.jsx";
import { useNavigate } from "react-router-dom";


function UsageBar({ label, used, total, unit = "" }) {
  const pct = Math.min((used / total) * 100, 100);
  const isHigh = pct >= 80;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-white/50 text-xs">{label}</span>
        <span className={`text-xs font-medium ${isHigh ? "text-orange-400" : "text-white/40"}`}>
          {used}{unit} / {total}{unit}
        </span>
      </div>
      <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isHigh ? "bg-orange-500" : "bg-orange-500/50"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function PlanUsage() {

  const navigate = useNavigate();
  return (
    <div className="bg-white/3 border border-white/6
     rounded-md p-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Current Plan</p>
          <p className="text-white font-black text-lg tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
            {PLAN.name}
          </p>
        </div>
        <button onClick={() => navigate("/pricing")}
          className="bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs font-semibold px-3.5 py-2 rounded-md hover:bg-orange-500/25 transition-colors cursor-pointer">
          Upgrade →
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <UsageBar label="Sites" used={PLAN.sitesUsed} total={PLAN.sitesTotal} />
        <UsageBar label="AI Generations" used={PLAN.aiUsed} total={PLAN.aiTotal} />
        <div className="flex items-center justify-between pt-1 border-t border-white/6">
          <span className="text-white/40 text-xs">Bandwidth</span>
          <span className="text-white/40 text-xs">{PLAN.bandwidth} / {PLAN.bandwidthTotal}</span>
        </div>
      </div>
    </div>
  );
}
