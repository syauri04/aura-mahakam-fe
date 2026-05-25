import CountdownTimer from "@/components/Hero/child/CountdownTimer";
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import { kegiatanData } from "./data/kegiatan";
import { notFound as nextNotFound } from "next/navigation";
import SectionInfo from "./components/SectionInfo";
import MahakamHeroesLayout from "./components/MahakamHeroesLayout";
import FestivalLayout from "./components/FestivalLayout";

const layoutMap = {
  festival: FestivalLayout,
  "mahakam-heroes": MahakamHeroesLayout,
};

export default async function KegiatanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = kegiatanData[slug as keyof typeof kegiatanData];

  if (!data) notFound();

  const BottomLayout = layoutMap[data.layout as keyof typeof layoutMap];

  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Kegiatan" }]}
            title="kegiatan"
          />

          <CountdownTimer targetDate={new Date(data.countdown)} />
        </HeroContentPages>
      </HeroSection>
      <SectionInfo data={data} />
      <BottomLayout />
    </>
  );
}

function notFound() {
  // Delegate to Next.js notFound helper to render the 404 page
  nextNotFound();
}
