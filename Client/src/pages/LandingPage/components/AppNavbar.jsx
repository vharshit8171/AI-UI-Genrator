import {toast} from "react-toastify";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import useAuthStore from "../../../../store/AuthStore.js";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

const APP_NAV_LINKS = [
  { label: "Features", path: "/feature" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Pricing", path: "/pricing" },
];

export default function AppNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const deleteAccount = useAuthStore((s) => s.deleteAccount);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/auth");
    toast.success("SignOut successfully!");
  };

  const handleDeleteAccount = async () => {
    setOpen(false);
    await deleteAccount();
    navigate("/auth");
    toast.success("Account Deleted!");
  };

  return (
    <div className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[75vw] mt-1.5 transition-all duration-300 rounded-sm px-6 ${
        scrolled
          ? "border border-orange-500/10 bg-[#0a0907]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "border border-orange-500/5 bg-[#0a0907]/70 backdrop-blur-md"
      }`}
    >
      <div className="h-16 flex items-center justify-between">

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}>
          <div
            className="w-9 h-9 rounded-lg bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-base font-black text-[#0a0907] shadow-[0_0_18px_rgba(249,115,22,0.45)]"
            style={{ fontFamily: "Syne, sans-serif" }}>
            B
          </div>
          <span
            className="text-white text-lg font-black tracking-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Buildr
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {APP_NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`text-md no-underline transition-colors duration-200 relative group ${
                  isActive ? "text-amber-400" : "text-white/65 hover:text-amber-400"
                }`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-linear-to-r from-orange-500 to-amber-500 transition-all duration-200 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-3">

          {isAuthenticated && user ? (
            <>
              <button
                onClick={() => navigate("/pricing")}
                className="flex items-center gap-2 text-white/70 text-sm px-2 py-2 rounded-lg border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/40 hover:text-amber-400 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" className="text-amber-500">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2M9 9.5A2.5 2.5 0 0 1 12 8a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 3-2.5" />
                </svg>
                <span>{user.credits || 0} Credits</span>
              </button>

              <div
                className="relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer bg-linear-to-br from-orange-500 to-amber-500 p-0.5 shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_32px_rgba(249,115,22,0.6)] transition-all duration-200">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#1a1814] flex items-center justify-center text-orange-400 text-sm font-black"
                      style={{ fontFamily: "Syne, sans-serif" }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {open && (
                  <div className="absolute -right-20 mt-1 w-44 rounded-xl bg-[#141312] border border-white/6 shadow-[0_0_30px_rgba(249,115,22,0.15)] overflow-hidden">

                    <div className="px-4 py-3 border-b border-white/6">
                      <p className="text-white text-xs font-semibold truncate"
                        style={{ fontFamily: "Syne, sans-serif" }}>
                        {user.name}
                      </p>
                      <p className="text-white/35 text-xs truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-1.5 px-4 py-2.5 text-sm text-orange-200 hover:bg-orange-500/10 transition-colors cursor-pointer bg-transparent border-none"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>

                    <button
                      onClick={handleDeleteAccount}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer bg-transparent border-none"
                    >
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="bg-linear-to-br from-orange-500 to-amber-500 text-[#0a0907] text-sm font-bold px-4 py-2.5 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_32px_rgba(249,115,22,0.6)] cursor-pointer border-none"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Start for Free →
            </button>
          )}

        </div>
      </div>
    </div>
  );
}