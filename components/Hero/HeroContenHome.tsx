"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  summary: string;
}

export default function HeroContentHome({ summary }: Props) {
  return (
    <div className="relative z-[2] w-full max-w-[1400px]  mx-auto px-6 flex flex-col items-center text-center gap-6">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center"
      >
        <Image
          src="/assets/Aura-Mahakam.png"
          alt="AURA MAHAKAM"
          width={1200}
          height={400}
          priority
          sizes="100vw"
          className="w-full h-auto"
        />
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        className="font-jakarta font-bold text-white leading-8 max-w-[960px] [text-shadow:0px_4px_8px_rgba(0,0,0,0.2)] text-[clamp(16px,2.5vw,24px)]"
      >
        {summary}
      </motion.p>
    </div>
  );
}
