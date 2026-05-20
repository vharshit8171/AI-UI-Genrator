import { useState } from "react";
import useSiteStore from "../../../../store/SiteStore.js";
import {useNavigate} from "react-router-dom"

export default function AIPromptBar() {
  const [prompt, setPrompt] = useState("");
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();
  const setglobalPrompt = useSiteStore((state) => state.setglobalPrompt);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setglobalPrompt(prompt)
    setPrompt("");
    navigate("/editor")
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGenerate();
  };

  return (
    <div className={`flex items-center gap-1.5 bg-white/3 border rounded-lg pl-5 pr-2 py-3 transition-all duration-200 ${
      focused ? "border-orange-500/40 shadow-[0_0_0_3px_rgba(249,115,22,0.08)]" : "border-white/8"
    }`}>
      <span className="text-2xl text-white shrink-0">✦</span>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Describe a new site and I'll build it... e.g. 'a landing page for my coffee brand'"
        className="flex-1 bg-transparent text-md text-white/70 placeholder-white/25 outline-none"
      />

      <button
        onClick={handleGenerate}
        disabled={!prompt.trim()}
        className="shrink-0 bg-orange-500 hover:bg-orange-400 disabled:opacity-30 disabled:cursor-not-allowed text-[#0a0907] text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer border-none"
      >
        Generate →
      </button>
    </div>
  );
}
