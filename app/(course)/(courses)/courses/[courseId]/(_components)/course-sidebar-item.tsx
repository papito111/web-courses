"use client"

import { CheckCircle, PlayCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
    
}



const CourseSidebarItem = ({
    label, id, isCompleted, courseId, isLocked

}: CourseSidebarItemProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked  ? Lock: (isCompleted ? CheckCircle : PlayCircle);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }

  return (
    <button type ="button" onClick = {onClick} 
    className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm pl-6 transition-all"
    )}
    >
        <div>
            <Icon />
            {label}
        </div>
    </button>
  )
}

export default CourseSidebarItem