import { useState, useEffect } from "react";
import SiteCard from "./SiteCard";
import { useNavigate } from "react-router-dom";
import useSiteStore from "../../../../store/SiteStore.js";

const FILTERS = ["All", "Draft", "Published"];

export default function SitesGrid() {
  const [filter, setFilter] = useState("All");

  const sites = useSiteStore((state) => state.sites);
  const fetchSites = useSiteStore((state) => state.fetchSites);
  const isFetching = useSiteStore((state) => state.isFetching);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  if (isFetching) {
    return (
      <div className="flex justify-center py-20 text-white/60">
        Loading sites...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1 bg-white/4 border border-white/6 rounded-md p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm px-4 py-1.5 rounded-md transition-all duration-150 cursor-pointer border-none ${filter === f
                  ? "bg-orange-500/20 text-orange-400 font-semibold"
                  : "bg-transparent text-white/40 hover:text-white/70"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <button onClick={() => { navigate("/editor") }}
          className="flex items-center gap-1 bg-orange-500 hover:bg-orange-400 text-[#0a0907] text-sm font-bold px-4 py-2.5 rounded-md transition-all duration-200 cursor-pointer border-none hover:-translate-y-px">
          <span className="mb-1 text-2xl leading-none">+</span>
          New Site
        </button>
      </div>

      {sites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-white/70 text-md">No sites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map((site) => (
            <SiteCard key={site._id} site={site} />
          ))}
        </div>
      )}
    </div>
  );
}
