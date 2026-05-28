import { useState } from "react";
import {CopyIcon} from "lucide-react";
import { toast } from "react-toastify";
import useSiteStore from "../../../../store/SiteStore";

const generateHTML = (site) => {
  if (!site) return "";

  const components = [...(site.components || [])].sort(
    (a, b) => a.order - b.order
  );

  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${site.title}</title>
</head>
<body>
`;

  components.forEach((component) => {
    switch (component.type) {

      case "navbar":
        html += `
<nav>
  <h1>${component.props.logo}</h1>
  <ul>
    ${component.props.links
        ?.map(
          (link) => `
    <li><a href="${link.path}">${link.label}</a></li>`
        )
        .join("")
    }
  </ul>
</nav>
`;
        break;

      case "hero":
        html += `
<section>
  <h1>${component.props.headline}</h1>

  <p>${component.props.subheadline}</p>

  <div>
    ${
      component.props.buttons
        ?.map(
          (btn) => `
    <button>
      ${btn.label}
    </button>`
        )
        .join("")
    }
  </div>
</section>
`;
        break;

      case "features":
        html += `
<section>
  <h2>${component.props.title}</h2>

  <div>
    ${
      component.props.items
        ?.map(
          (item) => `
    <div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>`
        )
        .join("")
    }
  </div>
</section>
`;
        break;

      case "testimonials":
        html += `
<section>
  <h2>${component.props.title}</h2>

  <div>
    ${
      component.props.items
        ?.map(
          (item) => `
    <div>
      <h4>${item.name}</h4>
      <p>${item.review}</p>
    </div>`
        )
        .join("")
    }
  </div>
</section>
`;
        break;

      case "footer":
        html += `
<footer>
  <p>${component.props.copyright}</p>
</footer>
`;
        break;

      default:
        break;
    }
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
        }, 250);
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            <div
                onClick={handleClose}
                className={`flex-1 bg-black/70 backdrop-blur-sm transition-opacity duration-300
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
            />

            <div className={`w-120 h-full bg-[#0b0b10] border-l border-white/10
          flex flex-col transition-all duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"}
        `}>
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                    <div>
                        <h2 className="text-white font-semibold">Generated HTML</h2>

                        <p className="text-xs text-white/40 mt-1">{selectedSite?.title}</p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="text-white/40 hover:text-white transition cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-auto px-5">
                    <pre
                        className="text-green-300 text-xs leading-6 whitespace-pre-wrap font-mono">
                        {code}
                    </pre>
                </div>

                <div className="border-t border-white/10 p-4 flex justify-end gap-3">
                    <button onClick={() => {
                            navigator.clipboard.writeText(code);
                            toast.success("Code copied!");
                        }}
                        className="px-2 flex items-center gap-1 rounded-sm bg-white/10 hover:bg-white/20 text-white text-sm transition cursor-pointer">
                        <CopyIcon className="w-3.5 h-3.5 text-orange-600 font-semibold" />
                    </button>

                    <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded-sm bg-orange-500 hover:bg-orange-400 text-black font-medium text-sm transition cursor-pointer">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
