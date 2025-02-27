"use client"
import qs from  "querystring";
import { useState } from "react"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { Input } from "@/components/ui/input"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export const SearchInput = () => {
    const [value,setValue] = useState("")
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = `${pathname}?${qs.stringify({
            categoryId: currentCategoryId,
            title: debouncedValue,
        })}`;
        router.push(url);
    },[debouncedValue, currentCategoryId, router, pathname])


    return(
        <div className="-mt-10 flex justify-center mx-auto  items-center text-center">
            <Search className="gap-x-2 mr-2"/>

            <Input
                className="bg-gray-200  p-2 items-center rounded-lg w-full max-w-md"
                placeholder="Szukaj..."
                onChange={(e)=>setValue(e.target.value)}
                value={value}
                
            >

            </Input>

        </div>
    )
}
