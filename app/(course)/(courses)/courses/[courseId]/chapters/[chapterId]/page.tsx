// "use client";

import { getChapter } from "@/actions/get-chapter";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { Banner } from "@/components/banner";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";

const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId
    });
    // const isLocked = true;

    const isLocked = !chapter?.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    console.log("Chapter:", chapter?.title, "isFree:", chapter?.isFree, "Purchase:", purchase, "isLocked:", isLocked, "attachments", attachments);

    return (
        <div>
            <div>
                {/* <p>fdf{muxData?.playbackid}</p> */}
            </div>
            <VideoPlayer
                chapterId={params.chapterId}
                title={chapter?.title!}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                playbackid={muxData?.playbackid!}
                isLocked={isLocked}
                completeOnEnd={completeOnEnd}
            />
            <Separator className="my-2"/>

            <div className="flex justify-between gap-x-12 mx-5">
            <h1 className="text-3xl font-bold">{chapter?.title}</h1>
            {!purchase && (
                
                    
                    <CourseEnrollButton
                    courseId={params.courseId}
                    price={course?.price!}
                />
                
                
                
                
            )}
            </div>
            <Separator className="my-2"/>
            
            <div className="flex mx-2 rounded-md shadow-md bg-gray-50 justify-center items-center p-10">
                <div className="items-center text-xl" dangerouslySetInnerHTML={{ __html: chapter?.description ?? "" }} />
            </div>
            <div>
            <Separator className="my-2"/>

                <div className="text-2xl text-center p-3 font-semibold">
                    Attachments
                </div>
            <Separator className="my-2"/>

                {attachments.length > 0 && (
                    <div className="flex flex-col p-5  bg-gray-50 rounded-md shadow-md">
                        {attachments.map((attachment) => (
                            <a
                                className="truncate break-words mb-2"
                                href={attachment.url}
                                key={attachment.id}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {attachment.name}
                            </a>
                        ))}

                    </div>
                )}
            <Separator className="my-2"/>

                
            </div>
        </div>
    );
};

export default ChapterIdPage;
