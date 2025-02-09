import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";



export async function PATCH(req:NextRequest,{params}:{params:{courseId:string, chapterId:string}}){
    try{
        const auth = getAuth(req);
        const userId = auth?.userId;
        console.log("chapter title", userId);
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const ownCourse = await db.course.findUnique({
            where: {
                id:params.courseId,
                userId
            }
        });

        if(!ownCourse){
            return new NextResponse("Unathoarrize",{status:401})

        }


    }catch(error){
        return new NextResponse("Unathoarrize",{status:500})

    }
}