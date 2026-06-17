import ArtikelSection from "@/components/utils/ArtikelSection";
import KaryaSection from "@/components/utils/KaryaSection";
import { getStrapiImageUrl } from "@/services/strapi";
import { fetchCeritaMahakam } from "@/services/suara";
import { fetchKaryaVisual } from "@/services/karya";

interface CeritaLayoutProps {
  locale?: string;
}

export default async function CeritaLayout({
  locale = "id",
}: CeritaLayoutProps) {
  const [items, karyaItems] = await Promise.all([
    fetchCeritaMahakam(locale),
    fetchKaryaVisual(locale),
  ]);

  const articles = items.map((item) => ({
    imageSrc: getStrapiImageUrl(
      item.cover_image?.formats?.medium?.url ?? item.cover_image?.url ?? null,
    ),
    imageAlt: item.cover_image?.alternativeText ?? item.title,
    title: item.title,
    summary: item.summary,
    href: `cerita-mahakam-heroes/${item.slug}`,
  }));

  const karyas = karyaItems.map((k) => ({
    imageSrc: getStrapiImageUrl(k.image?.url ?? null),
    imageAlt: k.image?.alternativeText ?? k.title,
    title: k.title,
  }));

  return (
    <main>
      <ArtikelSection titleSection="Cerita Mahakam" articles={articles} />
      <KaryaSection titleSection="Karya Mahakam" karyas={karyas} />
    </main>
  );
}
