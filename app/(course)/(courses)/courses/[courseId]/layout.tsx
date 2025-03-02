import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getProgress } from '@/actions/get-progress';

const CourseLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { courseId: string }
}) => {

    const { userId } = await auth();
    
        if (!userId) {
            return redirect("/")
        }
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters : {
                where : {
                    isPublished: true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId
                        }
                    }
                },
                orderBy:{
                    position: "asc"
                }
            }
        }
    })
        if(!course) {
        return redirect("/search")
    }

    const progressCount = await getProgress(userId, course.id);

    return (
        <div className='h-full'>
            <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>
                <CourseSidebar 
                course = {course}
                />
            </div>
            <main>
            {children}

            </main>
        </div>
    );
}

export default CourseLayout;