import { fetchFromStrapi, fetchWithFallback } from "./strapi";
import {
  AboutData,
  AboutResponse,
  CardAuraItem,
  CardAuraResponse,
} from "./types/about";

export async function fetchAbout(locale: string = "id"): Promise<AboutData> {
  const res = await fetchWithFallback<AboutResponse>(
    "/about?populate=*",
    locale,
  );
  if (!res.data) throw new Error("About data not found");
  return res.data;
}

export async function fetchCardAuras(locale = "id"): Promise<CardAuraItem[]> {
  const res = await fetchWithFallback<CardAuraResponse>(
    "/card-auras?populate=*",
    locale,
  );
  return res.data ?? [];
}
