"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Map semantic variant names to Tailwind bg classes
const buttonVariants = {
  orange: "bg-orange",
  teal: "bg-teal",
  purple: "bg-purple-light",
  red: "bg-red",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

interface AuraCardProps {
  title: string;
  slug: string;
  summary: string;
  image: string;
  buttonVariant?: ButtonVariant;
  index: number;
  locale?: string;
}

export default function AuraCard({
  title,
  slug,
  summary,
  image,
  buttonVariant = "orange",
  index,
  locale = "id",
}: AuraCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.012, transition: { duration: 0.25 } }}
      className="bg-white/40 rounded-[30px] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[280px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]  "
    >
      {/* ── Left: text ── */}
      <div className="p-9 md:p-10 flex flex-col justify-between gap-5">
        <div>
          <h2 className="font-staatliches font-normal text-[48px] md:text-[64px] leading-[64px] text-black mb-6 w-2/4">
            {title}
          </h2>
          <p className="font-jakarta font-normal text-base leading-6 text-black">
            {summary}
          </p>
        </div>

        {/* Button pinned to bottom */}
        <div>
          <motion.a
            href={`/aura/${slug}?lang=${locale}`}
            whileHover={{
              scale: 1.07,
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.96 }}
            className={[
              buttonVariants[buttonVariant],
              "rounded-full border-none text-black text-base leading-6 font-jakarta font-bold px-16 py-4 cursor-pointer tracking-wide",
            ].join(" ")}
          >
            Lihat
          </motion.a>
        </div>
      </div>

      {/* ── Right: image ── */}
      <div className="relative overflow-hidden rounded-[30px] min-h-[360px] md:h-[480px]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}
