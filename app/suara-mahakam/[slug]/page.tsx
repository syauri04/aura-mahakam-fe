import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import { suaraData } from "./data/suara";
import { notFound as nextNotFound } from "next/navigation";
import Summary from "@/components/Hero/child/Summary";
import KabarLayout from "./components/KabarLayout";
import CeritaLayout from "./components/CeritaLayout";
import SectionInfoSuara from "./components/SectionInfoSuara";

const layoutMap = {
  "cerita-mahakam": CeritaLayout,
  "kabar-mahakam": KabarLayout,
};

export default async function SuaraPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = suaraData[slug as keyof typeof suaraData];

  if (!data) notFound();

  const BottomLayout = layoutMap[data.layout as keyof typeof layoutMap];

  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Suara Mahakam" }]}
            title="Suara Mahakam"
          />
          <Summary
            highlight="
              Ruang bersama untuk mendengar cerita, mengikuti perkembangan, dan memperkuat gerakan menjaga Lanskap Mahakam.
              "
            description=""
          />
        </HeroContentPages>
      </HeroSection>
      <SectionInfoSuara data={data} />
      <BottomLayout />
    </>
  );
}

function notFound() {
  // Delegate to Next.js notFound helper to render the 404 page
  nextNotFound();
}
