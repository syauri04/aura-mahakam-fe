"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import SideOrnament from "@/components/pattern/SideOrnament";

const MotionLink = motion(Link);

export default function SectionContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const langQuery = lang ? `?lang=${lang}` : "";

  const tabs = [
    { href: "/dukung/petisi", label: "Tanda Tangan Petisi" },
    { href: "/dukung/aksi", label: "Daftar Aksi Kamu" },
    { href: "/dukung/donasi", label: "Donasi" },
  ];

  return (
    <section className="bg-gold py-14 relative overflow-hidden">
      <SideOrnament side="left" top="45%" size="small" />
      <SideOrnament side="right" top="45%" size="small" />

      <div className="w-full max-w-[1400px] px-6 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-20">
          {tabs.map((tab) => {
            const active = pathname === tab.href;

            return (
              <MotionLink
                key={tab.href}
                href={`${tab.href}${langQuery}`}
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.96 }}
                className={[
                  "inline-block rounded-full font-staatliches text-2xl md:text-[32px] leading-8 md:leading-[40px] px-10 py-5 no-underline transition-all",
                  active
                    ? "bg-purple-light text-white"
                    : "border border-purple-light text-white hover:bg-purple-light",
                ].join(" ")}
              >
                {tab.label}
              </MotionLink>
            );
          })}
        </div>
      </div>

      {children}
    </section>
  );
}
