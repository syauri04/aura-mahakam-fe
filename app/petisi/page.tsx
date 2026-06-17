// app/petisi/page.tsx
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import SectionListPetisi from "./components/SectionListPetisi";
import { fetchPetisi } from "@/services/petisi";
import { getStrapiImageUrl } from "@/services/strapi";
import Pagination from "./components/Pagination";

interface PetisiPageProps {
  searchParams: Promise<{ lang?: string; page?: string }>;
}

export default async function PetisiPage({ searchParams }: PetisiPageProps) {
  const { lang, page } = await searchParams;
  const locale = lang === "en" ? "en" : "id";
  const currentPage = Number(page ?? 1);

  const { data: petisiItems, pagination } = await fetchPetisi(
    locale,
    currentPage,
    8,
  );

  const groups = [
    {
      groupLabel: "Ikut beraksi melalui petisi",
      items: petisiItems.map((p) => ({
        imageSrc: getStrapiImageUrl(
          p.cover_image?.formats?.small?.url ?? p.cover_image?.url ?? null,
        ),
        imageAlt: p.cover_image?.alternativeText ?? p.title,
        title: p.title,
        summary: p.summary ?? "",
        petisiHref: `/petisi/${p.slug}`,
        actionHref: p.link_petisi,
        actionLabel: "Ikut Beraksi",
      })),
    },
  ];

  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tanda Tangan Petisi", href: "/dukung/petisi" },
              { label: "Semua Petisi" },
            ]}
            title="PETISI"
          />
        </HeroContentPages>
      </HeroSection>
      <SectionListPetisi
        titleSection="Mahakam Alert"
        subtitle="Petisi Aura Mahakam"
        groups={groups}
      />
      <Pagination
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
      />
    </>
  );
}
