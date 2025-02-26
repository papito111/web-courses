"use client"
 
import {IconType} from "react-icons"

interface CategoryItemProps {
    label: string,
    value?: string,
    icon?: IconType
}


export const CategoryItem = () => {
    return(
        <div>
            Category Item
        </div>
    )
}