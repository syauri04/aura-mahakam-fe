import Image from "next/image";
import { IoMdMail } from "react-icons/io";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoFacebook } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="relative w-full">
      {/* ── Main footer area ────────────────────────────────────────────── */}
      <div
        className="w-full"
        style={{
          background:
            "linear-gradient(90deg, #00C2BA 0%, #10BB82 50%, #F8DC61 100%)",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6  py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-10 md:gap-6">
            {/* ── Col 1 · Hashtags (kiri) ─────────────────────────────── */}
            <div className="flex flex-col gap-1">
              <span className="font-staatliches text-[32px] leading-[40px] text-black ">
                #AURAMAHAKAM
              </span>
              <span className="font-staatliches text-[32px] leading-[40px] text-black">
                #LANSKAPMAHAKAM
              </span>
            </div>

            {/* ── Col 2 · Logo center (tengah) ────────────────────────── */}
            <div className="flex flex-col md:items-center  gap-3">
              <div className="relative w-[104px] h-[154px]">
                <Image
                  src="/assets/logo-footer.png"
                  alt="Aura Mahakam Logo"
                  fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1024px) 50vw,
                  300px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* ── Col 3 · Kontak & Sosmed (kanan) ─────────────────────── */}
            <div className="flex flex-col lg:justify-self-end-safe gap-10 ">
              {/* Kontak */}
              <div className="flex flex-col gap-2">
                <h4 className="font-jakarta font-bold text-[32px] leading-[40px] text-black">
                  Kontak
                </h4>
                <a
                  href="mailto:info@auramahakam.or.id"
                  className="flex items-center gap-2 text-black underline text-base leading-6 font-jakarta font-bold hover:opacity-70 transition-opacity duration-200"
                >
                  <IoMdMail size={24} />
                  info@auramahakam.or.id
                </a>
              </div>

              {/* Media Sosial */}
              <div className="flex flex-col gap-6">
                <h4 className="font-jakarta font-bold text-[32px] leading-[40px] text-black">
                  Media Sosial
                </h4>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <a
                    href="https://instagram.com/auramahakam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-black text-base leading-6 font-jakarta font-bold hover:opacity-70 transition-opacity duration-200"
                  >
                    <BiLogoInstagramAlt size={24} />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/auramahakam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-black text-base leading-6 font-bold font-jakarta hover:opacity-70 transition-opacity duration-200"
                  >
                    <IoLogoFacebook size={24} />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Copyright bar ─────────────────────────────────────────────── */}
        <div className="w-full   py-6 px-6 text-center">
          <p className="text-black text-xs font-jakarta tracking-wide">
            © 2024 AURA MAHAKAM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
