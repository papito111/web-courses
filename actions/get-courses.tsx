import { Category, Course } from "@prisma/client";

import { getProgress } from "./get-progress";
import { db } from "@/lib/db";
import { Container } from "lucide-react";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: {id:string}[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
};


export const GetCourses = async ({
    userId,
    title,
    categoryId

}:GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try{
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id:true,
                    }
                    
                    
                },
                purchases: {
                    where: {
                        userId
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }

        })
        const courseWithProgress: CourseWithProgressWithCategory[] = await
        Promise.all(
            courses.map(async course=> {
                if(course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null,
                    }
                }
                const progressPercentage = await getProgress(userId, course.id);
                return {
                    ...course,
                    progress: progressPercentage,
                }
            })
        ) 
        

        return courseWithProgress;
    }
    catch(error){
        console.log("getcourses", error)
        return[]
    }
}