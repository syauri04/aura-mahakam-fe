import DukungCount from "@/components/Hero/child/DukungCount";
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";

import DonasiLayout from "./components/DonasiLayout";
import AksiLayout from "./components/AksiLayout";
import PetisiLayout from "./components/PetisiLayout";
import { dukungData } from "./data/dukung";
import { notFound as nextNotFound } from "next/navigation";

const layoutMap = {
  petisi: PetisiLayout,
  aksi: AksiLayout,
  donasi: DonasiLayout,
};

export default async function DukungPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = dukungData[slug as keyof typeof dukungData];

  if (!data) {
    notFound();
  }

  const BottomLayout = layoutMap[data.layout as keyof typeof layoutMap];
  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Dukung" }]}
            title="Dukung Aura Mahakam"
          />
          <DukungCount />
        </HeroContentPages>
      </HeroSection>

      <BottomLayout />
    </>
  );
}

function notFound() {
  // Delegate to Next.js notFound helper to render the 404 page
  nextNotFound();
}
