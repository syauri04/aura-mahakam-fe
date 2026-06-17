import ArtikelSection from "@/components/utils/ArtikelSection";
import MahakamaAlertSection from "@/components/utils/MahakamaAlertSection";
import SiaranPersSection from "@/components/utils/SiaranPersSection";
import { getStrapiImageUrl } from "@/services/strapi";
import { fetchArtikel, fetchSiaranPers } from "@/services/suara";
import { fetchPetisiLatest } from "@/services/petisi";

interface KabarLayoutProps {
  locale?: string;
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default async function KabarLayout({ locale = "id" }: KabarLayoutProps) {
  const [siaranPersItems, artikelItems, petisiItems] = await Promise.all([
    fetchSiaranPers(locale),
    fetchArtikel(locale),
    fetchPetisiLatest(locale, 2),
  ]);

  // Index 0 = featured (paling baru), sisanya = list card (maks 4)
  const [featuredRaw, ...restSiaranPers] = siaranPersItems;
  const siaranPersList = restSiaranPers.slice(0, 4);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const featuredArticle = featuredRaw
    ? {
        imageSrc: getStrapiImageUrl(
          featuredRaw.cover_image?.formats?.large?.url ??
            featuredRaw.cover_image?.url ??
            null,
        ),
        imageAlt: featuredRaw.cover_image?.alternativeText ?? featuredRaw.title,
        title: featuredRaw.title,
        date: formatDate(featuredRaw.datePost ?? featuredRaw.createdAt),
        summary: featuredRaw.summary,
        href: `kabar-mahakam/${featuredRaw.slug}`,
      }
    : null;

  const siaranPersArticles = siaranPersList.map((item) => ({
    imageSrc: getStrapiImageUrl(
      item.cover_image?.formats?.medium?.url ?? item.cover_image?.url ?? null,
    ),
    imageAlt: item.cover_image?.alternativeText ?? item.title,
    title: item.title,
    date: formatDate(item.datePost ?? item.createdAt),
    summary: item.summary,
    href: `kabar-mahakam/${item.slug}`,
  }));

  const artikelArticles = artikelItems.map((item) => ({
    imageSrc: getStrapiImageUrl(
      item.cover_image?.formats?.medium?.url ?? item.cover_image?.url ?? null,
    ),
    imageAlt: item.cover_image?.alternativeText ?? item.title,
    title: item.title,
    date: formatDate(item.datePost ?? item.createdAt),
    summary: item.summary,
    href: `kabar-mahakam/${item.slug}`,
  }));

  const alertGroups = [
    {
      groupLabel: "Bersuara melalui petisi",
      items: petisiItems.map((p) => ({
        imageSrc: getStrapiImageUrl(
          p.cover_image?.formats?.small?.url ?? p.cover_image?.url ?? null,
        ),
        imageAlt: p.cover_image?.alternativeText ?? p.title,
        title: p.title,
        summary: p.summary,
        petisiHref: `/petisi/${p.slug}`,
        actionHref: p.link_petisi,
        actionLabel: "Ikut Beraksi",
      })),
    },
  ];

  return (
    <main>
      {featuredArticle && (
        <SiaranPersSection
          titleSection="Siaran Pers"
          featuredArticle={featuredArticle}
          articles={siaranPersArticles}
          archiveHref="#"
        />
      )}
      <ArtikelSection titleSection="Artikel" articles={artikelArticles} />
      <MahakamaAlertSection
        titleSection="Mahakam Alert"
        subtitle="Peranmu untuk melindungi Lanskap Mahakam"
        groups={alertGroups}
      />
    </main>
  );
}
