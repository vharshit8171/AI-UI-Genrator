import AIChatPanel from "./AIChatPanel";

export default function LeftSidebar({prompts}) {

  return (
    <aside className="w-100 shrink-0 bg-[#0d0b09] border-r border-white/6 flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        {<AIChatPanel prompts={prompts} />}
      </div>
    </aside>
  );
}
