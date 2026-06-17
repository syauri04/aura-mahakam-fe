"use client";

import SideOrnament from "@/components/pattern/SideOrnament";
import OrnamentPattern from "@/components/pattern/OrnamentPattern";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SubKegiatan,
  RichTextBlock,
  RichTextChild,
} from "@/services/types/kegiatan";
import { titleToSlug } from "@/services/kegiatan";

const MotionLink = motion(Link);

// ─── Rich Text renderer ───────────────────────────────────────────────────────
function renderChildren(children: RichTextChild[]): string {
  return children
    .map((child) => {
      if (child.type === "text") {
        const text = child.text ?? "";
        return child.bold ? `<strong>${text}</strong>` : text;
      }
      if (child.children) return renderChildren(child.children);
      return "";
    })
    .join("");
}

function renderRichText(blocks: RichTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") {
        const inner = renderChildren(block.children);
        return inner.trim() ? `<p>${inner}</p>` : "";
      }
      if (block.type === "list") {
        const tag = block.format === "ordered" ? "ol" : "ul";
        return `<${tag}>${renderChildren(block.children)}</${tag}>`;
      }
      return "";
    })
    .join("");
}

// ─── YouTube embed ────────────────────────────────────────────────────────────
function YoutubeEmbed({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full md:max-w-[720px] lg:max-w-[1350px] mx-auto px-6 h-[400px] md:h-[640px] rounded-[30px] overflow-hidden">
      {!playing ? (
        <>
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
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

// ─── SectionInfo ─────────────────────────────────────────────────────────────
interface SectionInfoProps {
  data: SubKegiatan;
  allKegiatan: SubKegiatan[];
}

export default function SectionInfo({ data, allKegiatan }: SectionInfoProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const langQuery = lang ? `?lang=${lang}` : "";

  const descriptionHtml = renderRichText(data.description ?? []);

  return (
    <>
      <section className="bg-gold py-14 relative overflow-hidden">
        <SideOrnament side="left" top="45%" size="small" />
        <SideOrnament side="right" top="45%" size="small" />

        <div className="w-full max-w-[1400px] px-6 mx-auto">
          {/* Tabs — dinamis dari Strapi */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-20">
            {allKegiatan.map((k) => {
              const href = `/kegiatan/${titleToSlug(k.title)}`;
              const active = pathname === href;

              return (
                <MotionLink
                  key={titleToSlug(k.title)}
                  href={`${href}${langQuery}`}
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className={[
                    "inline-block rounded-full font-staatliches text-2xl md:text-[32px] leading-8 md:leading-[40px] px-10 py-5 no-underline transition-all",
                    active
                      ? "bg-purple-light text-white"
                      : "border border-purple-light text-white hover:bg-purple-light",
                  ].join(" ")}
                >
                  {k.title}
                </MotionLink>
              );
            })}
          </div>

          {/* Title */}
          <h2 className="text-[48px] md:text-[64px] lg:text-[96px] text-pink-neon text-center font-staatliches uppercase text-purple mb-10 leading-none">
            {data.title}
          </h2>

          {/* Summary */}
          <p className="max-w-[1015px] mx-auto font-jakarta text-center text-pink-neon text-2xl leading-8 font-medium mb-10">
            {data.summary}
          </p>

          {/* Description — Rich Text */}
          <div
            className="max-w-[1015px] mx-auto font-jakarta text-base leading-7 mb-6 prose prose-base  text-black"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      </section>

      <section className="pt-10 bg-[#F7F7F7]">
        <YoutubeEmbed videoId={data.id_embed_youtube} />
        <OrnamentPattern width="full" />
      </section>
    </>
  );
}
