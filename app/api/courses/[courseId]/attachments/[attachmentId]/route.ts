import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function DELETE(
    req:Request,
    {params}: {params:{courseId: string, attachmentId:string}}
) {
    try{
        const {userId} = getAuth(req);
        if(!userId){
            return new NextResponse("Unathouarized",{status:401});
        }

        const courseOwner = await db.course.findUnique( {
            where:{
                id: params.courseId,
                userId: userId
            }
        });
        if(!courseOwner){
            return new NextResponse("Unathouarized",{status:401});

        }

        const attachment = await db.attachment.delete({
            where:{
                courseId: params.courseId,
                id: params.attachmentId
                
            }
        });
        return NextResponse.json(attachment);

    }catch(error){
        console.log(error)
        return new NextResponse("Unathouarized",{status:401});

    }




}