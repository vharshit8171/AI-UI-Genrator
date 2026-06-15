import { useEffect } from "react";
import { Globe, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSiteStore from "../../../../store/SiteStore.js";
import SiteCard from "../../Dashboard/components/SiteCard.jsx";

const UserSitesSection = () => {
  const navigate = useNavigate();

  const fetchSites = useSiteStore((state) => state.fetchSites);
  const UserSites = useSiteStore((state) => state.sites);

  useEffect(() => {
    if (UserSites.length === 0) {
      fetchSites();
    }
  }, [fetchSites, UserSites]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 rounded-lg">
            <Globe className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">My Sites</h2>
            <p className="text-zinc-400 text-sm font-semibold">
              {UserSites?.length || 0} {UserSites?.length === 1 ? 'site' : 'sites'} created
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/editor")}
          className="flex items-center gap-0.5 px-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold cursor-pointer rounded-md transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Site</span>
        </button>
      </div>

      {UserSites && UserSites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {UserSites.map((site, index) => (
            <div key={index}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SiteCard site={site} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState onCreateSite={() => navigate("/editor")} />
      )}
    </div>
  );
};

const EmptyState = ({ onCreateSite }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-md p-12 text-center animate-fadeIn">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
          <Globe className="w-10 h-10 text-orange-400" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-0.5">
          No sites yet
        </h3>
        <p className="text-zinc-400 mb-8 font-semibold">
          Start building your first page with our easy-to-use editor
        </p>

        <button onClick={onCreateSite}
          className="inline-flex items-center gap-1.5 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md cursor-pointer transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create Your First UI
        </button>
      </div>
    </div>
  );
};

export default UserSitesSection;