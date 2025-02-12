import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

import {Mux} from "@mux/mux-node"

const { video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
);



export async function PATCH(req:NextRequest,{params}:{params:{courseId:string, chapterId:string}}){
    try{
        const {userId} = getAuth(req);
        console.log("chapter title changed by user: ", userId);

        const {isPublished, ...values} = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            },
        });
        console.log(params.courseId)
        console.log(params.chapterId)

        console.log("this is how db looks like",ownCourse)

        if(!ownCourse){
            return new NextResponse("Unathoarrize",{status:401})
        }

        const chapter = await db.chapter.update({
            where: {
                id:params.chapterId,
                courseId: params.courseId
            },
            data: {
                ...values,
            }
        });
        console.log(values)
        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId
                }
            });

            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    }
                });

            }
            console.log(values.videoUrl)
            const asset = await video.assets.create({
                input: values.videoUrl,
                playback_policy: ["public"],
                test: false,
            });
            console.log("eee",asset)

            await db.muxData.create({
                data:{
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackid: asset.playback_ids?.[0]?.id,
                }
            })

        }

        return NextResponse.json(chapter);
    }catch(error){
        return new NextResponse("some error in chapter title",{status:500})

    }
}