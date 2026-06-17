// app/kegiatan/[slug]/page.tsx
import CountdownTimer from "@/components/Hero/child/CountdownTimer";
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import { notFound as nextNotFound } from "next/navigation";
import SectionInfo from "./components/SectionInfo";
import MahakamHeroesLayout from "./components/MahakamHeroesLayout";
import FestivalLayout from "./components/FestivalLayout";
import { fetchKegiatan, findSubKegiatanBySlug } from "@/services/kegiatan";
import {
  KegiatanThemeDefault,
  KegiatanThemeMahakam,
  SubKegiatan,
} from "@/services/types/kegiatan";

const layoutMap: Record<string, React.ComponentType<{ data: SubKegiatan }>> = {
  "kegiatan.theme-default": FestivalLayout,
  "kegiatan.theme-mahakam": MahakamHeroesLayout,
};

interface KegiatanPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function KegiatanPage({
  params,
  searchParams,
}: KegiatanPageProps) {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams]);
  const locale = lang === "en" ? "en" : "id";

  const kegiatan = await fetchKegiatan(locale);
  const activeData = findSubKegiatanBySlug(kegiatan.sub_kegiatan, slug);
  // Debug log to check the found data
  console.log("Active Data:", activeData);
  if (!activeData) nextNotFound();

  const BottomLayout = layoutMap[activeData!.__component];
  if (!BottomLayout) nextNotFound();

  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Kegiatan" }]}
            title="Kegiatan"
          />
          <CountdownTimer
            targetDate={new Date(activeData!.dateEvent)}
            title={activeData!.title}
          />
        </HeroContentPages>
      </HeroSection>

      <SectionInfo data={activeData!} allKegiatan={kegiatan.sub_kegiatan} />
      <BottomLayout data={activeData!} />
    </>
  );
}
