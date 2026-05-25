"use client";

import { motion } from "framer-motion";

interface SummaryProps {
  highlight: string;
  description: string;
}

export default function Summary({ highlight, description }: SummaryProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        staggerChildren: 0.18,
      }}
      className="space-y-8"
    >
      <motion.p
        variants={{
          hidden: {
            opacity: 0,
            y: 24,
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
            },
          },
        }}
        className="
          max-w-[950px]
          text-2xl
          leading-8
          text-gold-light
          font-jakarta
        "
      >
        {highlight}
      </motion.p>

      <motion.p
        variants={{
          hidden: {
            opacity: 0,
            y: 18,
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.9,
              ease: "easeOut",
            },
          },
        }}
        className="
          max-w-[950px]
          text-base
          leading-6
          text-white/90
          font-jakarta
        "
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
