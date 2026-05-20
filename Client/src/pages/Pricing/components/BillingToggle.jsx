export default function BillingToggle({ yearly, onToggle }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm transition-colors ${!yearly ? "text-white" : "text-white/40"}`}>Monthly</span>
      <button onClick={onToggle}
        className={`relative w-12 h-[26.3px] rounded-full border transition-all duration-300 cursor-pointer ${
          yearly ? "bg-orange-500 border-orange-500" : "bg-white/10 border-white/20"
        }`}>
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
          yearly ? "left-5" : "left-0.5"
        }`} />
      </button>
      <div className="flex items-center gap-2">
        <span className={`text-sm transition-colors ${yearly ? "text-white" : "text-white/40"}`}>Yearly</span>
        <span className="text-[11px] text-orange-400 font-semibold bg-orange-500/15 border border-orange-500/25 px-2 py-0.5 rounded-full">
          Save 20%
        </span>
      </div>
    </div>
  );
}
