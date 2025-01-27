import React from 'react'
import { db } from '@/lib/db'
import { auth } from "@clerk/nextjs/server";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { IconBadge } from '@/components/icon-badge';
import { LayoutDashboard } from 'lucide-react';
import TitleForm from './_components/title-form';

const CourseIdPage = async ({ params }:
    {
        params: { courseId: string }
    }) => {
    const reqHeaders = headers();
    const { userId } = auth({ headers: reqHeaders });
    console.log(userId);

    // if (!userId) {
    //     redirect("/sign-in");
    // }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    });

    if (!course) {
        redirect("/");
    }
    const requiredFields = [
     course.title,
     course.description,   
     course.imageUrl,   
     course.price,   
     course.categoryId,   
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length; //tu bedzie lista tych requiered field ktora nie jest falszem
    const completionText = `${completedFields}/${totalFields}`

    return (
        <div className='p-6'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-2xl font-semibold'>
                        Course setup: {course.title}
                    </h1>
                    <span className='text-sm text-slate-700'>
                        Complete all fields({completionText})
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 gap-3 mt-6'> 

                 {/* //tu moge zmienic bo teraz mi grid cols na 1 lub 2 troche ucieka na lewoo */}
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl'>
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm 
                        initialData = {course}
                        courseId = {course.id}
                    
                    />
                </div>
                
            </div>           
        </div>
    )
}

export default CourseIdPage