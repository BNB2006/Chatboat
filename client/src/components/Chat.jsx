import { useState } from "react"
import MessageBubble from "./MessageBubble"

export default function Chat(){
    const [messages] = useState([
        {id:1, role:'assistant', content:"Hello, I'm your AI assistant!"},
        {id:2, role:'user', content:"Hi, can you help me?"},
        {id:3, role:'error', content:'Something went wrong!'}
    ])
return(
    <div className="flex flex-col flex-1 overflow-hidden">

        <div className="flex-1 overflow-y-auto p-4">
            {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} text={m.content}/>
            ))}
        </div>

        <div className="absolute bottom-3 left-5 right-5 flex items-center gap-2 border-gray-300">
            <textarea 
                className="flex-1 resize-none p-2 bg-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                rows={3}
                placeholder="Type a message..."
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg opacity-50 cursor-pointer">Send</button>
        </div>
    </div>
)
}