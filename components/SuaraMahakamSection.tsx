"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ContentSuaraItem } from "@/services/types/suara";
import { getStrapiImageUrl } from "@/services/strapi";

interface SuaraMahakamSectionProps {
  data: ContentSuaraItem[];
}

export default function SuaraMahakamSection({
  data,
}: SuaraMahakamSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-gold py-14 flex flex-col gap-14 overflow-hidden">
      {/* Title with ornaments */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-10 px-6"
      >
        <Image
          src="/assets/ornament-title-left.png"
          alt=""
          width={82}
          height={64}
          className="shrink-0"
        />
        <h2 className="font-staatliches text-black text-[48px] md:text-[72px] leading-[48px] md:leading-[72px] text-center ">
          SUARA MAHAKAM
        </h2>
        <Image
          src="/assets/ornament-title-right.png"
          alt=""
          width={82}
          height={64}
          className="shrink-0"
        />
      </motion.div>

      {/* Slider with side nav */}
      <div className="relative">
        {/* Prev button — vertically centered at image height / 2 = 160px */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-24 top-[200px] -translate-y-1/2 z-10 size-12 rounded-full   flex items-center justify-center  transition-colors cursor-pointer border-none"
        >
          <ChevronLeft size={64} className="text-white" />
        </button>

        {/* Next button */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-24 top-[200px] -translate-y-1/2 z-10 size-12 rounded-full   flex items-center justify-center  transition-colors cursor-pointer border-none"
        >
          <ChevronRight size={64} className="text-white" />
        </button>

        <Swiper
          modules={[Navigation, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={false}
          grabCursor
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="!px-6 md:!px-16 !items-stretch"
        >
          {data.map((article, i) => (
            <SwiperSlide key={i} className="h-auto self-stretch">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="h-full"
              >
                <Link
                  href={
                    article.type === "cerita-mahakam"
                      ? `/suara-mahakam/cerita-mahakam-heroes/${article.slug}`
                      : `/suara-mahakam/kabar-mahakam/${article.slug}`
                  }
                  className="no-underline block h-full"
                >
                  <div className="bg-white/60 rounded-[30px] overflow-hidden flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-[320px] shrink-0">
                      <Image
                        src={getStrapiImageUrl(
                          article.cover_image?.formats?.medium?.url ??
                            article.cover_image?.url ??
                            null,
                        )}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1024px) 50vw,
                        300px"
                        className="object-cover rounded-[30px]"
                      />
                    </div>
                    {/* Title */}
                    <div className="p-5 flex-1 min-h-[150px]">
                      <h3 className="font-jakarta font-bold text-2xl leading-8 text-black line-clamp-3">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
