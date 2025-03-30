import {db} from"@/lib/db";
import {getAuth} from "@clerk/nextjs/server";
import { NextResponse,NextRequest } from "next/server";
export async function POST(
    req: NextRequest,
) {
    try {
        const {userId} = getAuth(req);
        // console.log(userId)
        const {title} = await req.json();
    if (!userId) {
        return new NextResponse("Unauthorized", {status: 401});
    }
    const course = await db.course.create({
        data: {
            userId,
            title,
        }
    });
    return NextResponse.json(course);
    } catch(error) {
        console.log("[COURSES]", error)
        return new NextResponse("Internal error", {status: 500})

    }


}