import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";


export async function PUT(req:NextRequest, {params}:
    {params:{courseId:string}}) {
        try{
            const {userId} = getAuth(req)
            console.log(userId)
            if(!userId){
                return new NextResponse("Unothoarized",{status:401})
            }
            const {list} = await req.json();

            const ownCourse = await db.course.findUnique({
                where:{
                    id: params.courseId,
                    userId: userId
                },});
            if(!ownCourse){
                return new NextResponse("Unothoarized",{status:401});

            }

            for (let item of list) {
                await db.chapter.update({
                    where: {id: item.id},
                    data: {position: item.position}
                });
            }
            return new NextResponse("success",{status:200})
            


        }catch(error){
            console.log('[Reordered]',error)
            return new NextResponse ('error',{status:500})
        }
    }