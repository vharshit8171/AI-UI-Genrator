import { useEffect } from "react";
import SiteCard from "./SiteCard";
import { useNavigate } from "react-router-dom";
import useSiteStore from "../../../../store/SiteStore.js";

export default function SitesGrid() {

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
      <div className="flex items-center justify-end gap-2.5 mb-2.5">
        <button onClick={() => { navigate("/projects") }}
          className="flex items-center gap-1 bg-orange-500 hover:bg-orange-400 text-[#0a0907] text-sm font-bold px-4 py-2.5 rounded-md transition-all duration-200 cursor-pointer border-none hover:-translate-y-px">
          My Sites
        </button>
        <button onClick={() => { navigate("/editor") }}
          className="flex items-center gap-1 bg-orange-500 hover:bg-orange-400 text-[#0a0907] text-sm font-bold px-4 py-2.5 rounded-md transition-all duration-200 cursor-pointer border-none hover:-translate-y-px">
          <span className="mb-1 text-2xl leading-none">+</span>
          New Site
        </button>
      </div>

      {sites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-2">
            <span className="text-2xl">✨</span>
          </div>

          <h3 className="text-white text-xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "Syne, sans-serif" }}>
            No pages generated yet
          </h3>

          <p className="text-white/40 max-w-sm text-sm leading-tight">
            Start by describing your idea and let AI generate your first
            beautiful single-page UI in seconds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <SiteCard key={site._id} site={site} />
          ))}
        </div>
      )}
    </div>
  );
}
