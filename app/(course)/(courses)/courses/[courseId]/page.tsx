import React from 'react'
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';


const CourseIdPage = async (
  {params}: {
    params:{courseId: string;}
  }
) => {
  const course = await db.course.findUnique({
    where :{
      id:params.courseId
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  })
  if(!course)  {
    redirect("/");
  }
  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`)
}

export default CourseIdPage;