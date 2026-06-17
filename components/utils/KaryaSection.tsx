"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import SectionTitle from "./SectionTitle";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: EASE } },
};

const viewport = { once: true, margin: "-80px" };

interface Karya {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
}

interface KaryaSectionProps {
  titleSection: string;
  karyas: Karya[];
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ karya, onClose }: { karya: Karya; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[90vw] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer border-none shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-black" />
          </button>

          {/* Image */}
          {karya.imageSrc && (
            <img
              src={karya.imageSrc}
              alt={karya.imageAlt ?? ""}
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-[12px]"
            />
          )}

          {/* Title */}
          {karya.title && (
            <p className="text-white font-jakarta text-sm text-center mt-3 opacity-70">
              {karya.title}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── KaryaCard ────────────────────────────────────────────────────────────────
function KaryaCard({ karya, onClick }: { karya: Karya; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative aspect-square rounded-[10px] overflow-hidden cursor-pointer group"
    >
      {karya.imageSrc && (
        <Image
          src={karya.imageSrc}
          alt={karya.imageAlt ?? ""}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-jakarta text-sm font-semibold bg-black/50 px-4 py-2 rounded-full">
          Lihat
        </span>
      </div>
    </div>
  );
}

// ─── KaryaSection ─────────────────────────────────────────────────────────────
export default function KaryaSection({
  titleSection,
  karyas,
}: KaryaSectionProps) {
  const [selected, setSelected] = useState<Karya | null>(null);

  return (
    <section className="bg-[#F7F7F7]">
      <div className="w-full max-w-[1400px] mx-auto py-16 px-6 flex flex-col gap-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionTitle
            iconSrc="/assets/dots-title.png"
            iconAlt="Karya icon"
            title={titleSection}
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {karyas.map((karya, index) => (
            <motion.div key={index} variants={cardVariant}>
              <KaryaCard karya={karya} onClick={() => setSelected(karya)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selected && (
        <Lightbox karya={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
