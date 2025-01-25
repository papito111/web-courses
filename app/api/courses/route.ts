import {db} from"@/lib/db";
import {getAuth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function POST(
    req: Request,
) {
    try {
        const {userId} = getAuth(req);
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