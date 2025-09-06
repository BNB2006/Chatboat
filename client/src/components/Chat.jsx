import { useEffect, useMemo, useRef, useState } from "react"
import MessageBubble from "./MessageBubble"
import { sendChat } from "../svervices/api";

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

        <div ref={listRef} className="flex-1 overflow-y-auto p-4">
            {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} text={m.content}/>
            ))}
        </div>

        {loading && (
            <div className="text-sm flex items-center gap-2 text-gray-500 mt-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                Thinking...
            </div>
        )}

        <div className="flex items-center gap-2 border-gray-300 p-4">
            <textarea 
                className="flex-1 resize-none p-2 bg-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                rows={3}
                placeholder="Ask me anything..."
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button disabled={!canSend} onClick={handleSend}
                className={`px-4 py-2 rounded-lg text-white ${canSend ? 'bg-blue-500 hover:bg-blue-600':'bg-blue-300 cursor-not-allowed'}`}>
                {loading ? 'Sending' : 'Send'}
            </button>
        </div>
    </div>
)
}