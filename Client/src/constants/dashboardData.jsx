import {Home, LayoutDashboard, FolderKanban,  Sparkles,CreditCard} from "lucide-react";

export const PLAN = {
  name: "Free",
  sitesUsed: 1,
  sitesTotal: 3,
  aiUsed: 15,
  aiTotal: 25,
  bandwidth: "1.2 GB",
  bandwidthTotal: "5 GB",
};

export const SITES = [
  { id: 1, name: "My SaaS Landing", url: "mysaas.buildr.app", status: "live", visits: "12.4K", lastEdited: "2h ago", thumb: "🚀" },
  { id: 2, name: "Portfolio v2", url: "portfolio.buildr.app", status: "live", visits: "3.1K", lastEdited: "1d ago", thumb: "🎨" },
  { id: 3, name: "Ceramic Store", url: "ceramics.buildr.app", status: "draft", visits: "—", lastEdited: "3d ago", thumb: "🏺" },
  { id: 4, name: "Game Studio Blog", url: "studio.buildr.app", status: "live", visits: "8.9K", lastEdited: "5d ago", thumb: "🎮" },
  { id: 5, name: "Agency Website", url: "agency.buildr.app", status: "draft", visits: "—", lastEdited: "1w ago", thumb: "💼" },
  { id: 6, name: "Event Landing Page", url: "event.buildr.app", status: "paused", visits: "920", lastEdited: "2w ago", thumb: "📅" },
];

export const NAV_ITEMS = [
  { icon: <Home />, label: "Home", route: "/" },
  { icon: <LayoutDashboard />, label: "Editor", route: "/editor" },
  { icon: <FolderKanban />, label: "Projects", route: "/projects" },
  { icon: < Sparkles  />, label: "Features", route: "/feature" },
  { icon: <CreditCard />, label: "Pricing", route: "/pricing" }
];
