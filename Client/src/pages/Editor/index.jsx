import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import CodePanel from "./components/CodePanel.jsx";
import EditorNavbar from "./components/EditorNavbar";
import EditorCanvas from "./components/EditorCanvas";
import useSiteStore from "../../../store/SiteStore.js";

export default function EditorPage() {
  const { id } = useParams();
  const isEditMode = !!id;

  const [device, setDevice] = useState("desktop");
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(null);

  const selectedSite = useSiteStore((state) => state.selectedSite);
  const fetchSiteById = useSiteStore((state) => state.fetchSiteById);

  useEffect(() => {
    if (!isEditMode) return;
    fetchSiteById(id);
  }, [id,fetchSiteById,isEditMode]);
  return (
    <div className="h-screen bg-[#0a0907] flex flex-col overflow-hidden">

      <EditorNavbar device={device}
        onDeviceChange={setDevice}
        onPreview={() => window.open(`/preview/${selectedSite._id}/${selectedSite?.path === "/" ? "home" : ''}`, "_blank")}
        site={selectedSite}
        onToggleCode={() => setIsCodeOpen(prev => !prev)}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar selectedLayer={selectedLayer}
          onSelectLayer={setSelectedLayer}
          prompts={isEditMode ? selectedSite?.prompts : []}
        />

        <EditorCanvas device={device}
          siteData={isEditMode ? selectedSite : null} />

        {isCodeOpen && (
          <CodePanel onClose={() => setIsCodeOpen(false)} />
        )}
      </div>

    </div>
  );
}
