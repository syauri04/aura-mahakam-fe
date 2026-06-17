// services/karya.ts
import { fetchWithFallback } from "./strapi";
import { KaryaItem, KaryaResponse } from "./types/karya";

export async function fetchKaryaVisual(locale = "id"): Promise<KaryaItem[]> {
  const res = await fetchWithFallback<KaryaResponse>(
    "/karya-visuals?populate=image",
    locale,
  );
  return res.data ?? [];
}
