"use client"
 
import {IconType} from "react-icons"
import { cn } from "@/lib/utils"
import { usePathname, useSearchParams,useRouter } from "next/navigation"
interface CategoryItemProps {
    label: string,
    value?: string,
    icon?: IconType
}


export const CategoryItem = (
    {label, value, icon:Icon}: CategoryItemProps
) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");
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