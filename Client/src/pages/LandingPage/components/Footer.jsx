import { FOOTER_LINKS } from "../../../constants/landingData.jsx";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-8 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-lg font-black text-[#0a0907]"
            style={{ fontFamily: "Syne, sans-serif" }}>
            B
          </div>
          <span className="text-white/50 text-[14px]">
            © 2025 Buildr. All rights reserved.
          </span>
        </div>

        <div className="flex gap-7">
          {FOOTER_LINKS.map((link) => (
            <a key={link}
              href="#"
              className="text-white/50 text-[14px] no-underline transition-colors duration-200 hover:text-amber-400">
              {link}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
