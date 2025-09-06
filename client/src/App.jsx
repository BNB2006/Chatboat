import Chat from "./components/chat";

export default function App(){
return(
    <div className="flex flex-col h-screen">
        <header className="p-4 bg-gray-900 text-white text-xl font-bold">
            Siege
        </header>

        <main className="flex-1 flex-col bg-blue-100">
            <Chat/>
        </main>
    </div>
)
}