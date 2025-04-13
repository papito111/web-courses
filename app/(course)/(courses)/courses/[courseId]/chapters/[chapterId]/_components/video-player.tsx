"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

// ⛔️ SSR disabled
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="mx-auto mb-4 xl:w-11/12 w-11/12">
      {/* Nagłówek */}
      <header className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </header>

      <div className="relative border border-gray-300 shadow-md rounded-lg bg-gray-50 overflow-hidden">
        {/* Jeśli video jest zablokowane */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white z-10">
            <Lock className="w-12 h-12 mb-2" />
            <p className="text-lg font-medium">Ten materiał jest zablokowany</p>
          </div>
        )}

        {/* Kontener z proporcjami 16:9 */}
        <div className="relative w-full pt-[56.25%]">
          {!isLocked && hasMounted && (
            <MuxPlayer
              playbackId={playbackid}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};
