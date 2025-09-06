export default function Avatar({ role }){

    if(role === "error"){
        return(
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-red-500 text-white font-bold">
                !
            </div>
        )
    }

    if(role === "user"){
        return(
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-500 text-gray-900 font-bold">
                You
            </div>
        )
    }

    return(
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white font-bold">
            AI
        </div>
    )
}