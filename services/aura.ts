import { fetchFromStrapi } from "./strapi";
import { AuraData, AuraResponse } from "./types/aura";

export async function fetchAuras(locale: string = "id"): Promise<AuraData[]> {
  const res = await fetchFromStrapi<AuraResponse>("/auras?populate=*", {
    locale,
    revalidate: 60,
  });

  if (!res.data) throw new Error("Aura data not found");

  return res.data;
}

export async function fetchAuraBySlug(
  slug: string,
  locale: string = "id",
): Promise<AuraData | null> {
  const res = await fetchFromStrapi<AuraResponse>(
    `/auras?filters[slug][$eq]=${slug}&populate=*`,
    { locale, revalidate: 60 },
  );

  return res.data?.[0] ?? null;
}
