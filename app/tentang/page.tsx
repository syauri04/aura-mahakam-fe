"use client";
import Summary from "@/components/Hero/child/Summary";
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import OrnamentPattern from "@/components/pattern/OrnamentPattern";

import Image from "next/image";
import { motion } from "framer-motion";
import CardTentang from "@/components/tentang/CardTentang";
export default function Tentang() {
  return (
    <main>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tentang Aura Mahakam" },
            ]}
            title="AURA MAHAKAM"
          />
          <Summary
            highlight="
        Aura Mahakam bukan sekadar kampanye lingkungan.
        Ini adalah undangan untuk melihat kembali hutan
        dan sungai di lanskap Mahakam bukan sebagai
        sekadar ruang geografis, melainkan sebagai
        makhluk hidup yang bernapas.
        "
            description="
        Setiap lekukan sungai, setiap pohon yang berdiri,
        dan setiap gerak kehidupan di desa sepanjang aliran
        Mahakam memancarkan energi unik yang kami sebut Aura.
        Namun, energi vital ini kini terancam redup oleh
        deru mesin industri ekstraktif.
        "
          />
        </HeroContentPages>
      </HeroSection>

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
            7 Aura Mahakam
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
          7 Aura menjadi simbol kehidupan, kekuatan, dan harapan dari Lanskap
          Mahakam.
        </motion.div>

        <CardTentang />

        <OrnamentPattern flip />
      </section>
    </main>
  );
}
