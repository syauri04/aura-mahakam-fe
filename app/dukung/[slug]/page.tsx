// app/dukung/[slug]/page.tsx
import DukungCount from "@/components/Hero/child/DukungCount";
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import DonasiLayout from "./components/DonasiLayout";
import AksiLayout from "./components/AksiLayout";
import PetisiLayout from "./components/PetisiLayout";
import { notFound as nextNotFound } from "next/navigation";
import { fetchDukung } from "@/services/dukung";
import {
  AnyDukungContent,
  DukungDefault,
  DukungDonasi,
} from "@/services/types/dukung";

const layoutMap: Record<
  string,
  React.ComponentType<{ data: AnyDukungContent }>
> = {
  petisi: PetisiLayout,
  aksi: AksiLayout,
  donasi: DonasiLayout,
};

interface DukungPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function DukungPage({
  params,
  searchParams,
}: DukungPageProps) {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams]);
  const locale = lang === "en" ? "en" : "id";

  const dukung = await fetchDukung(locale);
  const hero = dukung.hero[0];

  // Cari content berdasarkan slug
  const activeData =
    slug === "donasi"
      ? dukung.content_dukung.find(
          (c) => c.__component === "dukung.dukung-donasi",
        )
      : dukung.content_dukung.find(
          (c) =>
            c.__component === "dukung.dukung-default" &&
            (c as DukungDefault).slug === slug,
        );

  if (!activeData) nextNotFound();

  const BottomLayout = layoutMap[slug];
  if (!BottomLayout) nextNotFound();

  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Dukung" }]}
            title={hero?.title ?? "Dukung Aura Mahakam"}
          />
          <DukungCount
            relawan={hero?.relawan ?? "0"}
            donatur={hero?.donatur ?? "0"}
            pendukung_petisi={hero?.pendukung_petisi ?? "0"}
          />
        </HeroContentPages>
      </HeroSection>

      <BottomLayout data={activeData!} />
    </>
  );
}
