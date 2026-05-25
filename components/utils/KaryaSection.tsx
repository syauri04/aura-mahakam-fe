"use client";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import ArticleCard from "./ArticleCard";

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

interface Karya {
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

interface KaryaSectionProps {
  /** path/url to the PNG icon displayed next to the section title */
  titleSection: string;
  karyas: Karya[];
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function KaryaSection({
  titleSection,
  karyas,
}: KaryaSectionProps) {
  return (
    <section className=" bg-[#F7F7F7] ">
      <div className="w-full max-w-[1400px] mx-auto py-16 px-6 flex flex-col gap-12">
        {/* ── Section Title ─────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionTitle
            iconSrc="/assets/dots-title.png"
            iconAlt="Siaran Pers icon"
            title={titleSection}
          />
        </motion.div>

        {/* ── Article Card Grid — staggered ─────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {karyas.map((karya, index) => (
            <motion.div key={index} variants={cardVariant}>
              <ArticleCard
                imageSrc={karya.imageSrc ?? ""}
                imageAlt={karya.imageAlt ?? ""}
                href={karya.href ?? ""}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
