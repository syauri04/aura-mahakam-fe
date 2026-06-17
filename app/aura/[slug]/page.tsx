import { fetchAuraBySlug } from "@/services/aura";
import { getStrapiImageUrl } from "@/services/strapi";
import { notFound } from "next/navigation";
import AuraDetailClient from "./AuraDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function AuraDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = lang === "en" ? "en" : "id";

  const data = await fetchAuraBySlug(slug, locale);

  if (!data) notFound();

  return <AuraDetailClient data={data} locale={locale} />;
}
