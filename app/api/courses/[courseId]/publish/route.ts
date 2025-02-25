import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

import {Mux} from "@mux/mux-node"



export async function PATCH(req:NextRequest,{params}:{params:{courseId:string, chapterId:string}}){
    try{
        const {userId} = getAuth(req);
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const course = await db.course.findUnique({
            where:{
                id: params.courseId,
                userId
            },
            include: {
                chapters:{
                    include:{
                        muxData: true
                    }
                }
            }
        })
        if (!course) {
            return new NextResponse("No course to be published", { status: 401 });
        }

        const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);
        

    }catch(error){
        return new NextResponse("some error in chapter title",{status:500})

    }
}