import { useState } from "react";
import { toast } from "react-toastify"
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../../store/AuthStore.js";
import { NAV_ITEMS } from "../../../constants/dashboardData.jsx";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`fixed left-0 top-0 h-screen ${expanded ? "w-54" : "w-22"}  bg-[#0d0b09] border-r border-white/6 flex flex-col items-center py-5 z-40 shadow-[0_0_40px_rgba(249,115,22,0.06)] transition-all duration-300`}>

      <div className={`w-full flex justify-center items-center ${expanded ? "justify-between px-4" : "justify-center"} mt-8 mb-4`}>
        <span className={`text-orange-400 font-semibold tracking-tighter transition-all duration-200 text-center ${expanded ? "opacity-100 text-3xl" : "opacity-0 text-sm"}`} style={{ fontFamily: "Syne, sans-serif" }}>
          Studio
        </span>
      </div>

      <div className={`overflow-hidden transition-all duration-300 mb-14 ${expanded ? "opacity-100 max-h-40 w-[85%] mb-3" : "opacity-0 max-h-0 w-0 mb-0"} border border-orange-500/20 bg-orange-500/8 p-2 rounded-md`}>
        <p className="text-xs text-white/40 mb-1">Current Plan</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-orange-400 font-semibold">
            {user.role}
          </span>
          <span className="text-[10px] px-3 py-2 rounded-full bg-orange-500/15 text-orange-300">
            {user.credits} credits
          </span>
        </div>
        <button onClick={() => navigate("/pricing")} 
        className="mt-3 w-full h-8 rounded-md bg-orange-500 text-black text-sm font-semibold hover:bg-orange-400 transition-all cursor-pointer">
          Upgrade
        </button>
      </div>

      <nav className="flex flex-col items-center gap-2 flex-1 w-full">
        {NAV_ITEMS.map((item) => (
          <button key={item.label}
            onClick={() => {
              navigate(item.route);
              setActive(item.label);
            }}
            className={`group relative flex items-center 
              ${expanded ? "w-[85%] justify-start px-3" : "w-10 justify-center"} 
              h-10 rounded-md text-2xl transition-all duration-200 cursor-pointer border-none
              ${active === item.label
                ? "bg-orange-500/15 text-orange-400"
                : "bg-transparent text-white/30 hover:bg-white/6 hover:text-white/70"
              }`}
          >
            <span className="flex items-center justify-center w-8 text-orange-400">
              {item.icon}
            </span>
            <span className={`ml-3 text-[17px] whitespace-nowrap transition-all duration-200 
              ${expanded ? "opacity-100" : "opacity-0 hidden"}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className={`w-full flex flex-col items-center gap-2 mt-auto`}>
        <div className={`flex items-center w-full 
          ${expanded ? "justify-start px-3" : "justify-center"} 
          h-12`}>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-sm font-black text-orange-400 shrink-0"
            style={{ fontFamily: "Syne, sans-serif" }}>
            <img src={user.avatar} />
          </div>

          <div className={`ml-1.5 mb-1.5 flex flex-col overflow-hidden transition-all duration-200 
            ${expanded ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
            <span className="text-sm text-white/80 font-semibold">{user.name}</span>
            <span className="text-xs text-white/40">{user.email}</span>
            <span className="text-xs text-white/40">{user?.contactNumber}</span>
            <span className="text-xs py-1 text-white/40 flex justify-start">Account- {user.role}</span>
          </div>
        </div>

        {expanded && (
          <button onClick={async () => {
            await logout();
            toast.success("Logged out successfully!");
            navigate("/");
          }}
            className="w-[85%] flex items-center justify-center cursor-pointer gap-1 h-10 rounded-md text-[16px] bg-orange-400 text-orange-100 hover:bg-orange-500 transition-all duration-200">
            <LogOut size={14} />
            <span className="font-semibold">Logout</span>
          </button>
        )}
      </div>

    </aside>
  );
}