import useAuthStore from "../../../../store/AuthStore.js";
import { ArrowUpRight } from "lucide-react";

export default function StatsRow() {

  const user = useAuthStore((state) => state.user);

  const STATS = [
    { label: "Total Sites", value: `${user.websites.length || 0}`, sub: "This month" },
    { label: "Draft", value: `${user.websites.length - user.deployedWebsites.length}`, sub: "Not deployed Yet" },
    { label: "Deployments", value: `${user.deployedWebsites?.length || 0}`, sub: "Last 30 days" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {STATS.map((stat) => (
        <div key={stat.label}
          className="relative bg-white/3 border border-white/6 rounded-lg px-6 py-7 cursor-pointer hover:border-orange-500/20 hover:bg-white/5 transition-all duration-200"
        >
          <span className="absolute p-1 bg-orange-400 rounded-full text-orange-200 top-3 right-3">
            <ArrowUpRight size={20} />
          </span>

          <p className="text-white font-semibold text-sm uppercase tracking-widest mb-2">
            {stat.label}
          </p>

          <p className="text-orange-400 font-black text-3xl tracking-tight mb-1"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {stat.value}
          </p>

          <p className="text-white font-semibold text-xs">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}