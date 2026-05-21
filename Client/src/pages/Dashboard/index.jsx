import Sidebar from "./components/Sidebar.jsx";
import StatsRow from "./components/StatsRow.jsx";
import AIPromptBar from "./components/AIPromptBar.jsx";
import SitesGrid from "./components/SitesGrid.jsx";
import PlanUsage from "./components/PlanUsage.jsx";
import useAuthStore from "../../../store/AuthStore.js";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-[#0a0907] flex">
      <Sidebar />
      <main className="flex-1 ml-16 min-h-screen">
        <div className="max-w-7xl mx-auto mt-12 px-4 py-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-white font-black text-2xl tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                Dashboard
              </h1>
              <p className="text-white/45 text-md mt-0.5">Welcome back <span className="font-semibold text-[16px] text-orange-400 cursor-pointer underline">{user.name}</span> — here's what's happening.</p>
            </div>
            <div className="flex items-center gap-2 bg-white/4 border border-white/6 rounded-md px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-white/50 text-sm">All systems operational</span>
            </div>
          </div>
          <StatsRow />
          <div className="my-5">
            <AIPromptBar />
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-1 min-w-0">
              <SitesGrid />
            </div>
            <div className="w-64 shrink-0">
              <PlanUsage />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
