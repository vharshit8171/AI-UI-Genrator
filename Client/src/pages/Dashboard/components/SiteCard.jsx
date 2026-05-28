import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Calendar, Globe, Trash2, Edit3, Eye, Sparkles, Code2 } from "lucide-react";

import useAuthStore from "../../../../store/AuthStore.js";
import useSiteStore from "../../../../store/SiteStore.js";

const STATUS_STYLES = {
  live: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    label: "Published",
  },
  draft: {
    dot: "bg-yellow-400",
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
    label: "Draft",
  },
};

const AI_MODELS = {
  "llama-3.3-70b-versatile": {
    name: "Llama 3.3",
    icon: "🦙",
  },
  "gpt-4": {
    name: "GPT-4",
    icon: "🤖",
  },
};

export default function SiteCard({ site }) {
  const navigate = useNavigate();
  
  const user = useAuthStore((state) => state.user);
  const deleteSite = useSiteStore((state) => state.deleteSite);

  const title = typeof site?.title === "string" && site.title !== "[object Object]"
    ? site.title
    : "Untitled Site";
  const path = typeof site?.path === "string" ? site.path : "/";
  const lastEdited = site?.updatedAt
    ? new Date(site.updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "N/A";
  const createdDate = site?.createdAt
    ? new Date(site.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "N/A";
  const aiModel = AI_MODELS[site?.aiModel] || {
    name: site?.aiModel || "Unknown",
    icon: "✨",
  };

  const promptCount = site?.prompts?.length || 0;
  const version = site?.version || 1;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this page?")) {
      return;
    }

    await deleteSite(site._id);
    toast.success("Page deleted successfully!");
  };

  const handlePreview = (e) => {
    e.stopPropagation();
    window.open(`/preview/${site._id}/${site?.path === "/" ? "home" : ''}`, "_blank");
  };

  return (
    <div onClick={() => navigate(`/editor/${site._id}`)}
      className="group relative overflow-hidden rounded-md border border-white/10 bg-linear-to-br from-[#1a1a1a] to-[#121212] hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(249,115,22,0.2)] cursor-pointer"
    >
      <div className="absolute top-10.5 right-3 z-10 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
        <span className="text-xs font-semibold text-white/80">v{version}</span>
      </div>

      <div className="relative h-48 overflow-hidden border-b border-white/5 bg-linear-to-br from-[#1d1d1d] via-[#171717] to-[#101010]">
        <div className="absolute top-0 left-0 right-0 h-8 border-b border-white/5 bg-white/3 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="ml-3 flex-1 h-5 rounded bg-white/5 flex items-center px-2">
            <Globe className="w-3 h-3 text-white/30 mr-1.5" />
            <span className="text-[10px] text-white/40 truncate">{path}</span>
          </div>
        </div>

        <div className="h-full flex flex-col items-center justify-center px-6 text-center pt-6">
          <div className="w-16 h-16 rounded-lg bg-linear-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center text-3xl mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/10">
            🌐
          </div>
          <h2 className="text-white text-lg font-bold line-clamp-1">
            {title}
          </h2>
          <p className="text-white/40 text-xs line-clamp-2 max-w-50">
            {site?.description || "AI generated responsive website"}
          </p>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <button onClick={() => navigate(`/editor/${site._id}`)}
            className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-black text-sm font-semibold transition-all flex items-center gap-2 shadow-lg">
            <Edit3 className="w-4 h-4" />
            Edit
          </button>

          <button onClick={handlePreview}
            className="px-5 py-2.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </button>

          <button onClick={handleDelete}
            className="px-4 py-2.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="text-white font-semibold truncate text-base">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-white/40">
            <Code2 className="w-3 h-3" />
            <p className="text-xs truncate">{path}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-sm bg-white/3 border border-white/5">
            <div className="text-lg">{aiModel.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white/40 uppercase tracking-wide">
                AI Model
              </p>
              <p className="text-xs text-white/70 font-medium truncate">
                {aiModel.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-2 rounded-sm bg-white/3 border border-white/5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white/40 uppercase tracking-wide">
                Prompts
              </p>
              <p className="text-xs text-white/70 font-medium">
                {promptCount} {promptCount === 1 ? "prompt" : "prompts"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          {site?.createdAt && (
            <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created {createdDate}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 bg-white/5">
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/30">Updated</p>
              <p className="text-xs text-white/50 font-medium">{lastEdited}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}