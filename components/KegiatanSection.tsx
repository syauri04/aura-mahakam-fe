"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import YoutubeEmbed from "./YoutubeEmbed";
import { CardKegiatan } from "@/services/types/home";

interface Props {
  cards: CardKegiatan[];
  youtubeId: string;
}

const MotionLink = motion.create(Link);

function KegiatanCard({ card, index }: { card: CardKegiatan; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  console.log(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${card.image?.formats?.large?.url}`,
  );
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.012, transition: { duration: 0.45 } }}
      className="bg-white/60 rounded-[30px] overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-[320px] md:h-[480px] shrink-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={
              card.image
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${card.image.formats.large?.url ?? card.image.url}`
                : `/assets/kegiatan0${index + 1}.${index === 0 ? "jpg" : "png"}`
            }
            alt={card.image?.alternativeText ?? card.title}
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            300px"
            className="object-cover rounded-[30px]"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col justify-between gap-8 flex-1">
        <h3 className="font-staatliches text-[40px] md:text-[56px] leading-[1] text-black">
          {card.title}
        </h3>
        <div>
          <MotionLink
            whileHover={{
              scale: 1.07,
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.96 }}
            href={card.button_link}
            style={{ backgroundColor: card.button_colors }}
            className="inline-block rounded-full font-jakarta font-bold text-base leading-4 text-black px-10 py-5 no-underline transition-opacity hover:opacity-90"
          >
            {card.button_text}
          </MotionLink>
        </div>
      </div>
    </motion.div>
  );
}

export default function KegiatanSection({ cards, youtubeId }: Props) {
  return (
    <section className="bg-purple-neon pt-18 flex flex-col gap-10">
      {/* Title */}
      <div className="px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-staatliches text-white text-[56px] md:text-[72px] leading-[72px] text-center"
        >
          KEGIATAN KAMI
        </motion.h2>
      </div>

      {/* Cards grid */}
      <div className="w-full max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {cards.map((card, i) => (
            <KegiatanCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Video */}
      <YoutubeEmbed videoId={youtubeId} />
    </section>
  );
}
