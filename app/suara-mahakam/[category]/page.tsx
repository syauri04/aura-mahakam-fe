import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import { notFound as nextNotFound } from "next/navigation";
import Summary from "@/components/Hero/child/Summary";
import KabarLayout from "./components/KabarLayout";
import CeritaLayout from "./components/CeritaLayout";
import SectionInfoSuara from "./components/SectionInfoSuara";
import { fetchSuara } from "@/services/suara";
import { CategorySuara } from "@/services/types/suara";

const layoutMap: Record<string, React.ComponentType> = {
  "cerita-mahakam-heroes": CeritaLayout,
  "kabar-mahakam": KabarLayout,
};

export default async function SuaraPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const [{ category }, { lang }] = await Promise.all([params, searchParams]);
  const locale = lang === "en" ? "en" : "id";

  const [suara] = await Promise.all([fetchSuara(locale)]);

  const hero = suara.hero[0];

  const categoryData: CategorySuara | undefined = suara.category_suara.find(
    (c) => c.slug === category,
  );

  if (!categoryData) nextNotFound();

  const BottomLayout = layoutMap[category];

  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Suara Mahakam" }]}
            title={hero?.title ?? "Suara Mahakam"}
          />
          <Summary
            highlight={hero?.summary ?? "Suara Mahakam"}
            description=""
          />
        </HeroContentPages>
      </HeroSection>
      <SectionInfoSuara
        data={categoryData!}
        categories={suara.category_suara}
      />
      {BottomLayout ? <BottomLayout /> : null}
    </>
  );
}

function notFound() {
  // Delegate to Next.js notFound helper to render the 404 page
  nextNotFound();
}
