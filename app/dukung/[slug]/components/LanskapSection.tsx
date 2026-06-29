"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────── */
const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const VP = { once: true, margin: "-60px" };

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface FeatureItem {
  title: string;
  summary: string;
}

export interface LanskapSectionProps {
  title: string;

  bodyText: string;

  noteText: string;

  noteBoldPrefix?: string;

  title2: string;

  features: FeatureItem[];
}

/* ─────────────────────────────────────────────
   Helper: render note dengan bold prefix
───────────────────────────────────────────── */
function NoteText({ text, boldPrefix }: { text: string; boldPrefix?: string }) {
  if (boldPrefix && text.startsWith(boldPrefix)) {
    return (
      <p className="font-jakarta text-base leading-6 text-black">
        <strong className="font-bold">{boldPrefix}</strong>
        {text.slice(boldPrefix.length)}
      </p>
    );
  }
  return <p className="font-jakarta text-base leading-6 text-black">{text}</p>;
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function LanskapSection({
  title,
  bodyText,
  noteText,
  noteBoldPrefix,
  title2,
  features,
}: LanskapSectionProps) {
  return (
    <section className="w-full bg-[#F7F7F7]">
      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-20 lg:py-24 flex flex-col gap-12 lg:gap-16">
        {/* ── Title 1 ───────────────────────────── */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="font-staatliches text-black whitespace-pre-line max-w-[670px]"
          style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05 }}
        >
          {title}
        </motion.h2>

        {/* ── Body text + Note ──────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="flex flex-col gap-10"
        >
          {/*
            2-column layout dari 1 string.
            - Mobile  : column-count: 1 (teks penuh 1 kolom)
            - md+     : column-count: 2 (teks mengalir otomatis ke 2 kolom)
            CSS columns bekerja murni dari CSS, tanpa duplikasi konten.
          */}
          <motion.div variants={fadeUp}>
            <p
              className="
                font-jakarta text-2xl leading-8 text-black font-bold
                [column-count:1]
                md:[column-count:2]
                md:[column-gap:3rem]
                md:[column-fill:balance]
              "
            >
              {bodyText}
            </p>
          </motion.div>

          {/* Note kecil */}
          <motion.div variants={fadeUp} className="max-w-[1400px]">
            <NoteText text={noteText} boldPrefix={noteBoldPrefix} />
          </motion.div>
        </motion.div>

        {/* ── Title 2 ───────────────────────────── */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="font-staatliches  text-black whitespace-pre-line max-w-[670px]"
          style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05 }}
        >
          {title2}
        </motion.h2>

        {/* ── 4-column feature grid ─────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8"
        >
          {features.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="flex flex-col gap-3 bg-transparent"
            >
              <h3 className="font-jakarta font-bold text-black text-2xl leading-8">
                {item.title}
              </h3>
              <p className="font-jakarta text-base leading-6 text-black">
                {item.summary}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
