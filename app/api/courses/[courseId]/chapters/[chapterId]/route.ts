import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

import {Mux} from "@mux/mux-node"

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(req:NextRequest,{params}:{params:{courseId:string, chapterId:string}}) {

    try {
        const {userId} = getAuth(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            },
        });

        if(!ownCourse){
            return new NextResponse("Unathoarrized",{status:401})
        }

        const chapter = await db.chapter.findUnique({
            where:{
                id:params.chapterId,
                courseId: params.courseId,
            }
        })
        if(!chapter){
            return new NextResponse("Not found",{status:404})
        }

        if(chapter.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where:{
                    chapterId: params.chapterId
                }
            });
            if (existingMuxData) {
                                // await video.assets.del(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id:existingMuxData.id
                    }
                })

            }
        }
        const deletedChapter = await db.chapter.delete({
                where:{
                    id:params.chapterId
                }
            });
        
        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                id:params.courseId,
                isPublished:true,
            }
        });

        if(!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id:params.courseId
                },
                data: {
                    isPublished:false,
                }
            })
        }
        return NextResponse.json(deletedChapter);
    } catch(error) {
        console.log("[dekleting_id",error)
        return new NextResponse("internal error",{status:500})
    }
    
}


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
                // await video.assets.del(existingMuxData.assetId);
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