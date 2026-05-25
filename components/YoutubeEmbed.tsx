"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function YoutubeEmbed({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full h-[400px] md:h-[640px] overflow-hidden">
      {!playing ? (
        <>
          {/* Thumbnail */}
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            fill
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 40px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPlaying(true)}
              className="size-20 rounded-full bg-black/90 text-white flex items-center justify-center shadow-2xl cursor-pointer border-none"
            >
              <Play size={36} strokeWidth={0} className="fill-white" />
            </motion.button>
          </div>
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
