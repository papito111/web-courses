"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface ChapterActionsProps {
    disabled: boolean;
    chapterId : string;
    coursId: string;
    isPublished: boolean;
};

export const ChapterActions = ({
    disabled, chapterId, coursId, isPublished
}:ChapterActionsProps
) => {
    return(
        <div className="flex items-center gap-x-2">
            
            <Button
            onClick={()=>{}}
            disabled = {disabled}
            variant="outline"
            size="sm"
            > 
            {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button size="sm">
                <Trash2 className="h-4 w-4" />

            </Button>
        </div>
    )
}