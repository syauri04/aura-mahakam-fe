// components/tentang/CardTentang.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import SideOrnament from "../pattern/SideOrnament";
import { CardAuraItem } from "@/services/types/about";
import { getStrapiImageUrl } from "@/services/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// ─── Markdown parser untuk field detail.content ───────────────────────────────
// Format dari Strapi: paragraf pertama = deskripsi, lalu bullet "- **Label:** teks"
interface ContentItem {
  label: string;
  text: string;
}

interface ParsedDetail {
  description: string;
  modalContent: ContentItem[];
}

function parseDetailContent(raw: string): ParsedDetail {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const description: string[] = [];
  const modalContent: ContentItem[] = [];

  for (const line of lines) {
    // Cocokkan bullet: "- **Label:** teks" atau "- **Label**: teks"
    const match = line.match(/^-\s+\*\*(.+?)\*\*:?\s*(.*)/);
    if (match) {
      modalContent.push({ label: match[1].replace(/:$/, ""), text: match[2] });
    } else {
      description.push(line);
    }
  }

  return { description: description.join(" "), modalContent };
}

// ─── Animation variants (sama seperti sebelumnya) ────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 16,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

// ─── AuraModal ────────────────────────────────────────────────────────────────

interface AuraModalProps {
  item: CardAuraItem;
  onClose: () => void;
}

function AuraModal({ item, onClose }: AuraModalProps) {
  const { description, modalContent } = parseDetailContent(
    item.detail?.content ?? "",
  );
  const imageUrl = getStrapiImageUrl(item.image?.url);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      key="backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <motion.div
        key="modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-[1300px] bg-white overflow-hidden rounded-[30px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-full text-black hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          aria-label="Tutup"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M1 1L17 17M17 1L1 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row min-h-[420px] items-center">
          {/* Left — image */}
          <div className="flex items-center justify-center md:w-[50%] shrink-0 p-8 md:p-10">
            <div className="relative w-full max-w-[510px] aspect-square">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={item.image?.alternativeText ?? item.aura}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 80vw, 350px"
                />
              )}
            </div>
          </div>

          <div className="hidden md:block w-px bg-gray-100 my-8" />

          {/* Right — text */}
          <div className="flex-1 px-8 pb-10 pt-10 md:pt-10 md:pr-12 overflow-y-auto max-h-[80vh] md:max-h-[600px]">
            <h2 className="font-staatliches text-black text-[40px] md:text-[48px] leading-[1.05] mb-5">
              {item.detail?.title?.toUpperCase() ?? item.aura}
            </h2>
            <p className="font-jakarta text-black text-base leading-[24px] mb-6">
              {description}
            </p>
            <ul className="space-y-4">
              {modalContent.map((c) => (
                <li
                  key={c.label}
                  className="flex gap-3 font-jakarta text-base leading-[24px]"
                >
                  <span className="mt-[7px] w-[6px] h-[6px] rounded-full bg-black shrink-0" />
                  <span>
                    <strong className="font-semibold text-black">
                      {c.label}:
                    </strong>{" "}
                    <span className="text-black/70">{c.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── AuraCard ────────────────────────────────────────────────────────────────

function AuraCard({ item, index }: { item: CardAuraItem; index: number }) {
  const [open, setOpen] = useState(false);
  const imageUrl = item.image?.url ? `${STRAPI_URL}${item.image.url}` : "";

  return (
    <>
      <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={cardVariants}
        whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
        onClick={() => setOpen(true)}
        className="relative flex flex-col bg-white rounded-[10px] overflow-hidden min-h-[425px] w-full cursor-pointer"
        style={{ filter: "drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1))" }}
      >
        <div className="flex flex-col gap-4 px-5 pt-5 pb-6 flex-1">
          <h3 className="font-staatliches text-black text-[32px] leading-[40px]">
            {item.aura.toUpperCase()}
          </h3>
          <div className="flex items-center justify-center flex-1 min-h-[160px]">
            <div className="relative w-full h-[160px]">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={item.image?.alternativeText ?? item.aura}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              )}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[10px]"
          style={{
            background:
              "linear-gradient(270deg, #10BB82 0%, #F8C260 50%, #CB6CE6 100%)",
          }}
        />
      </motion.div>

      <AnimatePresence>
        {open && <AuraModal item={item} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─── CardTentang ─────────────────────────────────────────────────────────────

export default function CardTentang({ items }: { items: CardAuraItem[] }) {
  const row1 = items.slice(0, 3);
  const row2 = items.slice(3);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 space-y-6">
      <SideOrnament side="left" top="60%" />
      <SideOrnament side="right" top="60%" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:w-[calc(75%-6px)] md:mx-auto">
        {row1.map((item, i) => (
          <AuraCard key={item.documentId} item={item} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {row2.map((item, i) => (
          <AuraCard key={item.documentId} item={item} index={i + 3} />
        ))}
      </div>
    </div>
  );
}
