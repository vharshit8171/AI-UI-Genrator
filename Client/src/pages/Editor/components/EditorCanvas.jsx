import useAuthStore from "../../../../store/AuthStore.js"
import useSiteStore from "../../../../store/SiteStore.js";
import ComponentRenderer from "../../Renderer/ComponentRenderer.jsx";

export default function EditorCanvas({ device, siteData }) {
  const deviceConfig = {
    desktop: "100%",
    tablet: "768px",
    mobile: "390px",
  };
  const canvasWidth = deviceConfig[device] || "100%";
  const isConstrained = device !== "desktop";

  const user = useAuthStore((state) => state.user);
  const selectedSite = useSiteStore((state) => state.selectedSite);
  const isCreating = useSiteStore((state) => state.isCreating);

  const components = siteData?.components || selectedSite?.components || [];

  if (isCreating) {
    return (
      <div className="flex-1 flex items-center justify-center text-white/60 text-lg animate-pulse">
        <p className="text-3xl">⚙️ Generating your website...<br /> <span>This process may take a time</span></p>
      </div>
    );
  }

  if (!components.length) {
    return (
      <div className="flex-1 flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl space-y-0.5">
          <div className="inline-block px-4 py-1 rounded-full bg-yellow-400/10 border border-orange-400/20 text-orange-500 text-sm">
            ✨ AI UI's Builder
          </div>
          <h1 className="text-5xl md:text-5xl font-bold text-white leading-tighter">
            Welcome back,{" "}
            <span className="text-orange-500">
              {user.name}
            </span>
          </h1>
          <p className="text-lg md:text-sm font-semibold text-white/60 leading-relaxed">
            Describe your next big idea and generate
            beautiful, responsive UI instantly with AI.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-linear-to-b from-[#161616] via-[#1b1b1d] to-[#141416] flex flex-col overflow-hidden">

      <div className="flex items-center justify-center flex-1 overflow-hidden p-2">

        <div className="relative h-full transition-all duration-300 rounded-md overflow-auto bg-white border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          style={{
            width: canvasWidth,
            minWidth: isConstrained ? canvasWidth : "unset",
            maxWidth: "100%",
          }}
        >

          {isConstrained && (
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#232326] border-b border-white/10 flex items-center justify-center gap-1.5 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="w-20 h-1.5 rounded-full bg-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          )}

          <div className="w-full"
            style={{
              minHeight: "100%",
              marginTop: isConstrained ? "32px" : "0",
            }}>
            {components
              .sort((a, b) => a.order - b.order)
              .map((comp, i) => (
                <ComponentRenderer key={i} component={comp} />
              ))}
          </div>

        </div>
      </div>
    </div>
  );
}