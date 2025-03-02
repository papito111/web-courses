import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Course, Chapter, UserProgress } from '@prisma/client';
import CourseSidebarItem from './course-sidebar-item';

interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
}

const CourseSidebar = async ({course, progressCount}:CourseSidebarProps) => {
    let purchase = true;
    const { userId } = await auth();
        
            if (!userId) {
                return redirect("/")
            }
  
            
    return (
        <div className='h-full border-r flex flex-col overflow-y-auto'>
            <div className='p-8 flex flex-col border'>
                <h1 className='font-semibold'>
                    {course.title}

                </h1>
            </div>
            <div className='flex flex-col w-full'>
                {course.chapters.map((chapter)=>
                <CourseSidebarItem
                    key={chapter.id}
                    id={chapter.id}
                    label = {chapter.title}
                    isCompleted= {!!chapter.userProgress?.[0]?.isCompleted}
                    courseId={course.id}
                    isLocked={!chapter.isFree  && !purchase}





                />
                )}
                
            </div>
        </div>

  )
}

export default CourseSidebar