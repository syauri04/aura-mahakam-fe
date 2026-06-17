"use client";

import { useRef } from "react";
import AuraCard, { type ButtonVariant } from "./AuraCard";

import OrnamentPattern from "./pattern/OrnamentPattern";
import SideOrnament from "./pattern/SideOrnament";
import { AuraData } from "@/services/types/aura";

interface Props {
  cards: AuraData[];
  locale: string;
}

export default function CardSection({ cards, locale }: Props) {
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
            key={card.id}
            title={card.title}
            slug={card.slug}
            summary={card.summary}
            image={
              card.image
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${card.image.formats.large?.url ?? card.image.url}`
                : ""
            }
            buttonVariant={card.button_variant as ButtonVariant}
            index={index}
            locale={locale}
          />
        ))}
      </div>

      <OrnamentPattern flip />
    </section>
  );
}
