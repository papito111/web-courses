"use client"
import axios from "axios"
import MuxPlayer from "@mux/mux-player-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/router"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { useConfettiStore } from "@/hooks/use-confetti"
import Mux from "@mux/mux-node"


interface VideoPlayerProps {
    playbackid: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
}

export const VideoPlayer = ({
    playbackid,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
}:VideoPlayerProps) => {

    return (
        <div>
            VideoPlayer
            <p>{title}</p>
            <p>{playbackid}</p>
            <div>
                <MuxPlayer 
                playbackId={playbackid}
                
                />
            </div>
        </div>

    )
}