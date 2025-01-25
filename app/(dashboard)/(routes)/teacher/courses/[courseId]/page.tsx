import React from 'react'
import { db } from '@/lib/db'
import { auth } from "@clerk/nextjs/server";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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
    const completionText = `${completedFields}/${totalFields} is completed`

    return (
        <div>
            Course Id: {params.courseId} <br />
            User Id: {userId} <br />
            Course Title: {course?.title}<br />
            Author id: {course?.userId}<br />
            <p>{completionText}</p>
        </div>
    )
}

export default CourseIdPage