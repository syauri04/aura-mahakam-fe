// services/types/karya.ts
import { StrapiImage } from "./about";

export interface KaryaItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  image: StrapiImage | null;
}

export interface KaryaResponse {
  data: KaryaItem[];
  meta: object;
}
