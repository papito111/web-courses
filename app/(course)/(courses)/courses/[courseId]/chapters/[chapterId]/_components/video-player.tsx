"use client";

import { Lock } from "lucide-react";
import MuxPlayerWrapper from "@/components/MuxPlayerWrapper"

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
  isLocked,
  title,
}: VideoPlayerProps) => {
  return (
    <div className="mx-auto mb-4 xl:w-11/12 w-11/12">
      <header className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </header>

      <div className="relative border border-gray-300 shadow-md rounded-lg bg-gray-50 overflow-hidden">
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white z-10">
            <Lock className="w-12 h-12 mb-2" />
            <p className="text-lg font-medium">Ten materiał jest zablokowany</p>
          </div>
        )}

        <div className="relative w-full pt-[56.25%]">
          {!isLocked && (
            <MuxPlayerWrapper
              playbackId={playbackid}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};
