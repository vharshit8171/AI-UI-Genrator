import { ArrowUpRight } from "lucide-react";
import useSiteStore from "../../../../store/SiteStore.js";
import useAuthStore from "../../../../store/AuthStore.js";

export default function StatsRow() {
  const user = useAuthStore((state) => state.user);
  const sites = useSiteStore((state) => state.sites);

  const lastGeneratedSite = sites.length > 0 ? sites[0] : null;
  const time = lastGeneratedSite ? new Date(lastGeneratedSite.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }) : null;

  const STATS = [
    { label: "Total Pages", value: `${user.pages.length || 0}`, sub: "Generated UIs" },
    { label: "Last Generated", value: time || "Never", sub: lastGeneratedSite ? lastGeneratedSite.description : "Dashboard UI", },
    { label: "Top Style", value: "Modern", sub: "Most generated", },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {STATS.map((stat) => (
        <div key={stat.label}
          className="relative bg-white/3 border border-white/6 rounded-lg px-6 py-7 hover:border-orange-500/20 hover:bg-white/5 transition-all duration-200"
        >
          <span className="absolute p-1 bg-orange-400 rounded-full text-orange-200 top-3 right-3">
            <ArrowUpRight size={20} />
          </span>

          <p className="text-white font-semibold text-sm uppercase tracking-widest mb-2">
            {stat.label}
          </p>

          <p className="text-orange-400 font-black text-2xl tracking-tight mb-1"
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