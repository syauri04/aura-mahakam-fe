"use client";

import { motion } from "framer-motion";
import {
  formatPlain,
  formatThousands,
  formatK,
} from "@/app/dukung/[slug]/data/formatters";
import StatCard from "./StatCard";
// import { formatPlain, formatThousands, formatK } from "./formatters";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const STATS = [
  {
    targetValue: 100,
    label: "Relawan",
    format: formatPlain,
    duration: 1.8,
  },
  {
    targetValue: 1000,
    label: "Donatur",
    format: formatThousands,
    duration: 2,
  },
  {
    targetValue: 10200,
    label: "Pendukung Petisi",
    format: formatK,
    duration: 2.2,
  },
] as const;

/* ─────────────────────────────────────────────
   Animation
───────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function DukungCount() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
    >
      {STATS.map((stat) => (
        <motion.div key={stat.label} variants={cardReveal}>
          <StatCard
            targetValue={stat.targetValue}
            label={stat.label}
            format={stat.format}
            duration={stat.duration}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
