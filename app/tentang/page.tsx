import Summary from "@/components/Hero/child/Summary";
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";

import { fetchAbout, fetchCardAuras } from "@/services/about";
import AuraCardClient from "./AuraCardClient";

interface AboutPageProps {
  searchParams: Promise<{ lang?: string }>;
}
export default async function Tentang({ searchParams }: AboutPageProps) {
  const { lang } = await searchParams;
  const locale = lang === "en" ? "en" : "id";

  const [data, cardAuras] = await Promise.all([
    fetchAbout(locale),
    fetchCardAuras(locale),
  ]);
  const hero = data.Hero[0];

  return (
    <main>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tentang Aura Mahakam" },
            ]}
            title={hero?.Title ?? ""}
          />
          <Summary
            highlight={hero?.Summary_1 ?? ""}
            description={hero?.Summary_2 ?? ""}
          />
        </HeroContentPages>
      </HeroSection>
      <AuraCardClient
        title={data?.title_section ?? ""}
        summary={data?.summary_section ?? ""}
        cardAuras={cardAuras}
      />
    </main>
  );
}
