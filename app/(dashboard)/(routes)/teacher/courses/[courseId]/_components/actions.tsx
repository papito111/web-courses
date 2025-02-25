"use client"

import { ConfirmModal } from "@/components/modals/confirm-model";
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti";


interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};

export const Actions = ({
    disabled,  courseId, isPublished
}:ActionsProps
) => {
    
    const router = useRouter();
    const [isLoading,SetIsLoading] = useState(false);
    const confetti = useConfettiStore();


    const onClick = async () => {
        try{
            SetIsLoading(true);
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course is unpublished");
                router.refresh()

            } else{
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course is published");
                router.refresh()
                confetti.onOpen();


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
            await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course deleted")
            router.refresh()
            router.push(`/teacher/courses`);
            
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