import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

import {Mux} from "@mux/mux-node"



export async function PATCH(req:NextRequest,{params}:{params:{courseId:string, chapterId:string}}){
    try{
        const {userId} = getAuth(req);

    }catch(error){
        return new NextResponse("some error in chapter title",{status:500})

    }
}