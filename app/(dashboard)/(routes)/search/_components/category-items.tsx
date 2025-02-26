"use client"
 
import {IconType} from "react-icons"
import { cn } from "@/lib/utils"
interface CategoryItemProps {
    label: string,
    value?: string,
    icon?: IconType
}


export const CategoryItem = (
    {label, value, icon:Icon}: CategoryItemProps
) => {
    return(
        <button
        className={cn(
            "py-2 px-3 text-sm border rounded-full flex items-center gap-x-1 hover:border-sky-800 transition")}
        type="button"
        >
            {Icon &&<Icon size={20} />}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}