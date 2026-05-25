"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SideOrnament from "@/components/pattern/SideOrnament";
import Link from "next/link";

const MotionLink = motion(Link);
export default function MahakamHeroesLayout() {
  return (
    <>
      <section className="bg-[#F7F7F7] py-10 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-6 md:gap-10 px-6 "
        >
          <Image
            src="/assets/ornament-title-left.png"
            alt=""
            width={82}
            height={64}
            className="shrink-0"
          />
          <h2 className="font-staatliches text-black text-[48px] md:text-[72px] leading-[48px] md:leading-[72px]text-center ">
            Perjalanan Mahakam Heroes
          </h2>
          <Image
            src="/assets/ornament-title-right.png"
            alt=""
            width={82}
            height={64}
            className="shrink-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center pt-10"
        >
          <Image
            src="/assets/perjalanan-mahakam-heroes.png"
            alt="AURA MAHAKAM"
            width={1042}
            height={1080}
            className="object-cover w-full max-w-[590px] h-auto"
          />
        </motion.div>
      </section>
      <section className="bg-[#F7F7F7] pt-10 pb-20 ">
        <div className="max-w-[1400px] px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* CARD 1 */}
            <div className="bg-white rounded-[14px] shadow-[0px_4px_16px_rgba(0,0,0,0.1)] p-8">
              <h2 className="font-jakarta text-[32px] leading-[40px] font-bold text-black mb-4">
                Peran Orang Muda dalam Kampanye
              </h2>

              <p className="font-jakarta text-base leading-6 text-pink-neon font-bold mb-8">
                Orang muda di Kalimantan Timur memiliki posisi unik dalam
                perjuangan ini:
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Agen Perubahan:</span> Mereka
                    membawa energi, kreativitas, dan perspektif baru untuk
                    menghidupkan kembali narasi perlindungan Mahakam.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Jembatan Antar Generasi:</span>{" "}
                    Menghubungkan kearifan Masyarakat Adat dengan inovasi
                    teknologi dan strategi kontemporer.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Suara Publik:</span> Membangun
                    tekanan moral dan politik melalui mobilisasi digital dan
                    aksi langsung.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Penerus Estafet:</span>{" "}
                    Memastikan bahwa perjuangan ini tidak berhenti pada satu
                    generasi saja.
                  </p>
                </li>
              </ul>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-[14px] shadow-[0px_4px_16px_rgba(0,0,0,0.1)] p-8">
              <h2 className="font-jakarta text-[32px] leading-[40px] font-bold text-black mb-4">
                Dampak yang Diharapkan
              </h2>

              <p className="font-jakarta text-base leading-6 text-pink-neon font-bold mb-8">
                Melalui program Mahakam Heroes Journey, kami berharap:
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">
                      Lahirnya 100+ Pemimpin Muda
                    </span>{" "}
                    yang terlatih dan siap menggerakkan kampanye di wilayah
                    masing-masing.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">
                      Terbentuknya Jaringan Solid
                    </span>{" "}
                    antar relawan muda di Samarinda, Balikpapan, Mahakam Ulu,
                    dan wilayah penyangga lainnya.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">
                      Tekanan Publik yang Terukur
                    </span>{" "}
                    terhadap perusahaan-perusahaan perusak melalui petisi,
                    kampanye media sosial, dan aksi langsung.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Transformasi Kebijakan</span>{" "}
                    yang lebih berpihak pada perlindungan hutan dan hak
                    Masyarakat Adat.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Keberlanjutan Gerakan</span>{" "}
                    dengan regenerasi kepemimpinan yang terstruktur dan
                    terencana.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-white rounded-[14px] shadow-[0px_4px_16px_rgba(0,0,0,0.1)] p-8 h-full flex flex-col">
            <h2 className="font-jakarta text-[32px] leading-[40px] font-bold text-black mb-4">
              Ajakan Bergabung
            </h2>

            <p className="font-jakarta text-base leading-6 text-pink-neon font-bold mb-8">
              Mahakam Heroes membuka pintu bagi setiap orang muda yang peduli
              dengan masa depan Mahakam untuk kamu:
            </p>

            <ul className="space-y-5 mb-10">
              <li className="flex items-start gap-4">
                <img
                  src="/assets/icon-dots.png"
                  alt="icon"
                  className="w-5 h-5 mt-1 shrink-0"
                />

                <p className="font-jakarta text-base leading-6 text-black">
                  Mahasiswa atau pelajar yang ingin terlibat dalam advokasi
                  lingkungan?
                </p>
              </li>

              <li className="flex items-start gap-4">
                <img
                  src="/assets/icon-dots.png"
                  alt="icon"
                  className="w-5 h-5 mt-1 shrink-0"
                />

                <p className="font-jakarta text-base leading-6 text-black">
                  Aktivis muda yang ingin memperluas jaringan dan kapasitas?
                </p>
              </li>

              <li className="flex items-start gap-4">
                <img
                  src="/assets/icon-dots.png"
                  alt="icon"
                  className="w-5 h-5 mt-1 shrink-0"
                />

                <p className="font-jakarta text-base leading-6 text-black">
                  Kreator yang ingin menggunakan seni untuk perubahan sosial?
                </p>
              </li>

              <li className="flex items-start gap-4">
                <img
                  src="/assets/icon-dots.png"
                  alt="icon"
                  className="w-5 h-5 mt-1 shrink-0"
                />

                <p className="font-jakarta text-base leading-6 text-black">
                  Perwakilan Masyarakat Adat yang tertarik untuk belajar
                  kampanye dan berjejaring?
                </p>
              </li>
            </ul>

            {/* Quote */}
            <blockquote className="text-center italic font-bold text-black my-20 text-base leading-6 font-jakarta">
              “Mahakam bukan hanya milik generasi sekarang. Ia adalah warisan
              yang harus kita jaga untuk mereka yang akan datang. Bergabunglah
              dalam perjalanan ini dan jadilah bagian dari solusi.”
            </blockquote>

            {/* Buttons */}
            <div className="mt-4 flex flex-col gap-10 items-center">
              <button className="bg-purple-light text-white rounded-full px-8 py-3 text-sm font-bold font-jakarta uppercase hover:opacity-90 transition-all duration-300">
                Daftar sebagai Mahakam Heroes
              </button>

              <button className="border border-purple-light text-purple-light rounded-full px-8 py-3 text-sm font-bold font-jakarta uppercase hover:bg-purple-light hover:text-white transition-all duration-300">
                Pelajari Program Leadership Journey
              </button>

              <button className="border border-purple-light text-purple-light rounded-full px-8 py-3 text-sm font-bold font-jakarta uppercase hover:bg-purple-light hover:text-white transition-all duration-300">
                Bergabung dengan Jaringan Relawan
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pink-neon  py-14  relative overflow-hidden">
        <SideOrnament side="left" top="50%" size="large" />
        <SideOrnament side="right" top="50%" size="large" />
        <div className="w-full max-w-[1400px] px-6 mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-6 md:gap-10 px-6 "
          >
            <Image
              src="/assets/ornament-title-left.png"
              alt=""
              width={82}
              height={64}
              className="shrink-0"
            />
            <h2 className="font-staatliches text-white text-[48px] md:text-[72px] leading-[72px] text-center whitespace-nowrap">
              Cara Ikutan
            </h2>
            <Image
              src="/assets/ornament-title-right.png"
              alt=""
              width={82}
              height={64}
              className="shrink-0"
            />
          </motion.div>

          {/* Subtitle */}
          <p className="max-w-[1015px] mx-auto font-jakarta text-center text-white text-2xl leading-8 font-medium py-14">
            Mahakam Heroes membuka pintu bagi setiap orang muda yang peduli
            dengan masa depan Mahakam
          </p>

          {/* Content */}
          <div className="max-w-[1015px] mx-auto space-y-6 text-white font-jakarta text-base leading-6 mb-6">
            <p>
              Mahakam Heroes adalah jaringan orang muda yang dibentuk melalui
              Mahakam Youth Leadership Journey, sebuah perjalanan kepemimpinan
              dalam kampanye perlindungan hutan dan hak Masyarakat Adat di
              Lanskap Mahakam. Di sini, kamu tidak hanya belajar, tapi juga
              bergerak: memproduksi cerita, melakukan riset komunitas, dan
              membangun kampanye publik yang berdampak.
            </p>

            <p>
              Sebagai bagian dari Mahakam Heroes, kamu akan mengikuti pelatihan
              intensif melalui Mahakam Youth Camp, berkolaborasi lintas wilayah,
              dan menjadi bagian dari gerakan yang mendorong perubahan nyata,
              dari tingkat komunitas hingga ruang publik yang lebih luas.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center pt-4"
          >
            <Image
              src="/assets/icon-ikutan.png"
              alt="AURA MAHAKAM"
              width={1042}
              height={1080}
              className="object-cover w-full max-w-[245px] h-auto"
            />
          </motion.div>

          <div className="flex flex-col gap-6 grid grid-cols-1 lg:grid-cols-2 mt-20 z-1 relative">
            {/* CARD 1 */}
            <div className="bg-white rounded-[14px] shadow-[0px_4px_16px_rgba(0,0,0,0.1)] p-8">
              <h2 className="font-jakarta text-[32px] leading-[40px] font-bold text-black mb-4">
                Peran Orang Muda dalam Kampanye
              </h2>

              <p className="font-jakarta text-base leading-6 text-pink-neon font-bold mb-8">
                Orang muda di Kalimantan Timur memiliki posisi unik dalam
                perjuangan ini:
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Agen Perubahan:</span> Mereka
                    membawa energi, kreativitas, dan perspektif baru untuk
                    menghidupkan kembali narasi perlindungan Mahakam.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Jembatan Antar Generasi:</span>{" "}
                    Menghubungkan kearifan Masyarakat Adat dengan inovasi
                    teknologi dan strategi kontemporer.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Suara Publik:</span> Membangun
                    tekanan moral dan politik melalui mobilisasi digital dan
                    aksi langsung.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Penerus Estafet:</span>{" "}
                    Memastikan bahwa perjuangan ini tidak berhenti pada satu
                    generasi saja.
                  </p>
                </li>
              </ul>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-[14px] shadow-[0px_4px_16px_rgba(0,0,0,0.1)] p-8">
              <h2 className="font-jakarta text-[32px] leading-[40px] font-bold text-black mb-4">
                Dampak yang Diharapkan
              </h2>

              <p className="font-jakarta text-base leading-6 text-pink-neon font-bold mb-8">
                Melalui program Mahakam Heroes Journey, kami berharap:
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">
                      Lahirnya 100+ Pemimpin Muda
                    </span>{" "}
                    yang terlatih dan siap menggerakkan kampanye di wilayah
                    masing-masing.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">
                      Terbentuknya Jaringan Solid
                    </span>{" "}
                    antar relawan muda di Samarinda, Balikpapan, Mahakam Ulu,
                    dan wilayah penyangga lainnya.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">
                      Tekanan Publik yang Terukur
                    </span>{" "}
                    terhadap perusahaan-perusahaan perusak melalui petisi,
                    kampanye media sosial, dan aksi langsung.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Transformasi Kebijakan</span>{" "}
                    yang lebih berpihak pada perlindungan hutan dan hak
                    Masyarakat Adat.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <img
                    src="/assets/icon-dots.png"
                    alt="icon"
                    className="w-5 h-5 mt-1 shrink-0"
                  />

                  <p className="font-jakarta text-base leading-6 text-black">
                    <span className="font-bold">Keberlanjutan Gerakan</span>{" "}
                    dengan regenerasi kepemimpinan yang terstruktur dan
                    terencana.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-20 mb-10">
            <button className="bg-teal hover:opacity-90 transition-all duration-300 text-white text-base font-bold  font-jakarta px-8 py-3 rounded-full uppercase">
              Daftarkan Aksi Kamu
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
