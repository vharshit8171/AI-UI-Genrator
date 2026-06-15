import { Eye, CodeXml, Rocket } from "lucide-react";
import { DEVICES } from "../../../constants/editorData.jsx";
import useSiteStore from "../../../../store/SiteStore.js";
import ModelSelector from "./ModelSelector.jsx";

export default function EditorNavbar({ device, onDeviceChange, onPreview, onToggleCode, }) {

  const selectedSite = useSiteStore((state) => state.selectedSite);
  const selectedModel = useSiteStore((state) => state.selectedModel);
  const setSelectedModel = useSiteStore((state) => state.setSelectedModel);

  return (
    <header className="h-18 bg-[#121214]/70 backdrop-blur-xl
shadow-[0_4px_30px_rgba(0,0,0,0.45)] border-b border-white/10 flex items-center justify-between px-4 shrink-0 z-50">

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-lg font-black text-[#0a0907] shadow-[0_0_12px_rgba(249,115,22,0.5)]">
            B
          </div>
        </div>

        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-1 bg-[#1a1a1d] border border-white/10 rounded-md px-2 py-1.5 shadow-inner">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              onClick={() => onDeviceChange(d.id)}
              className={`px-2.5 py-1.5 rounded-md text-md transition-all duration-150 ${device === d.id
                  ? "bg-orange-500/20 text-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.3)]"
                  : "text-white/40 hover:text-white/70"
                }`}
            >
              {d.icon}
            </button>
          ))}
        </div>

        <div className="ml-1.5">
          <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button disabled={!selectedSite} onClick={onPreview}
          className="flex items-center gap-1 bg-[#1a1a1d] hover:bg-[#232326] border border-white/10 text-white/90 hover:text-white text-md font-medium px-4 py-2.5 rounded-sm cursor-pointer">
          <Eye size={18} className="text-orange-400 font-semibold" /> Preview
        </button>

        <button disabled={!selectedSite} onClick={onToggleCode}
          className="flex items-center gap-1 bg-[#1a1a1d] hover:bg-[#232326] border border-white/10 text-white/90 hover:text-white text-md font-medium px-4 py-2.5 rounded-sm cursor-pointer">
          <CodeXml size={18} className="text-orange-400 font-semibold" /> Source
        </button>
      </div>
    </header>
  );
}