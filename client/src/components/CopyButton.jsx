import { useState } from "react"

export default function CopyButton(){
    const [done, setDone] = useState(false)

    async function copy() {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(()=> setDone(false), 1200)
    }

    return(
        <button className="text-xs border rounded-md px-2 py-1 text-black hover:bg-gray-200">
            {done ? 'Copied': 'Copy'}
        </button>
    )
}