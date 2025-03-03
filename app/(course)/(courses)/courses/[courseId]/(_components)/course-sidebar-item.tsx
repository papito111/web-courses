"use client"

import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
// import { LockIcon } from "lucide-react";


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
    const isActive = pathname?.includes(id);

    const Icon = isLocked  ? Lock: (isCompleted ? CheckCircle : PlayCircle);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }

  return (
    <button type ="button" onClick = {onClick} 
    className={cn(
        "flex items-center border-slate-100 border  gap-x-2 text-slate-500 text-sm pl-6 transition-all hover:bg-slate-300/20",
        isActive && "text-slate-800 bg-slate-200/20",
        isCompleted &&"text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-300/60"
    )}
    >
        <div className=" flex items-center justify-center gap-x-2 py-5">
            <Icon  size={22}
            className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-800"
            )}
            
            />
            {label}

        </div>
        <div className={cn(
            "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
            isActive && "opacity-100",
            isCompleted && "border-emerald-600",

        )}>

        </div>
    </button>
  )
}

export default CourseSidebarItem