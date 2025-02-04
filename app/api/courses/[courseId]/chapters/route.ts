
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req:Request,
    {params : {params: {courseId: string}}}
) {
    try{
        const {userId} = getAuth(req)
        console.log(userId)
        const { title} = await req.json()

        if(!userId) {
            new NextResponse("Unathorized",{status:401})
        }


    }catch(error){
        console.log(error)
        new NextResponse("Internal error",{status:500})

    }
}