"use client";
import SectionContent from "./SectionContent";
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

const BODY_TEXT = `
<ul>
  <li>
    <strong>Dukung Literasi dan Advokasi Kami</strong>
    Setiap artikel, laporan, dan data yang kami publikasikan adalah hasil riset mendalam untuk melawan misinformasi. Dengan mendukung Aura Mahakam, Anda membantu kami terus menelusuri jejak kerusakan, memverifikasi data, dan menyajikan narasi yang berpihak pada keadilan ekologis.
  </li>

  <li>
    <strong>Sebarkan Kesadaran</strong>
    Krisis ini tidak bisa diselesaikan sendirian. Bagikan tulisan kami, diskusikan isu Mahakam di komunitas Anda, dan tantang narasi pembangunan yang mengabaikan lingkungan. Semakin banyak suara yang bersatu, semakin sulit bagi para perusak untuk bertindak tanpa akuntabilitas.
  </li>

  <li>
    <strong>Terlibat dalam Aksi Nyata</strong>
    Kami tidak hanya menulis; kami mendorong aksi. Ikuti kampanye kami untuk mendesak moratorium izin baru di DAS Mahakam, percepat pengakuan hak Masyarakat Adat, dan reformasi tata kelola lahan.
  </li>

  <li>
    <strong>Berkontribusi Secara Finansial</strong>
    Independensi adalah nyawa kami. Dukungan finansial dari Anda memastikan bahwa kami tetap bebas dari tekanan korporasi dan dapat fokus pada investigasi yang jujur.
  </li>
</ul>
`;
export default function PetisiLayout() {
  return (
    <>
      <SectionContent>
        <div className="max-w-[1400px] mx-auto z-0 relative px-6">
          <div className="bg-white rounded-[30px] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20 flex flex-col gap-6">
            {/* ── Headline ────────────────────── */}
            <h2
              className="font-staatliches  text-black max-w-[700px] whitespace-pre-line"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
            >
              Tanda Tangani Petisi
            </h2>
            <p className="font-jakarta text-2xl leading-8 font-bold text-black">
              Petisi Aura Mahakam
            </p>
            <span className="font-jakarta text-base leading-6 text-black">
              Gabung aksi dan kegiatan yang mendukung gerakan lanskap mahakam.
            </span>
            <motion.a
              href="dukung/petisi/list"
              whileHover={{ scale: 1.02, opacity: 0.92 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="font-jakarta self-start items-start font-semibold text-base text-white px-8 py-4 rounded-full cursor-pointer"
              style={{ backgroundColor: "#00C4B4" }}
            >
              Lihat Petisi
            </motion.a>
          </div>
        </div>
      </SectionContent>

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
            Bagaimana Kamu Bisa Membantu?
          </motion.h2>

          {/* ── Body text + Note ──────────────────── */}
          <motion.div variants={fadeUp}>
            <div
              className="
      petisi-content
      font-jakarta
      text-base
      leading-8
      text-black
      columns-1
      md:columns-2
      gap-12
    "
              dangerouslySetInnerHTML={{
                __html: BODY_TEXT,
              }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
