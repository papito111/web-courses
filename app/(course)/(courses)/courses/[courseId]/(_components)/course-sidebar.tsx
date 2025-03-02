import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Course, Chapter, UserProgress } from '@prisma/client';


interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
}

const CourseSidebar = async ({course, progressCount}:CourseSidebarProps) => {
  
    const { userId } = await auth();
        
            if (!userId) {
                return redirect("/")
            }
  
  
    return (

    <div>CourseSidebar</div>
  )
}

export default CourseSidebar