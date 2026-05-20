import { EDITOR_LAYERS, EDITOR_PROPERTIES } from "../../../constants/landingData.jsx";

export default function EditorMockup() {
  return (
    <section className="relative z-10 px-8 pt-4.5 pb-10">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white/2.5 border border-orange-300/10 rounded-2xl overflow-hidden shadow-[0_48px_120px_rgba(0,0,0,0.55),0_0_80px_rgba(249,115,22,0.05)]">

          <div className="flex items-center gap-3 bg-white/3 px-5 py-4 border-b border-white/5">
            <div className="flex gap-2">
              {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                <div
                  key={color}
                  className="w-3 h-3 rounded-full opacity-80"
                  style={{ background: color }}
                />
              ))}
            </div>

            <div
              className="flex-1 bg-white/5 rounded-md px-4 py-1.5 text-sm text-white/30"
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              app.buildr.ai/editor/my-saas-landing
            </div>

            <div className="bg-orange-500/15 border border-orange-500/30 rounded-md px-3 py-1 text-xs text-orange-400 font-semibold">
              ● LIVE
            </div>
          </div>

          <div className="flex h-140">

            <div className="w-64 shrink-0 border-r border-white/5 p-4 bg-black/25">
              <p className="text-xs text-white/20 tracking-widest uppercase mb-4">
                Layers
              </p>

              {EDITOR_LAYERS.map((layer, i) => (
                <div
                  key={layer}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md mb-1 border ${
                    i === 0
                      ? "bg-orange-500/15 border-orange-500/30"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  <span className="text-xs text-white/40">▣</span>

                  <span
                    className={`text-sm ${
                      i === 0 ? "text-amber-400" : "text-white/40"
                    }`}
                  >
                    {layer}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex-1 p-10 bg-black/10 relative overflow-hidden">

              <div className="h-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 w-[55%] mb-4" />

              <div className="h-2 rounded-full bg-white/[0.07] w-[75%] mb-3" />

              <div className="h-2 rounded-full bg-white/5 w-[45%] mb-6" />

              <div className="h-20 rounded-xl bg-orange-500/8 border border-orange-500/18 mb-6" />

              <div className="grid grid-cols-3 gap-3">
                {["opacity-[0.09]", "opacity-[0.06]", "opacity-[0.08]"].map(
                  (op, i) => (
                    <div
                      key={i}
                      className={`h-28 rounded-lg bg-white/${op} border border-white/5`}
                    />
                  )
                )}
              </div>

              <div className="absolute top-6 left-6 right-6 h-10 border border-dashed border-orange-500/50 rounded pointer-events-none">

                <div className="absolute -top-1 -left-1 w-2 h-2 bg-orange-500 rounded-sm" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-sm" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-500 rounded-sm" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-500 rounded-sm" />

              </div>

              <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-linear-to-br from-orange-500 to-amber-500 rounded-lg px-4 py-2.5 shadow-[0_4px_24px_rgba(249,115,22,0.45)]">
                <span className="text-base">✦</span>

                <span className="text-sm text-[#0a0907] font-bold">
                  AI suggestion ready
                </span>
              </div>

            </div>

            <div className="w-56 shrink-0 border-l border-white/5 p-4 bg-black/20">

              <p className="text-xs text-white/20 tracking-widest uppercase mb-4">
                Properties
              </p>

              {EDITOR_PROPERTIES.map(([key, value]) => (
                <div key={key} className="mb-3">

                  <p className="text-xs text-white/30 mb-1">
                    {key}
                  </p>

                  <div
                    className="bg-white/5 rounded px-3 py-2 text-sm text-white/60"
                    style={{ fontFamily: "DM Mono, monospace" }}>
                    {value}
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}