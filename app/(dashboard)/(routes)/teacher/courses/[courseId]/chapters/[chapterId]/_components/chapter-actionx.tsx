"use client"

import { ConfirmModal } from "@/components/modals/confirm-model";
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


interface ChapterActionsProps {
    disabled: boolean;
    chapterId : string;
    courseId: string;
    isPublished: boolean;
};

export const ChapterActions = ({
    disabled, chapterId, courseId, isPublished
}:ChapterActionsProps
) => {
    
    const router = useRouter();
    const [isLoading,SetIsLoading] = useState(false);


    const onClick = async () => {
        try{
            SetIsLoading(true);
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter is unpublished");
                router.refresh()

            } else{
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter is published");
                router.refresh()


            }
        }catch{
            toast.error("Something went wrong");

        } finally {
            SetIsLoading(false)
        }
    }
    
    const onDelete = async() => {
        try{
            SetIsLoading(true);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
            toast.success("chapter deleted")
            router.refresh()
            router.push(`/teacher/courses/${courseId}`);
            
        }catch(error){
            toast.error("Something went wrong");
        } finally{
            SetIsLoading(false);
        }

    }
    return(
        <div className="flex items-center gap-x-2">
            
            <Button
            onClick={onClick}
            disabled = {disabled || isLoading}
            variant="outline"
            size="sm"
            > 
            {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete} >
            <Button disabled={isLoading} size="sm">
                <Trash2 className="h-4 w-4" />

            </Button>
            </ConfirmModal>
        </div>
    )
}