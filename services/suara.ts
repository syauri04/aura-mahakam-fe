import { fetchWithFallback } from "./strapi";
import {
  ContentSuaraItem,
  ContentSuaraResponse,
  SuaraData,
  SuaraResponse,
} from "./types/suara";

export async function fetchSuara(locale: string = "id"): Promise<SuaraData> {
  const res = await fetchWithFallback<SuaraResponse>(
    "/suara?populate=*",
    locale,
  );
  if (!res.data) throw new Error("Suara data not found");
  return res.data;
}

export async function fetchCeritaMahakam(
  locale = "id",
): Promise<ContentSuaraItem[]> {
  const res = await fetchWithFallback<ContentSuaraResponse>(
    "/content-suaras?populate=cover_image&filters[type][$eq]=cerita-mahakam&pagination[limit]=16&sort[0]=datePost:desc&sort[1]=createdAt:desc",
    locale,
  );
  return res.data ?? [];
}

export async function fetchSiaranPers(
  locale = "id",
): Promise<ContentSuaraItem[]> {
  const res = await fetchWithFallback<ContentSuaraResponse>(
    "/content-suaras?populate=cover_image&filters[type][$eq]=siaran-pers&pagination[limit]=5&sort[0]=datePost:desc&sort[1]=createdAt:desc",
    locale,
  );
  return res.data ?? [];
}

export async function fetchArtikel(locale = "id"): Promise<ContentSuaraItem[]> {
  const res = await fetchWithFallback<ContentSuaraResponse>(
    "/content-suaras?populate=cover_image&filters[type][$eq]=artikel&pagination[limit]=8&sort[0]=datePost:desc&sort[1]=createdAt:desc",
    locale,
  );
  return res.data ?? [];
}

export async function fetchContentBySlug(
  slug: string,
  locale = "id",
): Promise<ContentSuaraItem | null> {
  const res = await fetchWithFallback<ContentSuaraResponse>(
    `/content-suaras?populate=cover_image&filters[slug][$eq]=${slug}`,
    locale,
  );
  return res.data?.[0] ?? null;
}

export async function fetchSuaraHone(
  locale = "id",
): Promise<ContentSuaraItem[]> {
  const res = await fetchWithFallback<ContentSuaraResponse>(
    "/content-suaras?populate=cover_image&pagination[limit]=6&sort[0]=datePost:desc&sort[1]=createdAt:desc",
    locale,
  );
  return res.data ?? [];
}
