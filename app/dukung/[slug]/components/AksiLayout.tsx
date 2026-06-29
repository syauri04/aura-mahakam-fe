"use client";
import SectionContent from "./SectionContent";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AnyDukungContent,
  DukungDefault,
  RichTextBlock,
  RichTextChild,
} from "@/services/types/dukung";
import FormKarya from "./FormKarya";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const VP = { once: true, margin: "-60px" };
// ─── Rich Text renderer ───────────────────────────────────────────────────────
function renderChildren(children: RichTextChild[]): string {
  return children
    .map((child) => {
      if (child.type === "text") {
        const text = child.text ?? "";
        return child.bold ? `<strong>${text}</strong>` : text;
      }
      if (child.type === "list-item" && child.children) {
        return `<li>${renderChildren(child.children)}</li>`;
      }
      return "";
    })
    .join("");
}

function renderRichText(blocks: RichTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "list") {
        const tag = block.format === "ordered" ? "ol" : "ul";
        return `<${tag}>${renderChildren(block.children)}</${tag}>`;
      }
      if (block.type === "paragraph") {
        return `<p>${renderChildren(block.children)}</p>`;
      }
      return "";
    })
    .join("");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AksiLayout({ data }: { data: AnyDukungContent }) {
  const d = data as DukungDefault;
  const bodyHtml = renderRichText(d.content ?? []);

  // Debug: log the generated HTML
  return (
    <>
      <SectionContent>
        <div className="max-w-[1400px] mx-auto z-0 relative px-6">
          <div className="bg-white rounded-[30px] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20 flex flex-col gap-6">
            <h2
              className="font-staatliches text-black max-w-[700px] whitespace-pre-line"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
            >
              {d.title}
            </h2>
            <p className="font-jakarta text-2xl leading-8 font-bold text-black">
              {d.subtitle}
            </p>
            <span className="font-jakarta text-base leading-6 text-black">
              {d.summary}
            </span>

            <FormKarya />
          </div>
        </div>
      </SectionContent>

      <section className="w-full bg-[#F7F7F7]">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-20 lg:py-24 flex flex-col gap-12 lg:gap-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="font-staatliches text-black whitespace-pre-line max-w-[670px]"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05 }}
          >
            {d.title_section}
          </motion.h2>

          <motion.div variants={fadeUp}>
            <div
              className="petisi-content prose prose-base max-w-none font-jakarta text-black columns-1 md:columns-2 gap-12"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
