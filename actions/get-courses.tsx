import { Category, Course } from "@prisma/client";

import { getProgress } from "./get-progress";
import { db } from "@/app/firebaseConfig";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: {id:string}[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    tit
}


export const GetCourses = async ({

})