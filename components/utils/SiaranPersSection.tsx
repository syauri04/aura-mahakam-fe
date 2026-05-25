"use client";

import Image from "next/image";
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

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: EASE },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: EASE },
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
    transition: { duration: 0.55, ease: EASE },
  },
};

/* ─────────────────────────────────────────────
   Shared viewport config
───────────────────────────────────────────── */
const viewport = { once: true, margin: "-80px" };

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface FeaturedArticle {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  date: string;
  summary: string;
  href?: string;
}

interface Article {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  date: string;
  summary: string;
  href?: string;
}

interface SiaranPersSectionProps {
  titleSection: string;
  featuredArticle: FeaturedArticle;
  articles: Article[];
  archiveHref?: string;
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function SiaranPersSection({
  titleSection,
  featuredArticle,
  articles,
  archiveHref = "#",
}: SiaranPersSectionProps) {
  return (
    <section className="bg-[#F7F7F7]">
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

        {/* ── Featured Article ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* Left — image slides in from left */}
          <motion.a
            href={featuredArticle.href ?? "#"}
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="group relative block w-full overflow-hidden rounded-[10px]"
            style={{ aspectRatio: "670 / 425" }}
          >
            <Image
              src={featuredArticle.imageSrc}
              alt={featuredArticle.imageAlt ?? "featured article"}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 762px"
            />
          </motion.a>

          {/* Right — text stagger in from right */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-10"
          >
            {/* Title */}
            <motion.a
              href={featuredArticle.href ?? "#"}
              variants={fadeRight}
              className="group"
            >
              <h2 className="font-jakarta font-bold text-[40px] leading-[48px] text-black group-hover:underline">
                {featuredArticle.title}
              </h2>
            </motion.a>

            {/* Date */}
            <motion.p
              variants={fadeRight}
              className="font-jakarta text-black font-bold text-sm leading-[18px] uppercase"
            >
              {featuredArticle.date}
            </motion.p>

            {/* Summary */}
            <motion.p
              variants={fadeRight}
              className="font-jakarta text-base leading-6 text-black"
            >
              {featuredArticle.summary}
            </motion.p>
          </motion.div>
        </div>

        {/* ── Article Card Grid — staggered ─────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {articles.map((article, index) => (
            <motion.div key={index} variants={cardVariant}>
              <ArticleCard
                imageSrc={article.imageSrc}
                imageAlt={article.imageAlt}
                title={article.title}
                date={article.date}
                summary={article.summary}
                href={article.href}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── LIHAT ARSIP CTA ───────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex justify-center pt-4"
        >
          <motion.a
            href={archiveHref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-staatliches font-semibold text-black text-2xl leading-8 uppercase
              border border-black px-12 py-4
              hover:bg-black hover:text-white
              transition-colors duration-200
              rounded-full"
          >
            Lihat Arsip
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
