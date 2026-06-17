import CardSection from "@/components/CardSection";
import HeroContentHome from "@/components/Hero/HeroContenHome";
import HeroSection from "@/components/HeroSection";
import KegiatanSection from "@/components/KegiatanSection";
import SuaraMahakamSection from "@/components/SuaraMahakamSection";
import { fetchAuras } from "@/services/aura";
import { fetchHome } from "@/services/home";
import { fetchSuaraHone } from "@/services/suara";

interface HomePageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { lang } = await searchParams;
  const locale = lang === "en" ? "en" : "id";

  const [data, auras, suara] = await Promise.all([
    fetchHome(locale),
    fetchAuras(locale),
    fetchSuaraHone(locale),
  ]);
  const hero = data.hero[0];
  return (
    <main>
      <HeroSection>
        <HeroContentHome summary={hero?.Summary ?? ""} />
      </HeroSection>
      <CardSection cards={auras} locale={locale} />
      <KegiatanSection
        cards={data.card_kegiatan}
        youtubeId={data.embed_youtube}
      />
      <SuaraMahakamSection data={suara} />
    </main>
  );
}
