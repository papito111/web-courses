import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { create } from "domain";



export async function PUT(req:NextRequest,{params}:{params:{courseId:string, chapterId:string}}) {

    try {
        const {userId} = getAuth(req);
        const {isCompleted} = await req.json();

        

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userProgress = await db.userProgress.upsert({
            where:  {
            userId_chapterId: {
                userId,
                chapterId: params.chapterId,
            }
        },
    update: {
        isCompleted
    },
    create: {
        userId,
        chapterId: params.chapterId,
        isCompleted 

    }})
    return NextResponse.json(userProgress)
    }catch(error){
        return new NextResponse("Internal error", {status:500})
    }
}