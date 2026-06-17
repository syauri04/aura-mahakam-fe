// services/petisi.ts
import { fetchWithFallback } from "./strapi";
import { PetisiItem, PetisiResponse } from "./types/petisi";

export interface PetisiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PetisiResult {
  data: PetisiItem[];
  pagination: PetisiPagination;
}

export async function fetchPetisi(
  locale = "id",
  page = 1,
  pageSize = 1,
): Promise<PetisiResult> {
  const res = await fetchWithFallback<PetisiResponse>(
    `/petisis?populate=cover_image&sort=datePetisi:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    locale,
  );
  return {
    data: res.data ?? [],
    pagination: (res.meta as { pagination: PetisiPagination }).pagination ?? {
      page: 1,
      pageSize,
      pageCount: 1,
      total: 0,
    },
  };
}

export async function fetchPetisiBySlug(
  slug: string,
  locale = "id",
): Promise<PetisiItem | null> {
  const res = await fetchWithFallback<PetisiResponse>(
    `/petisis?populate=cover_image&filters[slug][$eq]=${slug}`,
    locale,
  );
  return res.data?.[0] ?? null;
}

export async function fetchPetisiLatest(
  locale = "id",
  limit = 2,
): Promise<PetisiItem[]> {
  const res = await fetchWithFallback<PetisiResponse>(
    `/petisis?populate=cover_image&sort[0]=datePetisi:desc&sort[1]=createdAt:desc&pagination[limit]=${limit}`,
    locale,
  );
  return res.data ?? [];
}
