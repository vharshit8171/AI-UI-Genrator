import { Bot } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../../../../store/AuthStore.js";
import useSiteStore from "../../../../store/SiteStore.js";

function Message({ msg }) {
  const isAI = msg.role === "ai";
  const user = useAuthStore((state) => state.user);

  return (
    <div className={`flex gap-2 ${isAI ? "" : "flex-row-reverse"}`}>
      {isAI && (
        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-black text-[#0a0907] shrink-0 mt-0.5">
          <Bot size={18} />
        </div>
      )}
      {!isAI && (
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center overflow-hidden text-[10px] text-white shrink-0 mt-0.5">
          <img src={user.avatar} alt="avatar" />
        </div>
      )}
      <div className={`max-w-[85%] px-2 py-1.5 rounded-sm text-sm leading-relaxed ${isAI
        ? "bg-orange-500/15 border border-orange-400/30 text-orange-100"
        : "bg-white/10 border border-white/10 text-white"
        }`}
      >
        {msg.text}
        {msg.loading && (
          <span className="inline-flex gap-1 ml-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 bg-white/40 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AIChatPanel({ prompts }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [focused, setFocused] = useState(false);
  const bottomRef = useRef(null);

  const user = useAuthStore((state) => state.user);
  const createSite = useSiteStore((state) => state.createSite);
  const isCreating = useSiteStore((state) => state.isCreating);
  const createError = useSiteStore((state) => state.createError);
  const globalPrompt = useSiteStore((state) => state.globalPrompt);
  const setglobalPrompt = useSiteStore((state) => state.setglobalPrompt);

  useEffect(() => {
    if (createError) {
      toast.error(createError);
    }
  }, [createError]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const globalPromptFunc = () => {
      if (globalPrompt && !input) {
        setInput(globalPrompt);
      }
    }

    globalPromptFunc();
  }, [globalPrompt, input]);

  const promptMessages = (prompts || []).map((p) => ({
    id: `prompt-${p.content}`,
    role: p.role,
    text: p.content,
  }));

  const allMessages = [...promptMessages, ...messages];

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isCreating) return;

    const messageExists = messages.some((msg) => msg.text === trimmed);
    if (messageExists) return;

    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), role: "user", text: trimmed },
    ]);
    setInput("");
    setglobalPrompt("");

    const loadingId = uuidv4();
    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        role: "ai",
        text: "⚡ Building your UI ...",
        loading: true,
      },
    ]);

    const result = await createSite(trimmed);

    setMessages((prev) =>
      prev.map((msg) => msg.id === loadingId ? {
        id: uuidv4(),
        role: "ai",
        text: result.success
          ? "✅ Page generated successfully!"
          : `❌ ${result.error}`,
        loading: false,
      } : msg
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0e0e10]">
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-4">
        {allMessages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="px-3 pb-1.5">
        <div className={`flex items-end gap-2 bg-white/5 border rounded-xs px-3 py-2 ${focused ? "border-orange-400/50" : "border-white/10"
          }`}
        >
          <textarea value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Describe your page. Tip: include the type, purpose and key sections."
            rows={4}
            className="flex-1 bg-transparent text-base text-white outline-none resize-none"
          />
          <button onClick={() => sendMessage(input)}
            disabled={!input.trim() || isCreating}
            className="w-8 h-8 bg-orange-500 cursor-pointer hover:bg-orange-400 disabled:opacity-30 rounded-sm flex items-center justify-center text-black"
          >
            ↑
          </button>
        </div>

        <p className="text-white/30 text-[12px] mt-1 text-center">
          {user.name} | {user.email}
        </p>
      </div>
    </div>
  );
}