import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
export async function POST(
    req: NextRequest, 
    { params }: { params: { courseId : string}}

) {
    try{
        const { userId} = getAuth(req)
        console.log(userId)
        const {url} = await req.json()

        if (!userId) {
            return new NextResponse("Unathorized client", {status:401});
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });
        if (!courseOwner){
            return new NextResponse("Unathorized client", {status:402});

        }
        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split('/').pop(),
                courseId: params.courseId
            }
        });
        return NextResponse.json(attachment);
    } catch (error){
        console.log("course id attachmens", error);
        return new NextResponse("internal error", {status: 500});
    }
    
}