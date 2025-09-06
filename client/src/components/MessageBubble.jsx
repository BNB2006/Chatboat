import Avatar from "./Avatar";
import CopyButton from "./CopyButton";

export default function MessageBubble({ role, text }){
    const isUser = role === "user";
    const isError = role === "error";
    return(
        <div className={`flex m-2 ${isUser ? 'justify-end':'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg border shadow-lg whitespace-pre-wrap
                ${isUser ? 'bg-gray-800 text-white border-gray-700'
                    : isError ? 'bg-red-400 text-red-100 border-red-600' :'bg-gray-200 text-gray-900 border-gray-300'
                }`}>

                <div className="flex items-center gap-2 mb-1 opacity-80">
                    <Avatar role={role}/>
                    <span className="text-xs text-gray-500">{role}</span>
                </div>

                <div>{text}</div>

                <div className="mt-2">
                    <CopyButton text={text}/>
                </div>
                
            </div>

        </div>
    )
}