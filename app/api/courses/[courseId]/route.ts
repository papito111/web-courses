import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";


export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try {
        const { userId } = getAuth(req);
        console.log(userId)
        const { courseId } = params;
        const values = await req.json();
        
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
    }
    
    }
    catch(error) {
        console.log("Error ocurred", error)
    }

}