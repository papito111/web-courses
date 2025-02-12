"use client"
import React from 'react'
import * as z from "zod";
import axios from 'axios';
import MuxPlayer from "@mux/mux-player-react"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil, PlusCircle, VideoIcon } from 'lucide-react';
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import { Course, MuxData, Chapter } from '@prisma/client';
import { FileUpload } from '@/components/ui/file-uploader';

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    videoUrl: z.string().min(1, {
        message: "Video URL is required",
    }),
});

const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = React.useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { videoUrl: initialData?.videoUrl || "" },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter is updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.log("something went wrong", error)
            toast.error("Failed to update the Chapter")
        }
    }

    return (
        <div className='border mt-6 bg-slate-200 rounded-md p-2'>
            <div className='font-medium flex items-center justify-between'>
                Chapter Video
                <Button onClick={toggleEdit} className="hover:bg-transparent" variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className='h-4 w-4 mr-1' />
                            Add a Video
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className='h-4 w-4' />
                            Edit Video
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className='flex items-center justify-center h-60'>
                        <VideoIcon className='h-24 w-24' />
                    </div>
                ) : (
                    <div className='relative aspect-video mt-2'>
                        <MuxPlayer playbackId={initialData?.muxData?.playbackid || ""}/>

                        {/* <video
                            controls
                            className="object-cover rounded-md w-full h-full"
                            src={initialData.videoUrl}
                        /> */}
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                    <div>
                        {/* 16:9 ratio recommended */}
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className='italic text-center'>
                    Videos can take a few minutes to process. Refresh the page if video does not appear.
                </div>
            )}
            {/* --- {initialData.title} --- {courseId} */}
        </div>
    )
}

export default ChapterVideoForm