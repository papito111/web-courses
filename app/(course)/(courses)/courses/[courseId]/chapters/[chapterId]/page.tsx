// "use client";
import { getChapter } from "@/actions/get-chapter";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { VideoPlayer } from "./_components/video-player";
import { Banner } from "@/components/banner";
const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
    const {userId} = await auth()
    // const [userId, setUserId] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchUserId = async () => {
    //         try {
    //             const res = await fetch("/api/user");
    //             if (!res.ok) throw new Error("Unauthorized");
    //             const data = await res.json();
    //             setUserId(data.userId);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchUserId();
    // }, []);
    if(!userId){
        redirect("/")
    }
    const {chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,} = await getChapter({
        userId,
        chapterId:params.chapterId,
        courseId: params.courseId
    })
    const isLocked = !chapter?.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;
    return (
        <div>
            {/* <p>User ID: {userId ?? "Loading..."}</p>
            <p>Course ID: {params.courseId}</p>
            <p>Chapter ID: {params.chapterId}</p> */}
            <VideoPlayer 
            chapterId = {params.chapterId}
            title ={chapter?.title!}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackid={muxData?.playbackid!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            
            />
            <div>{chapter?.description}</div>

        </div>
        
    );
};

export default ChapterIdPage;
