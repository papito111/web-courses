"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti";
import axios from "axios";
import { CheckCircle, Ghost, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
    chapterId: string;
    courseId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
};


export const CourseProgressButton = ({
    chapterId, courseId, isCompleted, nextChapterId
}: CourseProgressButtonProps) => {
    const router = useRouter();
    const Icon = isCompleted ? XCircle : CheckCircle;
    const confetti = useConfettiStore();
    const [isLoading,setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,
                {isCompleted :! isCompleted}
            );
            if(!isCompleted && !nextChapterId){
                confetti.onOpen();
            }
            if(!isCompleted && nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }

        }
        catch{
            toast.error("Something went wrong")
        }finally {
            setIsLoading(false)
        }
    }

    return(
        <div>
            <Button className="w-full md:w-auto"variant={isCompleted  ? "success":"default"}>
            {isCompleted ? "Not completed": "Mark as completed"}
            <Icon className="h-4 w-4 ml-2 "/>

            </Button>
        </div>
    )
}