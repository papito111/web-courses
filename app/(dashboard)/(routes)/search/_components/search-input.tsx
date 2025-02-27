"use client"

import { useState } from "react"


export const SearchInput = () => {
    const [value,setValue] = useState("")
    return(
        <div className="-mt-10 flex justify-center mx-auto  items-center text-center">
            <input
                className="bg-gray-200  p-2 items-center rounded-lg w-full max-w-md"
                placeholder="Szukaj..."
                onChange={(e)=>setValue(e.target.value)}
                value={value}
            />
        </div>
    )
}
