import { useState } from "react";
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../../../store/AuthStore.js";
import useSiteStore from "../../../../store/SiteStore.js";

const STATUS_STYLES = {
  live: { dot: "bg-green-400", text: "text-green-400", label: "Published" },
  draft: { dot: "bg-white/30", text: "text-white/40", label: "Draft" },
};

export default function SiteCard({ site }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const deleteSite = useSiteStore((state) => state.deleteSite);

  const status = STATUS_STYLES[site?.status] || STATUS_STYLES["draft"];
  const title =typeof site?.title === "string" && site.title !== "[object Object]" ? site.title: "Untitled Site";

  const slug =typeof site?.slug === "string" ? site.slug: "no-slug";
  const lastEdited = site?.updatedAt ? new Date(site.updatedAt).toLocaleDateString() : "N/A";

  const handleCardClick = async() => {
    navigate(`/editor/${site._id}`);
  }

  const handleMenuClick = async(action) => {
    if(action === "Open Editor"){
     navigate(`/editor/${site._id}`);
    } else if (action === "Delete"){
      await deleteSite(site._id)
      toast.success("Website deleted Successfully!!")
    }
   setMenuOpen(false)
  }

  return (
    <div className="group relative bg-white/3 border border-white/6 rounded-lg overflow-hidden cursor-pointer hover:border-orange-500/25 hover:bg-white/5 transition-all duration-200">

      <div className="h-48 bg-white/3 border-b border-white/5 flex items-center justify-center relative overflow-hidden">
        <span className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity duration-200">
          🌐
        </span>

        <div className="absolute inset-0 bg-orange-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div onClick={handleCardClick} 
        className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button className="bg-orange-500 text-[#0a0907] text-sm font-bold px-4 py-2 rounded-md hover:bg-orange-400 cursor-pointer">
            Edit
          </button>
          <button  onClick={async(e)=>{
            e.stopPropagation();
            await deleteSite(site._id)
            toast.success("Website deleted Successfully!!")
          }}
          className="bg-red-600 text-white/80 cur text-sm px-4 py-2 rounded-md font-semibold border border-white/10 hover:bg-white/20 cursor-pointer">
            Delete
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2 ">
          <p className="text-white text-md font-semibold truncate">
            {title}
          </p>

          <div className="relative shrink-0">
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="text-white/25 hover:text-white/60 text-2xl px-1">
              ···
            </button>

            {menuOpen && (
              <div className="absolute right-5 -top-16 bg-[#1a1610] border border-white/10 rounded-md overflow-hidden z-20 min-w-35 shadow-xl">
                {["Open Editor", "View Live", "Rename", "Delete"].map((action) => (
                  <button key={action}
                    onClick={()=>{handleMenuClick(action)}}
                    className={`w-full text-left text-xs px-4 py-2.5 ${action === "Delete"
                        ? "text-red-400/70 hover:bg-red-500/10"
                        : "text-white/60 hover:bg-white/6 hover:text-white"
                      }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-white/30 text-xs truncate mb-3">
          {slug}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span className={`text-xs ${status.text}`}>
              {status.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-[10px] text-white/60 cursor-pointer">
              <img src={user.avatar} />
            </div>

            <span className="text-white/20 text-xs">
              {lastEdited}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}