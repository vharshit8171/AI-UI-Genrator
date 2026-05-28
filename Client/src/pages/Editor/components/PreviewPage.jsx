import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSiteStore from "../../../../store/SiteStore.js";
import ComponentRenderer from "../../Renderer/ComponentRenderer.jsx";

export default function PreviewPage() {
  const { id } = useParams();

  const selectedSite = useSiteStore((state) => state.selectedSite);
  const fetchSiteById = useSiteStore((state) => state.fetchSiteById);
  const isFetching = useSiteStore((state) => state.isFetching);

  useEffect(() => {
    if (id) {
      fetchSiteById(id);
    }
  }, [id, fetchSiteById]);

  const components = [...(selectedSite?.components || [])].sort(
    (a, b) => a.order - b.order
  );

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f10] text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-white/70 text-sm">
            Loading preview...
          </p>
        </div>
      </div>
    );
  }

  if (!components.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">
          No preview available
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {components.map((component, index) => (
        <ComponentRenderer
          key={component._id || index}
          component={component}
        />
      ))}
    </div>
  );
}