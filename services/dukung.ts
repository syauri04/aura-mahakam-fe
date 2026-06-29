// services/dukung.ts
import { fetchWithFallback } from "./strapi";
import { DukungData, DukungResponse } from "./types/dukung";

const POPULATE =
  "populate[hero][on][hero.hero-dukung][populate]=*" +
  "&populate[content_dukung][on][dukung.dukung-default][populate]=*" +
  "&populate[content_dukung][on][dukung.dukung-donasi][populate][blok_dukung][populate]=*" +
  "&populate[content_dukung][on][dukung.dukung-donasi][populate][block_section][populate]=*";

export async function fetchDukung(locale = "id"): Promise<DukungData> {
  const res = await fetchWithFallback<DukungResponse>(
    `/dukung?${POPULATE}`,
    locale,
  );
  if (!res.data) throw new Error("Dukung data not found");
  return res.data;
}
