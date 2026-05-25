"use client";

import { useRef } from "react";
import AuraCard, { type ButtonVariant } from "./AuraCard";
import Image from "next/image";
import OrnamentPattern from "./pattern/OrnamentPattern";
import SideOrnament from "./pattern/SideOrnament";

const cards: {
  title: string;
  summary: string;
  image: string;
  buttonVariant: ButtonVariant;
}[] = [
  {
    title: "NADI KEHIDUPAN",
    summary:
      "Dari hulu ke hilir, lanskap Mahakam menghidupi puluhan ribu masyarakat yang menggantungkan hidup pada sungai dan hutannya.",
    image: "/assets/card-nadi.jpg",
    buttonVariant: "orange",
  },
  {
    title: "WARISAN BUDAYA",
    summary:
      "Sejak berabad-abad, adat dan pengetahuan Masyarakat Adat Dayun menjadi hidup bagi alam semesta, serta kembangkan taman sekitarnya.",
    image: "/assets/card-warisan.jpg",
    buttonVariant: "teal",
  },
  {
    title: "KEADILAN IKLIM",
    summary:
      "Lanskap Mahakam menjadi benteng melawan krisis iklim yang bisa dirasakan apabila hutan Masyarakat Adat dan lahan basah lenyap dan terancam.",
    image: "/assets/card-keadilan.jpg",
    buttonVariant: "purple",
  },
  {
    title: "KRISIS YANG MENGINTAI",
    summary:
      "Berbagai ancaman nyata untuk pembangunan seperti pertambangan dan perkebunan terus mencuri ruang, tinggalnya rasa pain dari air dan tanah dan Masyarakat Adat.",
    image: "/assets/card-krisis.jpg",
    buttonVariant: "red",
  },
];

export default function CardSection() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="bg-gold relative overflow-hidden">
      <OrnamentPattern />

      <SideOrnament side="left" top="50%" />
      <SideOrnament side="right" top="50%" />

      {/* Card list */}
      <div className="max-w-[1400px] mx-auto px-6  py-10 flex flex-col gap-10 relative z-[1]">
        {cards.map((card, index) => (
          <AuraCard
            key={card.title}
            title={card.title}
            summary={card.summary}
            image={card.image}
            buttonVariant={card.buttonVariant}
            index={index}
          />
        ))}
      </div>

      <OrnamentPattern flip />
    </section>
  );
}
