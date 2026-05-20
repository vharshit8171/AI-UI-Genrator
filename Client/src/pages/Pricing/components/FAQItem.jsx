import { useState } from "react";

export default function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-lg overflow-hidden transition-all duration-200 ${
      open ? "border-orange-500/25 bg-orange-500/4" : "border-white/[0.07] bg-white/2 hover:border-white/15"
    }`}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-transparent border-none cursor-pointer">
        <span className="text-white/80 text-md font-medium">{faq.q}</span>
        <span className={`text-white/40 text-lg leading-none transition-transform duration-200 shrink-0 ${open ? "rotate-45 text-orange-400" : ""}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-white/45 text-sm leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}
