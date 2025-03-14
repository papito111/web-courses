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
        <div className="max-w-6xl mx-auto p-2">
          <header className="text-center mb-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            {/* <p className="text-sm text-gray-500">Playback ID: {playbackid}</p> */}
          </header>
          <section className="border border-gray-300 shadow-md rounded-lg p-3 bg-gray-50">
            <MuxPlayer playbackId={playbackid} />
          </section>
        </div>
      );
      
}