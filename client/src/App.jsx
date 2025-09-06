import Chat from "./components/Chat";

export default function App(){
return(

    <div className="flex flex-col h-screen bg-gray-700 text-gray-100">
        <header className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
            <div className="flex items-center justify-center w-15 h-9 rounded-md bg-indigo-500 font-bold text-white">
                Seige
            </div>
            <div>
                <h1 className="text-lg font-semibold text-gray-400">AI Chatbot</h1>
            </div>
        </header>

        <Chat/>
    </div>
)
}