"use client";

import AlertCard from "@/components/utils/AlertCard";
import SectionTitle from "@/components/utils/SectionTitle";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */
const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASE },
  },
};

/** Staggered container — children animate one by one */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: EASE },
  },
};

/* ─────────────────────────────────────────────
   Shared viewport config
───────────────────────────────────────────── */
const viewport = { once: true, margin: "-80px" };

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface AlertItem {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  summary: string;
  petisiHref: string;
  actionHref: string;
  actionLabel?: string;
}

interface AlertGroup {
  /** Label kategori berwarna pink neon, e.g. "Bersuara melalui petisi" */
  groupLabel: string;
  items: AlertItem[];
}

interface MahakamaAlertSectionProps {
  /** Path/URL ke file PNG icon untuk SectionTitle */
  titleSection: string;
  /** Teks subtitle di bawah judul section */
  subtitle?: string;
  /** Kelompok alert — tiap kelompok punya label kategori + daftar card */
  groups: AlertGroup[];
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function SectionListPetisi({
  titleSection,
  subtitle = "Peranmu untuk melindungi Lanskap Mahakam",
  groups,
}: MahakamaAlertSectionProps) {
  return (
    <section className=" bg-[#F7F7F7]  ">
      <div className="w-full max-w-[1400px] mx-auto py-16 flex flex-col gap-10 ">
        {/* ── Section Title ─────────────────────── */}
        <div className="flex flex-col gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className="font-staatliches uppercase text-[64px] leading-[64px] text-black">
              SEMUA
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-jakarta text-base leading-6 text-black"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ── Alert Groups ──────────────────────── */}
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col gap-10">
            {/* Category Label — pink neon */}
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="font-jakarta font-bold text-pink-neon text-2xl leading-8"
            >
              {group.groupLabel}
            </motion.h3>

            {/* 2-column card grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-1 lg:grid-cols-2 gap-5 space-y-6"
            >
              {group.items.map((item, itemIdx) => (
                <motion.div key={itemIdx} variants={cardVariant}>
                  <AlertCard
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
                    title={item.title}
                    summary={item.summary}
                    petisiHref={item.petisiHref}
                    actionHref={item.actionHref}
                    actionLabel={item.actionLabel}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
