"use client";
import { Category } from "@prisma/client";
import {FcMusic, FcMultipleDevices, FcCameraAddon,FcEngineering} from "react-icons/fc"
import { IconType } from "react-icons";
import { CategoryItem } from "./category-items";

interface CategoryProps{
    items: Category[]
}

const iconMap: Record<string, IconType> = {
    "Data science": FcMusic,
    "PLC": FcMultipleDevices,
    "Systemy wizyjne":FcCameraAddon,
    "Przemysł 4.0":FcEngineering,

};


export const Categories = (
    {items}:CategoryProps
) => {
    return(
        <div className="flex justify-center gap-x-2 items-center pb-2 overflow-x-auto">
            {items.map(
            (item)=>(<CategoryItem 
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
                />
        ))}
        </div>
    )
}