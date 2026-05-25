"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import SideOrnament from "../pattern/SideOrnament";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContentItem {
  label: string;
  text: string;
}

interface AuraItem {
  title: string;
  image: string;
  alt: string;
  modalTitle: string;
  modalDescription: string;
  modalContent: ContentItem[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const auraItems: AuraItem[] = [
  {
    title: "SUNGAI KEHIDUPAN",
    image: "/assets/aura/sungai-kehidupan.png",
    alt: "Sungai Kehidupan",
    modalTitle: "DENYUT NADI YANG TAK PERNAH BERHENTI",
    modalDescription:
      "Sungai Mahakam adalah urat nadi yang memompa kehidupan ke seluruh tubuh Kalimantan Timur. Ia bukan sekadar air yang mengalir; ia adalah jalan raya, dapur raksasa, dan sumber air bersih bagi jutaan jiwa.",
    modalContent: [
      {
        label: "Energi yang Terpancar",
        text: "Aliran yang menghubungkan hulu ke hilir, menyatukan desa-desa terpencil dengan kota, dan menjadi sumber pangan utama (ikan) serta transportasi vital.",
      },
      {
        label: "Ancaman",
        text: "Polusi limbah tambang, sedimentasi, dan dominasi ponton batubara yang mengubah sungai suci menjadi jalur industri yang kotor.",
      },
      {
        label: "Pesan",
        text: "Menjaga Sungai Kehidupan berarti menjamin hak dasar manusia atas air bersih dan ketahanan pangan.",
      },
    ],
  },
  {
    title: "HUTAN PENJAGA",
    image: "/assets/aura/hutan-penjaga.png",
    alt: "Hutan Penjaga",
    modalTitle: "BENTENG HIJAU YANG MULAI RAPUH",
    modalDescription:
      "Hutan Kalimantan adalah paru-paru dunia yang menyimpan keanekaragaman hayati tak ternilai. Ia adalah perisai iklim, sumber obat-obatan, dan rumah bagi ribuan spesies.",
    modalContent: [
      {
        label: "Kekuatan Tersembunyi",
        text: "Menyerap karbon dalam skala masif, mengatur siklus air, dan menjadi tempat bergantung komunitas adat yang telah menghuni selama berabad-abad.",
      },
      {
        label: "Ancaman",
        text: "Deforestasi masif akibat tambang batubara dan kelapa sawit telah menggerus jutaan hektar tutupan hutan dalam dua dekade terakhir.",
      },
      {
        label: "Pesan",
        text: "Mempertahankan hutan berarti mempertahankan keseimbangan iklim lokal dan global sekaligus.",
      },
    ],
  },
  {
    title: "SATWA LANGKA",
    image: "/assets/aura/satwa-langka.png",
    alt: "Satwa Langka",
    modalTitle: "PENJAGA EKOSISTEM YANG TERANCAM",
    modalDescription:
      "Pesut Mahakam, orangutan, dan bekantan adalah spesies ikonis yang hanya ada di Kalimantan. Keberadaan mereka adalah indikator kesehatan ekosistem yang sesungguhnya.",
    modalContent: [
      {
        label: "Peran Ekologis",
        text: "Sebagai predator puncak dan penyebar benih, satwa-satwa ini menjaga keseimbangan rantai makanan dan regenerasi hutan secara alami.",
      },
      {
        label: "Ancaman",
        text: "Hilangnya habitat, perburuan liar, dan konflik manusia-satwa mendorong populasi mereka ke ambang kepunahan lokal.",
      },
      {
        label: "Pesan",
        text: "Melindungi satwa langka berarti melindungi integritas ekosistem yang menopang kehidupan manusia.",
      },
    ],
  },
  {
    title: "BUDAYA DAYAK",
    image: "/assets/aura/budaya-dayak.png",
    alt: "Budaya Dayak",
    modalTitle: "AKAR YANG MENGHIDUPKAN TANAH",
    modalDescription:
      "Budaya Dayak bukan sekadar tradisi — ia adalah sistem pengetahuan ekologis yang telah terbukti selama ribuan tahun menjaga keseimbangan manusia dan alam.",
    modalContent: [
      {
        label: "Kearifan Lokal",
        text: "Praktik tata kelola hutan adat, ritual penghormatan sungai, dan sistem pertanian ladang berpindah yang berkelanjutan menjadi warisan tak ternilai.",
      },
      {
        label: "Ancaman",
        text: "Marginalisasi komunitas adat dari tanah leluhur dan erosi budaya akibat pembangunan yang tidak inklusif.",
      },
      {
        label: "Pesan",
        text: "Menghormati budaya Dayak adalah mengakui hak masyarakat adat atas tanah, identitas, dan masa depan mereka.",
      },
    ],
  },
  {
    title: "MASYARAKAT ADAT",
    image: "/assets/aura/masyarakat-adat.png",
    alt: "Masyarakat Adat",
    modalTitle: "PENJAGA SEJATI MAHAKAM",
    modalDescription:
      "Masyarakat adat di sepanjang Mahakam adalah penjaga sebenarnya dari lanskap ini. Mereka hidup bersama sungai, hutan, dan satwa selama berabad-abad dengan bijaksana.",
    modalContent: [
      {
        label: "Peran Strategis",
        text: "Komunitas adat mengelola wilayah adat yang mencakup jutaan hektar hutan dengan sistem tata kelola yang efektif dan berkelanjutan.",
      },
      {
        label: "Ancaman",
        text: "Penggusuran paksa, kriminalisasi aktivis lingkungan, dan absennya pengakuan hukum atas hak-hak tanah adat.",
      },
      {
        label: "Pesan",
        text: "Memberdayakan masyarakat adat adalah strategi konservasi paling efektif dan berkeadilan.",
      },
    ],
  },
  {
    title: "SPIRIT KEBERSAMAAN",
    image: "/assets/aura/spirit-kebersamaan.png",
    alt: "Spirit Kebersamaan",
    modalTitle: "BERSATU UNTUK MAHAKAM",
    modalDescription:
      "Tidak ada satu pun aktor yang bisa menyelamatkan Mahakam sendiri. Diperlukan koalisi besar antara komunitas, aktivis, ilmuwan, dan pengambil kebijakan.",
    modalContent: [
      {
        label: "Kekuatan Kolektif",
        text: "Jaringan pemuda, perempuan adat, peneliti, dan organisasi masyarakat sipil yang bergerak bersama dengan visi yang sama.",
      },
      {
        label: "Tantangan",
        text: "Fragmentasi gerakan, ketimpangan sumber daya, dan tekanan dari kepentingan industri yang terorganisir.",
      },
      {
        label: "Pesan",
        text: "Spirit kebersamaan adalah modal utama perubahan — satu suara untuk Mahakam.",
      },
    ],
  },
  {
    title: "GENERASI MUDA",
    image: "/assets/aura/generasi-muda.png",
    alt: "Generasi Muda",
    modalTitle: "PEWARIS YANG MENENTUKAN SEGALANYA",
    modalDescription:
      "Generasi muda Kalimantan adalah pewaris langsung dari krisis dan harapan Mahakam. Mereka yang akan merasakan konsekuensi terbesar dari keputusan yang diambil hari ini.",
    modalContent: [
      {
        label: "Potensi Transformatif",
        text: "Dengan literasi digital, koneksi global, dan energi perubahan, pemuda bisa menjadi kekuatan penggerak yang mengubah narasi Mahakam.",
      },
      {
        label: "Tantangan",
        text: "Minimnya ruang partisipasi bermakna dalam pengambilan keputusan dan kurangnya akses ke pendidikan lingkungan yang relevan.",
      },
      {
        label: "Pesan",
        text: "Investasi pada generasi muda adalah investasi terbaik untuk masa depan Mahakam.",
      },
    ],
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

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
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const } },
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

// ─── AuraModal ───────────────────────────────────────────────────────────────

interface AuraModalProps {
  item: AuraItem;
  onClose: () => void;
}

function AuraModal({ item, onClose }: AuraModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll
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
        className="relative w-full max-w-[1300px] bg-white overflow-hidden rounded-[30px] "
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

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row min-h-[420px] items-center">
          {/* Left — image */}
          <div className="flex items-center justify-center md:w-[50%] shrink-0 p-8 md:p-10">
            <div className="relative w-full max-w-[510px] aspect-square">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 80vw, 350px"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-100 my-8" />

          {/* Right — text */}
          <div className="flex-1 px-8 pb-10 pt-10 md:pt-10 md:pr-12 overflow-y-auto max-h-[80vh] md:max-h-[600px]">
            <h2 className="font-staatliches text-black text-[40px] md:text-[48px] md:text-[64px] leading-[1.05] mb-5">
              {item.modalTitle}
            </h2>
            <p className="font-jakarta text-black text-base leading-[24px] mb-6 font-jakarta">
              {item.modalDescription}
            </p>

            <ul className="space-y-4">
              {item.modalContent.map((c) => (
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

interface AuraCardProps {
  item: AuraItem;
  index: number;
}

function AuraCard({ item, index }: AuraCardProps) {
  const [open, setOpen] = useState(false);

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
        {/* Card content */}
        <div className="flex flex-col gap-4 px-5 pt-5 pb-6 flex-1">
          <h3 className="font-staatliches text-black text-[32px] leading-[40px]">
            {item.title}
          </h3>
          <div className="flex items-center justify-center flex-1 min-h-[160px]">
            <div className="relative w-full h-[160px]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Gradient bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[10px]"
          style={{
            background:
              "linear-gradient(270deg, #10BB82 0%, #F8C260 50%, #CB6CE6 100%)",
          }}
        />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && <AuraModal item={item} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─── CardTentang ─────────────────────────────────────────────────────────────

export default function CardTentang() {
  const row1 = auraItems.slice(0, 3);
  const row2 = auraItems.slice(3, 7);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 space-y-6">
      <SideOrnament side="left" top="60%" />
      <SideOrnament side="right" top="60%" />

      {/* Row 1 — 3 cards, centered, lebar identik row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:w-[calc(75%-6px)] md:mx-auto">
        {row1.map((item, i) => (
          <AuraCard key={item.title} item={item} index={i} />
        ))}
      </div>

      {/* Row 2 — 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {row2.map((item, i) => (
          <AuraCard key={item.title} item={item} index={i + 3} />
        ))}
      </div>
    </div>
  );
}
