import { useState, useRef, useEffect } from "react";

const MODELS = [
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    provider: "Meta",
    tag: "Best",
    tagColor: "#0866ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
  
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B",
    provider: "Meta",
    tag: "Fast",
    tagColor: "#0064e1",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },


  {
    id: "deepseek-r1-distill-qwen-32b",
    name: "DeepSeek R1 32B",
    provider: "DeepSeek",
    tag: "Reasoning",
    tagColor: "#4f46e5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },

  {
    id: "gemma2-9b-it",
    name: "Gemma 2 9B",
    provider: "Google",
    tag: "Light",
    tagColor: "#4285f4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 12v8A8 8 0 1 1 20 12h-8z" />
      </svg>
    ),
  },
];

export { MODELS };

export default function ModelSelector({ selectedModel, setSelectedModel }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = MODELS.find((m) => m.id === selectedModel) || MODELS[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="ml-3 relative" ref={ref}>
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-150 outline-none focus:ring-2 focus:ring-gray-200"
        style={{ minWidth: 175 }}>
        <span style={{ color: selected.tagColor, display: "flex", alignItems: "center" }}>
          {selected.icon}
        </span>

        <span className="text-gray-800 text-sm font-medium flex-1 text-left leading-none">
          {selected.name}
        </span>

        <span className="text-xs font-medium px-1.5 py-0.5 rounded-full leading-none"
          style={{ backgroundColor: selected.tagColor + "18", color: selected.tagColor }}
        >
          Free
        </span>

        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="text-gray-400 shrink-0 transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          style={{ minWidth: 230, top: "100%" }}>
          <div className="px-2 pt-2.5 pb-2">
            <div className="px-2 pb-2 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Free Models
              </span>
              <span className="text-xs text-center bg-green-50 text-green-600 border border-green-100 font-medium px-1.5 py-0.5 rounded-full">
                No credits needed
              </span>
            </div>

            {MODELS.map((model) => (
              <DropdownItem
                key={model.id}
                model={model}
                selected={selectedModel === model.id}
                onSelect={() => { setSelectedModel(model.id); setOpen(false); }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ model, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors duration-100"
      style={{ backgroundColor: selected ? model.tagColor + "12" : "transparent" }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.backgroundColor = selected ? model.tagColor + "12" : "transparent"; }}
    >
      <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-md"
        style={{ backgroundColor: model.tagColor + "14", color: model.tagColor }}
      >
        {model.icon}
      </span>

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-sm font-medium text-gray-800 leading-tight">{model.name}</span>
        <span className="text-xs text-gray-400 leading-tight mt-0.5">{model.provider}</span>
      </div>

      <span className="text-xs font-medium px-1.5 py-0.5 rounded-full shrink-0"
        style={{ backgroundColor: model.tagColor + "15", color: model.tagColor }}
      >
        Free
      </span>

      {selected && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: model.tagColor, flexShrink: 0 }}>
          <path d="M2.5 7l3.5 3.5 5.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}