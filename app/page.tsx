import CardSection from "@/components/CardSection";
import HeroContentHome from "@/components/Hero/HeroContenHome";
import HeroSection from "@/components/HeroSection";
import KegiatanSection from "@/components/KegiatanSection";
import SuaraMahakamSection from "@/components/SuaraMahakamSection";

export default function Home() {
  return (
    <main>
      <HeroSection>
        <HeroContentHome />
      </HeroSection>
      <CardSection />
      <KegiatanSection />
      <SuaraMahakamSection />
    </main>
  );
}
