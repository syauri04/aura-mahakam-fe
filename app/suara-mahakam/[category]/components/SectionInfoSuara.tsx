"use client";

import SideOrnament from "@/components/pattern/SideOrnament";
import OrnamentPattern from "@/components/pattern/OrnamentPattern";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CategorySuara } from "@/services/types/suara";

const MotionLink = motion(Link);

interface SectionInfoSuaraProps {
  data: CategorySuara;
  categories: CategorySuara[];
}

export default function SectionInfoSuara({
  data,
  categories,
}: SectionInfoSuaraProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const langQuery = lang ? `?lang=${lang}` : "";

  return (
    <>
      <section className="bg-gold py-14 relative overflow-hidden">
        <SideOrnament side="left" top="45%" size="small" />
        <SideOrnament side="right" top="45%" size="small" />

        <div className="w-full max-w-[1400px] px-6 mx-auto">
          {/* Tabs — dari Strapi */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-20">
            {categories.map((cat) => {
              const href = `/suara-mahakam/${cat.slug}`;
              const active = pathname === href;

              return (
                <MotionLink
                  key={cat.slug}
                  href={`${href}${langQuery}`}
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
                  {cat.title}
                </MotionLink>
              );
            })}
          </div>

          <h2 className="text-[48px] md:text-[64px] lg:text-[96px] text-pink-neon text-center font-staatliches uppercase text-purple mb-10 leading-none">
            {data.title}
          </h2>

          <p className="max-w-[1015px] mx-auto font-jakarta text-center text-pink-neon text-2xl leading-8 font-medium mb-10">
            {data.summary}
          </p>
        </div>
      </section>

      <section className="bg-[#F7F7F7]">
        <OrnamentPattern />
      </section>
    </>
  );
}
