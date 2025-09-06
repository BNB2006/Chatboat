import { useEffect, useMemo, useRef, useState } from "react"
import MessageBubble from "./MessageBubble"
import { sendChat } from "../svervices/api";
import { SendHorizontal } from 'lucide-react';

export default function Chat(){
    const [messages, setMessages] = useState([
        {id:1, role:'assistant', content:"Hello, I'm your AI assistant!"},
    ]);

    const listRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [error, setError] = useState("")

    const canSend = useMemo(()=> input.trim().length > 0 && !loading, [input, loading])

    useEffect(() => {
    const el = listRef.current;
    if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
    }, [messages, loading]);

    async function handleSend() {
        if (!canSend) return;
        setError("");

        const userMsg = { id: crypto.randomUUID(), role: "user", content: input.trim() };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const payload = messages
            .filter((m) => m.role !== "error")
            .concat(userMsg)
            .map(({ role, content }) => ({ role, content }));

            const { text } = await sendChat({ model: "gemini-1.5-flash", messages: payload });

            setMessages((m) => [
            ...m,
            { id: crypto.randomUUID(), role: "assistant", content: text || "(No response)" },
            ]);
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            setMessages((m) => [
            ...m,
            { id: crypto.randomUUID(), role: "error", content: `⚠️ Request failed: ${msg}` },
            ]);
            setError(msg);
        } finally {
            setLoading(false);
        }
  }

    const handleKeyDown = (e) => {
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            handleSend();
        }
    }

return(
    <div className="flex flex-col flex-1 overflow-hidden"> 

        <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} text={m.content}/>
            ))}
        </div>

        {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-white/40 border-t rounded-full animate-spin"></div>
                Thinking...
            </div>
        )}

      <div className="border-t border-gray-800 bg-gray-900 p-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex bg-gray-800 rounded-2xl p-2">
            <textarea
              className="w-full resize-none bg-transparent text-gray-100 p-2 outline-none"
              rows={2}
              placeholder="Ask me anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
              <div className="flex flex-col justify-end">
                <button
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md text-white disabled:opacity-50"
                  disabled={!canSend}
                  onClick={handleSend}
                >
                  <SendHorizontal />
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
)
}