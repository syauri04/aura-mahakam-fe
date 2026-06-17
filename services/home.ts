import { fetchFromStrapi } from "./strapi";
import { HomeData, HomeResponse } from "./types/home";

export async function fetchHome(locale: string = "id"): Promise<HomeData> {
  const res = await fetchFromStrapi<HomeResponse>(
    "/home?populate[card_kegiatan][populate]=*&populate[hero][populate]=*",
    { locale, revalidate: 60 },
  );

  if (!res.data) throw new Error("Home data not found");

  return res.data;
}
