"use client";
import OrnamentPattern from "@/components/pattern/OrnamentPattern";

import Image from "next/image";
import { motion } from "framer-motion";
import CardTentang from "@/components/tentang/CardTentang";
import { CardAuraItem } from "@/services/types/about";
export default function AuraCardClient({
  title,
  summary,
  cardAuras,
}: {
  title: string;
  summary: string;
  cardAuras: CardAuraItem[];
}) {
  return (
    <section className="bg-white relative overflow-hidden">
      <OrnamentPattern />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-6 md:gap-10 px-6 py-10"
      >
        <Image
          src="/assets/ornament-title-left.png"
          alt=""
          width={82}
          height={64}
          className="shrink-0"
        />
        <h2 className="font-staatliches text-black text-[48px] md:text-[72px] leading-[48px] md:leading-[72px] text-center ">
          {title}
        </h2>
        <Image
          src="/assets/ornament-title-right.png"
          alt=""
          width={82}
          height={64}
          className="shrink-0"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-[800px] mx-auto text-center text-black text-base leading-6 px-6 font-jakarta"
      >
        {summary}
      </motion.div>

      <CardTentang items={cardAuras} />

      <OrnamentPattern flip />
    </section>
  );
}
