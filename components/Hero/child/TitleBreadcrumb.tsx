"use client";

import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TitleBreadcrumbProps {
  items: BreadcrumbItem[];
  title: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function TitleBreadcrumb({
  items,
  title,
}: TitleBreadcrumbProps) {
  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center gap-2"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <motion.div
              key={`${item.label}-${index}`}
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="
                    font-staatliches uppercase text-2xl leading-8
                    text-white
                    hover:bg-gradient-to-r
                    hover:from-teal
                    hover:to-gold
                    hover:bg-clip-text
                    hover:text-transparent
                    transition-all duration-300
                    no-underline
                  "
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={[
                    "font-staatliches uppercase text-2xl leading-8 transition-all duration-300",
                    isLast
                      ? "bg-gradient-to-r from-teal to-gold bg-clip-text text-transparent"
                      : "text-white",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRightIcon size={22} className="text-white/70" />
              )}
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Title */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="
          font-staatliches
          text-gold
          uppercase
          text-[72px]
          md:text-[96px]
          leading-[72px]
          md:leading-[96px]
        "
      >
        {title}
      </motion.h1>
    </div>
  );
}
