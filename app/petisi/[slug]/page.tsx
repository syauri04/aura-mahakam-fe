// app/petisi/[slug]/page.tsx
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import DetailPetisi from "./components/DetailPetisi";
import { fetchPetisiBySlug } from "@/services/petisi";
import { notFound } from "next/navigation";

interface DetailPetisiPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function DetailPetisiPage({
  params,
  searchParams,
}: DetailPetisiPageProps) {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams]);
  const locale = lang === "en" ? "en" : "id";

  const data = await fetchPetisiBySlug(slug, locale);
  if (!data) notFound();

  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Semua Petisi", href: "/petisi" },
              { label: data.title },
            ]}
            title="PETISI"
          />
        </HeroContentPages>
      </HeroSection>
      <DetailPetisi data={data} />
    </>
  );
}
