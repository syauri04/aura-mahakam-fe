// services/kegiatan.ts
import { fetchWithFallback } from "./strapi";
import { KegiatanData, KegiatanResponse, SubKegiatan } from "./types/kegiatan";

const POPULATE =
  "populate[sub_kegiatan][on][kegiatan.theme-default][populate]=*&populate[sub_kegiatan][on][kegiatan.theme-mahakam][populate][image_section_1][fields][0]=url&populate[sub_kegiatan][on][kegiatan.theme-mahakam][populate][image_section_1][fields][1]=alternativeText&populate[sub_kegiatan][on][kegiatan.theme-mahakam][populate][image_section_1][fields][2]=formats&populate[sub_kegiatan][on][kegiatan.theme-mahakam][populate][card_kegiatan_section_1][populate][button_link]=*&populate[sub_kegiatan][on][kegiatan.theme-mahakam][populate][card_kegiatan_section_2][populate][button_link]=*";

export async function fetchKegiatan(locale = "id"): Promise<KegiatanData> {
  const res = await fetchWithFallback<KegiatanResponse>(
    `/kegiatan?${POPULATE}`,
    locale,
  );
  if (!res.data) throw new Error("Kegiatan data not found");
  return res.data;
}

// Helper: title → slug ("Festival Aura Mahakam" → "festival-aura-mahakam")
export function titleToSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

// Cari sub_kegiatan berdasarkan slug dari title
export function findSubKegiatanBySlug(
  subKegiatan: SubKegiatan[],
  slug: string,
): SubKegiatan | undefined {
  return subKegiatan.find((k) => titleToSlug(k.title) === slug);
}
