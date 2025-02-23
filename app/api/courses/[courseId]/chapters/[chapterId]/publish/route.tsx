import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";



export async function PATCH(req:NextRequest,{params}:{params:{courseId:string, chapterId:string}}) {

    try {
        const {userId} = getAuth(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            },
        });

        if(!ownCourse){
            return new NextResponse("Unathoarrized",{status:401})
        }

        const chapter = await db.chapter.findUnique({
            where:{
                id:params.chapterId,
                courseId: params.courseId
            }
        });
        if(!chapter){
            return new NextResponse("there is no such a chapter",{status:401})
        }

        const muxData = await db.muxData.findUnique({
            where:{
                chapterId:params.chapterId
            }
        });

        if (!chapter|| !muxData || !chapter.title || !chapter.description || !chapter.videoUrl){
        return new NextResponse("Missing data",{status:400})

        }

        const publishedChapter = await db.chapter.update({
            where: {
                id:params.chapterId,
                courseId: params.courseId
            },
            data:{
                isPublished: true,
            }
        })
        return NextResponse.json(publishedChapter)
    }catch(error){
        console.log("published incorecctly",error)
        return new NextResponse("Internal error",{status:500})
        

    }
}