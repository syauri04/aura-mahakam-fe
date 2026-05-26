import Summary from "@/components/Hero/child/Summary";
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import DetailLayout from "./components/DetailLayout";

export default function DetailSuaraPage() {
  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[
              { label: "Home", href: "/" },
              {
                label: "Cerita Mahakam Heroes",
                href: "/suara-mahakam/cerita-mahakam-heroes",
              },
              {
                label:
                  "Suara Mahakam di Persimpangan: Ketika Sungai yang Hi...",
              },
            ]}
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

      <DetailLayout />
    </>
  );
}
