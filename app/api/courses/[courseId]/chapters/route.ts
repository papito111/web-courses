
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req:NextRequest,
    {params} : {params: {courseId: string}}
) {
    try{
        const {userId} = getAuth(req)
        console.log(userId)
        const { title} = await req.json()

        if(!userId) {
            return new NextResponse("Unathorized",{status:401})
        }
        const courseOwner = await db.course.findUnique({
            where:{
                id: params.courseId,
                userId: userId,
            }
        });
        if(!courseOwner) {
            return new NextResponse("Unathorized",{status:401})
        }

        const lastChapter = await db.chapter.findFirst({
            where:{
                courseId: params.courseId
            },
            orderBy:{
                position: "desc"
            },
        });

        const newPostion = lastChapter ? lastChapter.position + 1: 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                courseId: params.courseId,
                position: newPostion
            }
        });
        return NextResponse.json(chapter);
    }catch(error){
        console.log(error)
        new NextResponse("Internal error",{status:500})

    }
}