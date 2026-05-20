import { useState } from "react";
import useSiteStore from "../../../../store/SiteStore";

const generateHTML = (site) => {
    if (!site) return "";

    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${site.title || "Untitled Site"}</title>
</head>
<body style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.5; color: #0a0a0a; background: #ffffff; padding: 2rem;">
`;

    site.pages?.forEach((page) => {
        html += `
  <section style="margin-bottom: 2.5rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 1.5rem;">
    <h1 style="font-size: 1.75rem; font-weight: 700; margin: 0 0 0.5rem 0;">${page.title || "Page"}</h1>
    <p style="margin: 0; color: #374151;">${page.description || ""}</p>
  </section>
`;
    });

    html += `
</body>
</html>
`;

    return html;
};

export default function CodePanel({ onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    const selectedSite = useSiteStore((state) => state.selectedSite);
    const code = generateHTML(selectedSite);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex">

            <div onClick={handleClose}
                className={`flex-1 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
                aria-label="Close source code panel"
            />

            <div className={`w-115 h-full bg-[#0a0a10] border-l border-white/10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)] flex flex-col
          transform transition-all duration-300 ease-out
          ${isVisible ? "translate-x-0 scale-100" : "translate-x-full scale-95"}`}>

                <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                    <h2 className="text-white text-md font-semibold tracking-wide uppercase">
                        Source Code
                    </h2>

                    <button onClick={handleClose}
                        className="text-white/50 hover:text-white transition rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                        aria-label="Close"
                    >
                        <span className="text-lg leading-none">✕</span>
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-5">
                    <div className="rounded-sm border border-white/10 bg-[#09090d] p-4 shadow-inner">
                        <pre className="text-[#d1fae5] text-xs leading-relaxed whitespace-pre-wrap font-mono"
                            style={{ textShadow: "0 0 6px rgba(52,211,153,0.18)", }}>
                            {code || "<!-- No site selected -->"}
                        </pre>
                    </div>

                    <div className="mt-3 text-white/40 text-xs">
                        Generated HTML for <span className="text-white/70 font-medium">{selectedSite?.title || "selected site"}</span>.
                    </div>
                </div>

                <div className="px-5 py-3 border-t border-white/10 flex justify-end gap-2">
                    <button onClick={() => navigator.clipboard.writeText(code)}
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                        Copy
                    </button>
                    <button onClick={handleClose}
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-white/90 text-black transition focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}