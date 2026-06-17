import Summary from "@/components/Hero/child/Summary";
import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import DetailLayout from "./components/DetailLayout";
import { notFound } from "next/dist/client/components/navigation";
import { fetchContentBySlug } from "@/services/suara";

interface DetailSuaraPageProps {
  params: Promise<{ category: string; slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function DetailSuaraPage({
  params,
  searchParams,
}: DetailSuaraPageProps) {
  const [{ category, slug }, { lang }] = await Promise.all([
    params,
    searchParams,
  ]);
  const locale = lang === "en" ? "en" : "id";

  const data = await fetchContentBySlug(slug, locale);
  if (!data) notFound();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
              { label: data.title },
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

      <DetailLayout
        title={data.title}
        author={data.author}
        date={formatDate(data.datePost ?? data.createdAt)}
        content={data.content}
        slug={data.slug}
      />
    </>
  );
}
