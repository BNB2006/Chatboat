import Avatar from "./Avatar";
import CopyButton from "./CopyButton";

export default function MessageBubble({ role, text }){
    const isUser = role === "user";
    const isError = role === "error";
    return(
        <div className={`flex ${isUser ? 'justify-end':'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-xl shadow
                ${isUser ? 'bg-gray-900 text-white' : isError ? 'bg-[#9c3838] text-red-100':'bg-gray-800 text-gray-100 border-gray-300'
                }`}>

                <div className="flex items-center gap-2 mb-1 text-xs opacity-80">
                    <Avatar role={role}/>
                    <span className="text-xs text-gray-500">{role}</span>
                </div>

                <div className="whitespace-pre-wrap">{text}</div>

                <div className="mt-1 flex justify-end">
                    <CopyButton text={text}/>
                </div>
                
            </div>

        </div>
    )
}