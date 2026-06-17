"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SideOrnament from "@/components/pattern/SideOrnament";
import {
  SubKegiatan,
  KegiatanThemeMahakam,
  CardKegiatanSection,
  RichTextBlock,
  RichTextChild,
} from "@/services/types/kegiatan";
import { getStrapiImageUrl } from "@/services/strapi";
import Link from "next/link";

// ─── Rich Text renderer ───────────────────────────────────────────────────────
function renderChildren(children: RichTextChild[]): string {
  return children
    .map((child) => {
      if (child.type === "text") {
        const text = child.text ?? "";
        return child.bold ? `<strong>${text}</strong>` : text;
      }
      if (child.type === "list-item" && child.children) {
        return `<li>
        <img src="/assets/icon-dots.png" alt="" class="w-5 h-5 mt-1 shrink-0" />
        <span>${renderChildren(child.children)}</span>
      </li>`;
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
        // pakai ul untuk semua, icon dots sebagai pengganti bullet
        return `<ul class="space-y-5 list-none p-0">${renderChildren(block.children)}</ul>`;
      }
      return "";
    })
    .join("");
}

// ─── KegiatanCard ─────────────────────────────────────────────────────────────
function KegiatanCard({ card }: { card: CardKegiatanSection }) {
  const contentHtml = renderRichText(card.content ?? []);

  return (
    <div className="bg-white rounded-[14px] shadow-[0px_4px_16px_rgba(0,0,0,0.1)] p-8 h-full flex flex-col">
      <h2 className="font-jakarta text-[32px] leading-[40px] font-bold text-black mb-4">
        {card.title}
      </h2>
      <p className="font-jakarta text-base leading-6 text-pink-neon font-bold mb-8">
        {card.subtitle}
      </p>

      {/* Rich Text content */}
      <div
        className="
    font-jakarta text-base leading-6 text-black
    [&_li]:flex [&_li]:items-start [&_li]:gap-4
    [&_li_span]:font-jakarta [&_li_span]:text-base [&_li_span]:leading-6
  "
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Quotes */}
      {card.add_quotes === "yes" && card.quotes && (
        <blockquote className="text-center italic font-bold text-black my-20 text-base leading-6 font-jakarta">
          {card.quotes}
        </blockquote>
      )}

      {/* Notes */}
      {card.notes && (
        <p className="font-jakarta text-sm leading-6 text-black/60 mt-4 italic">
          {card.notes}
        </p>
      )}

      {card.button_link && card.button_link.length > 0 && (
        <div className="mt-4 flex flex-col gap-10 items-center">
          {card.button_link.map((btn, index) => (
            <a
              key={btn.id}
              href={btn.link}
              className={[
                "text-center rounded-full px-8 py-3 text-sm font-bold font-jakarta uppercase transition-all duration-300",
                index === 0
                  ? "bg-purple-light text-white hover:opacity-90"
                  : "border border-purple-light text-purple-light hover:bg-purple-light hover:text-white",
              ].join(" ")}
            >
              {btn.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MahakamHeroesLayout ──────────────────────────────────────────────────────
export default function MahakamHeroesLayout({ data }: { data: SubKegiatan }) {
  const d = data as KegiatanThemeMahakam;
  const descSection2Html = renderRichText(d.description_section_2 ?? []);
  const imageUrl = getStrapiImageUrl(
    d.image_section_1?.formats?.large?.url ?? d.image_section_1?.url ?? null,
  );

  return (
    <>
      {/* Section 1 */}
      <section className="bg-[#F7F7F7] py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-6 md:gap-10 px-6"
        >
          <Image
            src="/assets/ornament-title-left.png"
            alt=""
            width={82}
            height={64}
            className="shrink-0"
          />
          <h2 className="font-staatliches text-black text-[48px] md:text-[72px] leading-[48px] md:leading-[72px] text-center">
            {d.title_section_1}
          </h2>
          <Image
            src="/assets/ornament-title-right.png"
            alt=""
            width={82}
            height={64}
            className="shrink-0"
          />
        </motion.div>

        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center pt-10"
          >
            <Image
              src={imageUrl}
              alt={d.title_section_1}
              width={1042}
              height={1080}
              className="object-cover w-full max-w-[590px] h-auto"
            />
          </motion.div>
        )}
      </section>

      {/* Cards Section 1 */}
      <section className="bg-[#F7F7F7] pt-10 pb-20">
        <div className="max-w-[1400px] px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left — first 2 cards stacked */}
          <div className="flex flex-col gap-6">
            {d.card_kegiatan_section_1.slice(0, 2).map((card) => (
              <KegiatanCard key={card.id} card={card} />
            ))}
          </div>

          {/* Right — remaining cards */}
          <div className="flex flex-col gap-6">
            {d.card_kegiatan_section_1.slice(2).map((card) => (
              <KegiatanCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-pink-neon py-14 relative overflow-hidden">
        <SideOrnament side="left" top="50%" size="large" />
        <SideOrnament side="right" top="50%" size="large" />

        <div className="w-full max-w-[1400px] px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-6 md:gap-10 px-6"
          >
            <Image
              src="/assets/ornament-title-left.png"
              alt=""
              width={82}
              height={64}
              className="shrink-0"
            />
            <h2 className="font-staatliches text-white text-[48px] md:text-[72px] leading-[72px] text-center whitespace-nowrap">
              {d.title_section_2}
            </h2>
            <Image
              src="/assets/ornament-title-right.png"
              alt=""
              width={82}
              height={64}
              className="shrink-0"
            />
          </motion.div>

          <p className="max-w-[1015px] mx-auto font-jakarta text-center text-white text-2xl leading-8 font-medium py-14">
            {d.summary_section_2}
          </p>

          {descSection2Html && (
            <div
              className="max-w-[1015px] mx-auto prose prose-invert prose-base font-jakarta text-white text-base leading-6 mb-6"
              dangerouslySetInnerHTML={{ __html: descSection2Html }}
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center pt-4"
          >
            <Image
              src="/assets/icon-ikutan.png"
              alt="Cara Ikutan"
              width={245}
              height={245}
              className="object-contain w-full max-w-[245px] h-auto"
            />
          </motion.div>

          {/* Cards Section 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-20 z-[1] relative">
            {d.card_kegiatan_section_2.map((card) => (
              <KegiatanCard key={card.id} card={card} />
            ))}
          </div>

          <div className="flex justify-center mt-20 mb-10">
            <Link
              href="/dukung/aksi"
              className="bg-teal hover:opacity-90 transition-all duration-300 text-white text-base font-bold font-jakarta px-8 py-3 rounded-full uppercase"
            >
              Daftarkan Aksi Kamu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
