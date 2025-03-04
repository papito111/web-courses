import React from 'react'
import { Chapter, Course, UserProgress } from "@prisma/client";

interface CourseMobileSidebarProps {
    course: Course & {
        chapters: (Chapter & { 
            userProgress: UserProgress[] | null;
        }) [];
    };
    progressCount: number;
};

export const CourseMobileSidebar = ({
    course,
    progressCount
}: CourseMobileSidebarProps) => {


    return(
        <div className="p-4 text-white  border-b h-full flex items-center bg-gray-900 shadow-sm">
            
            
        </div>
    )
}