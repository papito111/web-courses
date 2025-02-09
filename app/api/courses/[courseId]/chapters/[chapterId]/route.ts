import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";



export async function PATCH(req:NextRequest,{params}:{params:{courseId:string, chapterId:string}}){
    try{
        const {userId} = getAuth(req);
        console.log("chapter title changed by user: ", userId);
        const {isPublished, ...values} = await req.json()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            },
        });
        console.log(ownCourse)

        if(!ownCourse){
            return new NextResponse("Unathoarrize",{status:401})

        }

        const chapter = await db.chapter.update({
            where: {
                id:params.chapterId,
                courseId: params.courseId

            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(chapter);
    }catch(error){
        return new NextResponse("some error in chapter title",{status:500})

    }
}