"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamiczny import playera – SSR wyłączony
const DynamicMuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
  loading: () => <div className="text-white text-center">Ładowanie wideo...</div>,
});

interface MuxPlayerWrapperProps {
  playbackId: string;
  className?: string;
}

export default function MuxPlayerWrapper({ playbackId, className }: MuxPlayerWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DynamicMuxPlayer
      playbackId={playbackId}
      className={className}
    />
  );
}
