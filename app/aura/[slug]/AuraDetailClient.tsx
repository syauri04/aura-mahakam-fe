"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuraData, AuraDetail } from "@/services/types/aura";
import { getStrapiImageUrl } from "@/services/strapi";
import ReactMarkdown from "react-markdown";

interface Props {
  data: AuraData;
  locale: string;
}

const TextVariants = {
  orange: "text-orange",
  teal: "text-teal",
  purple: "text-purple-light",
  red: "text-red",
} as const;

export type TextVariant = keyof typeof TextVariants;

function OutlineNav({
  details,
  buttonVariant,
}: {
  details: AuraDetail[];
  buttonVariant: TextVariant;
}) {
  const [activeId, setActiveId] = useState<string>("");

  const sections = details.map((d) => ({
    id: `section-${d.id}`,
    label: d.title,
  }));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(id);
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sections.length]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="hidden xl:block fixed top-[55%] right-8 w-[305px] z-50">
      <p
        className={`text-sm font-jakarta font-bold uppercase tracking-widest mb-4 ${
          TextVariants[buttonVariant]
        }`}
      >
        Outline
      </p>
      <nav className="flex flex-col gap-1">
        {sections.map(({ id, label }) => (
          <a // ← ini yang hilang
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={[
              "text-sm leading-4.5 font-jakarta py-1 transition-all duration-200 text-left",
              activeId === id
                ? "border-l-[#E8824A] text-black font-bold underline"
                : "text-black-400 hover:text-black hover:underline",
            ].join(" ")}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default function AuraDetailClient({ data, locale }: Props) {
  const featuredImageUrl = data.image
    ? getStrapiImageUrl(data.image.formats.large?.url ?? data.image.url)
    : null;

  return (
    <>
      {/* Top gradient bar */}
      <div className="relative top-0 left-0 right-0">
        <div className="h-[20px] bg-gradient-to-l from-gold-light to-teal" />
      </div>

      {/* Logo */}
      <div className="w-full max-w-[1400px] px-6 pt-6 mx-auto flex items-center">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/assets/logo.png"
            alt="Aura Mahakam Logo"
            width={96}
            height={96}
            priority
            className="object-contain"
          />
        </Link>
      </div>

      <section className="bg-white py-20 relative overflow-hidden">
        {/* Ornament badge */}
        <div className="w-full max-w-[1400px] mx-auto flex justify-center pb-10 px-6 items-center">
          <Image
            src="/assets/onrmanet-aurapg.png"
            alt="Aura Mahakam Badge"
            width={174}
            height={64}
            className="object-contain"
          />
        </div>

        <div className="max-w-[710px] mx-auto">
          <div className="px-6">
            {/* Back link */}
            <Link
              href={`/?lang=${locale}`}
              className="uppercase font-staatliches text-2xl leading-8 underline text-black"
            >
              {locale === "en" ? "Back" : "Kembali"}
            </Link>

            {/* Page title */}
            <h1
              className={`text-[32px] md:text-[56px] py-8 leading-[40px] md:leading-[64px] font-bold font-jakarta ${
                TextVariants[data.button_variant as TextVariant]
              }`}
            >
              {data.intro?.title}
            </h1>

            {/* Intro paragraph */}
            <div className="space-y-6 pb-10 text-base leading-6 font-jakarta text-black">
              <p>{data.intro?.summary}</p>
            </div>

            {/* Featured image */}
            {featuredImageUrl && (
              <div className="rounded-[10px] overflow-hidden mb-8">
                <Image
                  src={featuredImageUrl}
                  alt={data.intro?.title ?? data.title}
                  className="w-full h-auto object-cover"
                  width={775}
                  height={425}
                />
              </div>
            )}

            {/* Detail sections */}
            {data.Detail.map((detail) => (
              <div
                key={detail.id}
                id={`section-${detail.id}`}
                className="scroll-mt-8"
              >
                <h2 className="font-jakarta text-black text-[32px] leading-[40px] font-bold pt-6 pb-10">
                  {detail.title}
                </h2>
                <div className="font-jakarta text-base leading-6 pb-10 prose max-w-none">
                  <ReactMarkdown>{detail.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outline nav */}
        <OutlineNav
          details={data.Detail}
          buttonVariant={data.button_variant as TextVariant}
        />
      </section>
    </>
  );
}
